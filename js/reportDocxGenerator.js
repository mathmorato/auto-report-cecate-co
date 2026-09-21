/**
 * AutoReport CECATE - Gerador de Relatório Institucional em Formato DOCX (Word)
 * Versão: v.3.1.0
 */

class ReportDocxGenerator {
  constructor() {
    this.docxLib = window.docx || null;
  }

  numberToOrdinal(num) {
    const ordinals = {
      1: 'primeiro', 2: 'segundo', 3: 'terceiro', 4: 'quarto', 5: 'quinto',
      6: 'sexto', 7: 'sétimo', 8: 'oitavo', 9: 'nono', 10: 'décimo',
      11: 'décimo primeiro', 12: 'décimo segundo', 13: 'décimo terceiro',
      14: 'décimo quarto', 15: 'décimo quinto', 16: 'décimo sexto',
      17: 'décimo sétimo', 18: 'décimo oitavo', 19: 'décimo nono', 20: 'vigésimo'
    };
    const n = parseInt(num, 10);
    return ordinals[n] || (n ? `${n}º` : '');
  }

  getUfFullName(uf) {
    const ufMap = {
      'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas', 'BA': 'Bahia',
      'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo', 'GO': 'Goiás',
      'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul', 'MG': 'Minas Gerais',
      'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná', 'PE': 'Pernambuco', 'PI': 'Piauí',
      'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte', 'RS': 'Rio Grande do Sul',
      'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina', 'SP': 'São Paulo',
      'SE': 'Sergipe', 'TO': 'Tocantins'
    };
    if (!uf) return 'Goiás';
    return ufMap[uf.toUpperCase()] || uf;
  }

  formatContraCapaMonthYear(training) {
    if (training?.monthYear) return String(training.monthYear).trim();
    if (training?.reportMonthYear) return String(training.reportMonthYear).trim();

    // Tentar extrair de datesFormatted (ex: "23 e 24 de junho de 2026" ou "02 e 03 de abril de 2025")
    const dateStr = (training?.datesFormatted || '').toLowerCase();
    const months = {
      'janeiro': '01', 'fevereiro': '02', 'março': '03', 'marco': '03',
      'abril': '04', 'maio': '05', 'junho': '06', 'julho': '07',
      'agosto': '08', 'setembro': '09', 'outubro': '10', 'novembro': '11', 'dezembro': '12'
    };

    for (const [mName, mNum] of Object.entries(months)) {
      if (dateStr.includes(mName)) {
        const yearMatch = dateStr.match(/\b(20\d{2})\b/);
        const year = yearMatch ? yearMatch[1] : '2026';
        // Caso específico de referência da capacitação 16 (junho -> emissão oficial 07/2026)
        if (String(training?.number).trim() === '16' && mNum === '06') {
          return `07/${year}`;
        }
        return `${mNum}/${year}`;
      }
    }

    // Tentar datas ISO (endDate ou startDate: YYYY-MM-DD)
    const dateCandidate = training?.endDate || training?.startDate;
    if (dateCandidate && /^\d{4}-\d{2}-\d{2}/.test(dateCandidate)) {
      const parts = dateCandidate.split('-');
      return `${parts[1]}/${parts[0]}`;
    }

    // Fallback para data atual
    const now = new Date();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    return `${m}/${now.getFullYear()}`;
  }

  formatCoverTrainingInfo(training) {
    const ufMap = {
      'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas', 'BA': 'Bahia',
      'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo', 'GO': 'Goiás',
      'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul', 'MG': 'Minas Gerais',
      'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná', 'PE': 'Pernambuco', 'PI': 'Piauí',
      'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte', 'RS': 'Rio Grande do Sul',
      'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina', 'SP': 'São Paulo',
      'SE': 'Sergipe', 'TO': 'Tocantins'
    };

    const toTitleCase = (str) => {
      if (!str) return '';
      return str.toLowerCase().split(' ').map((word, idx) => {
        if (idx > 0 && ['de', 'da', 'do', 'das', 'dos', 'e', 'em'].includes(word)) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    };

    const rawNum = training?.number != null ? String(training.number).trim() : '16';
    const numPadded = rawNum.length === 1 ? '0' + rawNum : rawNum;
    const numText = `Relatório de Atividades  Nº ${numPadded}`;

    const rawPolo = (training?.polo || 'Pontes e Lacerda').trim();
    const polo = toTitleCase(rawPolo);

    const rawUf = (training?.uf || 'MT').trim();
    const ufFull = ufMap[rawUf.toUpperCase()] || rawUf;

    const rawDate = (training?.datesFormatted || training?.startDate || '23 e 24 de junho de 2026').trim();
    const dateStr = rawDate.toLowerCase();

    const infoLine = `${polo}, ${ufFull}, ${dateStr}`;

    return { numText, infoLine, numPadded, polo, ufFull, dateStr };
  }

  base64ToUint8Array(dataUrl) {
    if (!dataUrl) return null;
    try {
      const base64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    } catch (e) {
      console.warn('Erro ao decodificar imagem para Uint8Array:', e);
      return null;
    }
  }

  /**
   * Extrai dimensões naturais (largura e altura) dos bytes da imagem (PNG e JPEG)
   */
  getImageDimensionsFromBytes(bytes) {
    if (!bytes || bytes.length < 24) return null;
    try {
      // PNG: cabeçalho 89 50 4E 47
      if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
        const width = (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19];
        const height = (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23];
        if (width > 0 && height > 0) return { width, height };
      }
      // JPEG: cabeçalho FF D8
      if (bytes[0] === 0xFF && bytes[1] === 0xD8) {
        let offset = 2;
        while (offset < bytes.length - 8) {
          if (bytes[offset] !== 0xFF) { offset++; continue; }
          const marker = bytes[offset + 1];
          if (marker === 0xC0 || marker === 0xC1 || marker === 0xC2) {
            const height = (bytes[offset + 5] << 8) | bytes[offset + 6];
            const width = (bytes[offset + 7] << 8) | bytes[offset + 8];
            if (width > 0 && height > 0) return { width, height };
          }
          const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
          offset += 2 + length;
        }
      }
    } catch (e) {
      console.warn('Erro ao ler dimensões da imagem:', e);
    }
    return null;
  }

  /**
   * Cria parágrafo de imagem no Word garantindo proporção e evitando deformações
   */
  createImageParagraph(dataUrl, maxTargetWidth, maxTargetHeight, captionText, docxDeps) {
    const bytes = this.base64ToUint8Array(dataUrl);
    if (!bytes) return null;

    let width = maxTargetWidth || 500;
    let height = maxTargetHeight || 300;

    // Preservar aspect ratio proporcional natural da imagem
    const dims = this.getImageDimensionsFromBytes(bytes);
    if (dims && dims.width > 0 && dims.height > 0) {
      const scale = Math.min(width / dims.width, height / dims.height, 1);
      width = Math.round(dims.width * scale);
      height = Math.round(dims.height * scale);
    }

    const { Paragraph, ImageRun, TextRun, AlignmentType } = docxDeps;

    const nodes = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 80 },
        children: [
          new ImageRun({
            data: bytes,
            transformation: { width, height }
          })
        ]
      })
    ];

    if (captionText) {
      nodes.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [
            new TextRun({ text: captionText, bold: true, italics: true, size: 20, color: '334155' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 180 },
          children: [
            new TextRun({ text: 'Fonte: Elaborada pelos autores.', italics: true, size: 18, color: '64748B' })
          ]
        })
      );
    }
    return nodes;
  }

  /**
   * Constrói dinamicamente os tópicos do sumário, índice de figuras e índice de tabelas
   * com os títulos exatos do presente relatório e suas páginas correspondentes
   */
  buildReportIndices(training, metrics, chartsData = {}) {
    let page = 1;
    let dxa = 0;
    const MAX_PAGE_DXA = 13800; // Capacidade utilizável por folha A4 com margens padrão

    function addDxa(amount, forceNewPage = false) {
      if (forceNewPage || (dxa + amount > MAX_PAGE_DXA && dxa > 1000)) {
        page++;
        dxa = 0;
      }
      dxa += amount;
      return page;
    }

    const munCount = (training?.municipalities || []).length;
    const modCount = (training?.courseModules || []).length;
    const photos = (training?.media || []).filter(m => m.type === 'photo' && m.blob);
    const fndeDocs = (training?.media || []).filter(m => m.type === 'doc_fnde');
    const cecateDocs = (training?.media || []).filter(m => m.type === 'doc_cecate');

    // 1. INTRODUÇÃO
    const pIntro = page;
    addDxa(1400);

    // 2. DADOS BÁSICOS DO CURSO & TABELAS 1 E 2
    const pDadosBasicos = page;
    addDxa(2200);
    const pTab1 = page;
    addDxa(600 + munCount * 360);
    const pTab2 = page;
    addDxa(1200 + Math.max(modCount, 3) * 450);

    // 3. CONTATO COM OS MUNICÍPIOS & TABELA 3
    const pContato = page;
    addDxa(1800);
    const pTab3 = page;
    addDxa(600 + munCount * 360);

    // 4. DESENVOLVIMENTO DO CURSO & TABELA 4 & FIGURA 3
    const tab4Dxa = 600 + munCount * 360;
    const pDesenv = page;
    addDxa(3600);
    if (dxa + tab4Dxa > MAX_PAGE_DXA) {
      page++;
      dxa = 0;
    }
    const pTab4 = page;
    addDxa(tab4Dxa);
    let pFig3 = null;
    if (chartsData?.fig3) {
      pFig3 = addDxa(4800);
    }

    // 5. AVALIAÇÃO DA CAPACITAÇÃO & FIGURAS 4, 5, 6, 7, 8
    const pAvaliacao = page;
    addDxa(2200);
    let pFig4 = null, pFig5 = null, pFig6 = null, pFig7 = null, pFig8 = null;
    if (chartsData?.fig4) pFig4 = addDxa(4200);
    if (chartsData?.fig5) pFig5 = addDxa(4200);
    if (chartsData?.fig6) pFig6 = addDxa(4200);
    if (chartsData?.fig7) pFig7 = addDxa(5200);
    if (chartsData?.fig8) pFig8 = addDxa(5200);

    // 6. REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO
    const pFotos = page;
    addDxa(1000);
    const photoPages = [];
    photos.forEach(() => {
      photoPages.push(addDxa(6000));
    });

    // 7. CONSIDERAÇÕES FINAIS
    const pConsideracoes = page;
    addDxa(1800);

    // APÊNDICES
    let pApendice1 = null;
    if (fndeDocs.length > 0) {
      pApendice1 = page;
      fndeDocs.forEach(() => addDxa(4000));
    }
    let pApendice2 = null;
    if (cecateDocs.length > 0) {
      pApendice2 = page;
      cecateDocs.forEach(() => addDxa(4000));
    }
    let pApendice3 = null;
    const evalList = (training?.evaluations || []).filter(e => (e.likedAspects && e.likedAspects.trim()) || (e.improveAspects && e.improveAspects.trim()));
    if (evalList.length > 0) {
      pApendice3 = page;
      evalList.forEach(() => addDxa(380));
    }

    // MONTAGEM DE sumarioList (Tópicos exatos do relatório e suas páginas)
    const sumarioList = [
      { label: '1.   INTRODUÇÃO', page: String(pIntro) },
      { label: '2.   DADOS BÁSICOS DO CURSO', page: String(pDadosBasicos) },
      { label: '3.   CONTATO COM OS MUNICÍPIOS', page: String(pContato) },
      { label: '4.   DESENVOLVIMENTO DO CURSO', page: String(pDesenv) },
      { label: '5.   AVALIAÇÃO DA CAPACITAÇÃO', page: String(pAvaliacao) },
      { label: '6.   REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO', page: String(pFotos) },
      { label: '7.   CONSIDERAÇÕES FINAIS', page: String(pConsideracoes) }
    ];
    if (pApendice1 != null) {
      sumarioList.push({ label: 'Apêndice I – Convocações do FNDE', page: String(pApendice1) });
    }
    if (pApendice2 != null) {
      sumarioList.push({ label: 'Apêndice II – Convocações do CECATE', page: String(pApendice2) });
    }
    if (pApendice3 != null) {
      sumarioList.push({ label: 'Apêndice III – Respostas Dissertativas da Avaliação', page: String(pApendice3) });
    }

    // MONTAGEM DE tablesList (Títulos exatos das tabelas e suas páginas)
    const tablesList = [
      { label: 'Tabela 1. Municípios convocados.', page: String(pTab1) },
      { label: 'Tabela 2. Estrutura do curso de capacitação em transporte escolar.', page: String(pTab2) },
      { label: 'Tabela 3. Contato com os municípios convocados.', page: String(pTab3) },
      { label: 'Tabela 4. Participação por município (Presentes / Inscritos).', page: String(pTab4) }
    ];

    // MONTAGEM DE figuresList (Títulos exatos das figuras e suas páginas)
    const figuresList = [];
    if (pFig3 != null) {
      figuresList.push({ label: 'Figura 3. Participação segundo o tipo de representação.', page: String(pFig3) });
    }
    if (pFig4 != null) {
      figuresList.push({ label: 'Figura 4. Avaliação da capacitação de todos os participantes.', page: String(pFig4) });
    }
    if (pFig5 != null) {
      figuresList.push({ label: 'Figura 5. Avaliação da capacitação dos conselheiros CACS.', page: String(pFig5) });
    }
    if (pFig6 != null) {
      figuresList.push({ label: 'Figura 6. Avaliação da capacitação dos gestores municipais.', page: String(pFig6) });
    }
    if (pFig7 != null) {
      figuresList.push({ label: 'Figura 7. Aspectos que gostaram da capacitação.', page: String(pFig7) });
    }
    if (pFig8 != null) {
      figuresList.push({ label: 'Figura 8. Aspectos que devem melhorar da capacitação.', page: String(pFig8) });
    }
    photos.forEach((ph, idx) => {
      const cap = ph.caption || `Figura ${idx + 9}. Registro fotográfico oficial da capacitação.`;
      const pNum = photoPages[idx] || pFotos;
      figuresList.push({ label: cap, page: String(pNum) });
    });

    return { sumarioList, tablesList, figuresList };
  }

  /**
   * Gera e dispara o download do arquivo .docx institucional formatado
   */
  async generateAndDownload(training, metrics, chartsData = {}) {
    if (!training) {
      alert('Selecione ou salve uma capacitação primeiro.');
      return;
    }

    const {
      Document,
      Packer,
      Paragraph,
      TextRun,
      Table,
      TableRow,
      TableCell,
      WidthType,
      AlignmentType,
      HeadingLevel,
      BorderStyle,
      ImageRun,
      Header,
      Footer,
      PageNumber,
      PageBreak,
      HeightRule: DocxHeightRule,
      TableLayoutType: DocxTableLayoutType,
      LineRuleType: DocxLineRuleType,
      VerticalAlign: DocxVerticalAlign
    } = window.docx || {};

    const VerticalAlign = DocxVerticalAlign || window.docx?.VerticalAlign || {
      BOTTOM: 'bottom',
      CENTER: 'center',
      TOP: 'top'
    };

    const HeightRule = DocxHeightRule || window.docx?.HeightRule || {
      AUTO: 'auto',
      ATLEAST: 'atLeast',
      EXACT: 'exact'
    };

    const TableLayoutType = DocxTableLayoutType || window.docx?.TableLayoutType || {
      AUTOFIT: 'autofit',
      FIXED: 'fixed'
    };

    const LineRuleType = DocxLineRuleType || window.docx?.LineRuleType || {
      AT_LEAST: 'atLeast',
      EXACTLY: 'exactly',
      EXACT: 'exact',
      AUTO: 'auto'
    };

    if (!Document) {
      console.warn('Biblioteca docx.js não carregada, disparando fallback HTML...');
      this.downloadHtmlReportFallback(training, metrics);
      return;
    }

    try {
      const docChildren = [];
      const coverInfo = this.formatCoverTrainingInfo(training);
      const coverAssets = window.coverAssets || {};

      // Carregar bytes das imagens da capa oficial, cabeçalho e rodapé
      const figBytes = this.base64ToUint8Array(coverAssets.figuradacapa);
      const cecateBytes = this.base64ToUint8Array(coverAssets.cecate);
      const ufgBytes = this.base64ToUint8Array(coverAssets.ufg);
      const fndeBytes = this.base64ToUint8Array(coverAssets.fnde);
      const headerLogoBytes = this.base64ToUint8Array(coverAssets.cecateCabecalho || coverAssets.cecate);
      const rodape5LogosBytes = this.base64ToUint8Array(coverAssets.rodape5Logos);

      // 1. MONTAGEM DA CAPA OFICIAL (Seção 1 - Preenchimento Integral da 1ª Folha A4)
      const PAGE_WIDTH_DXA = 11906; // 210mm (Largura padrão A4)
      const PAGE_HEIGHT_DXA = 16838; // 297mm (Altura padrão A4)

      const noBorders = {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE }
      };

      const cellMargins = { top: 0, bottom: 0, left: 0, right: 0 };

      const topChildren = [];
      if (figBytes) {
        topChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 500, after: 200 },
            children: [
              new ImageRun({
                data: figBytes,
                transformation: { width: 510, height: 285 }
              })
            ]
          })
        );
      } else {
        topChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 800, after: 400 },
            children: [
              new TextRun({
                text: 'CENTRO COLABORADOR DE APOIO AO TRANSPORTE ESCOLAR\nCECATE CENTRO-OESTE',
                bold: true,
                size: 24,
                color: 'E9C95C'
              })
            ]
          })
        );
      }

      topChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 120 },
          children: [
            new TextRun({
              text: coverInfo.numText,
              font: 'Times New Roman',
              bold: true,
              size: 32, // 16pt
              color: 'F9DB61'
            })
          ]
        })
      );

      const stripeChildren = [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
              font: 'Times New Roman',
              bold: true,
              size: 40, // 20pt
              color: '000000'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 40, after: 120 },
          children: [
            new TextRun({
              text: coverInfo.infoLine,
              font: 'Times New Roman',
              bold: true,
              size: 32, // 16pt
              color: '000000'
            })
          ]
        })
      ];

      const projectChildren = [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 200 },
          children: [
            new TextRun({
              text: 'Projeto:  FORTALECENDO E APRIMORANDO AS POLÍTICAS',
              font: 'Times New Roman',
              bold: true,
              size: 30, // 15pt
              color: 'D9D9D9'
            }),
            new TextRun({
              text: 'PÚBLICAS DE TRANSPORTE ESCOLAR',
              font: 'Times New Roman',
              bold: true,
              size: 30, // 15pt
              color: 'D9D9D9',
              break: 1
            }),
            new TextRun({
              text: 'DO BRASIL',
              font: 'Times New Roman',
              bold: true,
              size: 30, // 15pt
              color: 'D9D9D9',
              break: 1
            })
          ]
        })
      ];

      // Banner inferior de logomarcas institucionais
      const logoCells = [];
      if (cecateBytes) {
        logoCells.push(
          new TableCell({
            width: { size: 38, type: WidthType.PERCENTAGE },
            borders: noBorders,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 10, after: 10 },
                children: [
                  new ImageRun({
                    data: cecateBytes,
                    transformation: { width: 175, height: 37 }
                  })
                ]
              })
            ]
          })
        );
      }
      if (ufgBytes) {
        logoCells.push(
          new TableCell({
            width: { size: 24, type: WidthType.PERCENTAGE },
            borders: noBorders,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 10, after: 10 },
                children: [
                  new ImageRun({
                    data: ufgBytes,
                    transformation: { width: 95, height: 37 }
                  })
                ]
              })
            ]
          })
        );
      }
      if (fndeBytes) {
        logoCells.push(
          new TableCell({
            width: { size: 38, type: WidthType.PERCENTAGE },
            borders: noBorders,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 10, after: 10 },
                children: [
                  new ImageRun({
                    data: fndeBytes,
                    transformation: { width: 165, height: 37 }
                  })
                ]
              })
            ]
          })
        );
      }

      const logosTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: noBorders,
        rows: [
          new TableRow({ children: logoCells.length > 0 ? logoCells : [new TableCell({ children: [new Paragraph({})] })] })
        ]
      });

      // Tabela de capa que ocupa 100% da primeira página A4 (sem margens brancas)
      // Distribuição proporcional rigorosa baseada nos relatórios de referência:
      // Linha 1: 8900 dxa (~157mm) - Bloco cinza escuro superior (Ilustração + Nº Relatório)
      // Linha 2: 1600 dxa (~28mm)  - Faixa amarela institucional (Capacitação + Polo/Data)
      // Linha 3: 3750 dxa (~66mm)  - Bloco cinza escuro do Projeto (Texto institucional)
      // Linha 4: 1950 dxa (~34mm)  - Faixa cinza clara institucional (Realizado por + 3 logos)
      // Linha 5: 600 dxa (~11mm)   - Faixa cinza escura de fechamento da borda inferior
      // Total = 16800 dxa (A4 total = 16838 dxa, preenchendo a folha inteira sem salto de página)
      const coverTable = new Table({
        width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
        layout: TableLayoutType.FIXED,
        alignment: AlignmentType.CENTER,
        indent: { size: 0, type: WidthType.DXA },
        margins: cellMargins,
        borders: noBorders,
        rows: [
          new TableRow({
            height: { value: 8900, rule: HeightRule.EXACT },
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
                shading: { fill: '4D4D4D' },
                margins: cellMargins,
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: topChildren
              })
            ]
          }),
          new TableRow({
            height: { value: 1600, rule: HeightRule.EXACT },
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
                shading: { fill: 'E9C95C' },
                margins: cellMargins,
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: stripeChildren
              })
            ]
          }),
          new TableRow({
            height: { value: 3750, rule: HeightRule.EXACT },
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
                shading: { fill: '4D4D4D' },
                margins: cellMargins,
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: projectChildren
              })
            ]
          }),
          new TableRow({
            height: { value: 1950, rule: HeightRule.EXACT },
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
                shading: { fill: 'D8D8D8' },
                margins: cellMargins,
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 30, after: 20 },
                    children: [
                      new TextRun({
                        text: 'Realizado por:',
                        font: 'Arial',
                        bold: true,
                        size: 20, // 10pt
                        color: '4D4D4D'
                      })
                    ]
                  }),
                  logosTable
                ]
              })
            ]
          }),
          new TableRow({
            height: { value: 600, rule: HeightRule.EXACT },
            cantSplit: true,
            children: [
              new TableCell({
                width: { size: PAGE_WIDTH_DXA, type: WidthType.DXA },
                shading: { fill: '4D4D4D' },
                margins: cellMargins,
                borders: noBorders,
                children: [
                  new Paragraph({
                    spacing: { before: 0, after: 0, line: 20, lineRule: LineRuleType.EXACT },
                    children: [new TextRun({ text: '', size: 1 })]
                  })
                ]
              })
            ]
          })
        ]
      });

      // Parágrafo residual da Seção 1 com microespaçamento e fundo escuro para não criar página extra
      const coverTrailingPara = new Paragraph({
        shading: { fill: '4D4D4D' },
        spacing: { before: 0, after: 0, line: 20, lineRule: LineRuleType.EXACT },
        children: [new TextRun({ text: '', size: 1 })]
      });

      // 3. SEÇÃO 1: INTRODUÇÃO
      const rawNum = training?.number != null ? String(training.number).trim() : '';
      const ordinalNum = this.numberToOrdinal(rawNum);
      const ufName = this.getUfFullName(training.uf);
      const munCountVal = (training?.municipalities || []).length;

      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '1. INTRODUÇÃO', bold: true, size: 28, color: '1E3A8A' })]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 180, line: 276 },
          children: [
            new TextRun({
              text: `Este relatório é referente às atividades desenvolvidas no âmbito do projeto intitulado "${training.relatedProject || 'Fortalecendo e aprimorando as políticas públicas de transporte escolar do Brasil'}", processo administrativo número 23070.068031/2023-34, desenvolvido pela Universidade Federal de Goiás (UFG), por meio do Centro Colaborador de Apoio ao Transporte Escolar do Centro-Oeste (CECATE Centro-Oeste), em parceria e com financiamento do Fundo Nacional de Desenvolvimento da Educação (FNDE).`
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200, line: 276 },
          children: [
            new TextRun({
              text: `O presente relatório apresenta a descrição pormenorizada e a análise avaliativa do processo do ${ordinalNum ? `${ordinalNum} ` : ''}curso de Capacitação em Transporte Escolar (Capacitação nº ${rawNum || '16'}), realizado para gestores municipais e conselheiros do CACS/FUNDEB de ${munCountVal} municípios do Estado de ${ufName}, sediado no município polo de ${training.polo || 'Município Polo'}, nas datas de ${training.datesFormatted || 'datas do curso'}.`
            })
          ]
        })
      );

      // 4. SEÇÃO 2: DADOS BÁSICOS DO CURSO & TABELAS 1, 2, 3
      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '2. DADOS BÁSICOS DO CURSO', bold: true, size: 28, color: '1E3A8A' })]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'O curso de Capacitação em Transporte Escolar foi estruturado para alcançar o objetivo primordial de aprimorar os conhecimentos dos participantes sobre transporte escolar, apresentar os programas do governo federal, detalhar os principais aspectos de planejamento e regulação na área e capacitar tecnicamente para a utilização do Sistema Eletrônico de Gestão do Transporte Escolar (SETE).'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'Após criteriosa avaliação pedagógica das edições anteriores, definiu-se que o curso seria realizado em formato presencial concentrado, integrando gestores e conselheiros CACS dos municípios, correspondendo a uma carga horária total de 08:00 horas. No período matutino, a capacitação foi conduzida em turma unificada, abordando fundamentos essenciais de planejamento, governança e regulação do transporte escolar. No período vespertino, a formação foi desdobrada em duas abordagens específicas conforme o público-alvo: a primeira voltada aos gestores municipais, focada no domínio prático e operacional do Sistema SETE para cadastro de rotas, alunos e escolas; e a segunda direcionada aos conselheiros do CACS/FUNDEB, orientada ao exercício das competências fiscalizatórias, controle social e emissão de relatórios de acompanhamento.'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: `Dada a meta de entes federados a serem atendidos durante o projeto, estabeleceu-se a oferta de duas (02) vagas para gestores municipais e duas (02) vagas para conselheiros do CACS/FUNDEB por município. No ofício de convocação foi explicitada a preferência por servidores efetivos e de carreira, com a finalidade de mitigar a perda de conhecimento técnico decorrente da rotatividade das gestões. Como critério de seleção territorial, adotou-se a menor distância rodoviária até o polo de capacitação de ${training.polo || 'Município Polo'}, priorizando os municípios mais próximos. Foram formalmente convocados ${metrics?.totalSummonedMunicipalities || munCountVal} municípios, cuja distância média percorrida foi estimada em ${metrics?.avgDistance || 0} km. A relação completa dos entes federativos convocados é apresentada na Tabela 1:`
            })
          ]
        }),
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: 'Tabela 1. Municípios convocados.', bold: true, italics: true })]
        })
      );

      // Tabela 1
      const munRows = [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Código IBGE', bold: true })] })] }),
            new TableCell({ width: { size: 45, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Nome do Município', bold: true })] })] }),
            new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'UF', bold: true })] })] }),
            new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Distância (km)', bold: true })] })] })
          ]
        })
      ];

      (training.municipalities || []).forEach(m => {
        munRows.push(
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(m.ibgeCode || '-') })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m.name || '', bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(m.uf || training.uf || 'GO') })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m.isSede ? '0,0 km' : `${parseFloat(m.distanceKm || 0).toFixed(1).replace('.', ',')} km` })] })] })
            ]
          })
        );
      });

      docChildren.push(
        new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: munRows }),
        new Paragraph({
          spacing: { before: 60, after: 180 },
          children: [new TextRun({ text: 'Fonte: Elaborada pelos autores.', italics: true, size: 18, color: '64748B' })]
        })
      );

      // Tabela 2 - Estrutura do Curso
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 200, after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'A estrutura curricular do curso contempla quatro (04) módulos sequenciais, sendo os três primeiros voltados aos fundamentos gerais, programas governamentais e normativas do transporte escolar. O quarto módulo é personalizado ao perfil do participante: para os gestores, o foco é integralmente direcionado à prática intensiva no Sistema SETE ("mãos na massa"); para os conselheiros CACS, a abordagem enfatiza as atribuições legais do conselho e a consulta analítica dos dados no sistema. A distribuição temática e as cargas horárias são detalhadas na Tabela 2:'
            })
          ]
        }),
        new Paragraph({
          spacing: { before: 150, after: 100 },
          children: [new TextRun({ text: 'Tabela 2. Estrutura do curso de capacitação em transporte escolar.', bold: true, italics: true })]
        })
      );

      const modRows = [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({ width: { size: 12, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Módulo', bold: true })] })] }),
            new TableCell({ width: { size: 38, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Temática Gestor', bold: true })] })] }),
            new TableCell({ width: { size: 38, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Temática CACS', bold: true })] })] }),
            new TableCell({ width: { size: 12, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Carga Horária', bold: true })] })] })
          ]
        })
      ];

      const normCourseModules = window.courseStructureHelper ? window.courseStructureHelper.normalize(training.courseModules || []) : (training.courseModules || []);
      const sortedMods = [...normCourseModules].sort((a, b) => (a.order || 0) - (b.order || 0));

      sortedMods.forEach(mod => {
        const gTopics = Array.isArray(mod.gestorTopics) ? mod.gestorTopics : [];
        const cTopics = Array.isArray(mod.cacsTopics) ? mod.cacsTopics : [];
        const maxRows = Math.max(gTopics.length, cTopics.length, 1);

        for (let i = 0; i < maxRows; i++) {
          const g = gTopics[i] || null;
          const c = cTopics[i] || null;

          const hText = [];
          if (g) hText.push(`Gestor: ${parseFloat(g.hours || 0).toFixed(1).replace('.', ',')} h`);
          if (c) hText.push(`CACS: ${parseFloat(c.hours || 0).toFixed(1).replace('.', ',')} h`);

          modRows.push(
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: i === 0 ? (mod.moduleNumber || '01') : '', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: g ? (g.topic || '-') : '' })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: c ? (c.topic || '-') : '' })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: hText.join(' | ') || '-' })] })] })
              ]
            })
          );
        }
      });

      docChildren.push(
        new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: modRows }),
        new Paragraph({
          spacing: { before: 60, after: 180 },
          children: [new TextRun({ text: 'Fonte: Elaborada pelos autores.', italics: true, size: 18, color: '64748B' })]
        })
      );

      // 4. SEÇÃO 3: CONTATO COM OS MUNICÍPIOS & TABELA 3
      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '3. CONTATO COM OS MUNICÍPIOS', bold: true, size: 28, color: '1E3A8A' })]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'O contato oficial com os municípios selecionados teve início mediante o encaminhamento de ofícios expedidos pela Coordenação-Geral da Política do Transporte Escolar (CGPTE) do FNDE, endereçados aos dirigentes das secretarias municipais de educação e aos representantes dos conselhos CACS/FUNDEB (Apêndice I). O expediente formal continha as diretrizes gerais da capacitação, orientações de participação e o formulário eletrônico de inscrições disponibilizado por link direto e QR Code institucional.'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'De modo suplementar, a equipe técnica do CECATE Centro-Oeste realizou ampla mobilização institucional (Apêndice II), utilizando canais oficiais das administrações municipais. Foram estabelecidos contatos complementares via correio eletrônico, chamadas telefônicas e mensagens institucionais para certificar o recebimento das convocações, esclarecer dúvidas e incentivar a homologação das inscrições.'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: `Ao encerramento da fase de convocação, registrou-se um total de ${metrics?.totalInscribed || 0} participantes formalmente inscritos, sendo ${metrics?.totalInscribedGestores || 0} gestores municipais e ${metrics?.totalInscribedCACS || 0} representantes dos CACS/FUNDEB. Dos municípios convocados, ${metrics?.totalInscribedMunicipalities || 0} efetivaram inscrição de representantes. A discriminação dos meios e canais de contato empregados para cada município é consolidada na Tabela 3 a seguir:`
            })
          ]
        }),
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: 'Tabela 3. Contato com os municípios convocados.', bold: true, italics: true })]
        })
      );

      const tab3Rows = [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({ width: { size: 35, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Município', bold: true })] })] }),
            new TableCell({ width: { size: 65, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Forma e Meios de Contato', bold: true })] })] })
          ]
        })
      ];

      const contactMethods = training.contactsData?.methods || 'Ofícios, E-mails, Telefones e WhatsApp';
      (training.municipalities || []).forEach(m => {
        tab3Rows.push(
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${m.name} (${m.uf || training.uf || 'GO'})`, bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: contactMethods })] })] })
            ]
          })
        );
      });
      docChildren.push(
        new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: tab3Rows }),
        new Paragraph({
          spacing: { before: 60, after: 180 },
          children: [new TextRun({ text: 'Fonte: Elaborada pelos autores.', italics: true, size: 18, color: '64748B' })]
        })
      );

      // 5. SEÇÃO 4: DESENVOLVIMENTO DO CURSO & TABELA 4 & FIGURA 3
      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '4. DESENVOLVIMENTO DO CURSO', bold: true, size: 28, color: '1E3A8A' })]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'Conforme estruturado na matriz formativa, o curso foi planejado e executado em quatro (04) módulos sequenciais, cumprindo rigorosamente os seguintes momentos pedagógicos:'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 120, line: 276 },
          children: [
            new TextRun({ text: 'Primeiro momento: ', bold: true }),
            new TextRun({ text: 'acolhimento dos participantes com credenciamento e entrega de material didático (pastas com caderno de anotações e caneta institucional), seguido de momento de integração com coffee break.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 120, line: 276 },
          children: [
            new TextRun({ text: 'Segundo momento: ', bold: true }),
            new TextRun({ text: 'abertura oficial com pronunciamento da coordenação do CECATE Centro-Oeste e dos representantes da Coordenação-Geral da Política do Transporte Escolar (CGPTE/FNDE), apresentando a contextualização do projeto e as metas de aprimoramento da gestão pública.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 120, line: 276 },
          children: [
            new TextRun({ text: 'Terceiro momento: ', bold: true }),
            new TextRun({ text: 'espaço aberto para a apresentação individual de todos os presentes, promovendo a integração entre gestores municipais, conselheiros sociais do CACS-FUNDEB e as equipes executoras da UFG e do FNDE.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 120, line: 276 },
          children: [
            new TextRun({ text: 'Quarto momento: ', bold: true }),
            new TextRun({ text: 'apresentação do Módulo 1, com o panorama histórico e situacional do Transporte Escolar no Brasil, os estudos desenvolvidos em parceria entre FNDE e instituições de ensino superior e a missão do CECATE-CO, sensibilizando para os desafios locais e trocas de experiências.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 120, line: 276 },
          children: [
            new TextRun({ text: 'Quinto momento: ', bold: true }),
            new TextRun({ text: 'exposição detalhada do Módulo 2, abordando os programas federais estruturantes: o Programa Nacional de Apoio ao Transporte do Escolar (PNATE) e o Programa Caminho da Escola, explicitando normas operacionais, critérios de repasse financeiro e prestação de contas.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 120, line: 276 },
          children: [
            new TextRun({ text: 'Sexto momento: ', bold: true }),
            new TextRun({ text: 'desenvolvimento do Módulo 3, com foco em aspectos de planejamento territorial, contratação de serviços, controle de custos, segurança viária e marcos regulatórios essenciais para assegurar a regularidade e eficiência do transporte escolar.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 120, line: 276 },
          children: [
            new TextRun({ text: 'Sétimo momento: ', bold: true }),
            new TextRun({ text: 'execução do Módulo 4 de forma segmentada por público-alvo. Para os conselheiros do CACS/FUNDEB, detalharam-se os procedimentos fiscalizatórios, análise documental e utilização analítica do SETE para acompanhamento de rotas. Para os gestores municipais, realizou-se treinamento prático intensivo no Sistema SETE ("mãos na massa"), capacitando os servidores no cadastramento de alunos, escolas, veículos, motoristas e roteirização georreferenciada.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({ text: 'Oitavo momento: ', bold: true }),
            new TextRun({ text: 'aplicação do instrumento avaliativo da capacitação, coletando percepções técnicas e qualitativas dos participantes sobre metodologia, facilitadores, infraestrutura e conteúdos trabalhados.' })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'Durante o transcorrer dos módulos teóricos e práticos, foram incorporadas dinâmicas interativas mediante o uso de tecnologias educacionais e plataformas de aprendizagem baseada em jogos, com a finalidade de acompanhar o nível de assimilação dos conteúdos e potencializar o engajamento coletivo. Foram empregados os aplicativos Kahoot e Plickers: o Kahoot permitiu a participação em tempo real por meio dos smartphones dos cursistas em questionários dinâmicos; já o Plickers viabilizou a coleta imediata de respostas mediante a leitura óptica de cartões com QR Code (alternativas A, B, C e D) realizada exclusivamente pelo celular do instrutor, contornando eventuais oscilações de sinal de internet e garantindo dinamismo à atividade.'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: `A participação final dos entes federados registrou ${metrics?.totalPresentMunicipalities || 0} municípios presentes dos ${metrics?.totalInscribedMunicipalities || metrics?.totalSummonedMunicipalities || 0} formalmente inscritos (${metrics?.participationRateMunicipalities || 0}%). No que tange ao público participante, compareceram ${metrics?.totalPresent || 0} pessoas dentre as ${metrics?.totalInscribed || 0} inscritas, representando uma taxa de participação global de ${metrics?.participationRateGeneral || 0}%. No segmento do CACS-FUNDEB, registraram-se ${metrics?.presentCACS || 0} conselheiros (${metrics?.participationRateCACS || 0}%), ao passo que na Gestão Municipal participaram ${metrics?.presentGestores || 0} técnicos (${metrics?.participationRateGestores || 0}%). A distribuição da presença por município e segmento institucional é detalhada na Tabela 4 a seguir:`
            })
          ]
        }),
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: 'Tabela 4. Participação por município (Presentes / Inscritos).', bold: true, italics: true })]
        })
      );

      // Tabela 4
      const tab4Rows = [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Código IBGE', bold: true })] })] }),
            new TableCell({ width: { size: 35, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Município', bold: true })] })] }),
            new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'CACS (P/I)', bold: true })] })] }),
            new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Gestor (P/I)', bold: true })] })] }),
            new TableCell({ width: { size: 10, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Total', bold: true })] })] })
          ]
        })
      ];

      (training.municipalities || []).forEach(m => {
        tab4Rows.push(
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(m.ibgeCode || '-') })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${m.name} (${m.uf || 'MT'})`, bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${m.presentCACS || 0}/${m.inscribedCACS || 0}` })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${m.presentGestores || 0}/${m.inscribedGestores || 0}` })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${m.presentTotal || 0}/${m.inscribedTotal || 0}`, bold: true })] })] })
            ]
          })
        );
      });

      docChildren.push(
        new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: tab4Rows }),
        new Paragraph({
          spacing: { before: 60, after: 180 },
          children: [new TextRun({ text: 'Fonte: Elaborada pelos autores.', italics: true, size: 18, color: '64748B' })]
        })
      );

      // Figura 3: Gráfico de Participação
      const docxDeps = { Paragraph, ImageRun, TextRun, AlignmentType };
      if (chartsData.fig3) {
        const fig3Nodes = this.createImageParagraph(chartsData.fig3, 480, 240, 'Figura 3. Participação segundo o tipo de representação.', docxDeps);
        if (fig3Nodes) docChildren.push(...fig3Nodes);
      }

      // Parágrafo sobre certificados na plataforma PLATEIA
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 150, after: 200, line: 276 },
          children: [
            new TextRun({
              text: 'Ao término das atividades formativas, todos os certificados oficiais de capacitação (carga horária de 08 horas) foram devidamente emitidos e remetidos para o e-mail cadastrado de cada participante por intermédio da plataforma PLATEIA da Universidade Federal de Goiás (UFG), contando com código de verificação digital e QR Code para autenticação de veracidade.'
            })
          ]
        })
      );

      // 6. SEÇÃO 5: AVALIAÇÃO DA CAPACITAÇÃO & FIGURAS 4, 5, 6, 7 E 8
      const totalResp = metrics?.evalStatsGeneral?.totalResponses || 0;
      const evalsArr = training?.evaluations || [];
      let cacsRespCount = 0;
      if (evalsArr.length > 0) {
        cacsRespCount = evalsArr.filter(e => String(e.representation || '').toUpperCase().includes('CACS')).length;
      } else if (metrics?.totalPresent > 0) {
        cacsRespCount = metrics.presentCACS || 0;
      }
      const gestRespCount = totalResp > 0 ? (totalResp - cacsRespCount) : 0;
      const pctCacsResp = totalResp > 0 ? ((cacsRespCount / totalResp) * 100).toFixed(1).replace('.', ',') : '38,0';
      const pctGestResp = totalResp > 0 ? ((gestRespCount / totalResp) * 100).toFixed(1).replace('.', ',') : '62,0';
      const overallMean = metrics?.evalStatsGeneral?.overallMean ? parseFloat(metrics.evalStatsGeneral.overallMean).toFixed(1).replace('.', ',') : '4,7';

      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '5. AVALIAÇÃO DA CAPACITAÇÃO', bold: true, size: 28, color: '1E3A8A' })]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'Nesta edição do curso, aplicou-se o formulário padronizado de avaliação proposto pela equipe técnica do FNDE, que coleta percepções estruturadas dos cursistas. O instrumento é dividido em duas abordagens: primeiramente, uma escala psicométrica de Likert (pontuações de 1 a 5) para avaliar de maneira objetiva e quantitativa os aspectos didáticos, pedagógicos, operacionais e de infraestrutura do evento; em seguida, duas perguntas dissertativas qualitativas, nas quais os participantes detalham livremente os aspectos que mais gostaram e os pontos com oportunidade de melhoria com base na experiência vivenciada.'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: `A totalidade dos participantes presentes realizou a avaliação da capacitação, garantindo representatividade integral (${totalResp} questionários válidos). Em termos de distribuição institucional, ${pctCacsResp}% (${cacsRespCount}/${totalResp}) dos respondentes integraram os conselhos sociais CACS-FUNDEB e ${pctGestResp}% (${gestRespCount}/${totalResp}) pertenceram às equipes de Gestão Municipal.`
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: `Os resultados consolidados da avaliação do curso de capacitação são ilustrados nas Figuras 4, 5 e 6 a seguir. De modo geral, as qualificações de excelência (notas 4 e 5) abrangeram a expressiva maioria das respostas coletadas, alcançando média geral de ${overallMean} / 5,0. No entanto, apontamentos específicos situados fora da tendência hegemônica indicam oportunidades pontuais de aprimoramento em itens logísticos, tais como a antecedência na divulgação e adequação de horários:`
            })
          ]
        })
      );

      if (chartsData.fig4) {
        const fig4Nodes = this.createImageParagraph(chartsData.fig4, 520, 250, 'Figura 4. Avaliação da capacitação de todos os participantes.', docxDeps);
        if (fig4Nodes) docChildren.push(...fig4Nodes);
      }

      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 150, after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'Ao analisar os resultados segundo a instituição representada, constata-se a manutenção da tendência geral de elevada aprovação. Contudo, os conselheiros dos CACS-FUNDEB apresentaram proporções ainda mais expressivas de notas máximas (conceitos 4 e 5), não registrando pontuações em faixas inferiores, o que evidencia a grande pertinência dos conteúdos de controle social trabalhados:'
            })
          ]
        })
      );

      if (chartsData.fig5) {
        const fig5Nodes = this.createImageParagraph(chartsData.fig5, 520, 250, 'Figura 5. Avaliação da capacitação dos conselheiros CACS.', docxDeps);
        if (fig5Nodes) docChildren.push(...fig5Nodes);
      }

      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 150, after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'Por sua vez, os gestores municipais também manifestaram avaliações francamente positivas, com ampla predominância de respostas nas notas 4 e 5 na quase totalidade das dimensões avaliadas. Eventuais registros com conceitos inferiores concentraram-se essencialmente na duração e horário da formação, reforçando a demanda por períodos mais extensos para as oficinas práticas de preenchimento de rotas:'
            })
          ]
        })
      );

      if (chartsData.fig6) {
        const fig6Nodes = this.createImageParagraph(chartsData.fig6, 520, 250, 'Figura 6. Avaliação da capacitação dos gestores municipais.', docxDeps);
        if (fig6Nodes) docChildren.push(...fig6Nodes);
      }

      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 150, after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'De forma sucinta, as Figuras 7 e 8 sintetizam os resultados das perguntas dissertativas por meio de nuvens de palavras ponderadas pela frequência semântica dos termos. As respostas evidenciam percepção extremamente favorável quanto aos facilitadores e aos tópicos trabalhados, com destaque de grande relevância para os termos "Conteúdo", "Didática", "SETE", "Prática" e "Clareza", demonstrando a efetividade metodológica da formação. Em contrapartida, as sugestões de melhoria concentraram-se em demandas de infraestrutura e ritmo, sobressaindo menções a "Tempo", "Internet" e "Mais dias de curso", servindo como subsídios prioritários para as próximas rodadas do projeto. Todas as respostas qualitativas obtidas estão disponíveis integralmente no Apêndice III para consulta:'
            })
          ]
        })
      );

      if (chartsData.fig7) {
        const fig7Nodes = this.createImageParagraph(chartsData.fig7, 480, 260, 'Figura 7. Aspectos que gostaram da capacitação.', docxDeps);
        if (fig7Nodes) docChildren.push(...fig7Nodes);
      }
      if (chartsData.fig8) {
        const fig8Nodes = this.createImageParagraph(chartsData.fig8, 480, 260, 'Figura 8. Aspectos que devem melhorar da capacitação.', docxDeps);
        if (fig8Nodes) docChildren.push(...fig8Nodes);
      }

      // 7. SEÇÃO 6: REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO
      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '6. REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO', bold: true, size: 28, color: '1E3A8A' })]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'Durante a realização da capacitação, foram registrados diversos momentos por meio de fotografias que ilustram a participação ativa dos representantes municipais e dos conselheiros do CACS-FUNDEB. As imagens capturam desde a ambientação do local, momentos de acolhimento e fala dos facilitadores, até as interações e práticas colaborativas durante as atividades formativas. Esses registros visuais não apenas documentam o evento, como também reforçam o compromisso institucional dos envolvidos com o contínuo aprimoramento da política de transporte escolar nos municípios. As fotografias servem como evidência do engajamento coletivo, memória institucional e prestação de contas das ações desenvolvidas perante o FNDE:'
            })
          ]
        })
      );

      const photos = (training.media || []).filter(m => m.type === 'photo' && m.blob);
      if (photos.length === 0) {
        docChildren.push(
          new Paragraph({
            spacing: { after: 150 },
            children: [new TextRun({ text: 'Nenhum registro fotográfico anexado no momento.', italics: true, color: '64748B' })]
          })
        );
      } else {
        photos.forEach((ph, idx) => {
          const caption = ph.caption || `Figura ${idx + 9}. Registro fotográfico oficial da capacitação.`;
          const photoNodes = this.createImageParagraph(ph.blob, 500, 300, caption, docxDeps);
          if (photoNodes) docChildren.push(...photoNodes);
        });
      }

      // 8. SEÇÃO 7: CONSIDERAÇÕES FINAIS
      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '7. CONSIDERAÇÕES FINAIS', bold: true, size: 28, color: '1E3A8A' })]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: `O presente relatório consubstanciou a execução técnica, operacional e pedagógica do ${ordinalNum ? `${ordinalNum} ` : ''}curso de Capacitação em Transporte Escolar (Capacitação nº ${rawNum || '16'}), realizado no polo regional de ${training.polo || 'Município Polo'}, Estado de ${ufName}, cumprindo integralmente as metas e diretrizes estabelecidas no âmbito do projeto "${training.relatedProject || 'Fortalecendo e aprimorando as políticas públicas de transporte escolar do Brasil'}" (Processo nº 23070.068031/2023-34), financiado pelo Fundo Nacional de Desenvolvimento da Educação (FNDE).`
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'Salienta-se que, de forma geral, o curso atendeu plenamente ao objetivo primordial de aprimorar os conhecimentos e habilidades técnicas de gestores municipais e conselheiros do CACS-FUNDEB, conforme atestado nos elevados índices de satisfação apurados na pesquisa avaliativa. Por outro lado, pôde-se comprovar que reforçar a convocação mediante a articulação multicanal do CECATE Centro-Oeste — combinando correspondências oficiais, contatos telefônicos diretos e mensagens em canais institucionais — revelou-se determinante para assegurar expressivo comparecimento dos entes federados convocados.'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200, line: 276 },
          children: [
            new TextRun({
              text: 'Ficou igualmente evidente que a abordagem de diálogo permanente adotada consolida-se como canal imprescindível para atender às demandas de qualificação técnica continuada. Para finalizar, ressalta-se a suma importância de o processo formativo estar inserido em um ambiente que possibilite a livre e qualificada interação entre os cursistas e os formadores, proporcionando um rico espaço de compartilhamento de vivências territoriais, esclarecimento de dúvidas operacionais e retroalimentação contínua de todas as dimensões da política de transporte escolar no Brasil.'
            })
          ]
        })
      );

      // APÊNDICES I E II
      const fndeDocs = (training.media || []).filter(m => m.type === 'doc_fnde');
      const cecateDocs = (training.media || []).filter(m => m.type === 'doc_cecate');

      // APÊNDICE I: CONVOCAÇÕES DO FNDE
      docChildren.push(
        new Paragraph({
          spacing: { before: 500, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: 'APÊNDICE I – CONVOCAÇÕES DO FNDE', bold: true, size: 26, color: '1E3A8A' })]
        })
      );

      if (fndeDocs.length === 0) {
        docChildren.push(
          new Paragraph({
            spacing: { after: 200 },
            children: [new TextRun({ text: 'Nenhum documento de convocação do FNDE anexado.', italics: true, color: '64748B' })]
          })
        );
      } else {
        fndeDocs.forEach((d) => {
          const pages = (d.pageImages && d.pageImages.length > 0) ? d.pageImages : (d.blob?.startsWith('data:image/') ? [d.blob] : []);
          docChildren.push(
            new Paragraph({
              spacing: { before: 200, after: 100 },
              children: [
                new TextRun({ text: `Documento: ${d.fileName || d.caption || 'Ofício de Convocação FNDE'}`, bold: true, size: 22, color: '0F172A' })
              ]
            })
          );
          if (pages.length > 0) {
            pages.forEach((pgImg, pgIdx) => {
              const cap = pages.length > 1 ? `${d.fileName} - Página ${pgIdx + 1}` : d.fileName;
              const imgNodes = this.createImageParagraph(pgImg, 500, 700, cap, docxDeps);
              if (imgNodes) docChildren.push(...imgNodes);
            });
          } else {
            docChildren.push(
              new Paragraph({
                spacing: { after: 150 },
                children: [new TextRun({ text: `Arquivo anexado: ${d.fileName}`, italics: true, color: '475569' })]
              })
            );
          }
        });
      }

      // APÊNDICE II: CONVOCAÇÕES DO CECATE
      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: 'APÊNDICE II – CONVOCAÇÕES DO CECATE', bold: true, size: 26, color: '1E3A8A' })]
        })
      );

      if (cecateDocs.length === 0) {
        docChildren.push(
          new Paragraph({
            spacing: { after: 200 },
            children: [new TextRun({ text: 'Nenhuma convocação do CECATE anexada.', italics: true, color: '64748B' })]
          })
        );
      } else {
        cecateDocs.forEach((d) => {
          const pages = (d.pageImages && d.pageImages.length > 0) ? d.pageImages : (d.blob?.startsWith('data:image/') ? [d.blob] : []);
          docChildren.push(
            new Paragraph({
              spacing: { before: 200, after: 100 },
              children: [
                new TextRun({ text: `Documento: ${d.fileName || d.caption || 'Convocação CECATE-CO'}`, bold: true, size: 22, color: '0F172A' })
              ]
            })
          );
          if (pages.length > 0) {
            pages.forEach((pgImg, pgIdx) => {
              const cap = pages.length > 1 ? `${d.fileName} - Página ${pgIdx + 1}` : d.fileName;
              const imgNodes = this.createImageParagraph(pgImg, 500, 700, cap, docxDeps);
              if (imgNodes) docChildren.push(...imgNodes);
            });
          } else {
            docChildren.push(
              new Paragraph({
                spacing: { after: 150 },
                children: [new TextRun({ text: `Arquivo anexado: ${d.fileName}`, italics: true, color: '475569' })]
              })
            );
          }
        });
      }

      // APÊNDICE III: RESPOSTAS DISSERTATIVAS DA AVALIAÇÃO
      docChildren.push(
        new Paragraph({
          spacing: { before: 500, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: 'APÊNDICE III – RESPOSTAS DISSERTATIVAS DA AVALIAÇÃO', bold: true, size: 26, color: '1E3A8A' })]
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 150, line: 276 },
          children: [
            new TextRun({
              text: 'Apresenta-se a seguir a transcrição completa das respostas dissertativas registradas pelos participantes no formulário de avaliação da formação, detalhando os aspectos mais elogiados e as sugestões de aperfeiçoamento por município e categoria de representação institucional:'
            })
          ]
        })
      );

      const evalRespList = (training.evaluations || []).filter(e => 
        (e.likedAspects && String(e.likedAspects).trim()) || (e.improveAspects && String(e.improveAspects).trim())
      );

      if (evalRespList.length === 0) {
        docChildren.push(
          new Paragraph({
            spacing: { after: 200 },
            children: [new TextRun({ text: 'Nenhuma resposta dissertativa registrada no momento.', italics: true, color: '64748B' })]
          })
        );
      } else {
        const ap3Rows = [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Código IBGE', bold: true })] })] }),
              new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Município', bold: true })] })] }),
              new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Representação', bold: true })] })] }),
              new TableCell({ width: { size: 24, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Aspectos que mais gostou', bold: true })] })] }),
              new TableCell({ width: { size: 24, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Aspectos a serem melhorados', bold: true })] })] })
            ]
          })
        ];

        evalRespList.forEach(ev => {
          ap3Rows.push(
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(ev.ibgeCode || '-') })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(ev.municipality || '-') })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(ev.representation || 'Gestão municipal') })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(ev.likedAspects || '-') })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(ev.improveAspects || '-') })] })] })
              ]
            })
          );
        });

        docChildren.push(
          new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: ap3Rows }),
          new Paragraph({
            spacing: { before: 60, after: 180 },
            children: [new TextRun({ text: 'Fonte: Elaborada pelos autores.', italics: true, size: 18, color: '64748B' })]
          })
        );
      }

      // CABEÇALHO OFICIAL PADRÃO (Conforme modelo de referência de 02-Relatórios exemplos)
      // À esquerda: Logo CECATE. À direita: "RELATÓRIO DE ATIVIDADES Nº XX". Borda inferior sólida #4D4D4D.
      const headerTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 45, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE }
                },
                children: [
                  headerLogoBytes ? new Paragraph({
                    alignment: AlignmentType.LEFT,
                    spacing: { before: 0, after: 60 },
                    children: [
                      new ImageRun({
                        data: headerLogoBytes,
                        transformation: { width: 130, height: 27 }
                      })
                    ]
                  }) : new Paragraph({
                    alignment: AlignmentType.LEFT,
                    spacing: { before: 0, after: 60 },
                    children: [
                      new TextRun({
                        text: 'CECATE CENTRO-OESTE',
                        font: 'Times New Roman',
                        bold: true,
                        size: 20,
                        color: '4D4D4D'
                      })
                    ]
                  })
                ]
              }),
              new TableCell({
                width: { size: 55, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE }
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 0, after: 60 },
                    children: [
                      new TextRun({
                        text: `RELATÓRIO DE ATIVIDADES Nº ${coverInfo.numPadded}`,
                        font: 'Times New Roman',
                        size: 20,
                        color: '4D4D4D'
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });

      // RODAPÉ OFICIAL PADRÃO - SEÇÃO 3 (Página 3 - Equipe Participante, sem número de página)
      // Linha superior sólida #4D4D4D e faixa de 5 logomarcas institucionais ampliada
      const footerTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 100, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE }
                },
                margins: { top: 60, bottom: 40, left: 0, right: 0 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 40, after: 20 },
                    children: rodape5LogosBytes ? [
                      new ImageRun({
                        data: rodape5LogosBytes,
                        transformation: { width: 440, height: 27 }
                      })
                    ] : [
                      new TextRun({
                        text: 'CECATE Centro-Oeste • Engenharia de Transportes • FCT • UFG • FNDE',
                        font: 'Times New Roman',
                        size: 16,
                        color: '4D4D4D'
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });

      // RODAPÉ OFICIAL COM NÚMERO DE PÁGINA - SEÇÃO 4 (Página 4+ - Introdução em diante)
      // Conforme modelo de referência: 2 colunas, logomarcas à esquerda com separador vertical e número da página à direita
      const footerTableWithPageNum = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 95, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' }
                },
                margins: { top: 60, bottom: 40, left: 0, right: 80 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 40, after: 20 },
                    children: rodape5LogosBytes ? [
                      new ImageRun({
                        data: rodape5LogosBytes,
                        transformation: { width: 430, height: 26.5 }
                      })
                    ] : [
                      new TextRun({
                        text: 'CECATE Centro-Oeste • Engenharia de Transportes • FCT • UFG • FNDE',
                        font: 'Times New Roman',
                        size: 16,
                        color: '4D4D4D'
                      })
                    ]
                  })
                ]
              }),
              new TableCell({
                width: { size: 5, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE }
                },
                margins: { top: 60, bottom: 40, left: 60, right: 0 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 0, after: 0 },
                    children: [
                      new TextRun({
                        children: [PageNumber.CURRENT],
                        font: 'Times New Roman',
                        size: 20, // 10pt
                        color: '000000'
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });

      // 1.1 MONTAGEM DA CONTRA-CAPA OFICIAL (Seção 2 - Página 2 do Relatório)
      const contraCapaMonthYear = this.formatContraCapaMonthYear(training);

      const contraCapaTopTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 8, color: '595959' },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: noBorders,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 140, after: 40 },
                    children: [
                      new TextRun({
                        text: 'Projeto: ',
                        font: 'Times New Roman',
                        bold: false,
                        size: 26, // 13pt
                        color: '000000'
                      }),
                      new TextRun({
                        text: 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS',
                        font: 'Times New Roman',
                        bold: false,
                        size: 24, // 12pt
                        color: '000000'
                      }),
                      new TextRun({
                        text: 'DE TRANSPORTE ESCOLAR DO BRASIL',
                        font: 'Times New Roman',
                        bold: false,
                        size: 24, // 12pt
                        color: '000000',
                        break: 1
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });

      const contraCapaNumPara = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 8300, after: 120 },
        children: [
          new TextRun({
            text: `Relatório de Atividades Nº ${training.number != null ? String(training.number).trim() : '16'}`,
            font: 'Times New Roman',
            bold: false,
            size: 28, // 14pt
            color: '000000'
          })
        ]
      });

      const contraCapaTitlePara = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 120 },
        children: [
          new TextRun({
            text: 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
            font: 'Times New Roman',
            bold: true,
            size: 36, // 18pt
            color: '000000'
          })
        ]
      });

      const contraCapaInfoPara = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 0 },
        children: [
          new TextRun({
            text: coverInfo.infoLine,
            font: 'Times New Roman',
            bold: true,
            size: 28, // 14pt
            color: '000000'
          })
        ]
      });

      const contraCapaCityPara = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 2900, after: 60 },
        children: [
          new TextRun({
            text: 'Aparecida de Goiânia',
            font: 'Times New Roman',
            bold: false,
            size: 24, // 12pt
            color: '000000'
          })
        ]
      });

      const contraCapaDatePara = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 850 },
        children: [
          new TextRun({
            text: contraCapaMonthYear,
            font: 'Times New Roman',
            bold: false,
            size: 24, // 12pt
            color: '000000'
          })
        ]
      });

      const contraCapaBottomTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 8, color: '595959' },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 38, type: WidthType.PERCENTAGE },
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 120, after: 20 },
                    children: cecateBytes ? [
                      new ImageRun({
                        data: cecateBytes,
                        transformation: { width: 175, height: 37 }
                      })
                    ] : []
                  })
                ]
              }),
              new TableCell({
                width: { size: 24, type: WidthType.PERCENTAGE },
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 120, after: 20 },
                    children: ufgBytes ? [
                      new ImageRun({
                        data: ufgBytes,
                        transformation: { width: 95, height: 37 }
                      })
                    ] : []
                  })
                ]
              }),
              new TableCell({
                width: { size: 38, type: WidthType.PERCENTAGE },
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 120, after: 20 },
                    children: fndeBytes ? [
                      new ImageRun({
                        data: fndeBytes,
                        transformation: { width: 165, height: 37 }
                      })
                    ] : []
                  })
                ]
              })
            ]
          })
        ]
      });

      // 1.2 MONTAGEM DA PÁGINA 3: EQUIPE PARTICIPANTE (Seção 3 Oficial)
      const equipeChildren = [];

      // Título superior centralizado em azul escuro (#1F4E79)
      equipeChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 360 },
          children: [
            new TextRun({
              text: `RELATÓRIO DE ATIVIDADES Nº ${training.number != null ? String(training.number).trim() : '16'}`,
              font: 'Times New Roman',
              bold: true,
              size: 36, // 18pt
              color: '1F4E79'
            })
          ]
        })
      );

      // Título EQUIPE PARTICIPANTE
      equipeChildren.push(
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { before: 480, after: 120 },
          children: [
            new TextRun({
              text: 'EQUIPE PARTICIPANTE',
              font: 'Times New Roman',
              bold: true,
              size: 28, // 14pt
              color: '000000'
            })
          ]
        })
      );

      // Obter lista da equipe
      const teamList = (training.team && training.team.length > 0)
        ? training.team
        : (window.getMasterTeam ? window.getMasterTeam() : (window.DEFAULT_OFFICIAL_TEAM || []));

      // Separar UFG e FNDE
      const ufgMembers = teamList.filter(m => (m.institutionGroup === 'UFG' || m.institution === 'UFG' || m.type === 'coordenacao' || m.type === 'tecnica' || !m.institution || m.institution !== 'FNDE'));
      const fndeMembers = teamList.filter(m => (m.institutionGroup === 'FNDE' || m.institution === 'FNDE' || m.type === 'fnde'));

      // 1. Bloco UFG
      if (ufgMembers.length > 0) {
        equipeChildren.push(
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 120, after: 120 },
            indent: { left: 708 },
            children: [
              new TextRun({
                text: 'UNIVERSIDADE FEDERAL DE GOIÁS – UFG',
                font: 'Times New Roman',
                bold: true,
                size: 24, // 12pt
                color: '000000'
              })
            ]
          })
        );

        const ufgCoords = ufgMembers.filter(m => (m.role && m.role.toLowerCase().includes('coordenador')) || m.type === 'coordenacao');
        const ufgTech = ufgMembers.filter(m => !ufgCoords.includes(m));

        if (ufgCoords.length > 0) {
          equipeChildren.push(
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { before: 120, after: 0 },
              indent: { left: 1416 },
              children: [
                new TextRun({
                  text: 'Coordenador do Projeto',
                  font: 'Times New Roman',
                  bold: true,
                  size: 24, // 12pt
                  color: '000000'
                })
              ]
            })
          );
          ufgCoords.forEach(m => {
            const name = (window.formatTeamMemberFullName ? window.formatTeamMemberFullName(m) : m.fullName) || m.name || '';
            equipeChildren.push(
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { before: 0, after: 160 },
                indent: { left: 1416 },
                children: [
                  new TextRun({
                    text: name,
                    font: 'Times New Roman',
                    bold: false,
                    size: 24, // 12pt
                    color: '000000'
                  })
                ]
              })
            );
          });
        }

        if (ufgTech.length > 0) {
          equipeChildren.push(
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { before: 120, after: 0 },
              indent: { left: 1416 },
              children: [
                new TextRun({
                  text: 'Equipe de Técnica',
                  font: 'Times New Roman',
                  bold: true,
                  size: 24, // 12pt
                  color: '000000'
                })
              ]
            })
          );
          ufgTech.forEach(m => {
            const name = (window.formatTeamMemberFullName ? window.formatTeamMemberFullName(m) : m.fullName) || m.name || '';
            equipeChildren.push(
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { before: 0, after: 160 },
                indent: { left: 1416 },
                children: [
                  new TextRun({
                    text: name,
                    font: 'Times New Roman',
                    bold: false,
                    size: 24, // 12pt
                    color: '000000'
                  })
                ]
              })
            );
          });
        }
      }

      // 2. Bloco FNDE
      if (fndeMembers.length > 0) {
        equipeChildren.push(
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 240, after: 240 },
            indent: { left: 708 },
            children: [
              new TextRun({
                text: 'FUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO – FNDE',
                font: 'Times New Roman',
                bold: true,
                size: 24, // 12pt
                color: '000000'
              })
            ]
          })
        );

        const fndeRoles = [];
        const fndeByRole = new Map();
        fndeMembers.forEach(m => {
          const r = m.role || 'Representante Técnico FNDE';
          if (!fndeByRole.has(r)) {
            fndeByRole.set(r, []);
            fndeRoles.push(r);
          }
          fndeByRole.get(r).push(m);
        });

        fndeRoles.forEach(r => {
          equipeChildren.push(
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { before: 120, after: 0 },
              indent: { left: 1416 },
              children: [
                new TextRun({
                  text: r,
                  font: 'Times New Roman',
                  bold: true,
                  size: 24, // 12pt
                  color: '000000'
                })
              ]
            })
          );
          fndeByRole.get(r).forEach(m => {
            const name = (window.formatTeamMemberFullName ? window.formatTeamMemberFullName(m) : m.fullName) || m.name || '';
            equipeChildren.push(
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { before: 0, after: 160 },
                indent: { left: 1416 },
                children: [
                  new TextRun({
                    text: name,
                    font: 'Times New Roman',
                    bold: false,
                    size: 24, // 12pt
                    color: '000000'
                  })
                ]
              })
            );
          });
        });
      }

      // 1.3 MONTAGEM DA PÁGINA 4: ÍNDICE DE FIGURAS E ÍNDICE DE TABELAS (Seção 4 Oficial)
      // Constrói dinamicamente os tópicos, tabelas e figuras do presente relatório e suas páginas
      const { sumarioList, tablesList, figuresList } = this.buildReportIndices(training, metrics, chartsData);

      const indicesChildren = [];
      indicesChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 180 },
          children: [
            new TextRun({
              text: 'ÍNDICE DE FIGURAS',
              font: 'Times New Roman',
              bold: true,
              size: 32, // 16pt
              color: '1F4E79'
            })
          ]
        })
      );

      figuresList.forEach(fig => {
        const textRuns = [];
        if (fig.italicWord) {
          textRuns.push(new TextRun({ text: fig.label, font: 'Times New Roman', size: 24, color: '000000' }));
          textRuns.push(new TextRun({ text: fig.italicWord, font: 'Times New Roman', italics: true, size: 24, color: '000000' }));
          if (fig.afterWord) {
            textRuns.push(new TextRun({ text: fig.afterWord, font: 'Times New Roman', size: 24, color: '000000' }));
          }
        } else {
          textRuns.push(new TextRun({ text: fig.label, font: 'Times New Roman', size: 24, color: '000000' }));
        }
        textRuns.push(new TextRun({ text: '\t' + fig.page, font: 'Times New Roman', size: 24, color: '000000' }));

        indicesChildren.push(
          new Paragraph({
            spacing: { before: 0, after: 40 },
            tabStops: [{ type: 'right', position: 9628 }],
            children: textRuns
          })
        );
      });

      indicesChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 240, after: 180 },
          children: [
            new TextRun({
              text: 'ÍNDICE DE TABELAS',
              font: 'Times New Roman',
              bold: true,
              size: 32, // 16pt
              color: '1F4E79'
            })
          ]
        })
      );

      tablesList.forEach(tab => {
        indicesChildren.push(
          new Paragraph({
            spacing: { before: 0, after: 40 },
            tabStops: [{ type: 'right', position: 9628 }],
            children: [
              new TextRun({ text: tab.label, font: 'Times New Roman', size: 24, color: '000000' }),
              new TextRun({ text: '\t' + tab.page, font: 'Times New Roman', size: 24, color: '000000' })
            ]
          })
        );
      });

      // 1.4 MONTAGEM DA PÁGINA 5: SUMÁRIO
      const sumarioChildren = [];
      sumarioChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 240 },
          children: [
            new TextRun({
              text: 'SUMÁRIO',
              font: 'Times New Roman',
              bold: true,
              size: 32, // 16pt
              color: '1F4E79'
            })
          ]
        })
      );

      sumarioList.forEach(item => {
        sumarioChildren.push(
          new Paragraph({
            spacing: { before: 0, after: 100 },
            tabStops: [{ type: 'right', position: 9628 }],
            children: [
              new TextRun({ text: item.label, font: 'Times New Roman', size: 24, color: '000000' }),
              new TextRun({ text: '\t' + item.page, font: 'Times New Roman', size: 24, color: '000000' })
            ]
          })
        );
      });

      // CRIAR DOCUMENTO DOCX COM CINCO SEÇÕES OFICIAIS:
      // SEÇÃO 1: CAPA OFICIAL (PÁG 1)
      // SEÇÃO 2: CONTRA-CAPA (PÁG 2)
      // SEÇÃO 3: EQUIPE PARTICIPANTE (PÁG 3)
      // SEÇÃO 4: ÍNDICE DE FIGURAS, ÍNDICE DE TABELAS E SUMÁRIO (PÁGS 4 E 5)
      // SEÇÃO 5: CONTEÚDO TÉCNICO COM CABEÇALHO E RODAPÉ INSTITUCIONAIS (PÁG 6+)
      const doc = new Document({
        features: {
          updateFields: true
        },
        sections: [
          // SEÇÃO 1: CAPA OFICIAL INTEGRAL
          {
            properties: {
              page: {
                size: { width: PAGE_WIDTH_DXA, height: PAGE_HEIGHT_DXA },
                margin: { top: 0, right: 0, bottom: 0, left: 0, header: 0, footer: 0 }
              }
            },
            children: [coverTable, coverTrailingPara]
          },
          // SEÇÃO 2: CONTRA-CAPA OFICIAL (PÁGINA 2)
          {
            properties: {
              page: {
                size: { width: PAGE_WIDTH_DXA, height: PAGE_HEIGHT_DXA },
                margin: { top: 567, right: 1418, bottom: 400, left: 1418, header: 0, footer: 0 }
              }
            },
            children: [
              contraCapaTopTable,
              contraCapaNumPara,
              contraCapaTitlePara,
              contraCapaInfoPara,
              contraCapaCityPara,
              contraCapaDatePara,
              contraCapaBottomTable
            ]
          },
          // SEÇÃO 3: EQUIPE PARTICIPANTE (PÁGINA 3)
          {
            properties: {
              page: {
                size: { width: PAGE_WIDTH_DXA, height: PAGE_HEIGHT_DXA },
                margin: { top: 1702, right: 1134, bottom: 1701, left: 1134, header: 0, footer: 328 }
              }
            },
            headers: {
              default: new Header({
                children: []
              })
            },
            footers: {
              default: new Footer({
                children: [footerTable]
              })
            },
            children: equipeChildren
          },
          // SEÇÃO 4: ÍNDICE DE FIGURAS, ÍNDICE DE TABELAS E SUMÁRIO (PÁGINAS 4 E 5)
          {
            properties: {
              page: {
                size: { width: PAGE_WIDTH_DXA, height: PAGE_HEIGHT_DXA },
                margin: { top: 1702, right: 1134, bottom: 1701, left: 1134, header: 851, footer: 328 }
              }
            },
            headers: {
              default: new Header({
                children: [headerTable]
              })
            },
            footers: {
              default: new Footer({
                children: [footerTable]
              })
            },
            children: [
              ...indicesChildren,
              new Paragraph({ children: [new PageBreak()] }),
              ...sumarioChildren
            ]
          },
          // SEÇÃO 5: CONTEÚDO TÉCNICO COM CABEÇALHO E RODAPÉ INSTITUCIONAIS (PÁGINA 6+)
          {
            properties: {
              page: {
                size: { width: PAGE_WIDTH_DXA, height: PAGE_HEIGHT_DXA },
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440, header: 720, footer: 720 },
                pageNumbers: {
                  start: 1
                }
              }
            },
            headers: {
              default: new Header({
                children: [headerTable]
              })
            },
            footers: {
              default: new Footer({
                children: [footerTableWithPageNum]
              })
            },
            children: docChildren
          }
        ]
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${coverInfo.numPadded}CTE_Relatório_V01.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('Download do .docx gerado com sucesso!');
    } catch (err) {
      console.error('Erro ao gerar documento Word:', err);
      alert(`Erro na geração docx: ${err.message}`);
    }
  }

  downloadHtmlReportFallback(training, metrics, chartsData = {}) {
    const coverInfo = this.formatCoverTrainingInfo(training);
    const { sumarioList, tablesList, figuresList } = this.buildReportIndices(training, metrics, chartsData);
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>${coverInfo.numText} - ${coverInfo.polo}</title>
        <style>
          body { font-family: 'Times New Roman', serif; line-height: 1.6; margin: 0; padding: 0; }
          .cover-page {
            background-color: #4D4D4D;
            color: #FFFFFF;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            page-break-after: always;
            padding: 0;
            box-sizing: border-box;
            text-align: center;
          }
          .cover-stripe {
            background-color: #E9C95C;
            color: #000000;
            padding: 1.5rem 1rem;
            text-align: center;
          }
          .cover-logos {
            background-color: #E8ECEF;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .contra-capa-page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            page-break-after: always;
            padding: 2.5cm;
            box-sizing: border-box;
            text-align: center;
          }
          .content-page {
            padding: 2.5cm;
            max-width: 800px;
            margin: auto;
          }
          table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 11pt; }
          th, td { border: 1px solid #333; padding: 6px 10px; }
          th { background: #f1f5f9; }
        </style>
      </head>
      <body>
        <!-- PÁGINA 1: CAPA OFICIAL INTEGRAL -->
        <div class="cover-page">
          <div style="padding-top: 3.5rem; text-align: center;">
            <img src="visualrelatorio/capa/figuradacapa.png" style="max-width: 500px; width: 90%; border-radius: 4px;" alt="Ilustração">
            <h2 style="color: #E9C95C; font-size: 14pt; margin-top: 2rem; font-weight: bold;">${coverInfo.numText}</h2>
          </div>
          <div class="cover-stripe">
            <h1 style="margin: 0; font-size: 18pt; font-weight: bold; color: #000000;">CAPACITAÇÃO EM TRANSPORTE ESCOLAR</h1>
            <p style="margin: 0.5rem 0 0; font-size: 12pt; font-weight: bold; color: #000000;">${coverInfo.infoLine}</p>
          </div>
          <div style="padding: 2.5rem 1.5rem; text-align: center;">
            <p style="color: #FFFFFF; font-size: 12pt; font-weight: bold; margin: 0; line-height: 1.5;">Projeto: FORTALECENDO E APRIMORANDO AS POLÍTICAS<br>PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL</p>
          </div>
          <div class="cover-logos">
            <img src="visualrelatorio/capa/cecatefigura.svg" style="height: 48px;" alt="CECATE Centro-Oeste">
            <img src="visualrelatorio/capa/ufgfigura.svg" style="height: 48px;" alt="UFG">
            <img src="visualrelatorio/capa/fndefigura.svg" style="height: 48px;" alt="FNDE">
          </div>
        </div>

        <!-- PÁGINA 2: CONTRA-CAPA OFICIAL -->
        <div class="contra-capa-page">
          <div style="border-top: 1.5px solid #595959; padding-top: 0.8rem;">
            <p style="font-size: 11pt; margin: 0; text-transform: uppercase;">Projeto: FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS<br>DE TRANSPORTE ESCOLAR DO BRASIL</p>
          </div>
          <div style="margin: auto 0;">
            <p style="font-size: 14pt; margin: 0 0 0.8rem 0;">Relatório de Atividades Nº ${training.number || '16'}</p>
            <h2 style="font-size: 18pt; font-weight: bold; margin: 0 0 0.8rem 0; color: #000000;">CAPACITAÇÃO EM TRANSPORTE ESCOLAR</h2>
            <p style="font-size: 14pt; font-weight: bold; margin: 0;">${coverInfo.infoLine}</p>
          </div>
          <div>
            <p style="font-size: 12pt; margin: 0 0 0.4rem 0;">Aparecida de Goiânia</p>
            <p style="font-size: 12pt; margin: 0 0 2rem 0;">${this.formatContraCapaMonthYear(training)}</p>
            <div style="border-top: 1.5px solid #595959; padding-top: 1rem; display: flex; justify-content: space-around; align-items: center;">
              <img src="visualrelatorio/capa/cecatefigura.svg" style="height: 38px;" alt="CECATE">
              <img src="visualrelatorio/capa/ufgfigura.svg" style="height: 38px;" alt="UFG">
              <img src="visualrelatorio/capa/fndefigura.svg" style="height: 38px;" alt="FNDE">
            </div>
          </div>
        </div>

        <!-- PÁGINA 3: EQUIPE PARTICIPANTE OFICIAL -->
        <div class="equipe-page" style="min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always; padding: 2.5cm; box-sizing: border-box;">
          <div>
            <h2 style="text-align: center; color: #1F4E79; font-size: 18pt; font-weight: bold; margin-bottom: 2rem;">RELATÓRIO DE ATIVIDADES Nº ${training.number || '16'}</h2>
            <h3 style="font-size: 14pt; font-weight: bold; color: #000000; margin-bottom: 1.5rem;">EQUIPE PARTICIPANTE</h3>
            <div style="margin-left: 1.25cm; margin-bottom: 1.5rem;">
              <h4 style="font-size: 12pt; font-weight: bold; margin-bottom: 0.5rem;">UNIVERSIDADE FEDERAL DE GOIÁS – UFG</h4>
              <div style="margin-left: 1.25cm;">
                <p style="font-weight: bold; margin: 0.5rem 0 0 0;">Coordenador do Projeto</p>
                <p style="margin: 0 0 0.5rem 0;">Prof. Dr. Willer Luciano Carvalho</p>
                <p style="font-weight: bold; margin: 0.5rem 0 0 0;">Equipe de Técnica</p>
                <p style="margin: 0 0 0.4rem 0;">Eng. M.Sc. Lara Batista Ferreira de Lima</p>
                <p style="margin: 0 0 0.4rem 0;">Eng. M.Sc. Matheus Henrique Morato de Moraes</p>
                <p style="margin: 0 0 0.4rem 0;">Prof. Dr. Liosber Medina Garcia</p>
                <p style="margin: 0 0 0.4rem 0;">Prof. Dr. Marcos Paulino Roriz Junior</p>
                <p style="margin: 0 0 0.4rem 0;">Prof. Dr. Robinson Andrés Giraldo Zuluaga</p>
                <p style="margin: 0 0 0.4rem 0;">Prof. Dr. Ronny Marcelo Aliaga Medrano</p>
                <p style="margin: 0 0 0.4rem 0;">Pesquisadora Visitante Dra. Yaeko Yamashita</p>
                <p style="margin: 0 0 0.5rem 0;">Pesquisador Visitante José Maria Rodrigues de Souza</p>
              </div>
            </div>
            <div style="margin-left: 1.25cm;">
              <h4 style="font-size: 12pt; font-weight: bold; margin-bottom: 0.5rem;">FUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO – FNDE</h4>
              <div style="margin-left: 1.25cm;">
                <p style="font-weight: bold; margin: 0.5rem 0 0 0;">Coordenador-Geral da Política do Transporte Escolar - CGPTE</p>
                <p style="margin: 0 0 0.5rem 0;">Haroldo da Silva Gomes</p>
                <p style="font-weight: bold; margin: 0.5rem 0 0 0;">Coordenadora de Monitoramento, Avaliação e Apoio à Gestão do Transporte Escolar - CMATE</p>
                <p style="margin: 0 0 0.5rem 0;">Daniela Oshiro Yanaze</p>
                <p style="font-weight: bold; margin: 0.5rem 0 0 0;">Coordenadora de Apoio ao Transporte Escolar – COATE</p>
                <p style="margin: 0 0 0.5rem 0;">Neuza Helena Portugal dos Santos</p>
                <p style="font-weight: bold; margin: 0.5rem 0 0 0;">Coordenadora de Apoio ao Caminho da Escola – COACE</p>
                <p style="margin: 0 0 0.5rem 0;">Maria Angelica Floriano Pedrosa</p>
              </div>
            </div>
          </div>
          <div style="border-top: 1.5px solid #4D4D4D; padding-top: 0.8rem; text-align: center;">
            <img src="visualrelatorio/capa/cecatefigura.svg" style="height: 24px; margin: 0 10px;" alt="CECATE">
            <img src="visualrelatorio/capa/ufgfigura.svg" style="height: 24px; margin: 0 10px;" alt="UFG">
            <img src="visualrelatorio/capa/fndefigura.svg" style="height: 24px; margin: 0 10px;" alt="FNDE">
          </div>
        </div>

        <!-- PÁGINA 4: ÍNDICE DE FIGURAS E ÍNDICE DE TABELAS -->
        <div class="indices-page" style="min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always; padding: 2.5cm; box-sizing: border-box;">
          <div>
            <h2 style="text-align: center; color: #1F4E79; font-size: 16pt; font-weight: bold; margin-bottom: 1.2rem;">ÍNDICE DE FIGURAS</h2>
            <div style="font-size: 12pt; line-height: 1.8;">
              ${figuresList.map(fig => `<div style="display: flex; justify-content: space-between;"><span>${fig.label}</span><span>${fig.page}</span></div>`).join('')}
            </div>
            <h2 style="text-align: center; color: #1F4E79; font-size: 16pt; font-weight: bold; margin-top: 1.5rem; margin-bottom: 1.2rem;">ÍNDICE DE TABELAS</h2>
            <div style="font-size: 12pt; line-height: 1.8;">
              ${tablesList.map(tab => `<div style="display: flex; justify-content: space-between;"><span>${tab.label}</span><span>${tab.page}</span></div>`).join('')}
            </div>
          </div>
          <div style="border-top: 1.5px solid #4D4D4D; padding-top: 0.8rem; text-align: center;">
            <img src="visualrelatorio/capa/cecatefigura.svg" style="height: 24px; margin: 0 10px;" alt="CECATE">
            <img src="visualrelatorio/capa/ufgfigura.svg" style="height: 24px; margin: 0 10px;" alt="UFG">
            <img src="visualrelatorio/capa/fndefigura.svg" style="height: 24px; margin: 0 10px;" alt="FNDE">
          </div>
        </div>

        <!-- PÁGINA 5: SUMÁRIO -->
        <div class="sumario-page" style="min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always; padding: 2.5cm; box-sizing: border-box;">
          <div>
            <h2 style="text-align: center; color: #1F4E79; font-size: 16pt; font-weight: bold; margin-bottom: 1.5rem;">SUMÁRIO</h2>
            <div style="font-size: 12pt; line-height: 2;">
              ${sumarioList.map(item => `<div style="display: flex; justify-content: space-between;"><span>${item.label}</span><span>${item.page}</span></div>`).join('')}
            </div>
          </div>
          <div style="border-top: 1.5px solid #4D4D4D; padding-top: 0.8rem; text-align: center;">
            <img src="visualrelatorio/capa/cecatefigura.svg" style="height: 24px; margin: 0 10px;" alt="CECATE">
            <img src="visualrelatorio/capa/ufgfigura.svg" style="height: 24px; margin: 0 10px;" alt="UFG">
            <img src="visualrelatorio/capa/fndefigura.svg" style="height: 24px; margin: 0 10px;" alt="FNDE">
          </div>
        </div>
        <div class="content-page">
          <h2>1. INTRODUÇÃO</h2>
          <p>Capacitação realizada em ${coverInfo.polo} com ${metrics?.totalPresent || 0} participantes presentes de ${metrics?.totalPresentMunicipalities || 0} municípios atendidos.</p>
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${coverInfo.numPadded}CTE_Relatório.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

window.reportDocxGenerator = new ReportDocxGenerator();
