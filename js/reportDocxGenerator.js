/**
 * AutoReport CECATE - Gerador de Relatório em Formato Word (.docx)
 * Versão: v.3.0.0
 */

class ReportDocxGenerator {
  constructor() {
    this.docxLib = window.docx || null;
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
          spacing: { after: 180 },
          children: [
            new TextRun({ text: captionText, bold: true, italics: true, size: 20, color: '334155' })
          ]
        })
      );
    }
    return nodes;
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
      VerticalAlign: DocxVerticalAlign
    } = window.docx || {};

    const VerticalAlign = DocxVerticalAlign || window.docx?.VerticalAlign || {
      BOTTOM: 'bottom',
      CENTER: 'center',
      TOP: 'top'
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

      // 1. MONTAGEM DA CAPA OFICIAL (Seção 1)
      const topChildren = [];
      if (figBytes) {
        topChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 550, after: 300 },
            children: [
              new ImageRun({
                data: figBytes,
                transformation: { width: 520, height: 292 }
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
          spacing: { before: 150, after: 300 },
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
          spacing: { before: 140, after: 60 },
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
          spacing: { before: 60, after: 140 },
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
          spacing: { before: 600, after: 600 },
          children: [
            new TextRun({
              text: 'Projeto:  FORTALECENDO E APRIMORANDO AS POLÍTICAS\n            PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL',
              font: 'Times New Roman',
              bold: true,
              size: 32, // 16pt
              color: 'D9D9D9'
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
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 40, after: 40 },
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
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 40, after: 40 },
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
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 40, after: 40 },
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
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
          new TableRow({ children: logoCells.length > 0 ? logoCells : [new TableCell({ children: [new Paragraph({})] })] })
        ]
      });

      const coverTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
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
                shading: { fill: '4D4D4D' },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                children: topChildren
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: 'E9C95C' },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                children: stripeChildren
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: '4D4D4D' },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                children: projectChildren
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: 'D8D8D8' },
                borders: { top: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 80, after: 60 },
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
          })
        ]
      });

      // Início do corpo do relatório na Seção 2
      docChildren.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: 'EQUIPE PARTICIPANTE', bold: true, size: 28, color: '1E3A8A' })]
        })
      );

      // 2. TABELA DE EQUIPE
      const team = training.team || [];
      const teamRows = [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Nome do Integrante', bold: true })] })] }),
            new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Instituição', bold: true })] })] }),
            new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Função / Cargo', bold: true })] })] })
          ]
        })
      ];

      team.forEach(tm => {
        const displayName = (window.formatTeamMemberFullName ? window.formatTeamMemberFullName(tm) : tm.fullName) || tm.name || '';
        teamRows.push(
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: displayName, bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: tm.institution || 'UFG' })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: tm.role || 'Equipe Técnica' })] })] })
            ]
          })
        );
      });

      docChildren.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: teamRows
        })
      );

      // 3. SEÇÃO 1: INTRODUÇÃO
      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '1. INTRODUÇÃO', bold: true, size: 28, color: '1E3A8A' })]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: `O presente Relatório de Atividades consubstancia os resultados alcançados durante a realização da Capacitação em Transporte Escolar nº ${training.number || ''}, executada no município polo de ${training.polo || 'Município Polo'}, Estado de ${training.uf || 'GO'}, nas datas de ${training.datesFormatted || 'datas do curso'}. A iniciativa integra as ações estratégicas pactuadas no projeto "${training.relatedProject || 'Fortalecendo e Aprimorando as Políticas Públicas de Transporte Escolar do Brasil'}", desenvolvido pela Universidade Federal de Goiás (UFG) por meio do CECATE Centro-Oeste, com financiamento do Fundo Nacional de Desenvolvimento da Educação (FNDE).`
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
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: `Foram formalmente convocados ${metrics?.totalSummonedMunicipalities || 0} municípios para participarem das atividades formativas no polo de ${training.polo}. A distância média percorrida pelas delegações municipais foi estimada em ${metrics?.avgDistance || 0} km. A relação completa dos entes federativos convocados é detalhada na Tabela 1 a seguir:`
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

      docChildren.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: munRows }));

      // Tabela 2 - Estrutura do Curso
      docChildren.push(
        new Paragraph({
          spacing: { before: 300, after: 100 },
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

      docChildren.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: modRows }));

      // 4. SEÇÃO 3: ARTICULAÇÃO INSTITUCIONAL & TABELA 3
      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '3. ARTICULAÇÃO INSTITUCIONAL', bold: true, size: 28, color: '1E3A8A' })]
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: 'Para assegurar a ampla participação dos municípios convocados, a equipe do CECATE-CO realizou ações contínuas de articulação e contato direto com as secretarias municipais de educação e conselhos sociais, conforme discriminado na Tabela 3:'
            })
          ]
        }),
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: 'Tabela 3. Articulação institucional para mobilização dos municípios.', bold: true, italics: true })]
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
      docChildren.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: tab3Rows }));

      // 5. SEÇÃO 4: DESENVOLVIMENTO DO CURSO & TABELA 4 & FIGURA 3
      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '4. DESENVOLVIMENTO DO CURSO E PARTICIPAÇÃO', bold: true, size: 28, color: '1E3A8A' })]
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: `O processo formativo registrou um total de ${metrics?.totalInscribed || 0} inscritos e ${metrics?.totalPresent || 0} participantes efetivamente presentes, resultando em uma taxa de participação global de ${metrics?.participationRateGeneral || 0}%. A discriminação detalhada do comparecimento entre representantes da Gestão Municipal e Conselheiros CACS-FUNDEB por município é apresentada na Tabela 4:`
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

      docChildren.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: tab4Rows }));

      // Figura 3: Gráfico de Participação
      const docxDeps = { Paragraph, ImageRun, TextRun, AlignmentType };
      if (chartsData.fig3) {
        const fig3Nodes = this.createImageParagraph(chartsData.fig3, 480, 240, 'Figura 3. Participação de Gestores e Conselheiros CACS.', docxDeps);
        if (fig3Nodes) docChildren.push(...fig3Nodes);
      }

      // 6. SEÇÃO 5: AVALIAÇÃO DA CAPACITAÇÃO & FIGURAS 4, 5, 6, 7 E 8
      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '5. AVALIAÇÃO DA CAPACITAÇÃO', bold: true, size: 28, color: '1E3A8A' })]
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: `A pesquisa avaliativa registrou ${metrics?.evalStatsGeneral?.totalResponses || 0} questionários preenchidos. A média global de satisfação atribuída pelos participantes foi de ${metrics?.evalStatsGeneral?.overallMean || 4.7}/5.0, evidenciando excelência na metodologia, conteúdo pedagógico e infraestrutura proporcionada pelo CECATE Centro-Oeste.`
            })
          ]
        })
      );

      if (chartsData.fig4) {
        const fig4Nodes = this.createImageParagraph(chartsData.fig4, 520, 250, 'Figura 4. Avaliação da capacitação de todos os participantes.', docxDeps);
        if (fig4Nodes) docChildren.push(...fig4Nodes);
      }
      if (chartsData.fig5) {
        const fig5Nodes = this.createImageParagraph(chartsData.fig5, 520, 250, 'Figura 5. Avaliação da capacitação dos conselheiros CACS.', docxDeps);
        if (fig5Nodes) docChildren.push(...fig5Nodes);
      }
      if (chartsData.fig6) {
        const fig6Nodes = this.createImageParagraph(chartsData.fig6, 520, 250, 'Figura 6. Avaliação da capacitação dos gestores municipais.', docxDeps);
        if (fig6Nodes) docChildren.push(...fig6Nodes);
      }
      if (chartsData.fig7) {
        const fig7Nodes = this.createImageParagraph(chartsData.fig7, 480, 260, 'Figura 7. Aspectos positivos destacados.', docxDeps);
        if (fig7Nodes) docChildren.push(...fig7Nodes);
      }
      if (chartsData.fig8) {
        const fig8Nodes = this.createImageParagraph(chartsData.fig8, 480, 260, 'Figura 8. Aspectos a serem aprimorados.', docxDeps);
        if (fig8Nodes) docChildren.push(...fig8Nodes);
      }

      // 7. SEÇÃO 6: REGISTROS FOTOGRÁFICOS
      docChildren.push(
        new Paragraph({
          spacing: { before: 400, after: 200 },
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: '6. REGISTROS FOTOGRÁFICOS', bold: true, size: 28, color: '1E3A8A' })]
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: 'A seguir são apresentados os registros fotográficos oficiais realizados durante os momentos de acolhimento, exposição temática e encerramento da capacitação:'
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
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: `A realização da Capacitação nº ${training.number || ''} no polo de ${training.polo || 'Município Polo'} cumpriu integralmente os objetivos institucionais fixados pelo CECATE-CO e pelo FNDE. O estreitamento do diálogo técnico entre a gestão municipal e o controle social do CACS-FUNDEB fortalece as diretrizes de governança, segurança e eficiência no transporte escolar dos estudantes da Educação Básica.`
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
          children: [new TextRun({ text: 'APÊNDICE I: CONVOCAÇÕES DO FNDE', bold: true, size: 26, color: '1E3A8A' })]
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
          children: [new TextRun({ text: 'APÊNDICE II: CONVOCAÇÕES DO CECATE', bold: true, size: 26, color: '1E3A8A' })]
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

      // RODAPÉ OFICIAL PADRÃO (Conforme modelo de referência de 02-Relatórios exemplos)
      // Linha superior sólida #4D4D4D e faixa de 5 logomarcas institucionais
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
                  top: { style: BorderStyle.SINGLE, size: 8, color: '4D4D4D' },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE }
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 80, after: 40 },
                    children: rodape5LogosBytes ? [
                      new ImageRun({
                        data: rodape5LogosBytes,
                        transformation: { width: 480, height: 24 }
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

      // CRIAR DOCUMENTO DOCX COM DUAS SEÇÕES: CAPA OFICIAL E CONTEÚDO TÉCNICO
      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: { top: 0, right: 0, bottom: 0, left: 0 }
              }
            },
            children: [coverTable]
          },
          {
            properties: {
              page: {
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
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

  downloadHtmlReportFallback(training, metrics) {
    const coverInfo = this.formatCoverTrainingInfo(training);
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
