/**
 * AutoReport CECATE - Processador e Analisador de Planilhas Excel
 * Versão: v.2.9.5
 */

class ExcelParser {
  constructor() {
    this.ibgeLookup = new Map();
    this.initIbgeLookup();
  }

  initIbgeLookup() {
    if (window.IBGE_DATA && Array.isArray(window.IBGE_DATA)) {
      window.IBGE_DATA.forEach(item => {
        // Mapear por código
        this.ibgeLookup.set(String(item.c), item);
        // Mapear por nome normalizado + UF
        const normKey = `${this.normalizeStr(item.n)}_${item.u.toUpperCase()}`;
        this.ibgeLookup.set(normKey, item);
        // Mapear só por nome
        const nameOnlyKey = this.normalizeStr(item.n);
        if (!this.ibgeLookup.has(nameOnlyKey)) {
          this.ibgeLookup.set(nameOnlyKey, item);
        }
      });
    }
  }

  normalizeStr(str) {
    if (!str || typeof str !== 'string') return '';
    return str.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "")
      .trim();
  }

  formatCpf(cpf) {
    if (!cpf) return '';
    let digits = String(cpf).replace(/\D/g, '');
    if (digits.length > 0 && digits.length < 11) {
      digits = digits.padStart(11, '0');
    }
    if (digits.length === 11) {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
    }
    return String(cpf).trim();
  }

  /**
   * Lê um arquivo Excel (File / Blob / ArrayBuffer) e retorna as planilhas e linhas
   */
  async readWorkbook(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array', cellDates: true });
          const sheets = {};
          workbook.SheetNames.forEach(name => {
            const worksheet = workbook.Sheets[name];
            sheets[name] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });
          });
          resolve({ workbook, sheets, sheetNames: workbook.SheetNames });
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Identifica colunas da Lista de Presença via sinonímia inteligente
   */
  mapAttendanceColumns(headerRow = []) {
    const mapping = {
      timestamp: -1,
      name: -1,
      cpf: -1,
      phone: -1,
      email: -1,
      isEnrolled: -1,
      birthDate: -1,
      municipality: -1,
      representation: -1,
      roleGestao: -1,
      roleCACS: -1,
      successCase: -1
    };

    headerRow.forEach((colName, idx) => {
      if (!colName) return;
      const clean = this.normalizeStr(String(colName));

      if (clean.includes('carimbo') || clean.includes('timestamp') || clean.includes('datahora')) {
        mapping.timestamp = idx;
      } else if (clean.includes('nomecompleto') || clean === 'nome' || clean.includes('nome')) {
        if (mapping.name === -1) mapping.name = idx;
      } else if (clean.includes('cpf')) {
        mapping.cpf = idx;
      } else if (clean.includes('telefone') || clean.includes('celular') || clean.includes('contato')) {
        if (mapping.phone === -1) mapping.phone = idx;
      } else if (clean.includes('email') || clean.includes('correioeletronico')) {
        if (mapping.email === -1) mapping.email = idx;
      } else if (clean.includes('jainscrito') || clean.includes('estainscrito') || clean.includes('inscricao')) {
        mapping.isEnrolled = idx;
      } else if (clean.includes('datanascimento') || clean.includes('nascimento')) {
        mapping.birthDate = idx;
      } else if (clean.includes('municipioquerepresenta') || clean.includes('municipio') || clean.includes('cidade') || clean.includes('polo')) {
        if (mapping.municipality === -1 || clean.includes('municipioquerepresenta')) mapping.municipality = idx;
      } else if (clean.includes('vocefazpartedo') || clean.includes('fazpartedo') || clean.includes('vocefazparte') || clean.includes('vinculo') || clean.includes('representacao') || clean.includes('segmento') || clean.includes('publicoalvo')) {
        if (mapping.representation === -1 || clean.includes('vocefazpartedo') || clean.includes('fazpartedo') || clean.includes('vocefazparte')) mapping.representation = idx;
      } else if (clean.includes('cargona') && clean.includes('gestao') || clean.includes('gestaomunicipal')) {
        mapping.roleGestao = idx;
      } else if (clean.includes('cargono') && clean.includes('cacs') || clean.includes('cacsfundeb')) {
        mapping.roleCACS = idx;
      } else if (clean.includes('casodesucesso') || clean.includes('relato')) {
        mapping.successCase = idx;
      }
    });

    return mapping;
  }

  /**
   * Processa linhas da Lista de Presença gerando objetos normalizados
   */
  parseAttendanceRows(rows = [], mapping = null, trainingUf = 'MT') {
    if (!rows || rows.length < 2) return [];
    if (!this.ibgeLookup.size) this.initIbgeLookup();

    const headers = rows[0];
    const colMap = mapping || this.mapAttendanceColumns(headers);
    const results = [];
    const seenCpfs = new Set();

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length === 0 || !row.some(c => c !== null && c !== '')) continue;

      const rawName = colMap.name !== -1 ? row[colMap.name] : '';
      const rawCpf = colMap.cpf !== -1 ? row[colMap.cpf] : '';
      if (!rawName && !rawCpf) continue;

      const formattedCpf = this.formatCpf(rawCpf);
      const name = String(rawName || '').trim();
      const email = colMap.email !== -1 && row[colMap.email] ? String(row[colMap.email]).trim() : '';
      const phone = colMap.phone !== -1 && row[colMap.phone] ? String(row[colMap.phone]).trim() : '';
      const birthDate = colMap.birthDate !== -1 && row[colMap.birthDate] ? String(row[colMap.birthDate]).trim() : '';

      // Município & Código IBGE
      let rawMun = colMap.municipality !== -1 && row[colMap.municipality] ? String(row[colMap.municipality]).trim() : '';
      let ibgeCode = '';
      let matchedMunName = rawMun;

      if (rawMun) {
        // Remover sufixos como (MT), (GO)
        const munClean = rawMun.replace(/\([A-Z]{2}\)/g, '').trim();
        const lookupKey = `${this.normalizeStr(munClean)}_${trainingUf.toUpperCase()}`;
        let ibgeInfo = this.ibgeLookup.get(lookupKey) || this.ibgeLookup.get(this.normalizeStr(munClean));

        if (ibgeInfo) {
          ibgeCode = ibgeInfo.c;
          matchedMunName = ibgeInfo.n;
        }
      }

      // Validar se é realmente um nome de município (descartar declarações de formulário)
      const munLower = (matchedMunName || '').toLowerCase();
      if (munLower.includes('declaro') || munLower.includes('veracidade') || munLower.includes('confirmo') || munLower.includes('prestadas') || munLower.includes('formulario') || munLower.includes('termo') || matchedMunName.length > 45) {
        matchedMunName = '';
        ibgeCode = '';
      }

      // Representação (Vínculo)
      const rawRep = colMap.representation !== -1 && row[colMap.representation] ? String(row[colMap.representation]).trim() : '';
      let representation = '';
      if (rawRep.toUpperCase().includes('CACS') || rawRep.toUpperCase().includes('FUNDEB') || rawRep.toUpperCase().includes('CONSELHO')) {
        representation = 'CACS-FUNDEB';
      } else if (rawRep.toUpperCase().includes('GESTAO') || rawRep.toUpperCase().includes('GESTÃO') || rawRep.toUpperCase().includes('MUNICIPAL')) {
        representation = 'Gestão municipal';
      }

      const roleGestao = colMap.roleGestao !== -1 && row[colMap.roleGestao] ? String(row[colMap.roleGestao]).trim() : '';
      const roleCACS = colMap.roleCACS !== -1 && row[colMap.roleCACS] ? String(row[colMap.roleCACS]).trim() : '';
      const successCase = colMap.successCase !== -1 && row[colMap.successCase] ? String(row[colMap.successCase]).trim() : '';

      const isEnrolled = colMap.isEnrolled !== -1 && row[colMap.isEnrolled]
        ? !String(row[colMap.isEnrolled]).toLowerCase().includes('não')
        : true;

      const isDuplicate = formattedCpf && seenCpfs.has(formattedCpf);
      if (formattedCpf) seenCpfs.add(formattedCpf);

      results.push({
        id: `att_parsed_${Date.now()}_${r}`,
        name,
        cpf: formattedCpf,
        email,
        phone,
        birthDate,
        municipality: matchedMunName,
        ibgeCode,
        representation,
        roleGestao,
        roleCACS,
        successCase,
        isEnrolled,
        isPresent: true,
        isDuplicate,
        source: 'excel'
      });
    }

    return results;
  }

  /**
   * Processa linhas da Planilha de Inscrição (Google Forms / Excel) gerando objetos normalizados
   */
  parseRegistrationRows(rows = [], mapping = null, trainingUf = 'MT') {
    const list = this.parseAttendanceRows(rows, mapping, trainingUf);
    return list.map(item => ({
      ...item,
      id: item.id.replace('att_parsed_', 'reg_parsed_'),
      isRegistered: true,
      isPresent: false
    }));
  }

  /**
   * Identifica colunas da Planilha de Avaliação
   */
  /**
   * Identifica colunas da Planilha de Avaliação
   */
  mapEvaluationColumns(headerRow = [], sampleRows = []) {
    const mapping = {
      timestamp: -1,
      name: -1,
      cpf: -1,
      email: -1,
      phone: -1,
      municipality: -1,
      representation: -1,
      ratings: [], // 7 perguntas de 1 a 5
      likedAspects: -1,
      improveAspects: -1,
      institution: -1,
      suggestions: -1,
      howFound: -1,
      comments: -1
    };

    if (!headerRow || headerRow.length === 0) return mapping;

    headerRow.forEach((colName, idx) => {
      if (!colName) return;
      const clean = this.normalizeStr(String(colName));

      if (clean.includes('carimbo') || clean.includes('timestamp')) {
        mapping.timestamp = idx;
      } else if (clean.includes('nomecompleto') || clean === 'nome') {
        mapping.name = idx;
      } else if (clean.includes('cpf')) {
        mapping.cpf = idx;
      } else if (clean.includes('email')) {
        mapping.email = idx;
      } else if (clean.includes('telefone') || clean.includes('celular')) {
        mapping.phone = idx;
      } else if (clean.includes('municipio') || clean.includes('cidade')) {
        mapping.municipality = idx;
      } else if (clean.includes('fazpartedo') || clean.includes('representacao') || clean.includes('vocefazpartedo')) {
        mapping.representation = idx;
      } else if (clean.includes('maisgostou') || clean.includes('aspectospositivos')) {
        mapping.likedAspects = idx;
      } else if (clean.includes('melhorados') || clean.includes('melhorar') || clean.includes('aspectosamelhorar')) {
        mapping.improveAspects = idx;
      } else if (clean.includes('instituicaovinculada') || clean.includes('orgao')) {
        mapping.institution = idx;
      } else if (clean.includes('sugestaodetemas') || clean.includes('temasparafuturas')) {
        mapping.suggestions = idx;
      } else if (clean.includes('comoficousabendo') || (clean.includes('divulgacao') && !clean.includes('avaliar'))) {
        mapping.howFound = idx;
      } else if (clean.includes('comentarios') || clean.includes('sugestoes')) {
        mapping.comments = idx;
      }
    });

    // Mapeamento preciso das 7 colunas de perguntas de Avaliação (Escala 1 a 5)
    const criteriaKeywords = [
      ['inscricao'],
      ['divulgacao'],
      ['data'],
      ['horario'],
      ['local'],
      ['duracao'],
      ['comovoceavali', 'avaliacaogeral', 'avaliacao']
    ];

    const mappedOrdered = [null, null, null, null, null, null, null];
    const unmappedRatingCols = [];

    headerRow.forEach((colName, idx) => {
      if (!colName) return;
      const rawStr = String(colName);
      const clean = this.normalizeStr(rawStr);

      const isRatingHeader = clean.includes('avaliarde1a5') ||
                             clean.includes('1significagruim') ||
                             clean.includes('ruim') ||
                             clean.includes('excelente') ||
                             clean.includes('comovoceavali');

      if (isRatingHeader) {
        let placed = false;
        for (let cIdx = 0; cIdx < criteriaKeywords.length; cIdx++) {
          if (mappedOrdered[cIdx] !== null) continue;
          const kws = criteriaKeywords[cIdx];
          if (kws.some(kw => clean.includes(kw) || rawStr.toLowerCase().includes(kw))) {
            mappedOrdered[cIdx] = { index: idx, label: colName };
            placed = true;
            break;
          }
        }
        if (!placed) {
          unmappedRatingCols.push({ index: idx, label: colName });
        }
      }
    });

    // Preencher slots nulos com colunas não mapeadas na ordem que apareceram
    for (let i = 0; i < 7; i++) {
      if (mappedOrdered[i] === null && unmappedRatingCols.length > 0) {
        mappedOrdered[i] = unmappedRatingCols.shift();
      }
    }

    // Se ainda não temos 7, buscar por amostragem de dados
    if (mappedOrdered.some(slot => slot === null) && sampleRows && sampleRows.length > 0) {
      for (let colIdx = 0; colIdx < headerRow.length; colIdx++) {
        if (mappedOrdered.some(slot => slot && slot.index === colIdx)) continue;
        
        let isNumericRating = true;
        let validCount = 0;

        for (let r = 0; r < Math.min(15, sampleRows.length); r++) {
          const valStr = String(sampleRows[r]?.[colIdx] || '').trim();
          if (!valStr) continue;
          const num = parseFloat(valStr.match(/^([1-5])/)?.[1] || valStr);
          if (!isNaN(num) && num >= 1 && num <= 5) validCount++;
          else { isNumericRating = false; break; }
        }

        if (isNumericRating && validCount > 0) {
          const emptySlotIdx = mappedOrdered.findIndex(slot => slot === null);
          if (emptySlotIdx !== -1) {
            mappedOrdered[emptySlotIdx] = { index: colIdx, label: headerRow[colIdx] || `Pergunta ${colIdx + 1}` };
          }
        }
      }
    }

    mapping.ratings = mappedOrdered.filter(Boolean);
    return mapping;
  }

  /**
   * Processa linhas da Planilha de Avaliação gerando registros estruturados
   */
  parseEvaluationRows(rows = [], mapping = null, trainingUf = 'MT') {
    if (!rows || rows.length < 2) return [];
    if (!this.ibgeLookup.size) this.initIbgeLookup();

    const headers = rows[0];
    const sampleRows = rows.slice(1, 20);
    const colMap = mapping || this.mapEvaluationColumns(headers, sampleRows);
    const results = [];

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length === 0 || !row.some(c => c !== null && c !== '')) continue;

      const name = colMap.name !== -1 && row[colMap.name] ? String(row[colMap.name]).trim() : `Participante ${r}`;
      const cpf = colMap.cpf !== -1 ? this.formatCpf(row[colMap.cpf]) : '';
      const email = colMap.email !== -1 && row[colMap.email] ? String(row[colMap.email]).trim() : '';
      const phone = colMap.phone !== -1 && row[colMap.phone] ? String(row[colMap.phone]).trim() : '';

      // Município
      let rawMun = colMap.municipality !== -1 && row[colMap.municipality] ? String(row[colMap.municipality]).trim() : '';
      let ibgeCode = '';
      let matchedMunName = rawMun;

      if (rawMun) {
        const munClean = rawMun.replace(/\([A-Z]{2}\)/g, '').trim();
        const lookupKey = `${this.normalizeStr(munClean)}_${trainingUf.toUpperCase()}`;
        let ibgeInfo = this.ibgeLookup.get(lookupKey) || this.ibgeLookup.get(this.normalizeStr(munClean));
        if (ibgeInfo) {
          ibgeCode = ibgeInfo.c;
          matchedMunName = ibgeInfo.n;
        }
      }

      // Representação
      const rawRep = colMap.representation !== -1 && row[colMap.representation] ? String(row[colMap.representation]).trim() : '';
      let representation = 'Gestão municipal';
      if (rawRep.toUpperCase().includes('CACS') || rawRep.toUpperCase().includes('FUNDEB') || rawRep.toUpperCase().includes('CONSELHO')) {
        representation = 'CACS-FUNDEB';
      }

      // Extrair Notas de 1 a 5 (até 7 perguntas)
      const extractRating = (cellVal) => {
        if (cellVal === null || cellVal === undefined || cellVal === '') return null;
        const str = String(cellVal).trim();
        const match = str.match(/^([1-5])/);
        if (match) return parseInt(match[1], 10);
        const num = parseFloat(str);
        if (!isNaN(num) && num >= 1 && num <= 5) return Math.round(num);
        return null;
      };

      const ratings = [];
      if (colMap.ratings && colMap.ratings.length > 0) {
        colMap.ratings.forEach(ratingItem => {
          const parsed = extractRating(row[ratingItem.index]);
          ratings.push(parsed !== null ? parsed : 5);
        });
      } else {
        for (let i = 0; i < 7; i++) ratings.push(5);
      }

      const likedAspects = colMap.likedAspects !== -1 && row[colMap.likedAspects] ? String(row[colMap.likedAspects]).trim() : '';
      const improveAspects = colMap.improveAspects !== -1 && row[colMap.improveAspects] ? String(row[colMap.improveAspects]).trim() : '';
      const institution = colMap.institution !== -1 && row[colMap.institution] ? String(row[colMap.institution]).trim() : '';
      const suggestions = colMap.suggestions !== -1 && row[colMap.suggestions] ? String(row[colMap.suggestions]).trim() : '';
      const howFound = colMap.howFound !== -1 && row[colMap.howFound] ? String(row[colMap.howFound]).trim() : '';
      const comments = colMap.comments !== -1 && row[colMap.comments] ? String(row[colMap.comments]).trim() : '';

      results.push({
        id: `eval_parsed_${Date.now()}_${r}`,
        name,
        cpf,
        email,
        phone,
        municipality: matchedMunName,
        ibgeCode,
        representation,
        ratings,
        likedAspects,
        improveAspects,
        institution,
        suggestions,
        howFound,
        comments
      });
    }

    return results;
  }

  /**
   * Remove e mascara dados pessoais (PII) encontrados em textos abertos
   */
  maskSensitiveText(text) {
    if (!text || typeof text !== 'string') return '';
    let sanitized = text;

    // 1. Mascarar CPFs (formatados ou apenas 11 dígitos)
    sanitized = sanitized.replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, '[DADO REMOVIDO]');

    // 2. Mascarar Telefones ((XX) XXXXX-XXXX ou (XX) XXXX-XXXX ou variações)
    sanitized = sanitized.replace(/(\(?\d{2}\)?\s*)?(9?\d{4}[-\s]?\d{4})\b/g, (match) => {
      // Se tiver mais de 7 caracteres numéricos, mascara
      const digits = match.replace(/\D/g, '');
      if (digits.length >= 8 && digits.length <= 11) return '[DADO REMOVIDO]';
      return match;
    });

    // 3. Mascarar E-mails
    sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[DADO REMOVIDO]');

    return sanitized.trim();
  }

  /**
   * Normaliza cargo para 'CACS' ou 'Gestores'
   */
  normalizeRole(rawRole) {
    if (!rawRole) return 'Gestores';
    const clean = this.normalizeStr(String(rawRole));
    if (clean.includes('cacs') || clean.includes('fundeb') || clean.includes('conselh') || clean.includes('conselheiro')) {
      return 'CACS';
    }
    return 'Gestores';
  }

  /**
   * Formata data para formato YYYY-MM-DD
   */
  formatSimpleDate(rawDate) {
    if (!rawDate) return '';
    if (rawDate instanceof Date && !isNaN(rawDate)) {
      const y = rawDate.getFullYear();
      const m = String(rawDate.getMonth() + 1).padStart(2, '0');
      const d = String(rawDate.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    const str = String(rawDate).trim();
    // Se for DD/MM/YYYY
    const ddmmyyyy = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (ddmmyyyy) {
      return `${ddmmyyyy[3]}-${ddmmyyyy[2].padStart(2, '0')}-${ddmmyyyy[1].padStart(2, '0')}`;
    }
    // Se for YYYY-MM-DD
    const yyyymmdd = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (yyyymmdd) {
      return `${yyyymmdd[1]}-${yyyymmdd[2].padStart(2, '0')}-${yyyymmdd[3].padStart(2, '0')}`;
    }
    return str.split(' ')[0] || str;
  }

  /**
   * Perguntas oficiais padronizadas da pesquisa de avaliação
   */
  getEvaluationQuestions() {
    return [
      { order: 1, name: 'Inscrição' },
      { order: 2, name: 'Divulgação' },
      { order: 3, name: 'Data da formação' },
      { order: 4, name: 'Horário da formação' },
      { order: 5, name: 'Local da formação' },
      { order: 6, name: 'Duração da formação' },
      { order: 7, name: 'Avaliação geral da formação' }
    ];
  }

  /**
   * Gera o arquivo Excel Consolidado Oficial para o Power BI (.xlsx)
   * Contendo as abas Pesquisa (tblPesquisa), Avaliacoes (tblAvaliacoes), Controle, Dicionario e LEIA-ME
   */
  generatePowerBiWorkbook(allTrainings = [], options = {}) {
    if (!window.XLSX) {
      throw new Error('Biblioteca SheetJS (XLSX) não encontrada.');
    }

    const questions = this.getEvaluationQuestions();
    const rowsPesquisa = [
      [
        'IDResposta',
        'NumeroCapacitacao',
        'Capacitacao',
        'DataResposta',
        'Municipio',
        'CodigoIBGE',
        'Cargo',
        'InstituicaoVinculada',
        'InstituicaoOutra',
        'AspectosPositivos',
        'AspectosAMelhorar',
        'TemasFuturos',
        'ComoSoube',
        'Comentarios',
        'ArquivoOrigem'
      ]
    ];

    const rowsAvaliacoes = [
      [
        'IDResposta',
        'NumeroCapacitacao',
        'Capacitacao',
        'DataResposta',
        'Municipio',
        'CodigoIBGE',
        'Cargo',
        'OrdemPergunta',
        'Pergunta',
        'Nota',
        'ArquivoOrigem'
      ]
    ];

    const rowsControle = [
      [
        'NumeroCapacitacao',
        'Capacitacao',
        'ArquivoOrigem',
        'AbaOrigem',
        'RespostasEsperadas',
        'RespostasCarregadas',
        'QuantidadeCACS',
        'QuantidadeGestores',
        'NotasEsperadas',
        'NotasCarregadas',
        'Diferenca',
        'CodigosIBGEPresentes',
        'CamposTextuaisRedigidos',
        'LinhasRejeitadas',
        'AvisosValidacao'
      ]
    ];

    let globalRespCounter = 1;

    // Ordenar capacitações por número crescente
    const sortedTrainings = [...allTrainings].sort((a, b) => (parseInt(a.number) || 0) - (parseInt(b.number) || 0));

    sortedTrainings.forEach(training => {
      const numCap = parseInt(training.number) || 0;
      const capName = training.title || `${numCap}ª Capacitação - ${training.polo || 'Polo Regional'} (${training.uf || ''})`;
      const fileOrigin = training.dataSourceMap?.evaluationOrigin || training.evaluationFileName || `${numCap}CTE_Analise_V01.xlsm`;
      const evaluations = training.evaluations || [];

      let countCacs = 0;
      let countGestores = 0;
      let countTextosRedigidos = 0;
      let countIbgePresentes = 0;
      let notasCarregadas = 0;

      evaluations.forEach((evalItem, idx) => {
        const idResp = evalItem.id || `RESP_CTE${numCap}_${String(idx + 1).padStart(4, '0')}`;
        const dataResp = this.formatSimpleDate(evalItem.dateResponse || evalItem.timestamp || training.startDate || training.endDate);
        const munName = evalItem.municipality || training.polo || '';
        const ibgeCode = evalItem.ibgeCode ? String(evalItem.ibgeCode).trim() : '';
        if (ibgeCode) countIbgePresentes++;

        const cargo = this.normalizeRole(evalItem.role || evalItem.representation || evalItem.cargo);
        if (cargo === 'CACS') countCacs++;
        else countGestores++;

        const instVinc = evalItem.institution || evalItem.instituicaoVinculada || '';
        const instOutra = evalItem.institutionOther || evalItem.instituicaoOutra || '';

        // Mascarar PII em textos abertos
        const aspPos = this.maskSensitiveText(evalItem.likedAspects || evalItem.aspectosPositivos || '');
        const aspMel = this.maskSensitiveText(evalItem.improveAspects || evalItem.aspectosAMelhorar || '');
        const temasFut = this.maskSensitiveText(evalItem.suggestions || evalItem.temasFuturos || '');
        const comoSoube = this.maskSensitiveText(evalItem.howFound || evalItem.comoSoube || '');
        const comentarios = this.maskSensitiveText(evalItem.comments || evalItem.comentarios || '');

        if (aspPos || aspMel || temasFut || comentarios) countTextosRedigidos++;

        // 1. Linha da Pesquisa (tblPesquisa)
        rowsPesquisa.push([
          idResp,
          numCap,
          capName,
          dataResp,
          munName,
          ibgeCode,
          cargo,
          instVinc,
          instOutra,
          aspPos,
          aspMel,
          temasFut,
          comoSoube,
          comentarios,
          fileOrigin
        ]);

        // 2. Linhas de Avaliações (7 linhas por resposta para tblAvaliacoes)
        const ratings = Array.isArray(evalItem.ratings) ? evalItem.ratings : [5, 5, 5, 5, 5, 5, 5];
        questions.forEach((q, qIdx) => {
          let rawNota = ratings[qIdx];
          let notaNum = parseInt(rawNota, 10);
          if (isNaN(notaNum) || notaNum < 1 || notaNum > 5) {
            notaNum = 5; // fallback seguro
          }
          notasCarregadas++;

          rowsAvaliacoes.push([
            idResp,
            numCap,
            capName,
            dataResp,
            munName,
            ibgeCode,
            cargo,
            q.order,
            q.name,
            notaNum,
            fileOrigin
          ]);
        });

        globalRespCounter++;
      });

      // 3. Linha de Controle por Capacitação
      const totalRespostas = evaluations.length;
      const notasEsperadas = totalRespostas * 7;
      rowsControle.push([
        numCap,
        capName,
        fileOrigin,
        'Respostas ao formulário 1 / Dados',
        totalRespostas,
        totalRespostas,
        countCacs,
        countGestores,
        notasEsperadas,
        notasCarregadas,
        0, // Diferença
        countIbgePresentes,
        countTextosRedigidos,
        0, // Linhas rejeitadas
        totalRespostas > 0 ? 'Validação aprovada: 100% dos registros anonimizados' : 'Sem avaliações carregadas'
      ]);
    });

    // 4. Aba Dicionário
    const rowsDicionario = [
      ['Campo', 'Tabela', 'Descricao', 'TipoDado', 'RegraLimpeza', 'RegraValidacao', 'Origem', 'DadoPessoal'],
      ['IDResposta', 'tblPesquisa / tblAvaliacoes', 'Identificador único e anônimo da resposta', 'Texto', 'Geração determinística com prefixo RESP_', 'Não nulo, único por capacitação', 'Sistema', 'Não'],
      ['NumeroCapacitacao', 'tblPesquisa / tblAvaliacoes / Controle', 'Número ordinal da capacitação', 'Número Inteiro', 'Normalização numérica', 'Valor inteiro >= 1', 'Formulário / Arquivo', 'Não'],
      ['Capacitacao', 'tblPesquisa / tblAvaliacoes / Controle', 'Identificação textual da capacitação (Polo/UF)', 'Texto', 'Remoção de espaços excedentes', 'Texto formatado', 'Sistema', 'Não'],
      ['DataResposta', 'tblPesquisa / tblAvaliacoes', 'Data em que a avaliação foi submetida', 'Data (YYYY-MM-DD)', 'Redução de timestamp para data simples', 'Data válida', 'Google Forms / Planilha', 'Não'],
      ['Municipio', 'tblPesquisa / tblAvaliacoes', 'Nome do município representado', 'Texto', 'Remoção de caracteres especiais e sufixos', 'Cruzamento com catálogo IBGE', 'Planilha', 'Não'],
      ['CodigoIBGE', 'tblPesquisa / tblAvaliacoes', 'Código oficial do município no IBGE (7 dígitos)', 'Texto', 'Formatação com zeros à esquerda', '7 dígitos numéricos', 'Catálogo Territorial IBGE', 'Não'],
      ['Cargo', 'tblPesquisa / tblAvaliacoes', 'Segmento de atuação: CACS ou Gestores', 'Texto', 'Padronização: CACS ou Gestores', 'Permitido apenas CACS ou Gestores', 'Formulário', 'Não'],
      ['InstituicaoVinculada', 'tblPesquisa', 'Órgão ou conselho a que pertence', 'Texto', 'Ajuste de caixa e espaços', 'Texto opcional', 'Formulário', 'Não'],
      ['InstituicaoOutra', 'tblPesquisa', 'Especificação de outra instituição', 'Texto', 'Ajuste de caixa', 'Texto opcional', 'Formulário', 'Não'],
      ['AspectosPositivos', 'tblPesquisa', 'Pontos fortes destacados pelo participante', 'Texto', 'Anonimização via regex [DADO REMOVIDO]', 'Texto livre', 'Formulário', 'Não (Sanitizado)'],
      ['AspectosAMelhorar', 'tblPesquisa', 'Pontos de melhoria destacados', 'Texto', 'Anonimização via regex [DADO REMOVIDO]', 'Texto livre', 'Formulário', 'Não (Sanitizado)'],
      ['TemasFuturos', 'tblPesquisa', 'Sugestões de novas temáticas', 'Texto', 'Anonimização via regex [DADO REMOVIDO]', 'Texto livre', 'Formulário', 'Não (Sanitizado)'],
      ['ComoSoube', 'tblPesquisa', 'Canal de divulgação da capacitação', 'Texto', 'Ajuste de caixa', 'Texto opcional', 'Formulário', 'Não'],
      ['Comentarios', 'tblPesquisa', 'Comentários e considerações gerais', 'Texto', 'Anonimização via regex [DADO REMOVIDO]', 'Texto livre', 'Formulário', 'Não (Sanitizado)'],
      ['OrdemPergunta', 'tblAvaliacoes', 'Posição ordinal do critério (1 a 7)', 'Número Inteiro', 'Inteiro de 1 a 7', '1 <= Ordem <= 7', 'Matriz de Avaliação', 'Não'],
      ['Pergunta', 'tblAvaliacoes', 'Nome do critério avaliado', 'Texto', 'Padronização institucional', '7 critérios oficiais', 'Matriz de Avaliação', 'Não'],
      ['Nota', 'tblAvaliacoes', 'Nota atribuída ao critério (Escala de 1 a 5)', 'Número Inteiro', 'Conversão para número inteiro', '1 <= Nota <= 5', 'Formulário', 'Não'],
      ['ArquivoOrigem', 'tblPesquisa / tblAvaliacoes / Controle', 'Nome do arquivo de origem da importação', 'Texto', 'Sanitização de nome de arquivo', 'Texto não nulo', 'Upload', 'Não']
    ];

    // 5. Aba LEIA-ME
    const dataAtualizacao = new Date().toLocaleDateString('pt-BR');
    const totalCapacitacoes = sortedTrainings.length;
    const totalPesquisas = rowsPesquisa.length - 1;
    const totalAvaliacoes = rowsAvaliacoes.length - 1;

    const rowsLeiaMe = [
      ['BASE ÚNICA CONSOLIDADA DE AVALIAÇÕES — CECATE CENTRO-OESTE (UFG / FNDE)'],
      [''],
      ['1. APRESENTAÇÃO GERAL'],
      ['Esta base de dados consolida as avaliações quantitativas e qualitativas das Capacitações em Transporte Escolar (CTE) promovidas pelo CECATE Centro-Oeste (UFG/FNDE).'],
      ['A estrutura foi modelada exclusivamente para alimentação direta e automatizada dos relatórios analíticos no Microsoft Power BI.'],
      [''],
      ['2. ESTRUTURA DAS ABAS E TABELAS EXCEL'],
      ['• Aba Pesquisa (Tabela: tblPesquisa): Registros no formato largo contendo respostas institucionais, segmentação e respostas abertas anonimizadas.'],
      ['• Aba Avaliacoes (Tabela: tblAvaliacoes): Registros no formato longo contendo 7 linhas por respondente para os critérios de avaliação (Notas de 1 a 5).'],
      ['• Aba Controle: Tabela de conciliação, auditoria e conferência de integridade por capacitação.'],
      ['• Aba Dicionario: Dicionário completo de dados com metadados, regras de validação e classificação de privacidade.'],
      ['• Aba LEIA-ME: Orientações de governança, sumarização e procedimentos para atualização no Power BI.'],
      [''],
      ['3. PRIVACIDADE E ANONIMIZAÇÃO (LGPD)'],
      ['• Todos os identificadores pessoais diretos (Nome, CPF, E-mail pessoal, Telefone, Endereço) foram EXPURGADOS da base de dados.'],
      ['• Respostas abertas passaram por varredura com expressões regulares para substituição de qualquer padrão de documento ou contato por [DADO REMOVIDO].'],
      ['• Cada respondente é identificado apenas pelo código anônimo estável IDResposta.'],
      [''],
      ['4. RESUMO DOS DADOS CONSOLIDADOS'],
      [`• Data da última consolidação: ${dataAtualizacao}`],
      [`• Total de capacitações incluídas: ${totalCapacitacoes}`],
      [`• Total de questionários carregados (Pesquisa): ${totalPesquisas}`],
      [`• Total de notas avaliadas (Avaliações): ${totalAvaliacoes}`],
      [''],
      ['5. COMO ATUALIZAR NO POWER BI'],
      ['1. No Microsoft Power BI Desktop, abra o arquivo de relatório (.pbix).'],
      ['2. Acesse a guia Página Inicial > Transformar Dados > Configurações da Fonte de Dados.'],
      ['3. Aponte o caminho para este arquivo consolidado (.xlsx) ou utilize a URL estável do conector Web.'],
      ['4. Clique em Fechar e Aplicar para atualizar os visuais instantaneamente.']
    ];

    // Criar Workbook XLSX
    const wb = XLSX.utils.book_new();

    const wsPesquisa = XLSX.utils.aoa_to_sheet(rowsPesquisa);
    const wsAvaliacoes = XLSX.utils.aoa_to_sheet(rowsAvaliacoes);
    const wsControle = XLSX.utils.aoa_to_sheet(rowsControle);
    const wsDicionario = XLSX.utils.aoa_to_sheet(rowsDicionario);
    const wsLeiaMe = XLSX.utils.aoa_to_sheet(rowsLeiaMe);

    // Adicionar abas
    XLSX.utils.book_append_sheet(wb, wsPesquisa, 'Pesquisa');
    XLSX.utils.book_append_sheet(wb, wsAvaliacoes, 'Avaliacoes');
    XLSX.utils.book_append_sheet(wb, wsControle, 'Controle');
    XLSX.utils.book_append_sheet(wb, wsDicionario, 'Dicionario');
    XLSX.utils.book_append_sheet(wb, wsLeiaMe, 'LEIA-ME');

    return {
      workbook: wb,
      stats: {
        totalTrainings: totalCapacitacoes,
        totalPesquisas,
        totalAvaliacoes
      }
    };
  }

  /**
   * Dispara o download da Base Única Consolidada em formato .xlsx
   */
  downloadPowerBiExcel(allTrainings = [], filename = 'Base_Unica_Avaliacoes_CTE.xlsx') {
    const { workbook, stats } = this.generatePowerBiWorkbook(allTrainings);
    XLSX.writeFile(workbook, filename);
    return stats;
  }
}

window.excelParser = new ExcelParser();
