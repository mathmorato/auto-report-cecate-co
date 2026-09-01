/**
 * AutoReport CECATE - Gerador de Relatório Oficial em Word (.docx)
 * Versão: v.1.8.9
 */

class ReportDocxGenerator {
  constructor() {
    this.docxLib = window.docx || null;
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
      PageNumber
    } = window.docx || {};

    if (!Document) {
      console.warn('Biblioteca docx.js não carregada, disparando fallback HTML...');
      this.downloadHtmlReportFallback(training, metrics);
      return;
    }

    try {
      const docChildren = [];

      // 1. CAPA DO RELATÓRIO
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 200 },
          children: [
            new TextRun({
              text: 'UNIVERSIDADE FEDERAL DE GOIÁS - UFG',
              bold: true,
              size: 26,
              color: '1E3A8A'
            }),
            new TextRun({
              text: '\nCENTRO COLABORADOR DE APOIO AO TRANSPORTE ESCOLAR - CECATE CENTRO-OESTE',
              bold: true,
              size: 22,
              color: '0284C7'
            }),
            new TextRun({
              text: '\nFUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO - FNDE',
              bold: true,
              size: 20,
              color: '475569'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 800, after: 400 },
          children: [
            new TextRun({
              text: `RELATÓRIO DE ATIVIDADES Nº ${training.number || 16}`,
              bold: true,
              size: 36,
              color: '0F172A'
            }),
            new TextRun({
              text: `\n${training.title || 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR'}`,
              bold: true,
              size: 28,
              color: '2563EB'
            }),
            new TextRun({
              text: `\n${training.polo || 'Polo Regional'}, ${training.uf || 'MT'}, ${training.datesFormatted || '2026'}`,
              bold: true,
              size: 24,
              color: '334155'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600, after: 800 },
          children: [
            new TextRun({
              text: `Projeto: ${training.relatedProject || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL'}`,
              italics: true,
              size: 20,
              color: '64748B'
            }),
            new TextRun({
              text: `\nProcesso Administrativo: ${training.processNumber || '23070.012345/2026-00'}`,
              size: 18,
              color: '64748B'
            })
          ]
        }),
        new Paragraph({
          pageBreakBefore: true,
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
            new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Módulo', bold: true })] })] }),
            new TableCell({ width: { size: 35, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Temática Gestor', bold: true })] })] }),
            new TableCell({ width: { size: 35, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Temática CACS', bold: true })] })] }),
            new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Carga Horária', bold: true })] })] })
          ]
        })
      ];

      (training.courseModules || []).forEach(mod => {
        modRows.push(
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: mod.moduleNumber || '01', bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: mod.topicGestor || '-' })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: mod.topicCACS || '-' })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${parseFloat(mod.hoursGestor || 0).toFixed(1)} h` })] })] })
            ]
          })
        );
      });

      docChildren.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: modRows }));

      // 5. SEÇÃO 4: DESENVOLVIMENTO DO CURSO & TABELA 4
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

      // 6. SEÇÃO 5: AVALIAÇÃO DA CAPACITAÇÃO
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

      // 7. SEÇÃO 7: CONSIDERAÇÕES FINAIS
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

      // CRIAR DOCUMENTO DOCX
      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
              }
            },
            headers: {
              default: new Header({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [new TextRun({ text: 'CECATE Centro-Oeste • UFG / FNDE', size: 16, color: '94A3B8' })]
                  })
                ]
              })
            },
            footers: {
              default: new Footer({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({ text: 'Página ' }),
                      new TextRun({ children: [PageNumber.CURRENT] }),
                      new TextRun({ text: ' de ' }),
                      new TextRun({ children: [PageNumber.TOTAL_PAGES] })
                    ]
                  })
                ]
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
      a.download = `${training.number || 16}CTE_Relatório_V01.docx`;
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
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Relatório de Capacitação Nº ${training.number}</title>
        <style>
          body { font-family: 'Times New Roman', serif; line-height: 1.6; padding: 2cm; max-width: 800px; margin: auto; }
          h1, h2 { text-align: center; color: #1e3a8a; }
          table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 11pt; }
          th, td { border: 1px solid #333; padding: 6px 10px; }
          th { background: #f1f5f9; }
        </style>
      </head>
      <body>
        <h1>UNIVERSIDADE FEDERAL DE GOIÁS - UFG</h1>
        <h2>CECATE Centro-Oeste • FNDE</h2>
        <h3 style="text-align:center;">RELATÓRIO DE ATIVIDADES Nº ${training.number}</h3>
        <p><strong>Polo:</strong> ${training.polo} (${training.uf})</p>
        <p><strong>Data:</strong> ${training.datesFormatted}</p>
        <hr/>
        <h3>1. INTRODUÇÃO</h3>
        <p>Capacitação realizada em ${training.polo} com ${metrics?.totalPresent || 0} participantes presentes de ${metrics?.totalPresentMunicipalities || 0} municípios atendidos.</p>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${training.number || 16}CTE_Relatório.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

window.reportDocxGenerator = new ReportDocxGenerator();
