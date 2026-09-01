/**
 * AutoReport CECATE - Motor de Leitura OCR e Extração Inteligente de Convocação PDF
 * Versão: v.1.2.0
 */

class ConvocacaoParser {
  constructor() {
    this.pdfjsLoaded = false;
  }

  /**
   * Extrai texto completo de um arquivo PDF enviado pelo usuário
   */
  async extractTextFromPdf(file) {
    if (typeof pdfjsLib === 'undefined') {
      throw new Error('Biblioteca PDF.js não foi carregada. Verifique a conexão ou os arquivos de vendor.');
    }

    // Configurar worker do PDF.js
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    let pageTexts = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageLines = [];
      let lastY = null;
      let currentLine = '';

      for (const item of textContent.items) {
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
          if (currentLine.trim()) pageLines.push(currentLine.trim());
          currentLine = item.str;
        } else {
          currentLine += (currentLine ? ' ' : '') + item.str;
        }
        lastY = item.transform[5];
      }
      if (currentLine.trim()) pageLines.push(currentLine.trim());

      const pageStr = pageLines.join('\n');
      pageTexts.push(pageStr);
      fullText += pageStr + '\n\n';
    }

    return { fullText, pageTexts, numPages: pdf.numPages };
  }

  /**
   * Analisa o texto bruto da Convocação e extrai todos os tópicos estruturados
   */
  parseConvocacaoText(rawText) {
    const text = rawText.replace(/\r\n/g, '\n');
    const result = {
      uf: '',
      polo: '',
      poloIbge: '',
      title: 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
      startDate: '',
      endDate: '',
      datesFormatted: '',
      workload: '16 horas',
      workloadNum: 16,
      venue: '',
      address: '',
      targetAudience: 'Gestores municipais e conselheiros do CACS-FUNDEB',
      expectedParticipants: 0,
      invitedMunicipalitiesCount: 0,
      municipalitiesByDate: {},
      allMunicipalities: [],
      linkInscricao: '',
      linkLocalizacao: '',
      rawText: rawText
    };

    // 1. Identificar Estado (UF)
    const ufMatches = text.match(/Estado d[eo]\s+([A-Za-zÀ-ÖØ-öø-ÿ\s]+)/i) || 
                      text.match(/-(MT|MS|GO|DF|AC|AL|AP|AM|BA|CE|ES|MA|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)/i);
    
    if (ufMatches) {
      const stateStr = ufMatches[1].trim();
      if (stateStr.length === 2) {
        result.uf = stateStr.toUpperCase();
      } else {
        const stateLower = stateStr.toLowerCase();
        if (stateLower.includes('mato grosso do sul')) result.uf = 'MS';
        else if (stateLower.includes('mato grosso')) result.uf = 'MT';
        else if (stateLower.includes('goiás') || stateLower.includes('goias')) result.uf = 'GO';
        else if (stateLower.includes('distrito federal')) result.uf = 'DF';
      }
    }
    if (!result.uf) result.uf = 'MT'; // Padrão CECATE CO

    // 2. Identificar Polo Regional / Município Polo
    // Ex: "Campus de Pontes e Lacerda", "Campus Pontes e Lacerda", "Pontes e Lacerda - MT"
    const poloMatch = text.match(/Campus\s+(?:de\s+|do\s+)?([A-Za-zÀ-ÖØ-öø-ÿ\s]+?)\s+(?:do|da|de|\-)/i) ||
                       text.match(/Endereço:.*?,?\s*([A-Za-zÀ-ÖØ-öø-ÿ\s]+?)\s*-\s*(?:MT|MS|GO|DF)/i) ||
                       text.match(/realizada\s+em\s+([A-Za-zÀ-ÖØ-öø-ÿ\s]+?)\s*-\s*(?:MT|MS|GO|DF)/i);

    if (poloMatch) {
      let candidatePolo = poloMatch[1].trim()
        .replace(/^Instituto\s+Federal\s+/i, '')
        .replace(/^IFMT\s+/i, '')
        .replace(/^Campus\s+/i, '');
      
      // Validar contra a base IBGE
      if (window.IBGE_DATA) {
        const matchedCity = window.IBGE_DATA.find(m => 
          m.u === result.uf && candidatePolo.toLowerCase().includes(m.n.toLowerCase())
        );
        if (matchedCity) {
          result.polo = matchedCity.n;
          result.poloIbge = String(matchedCity.c);
        } else {
          result.polo = candidatePolo;
        }
      } else {
        result.polo = candidatePolo;
      }
    }

    // Se não achou polo por regex, buscar cidades do estado mencionadas perto de "Campus" ou "Auditório"
    if (!result.polo && window.IBGE_DATA) {
      const stateCities = window.IBGE_DATA.filter(m => m.u === result.uf);
      for (const city of stateCities) {
        if (text.toLowerCase().includes(city.n.toLowerCase())) {
          result.polo = city.n;
          result.poloIbge = String(city.c);
          break;
        }
      }
    }

    // 3. Identificar Datas da Capacitação
    // Ex: "nos dias 23 e 24 de junho de 2026", "Data capacitação: 23 e 24 de junho de 2026"
    const dateMatch = text.match(/(?:dias|capacitação:?)\s*(\d{1,2})(?:\s*e\s*|\s*a\s*|\s*,\s*)?(\d{1,2})?\s+de\s+([a-zç]+)\s+de\s+(\d{4})/i);
    
    if (dateMatch) {
      const day1 = parseInt(dateMatch[1]);
      const day2 = dateMatch[2] ? parseInt(dateMatch[2]) : day1;
      const monthName = dateMatch[3].toLowerCase();
      const year = parseInt(dateMatch[4]);

      const MESES = ['janeiro','fevereiro','março','marco','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
      const monthIdx = MESES.findIndex(m => monthName.includes(m));

      if (monthIdx !== -1) {
        const mm = String(monthIdx + 1).padStart(2, '0');
        const dd1 = String(day1).padStart(2, '0');
        const dd2 = String(day2).padStart(2, '0');

        result.startDate = `${year}-${mm}-${dd1}`;
        result.endDate = `${year}-${mm}-${dd2}`;

        const numDays = Math.max(1, day2 - day1 + 1);
        result.workloadNum = numDays * 8;
        result.workload = `${result.workloadNum} horas`;

        const monthFull = MESES[monthIdx === 3 && monthName.includes('ç') ? 2 : monthIdx];
        if (day1 === day2) {
          result.datesFormatted = `${day1} de ${monthFull} de ${year}`;
        } else if (numDays === 2) {
          result.datesFormatted = `${day1} e ${day2} de ${monthFull} de ${year}`;
        } else {
          result.datesFormatted = `${day1} a ${day2} de ${monthFull} de ${year}`;
        }
      }
    }

    // 4. Identificar Local e Endereço
    const localMatch = text.match(/Local:\s*([^\n]+)/i);
    if (localMatch) {
      result.venue = localMatch[1].trim();
    } else {
      const auditMatch = text.match(/(Auditório[^\n,]+)/i);
      if (auditMatch) result.venue = auditMatch[1].trim();
    }

    const endMatch = text.match(/Endereço:\s*([^\n]+)/i);
    if (endMatch) {
      result.address = endMatch[1].trim();
    }

    // 5. Identificar Links
    const linkInsc = text.match(/Link inscrições:\s*(https?:\/\/[^\s]+)/i);
    if (linkInsc) result.linkInscricao = linkInsc[1].trim();

    const linkLoc = text.match(/Link localização:\s*(https?:\/\/[^\s]+)/i);
    if (linkLoc) result.linkLocalizacao = linkLoc[1].trim();

    // 6. Identificar Quantidade de Municípios Convocados
    const countMatch = text.match(/(\d+)\s+municípios\s+do\s+Estado/i);
    if (countMatch) {
      result.invitedMunicipalitiesCount = parseInt(countMatch[1]);
    }

    // 7. Extrair Lista de Municípios Convocados (por Data/Grupo)
    // Ex: "Municípios convidados (23/06/2026)" ...
    const groupSections = text.split(/(?:Municípios convidados|Convocados)\s*\((.*?)\)/gi);

    if (groupSections.length > 1) {
      for (let i = 1; i < groupSections.length; i += 2) {
        const groupLabel = groupSections[i].trim(); // Ex: 23/06/2026
        const groupContent = groupSections[i + 1] || '';
        
        const extractedCities = this.extractCityNamesFromBlock(groupContent, result.uf);
        result.municipalitiesByDate[groupLabel] = extractedCities;
        
        extractedCities.forEach(cityObj => {
          if (!result.allMunicipalities.some(c => c.name.toLowerCase() === cityObj.name.toLowerCase())) {
            result.allMunicipalities.push({ ...cityObj, dateGroup: groupLabel });
          }
        });
      }
    } else {
      // Se não houver divisão explícita por data, buscar todas as cidades do estado presentes no texto
      const allFound = this.extractCityNamesFromBlock(text, result.uf);
      result.allMunicipalities = allFound.map(c => ({ ...c, dateGroup: 'Todos' }));
    }

    if (result.invitedMunicipalitiesCount === 0) {
      result.invitedMunicipalitiesCount = result.allMunicipalities.length;
    }
    result.expectedParticipants = (result.invitedMunicipalitiesCount || result.allMunicipalities.length) * 2; // Estimativa baseline

    return result;
  }

  /**
   * Procura nomes de municípios válidos da base IBGE dentro de um bloco de texto
   */
  extractCityNamesFromBlock(blockText, uf) {
    if (!window.IBGE_DATA) return [];
    
    const lines = blockText.split('\n');
    const foundCities = [];
    const stateCities = window.IBGE_DATA.filter(m => m.u === uf);

    for (const line of lines) {
      const cleanLine = line.replace(/^[■•\-\*\d\.\s]+/, '').trim();
      if (!cleanLine || cleanLine.length < 3) continue;

      // Buscar correspondência exata ou aproximada com nome de município do estado
      const match = stateCities.find(m => 
        m.n.toLowerCase() === cleanLine.toLowerCase() ||
        cleanLine.toLowerCase().includes(m.n.toLowerCase())
      );

      if (match && !foundCities.some(c => c.code === match.c)) {
        foundCities.push({
          name: match.n,
          code: match.c,
          uf: match.u,
          distance: 0 // Será calculado posteriormente se houver polo
        });
      }
    }

    return foundCities;
  }
}

window.convocacaoParser = new ConvocacaoParser();
