/**
 * AutoReport CECATE - Gerador de Relatório Oficial Word (.docx)
 * Versão: v.3.0.0
 * 
 * Geração oficial direta via docx.js:
 * - Capa (Folha de Rosto branca oficial) e Contracapa (capa escura ilustrada) oficiais
 * - Folha de Equipe Participante integrada com Coordenação e Equipe Técnica
 * - Cabeçalho e Rodapé institucionais oficiais com logomarcas vetoriais e paginação dinâmica
 * - Elementos pré-textuais: Lista de Figuras, Lista de Tabelas e Sumário
 * - 1. Introdução contextualizada
 * - 2. Dados Básicos do Curso (Tabela 1 e Tabela 2)
 * - 3. Contato com os Municípios (narrativa institucional)
 * - 4. Desenvolvimento do Curso (Tabela 3, Figuras 1 e 2, Tabela 4)
 * - 5. Avaliação da Capacitação (Figuras 3 a 8)
 * - 6. Registros Fotográficos da Capacitação (Figuras 9 a 13)
 * - 7. Considerações Finais institucionais
 * - Apêndices I, II e III
 */

class ReportDocxGenerator {
  constructor() {
    this.docxLib = window.docx || null;
  }

  base64ToArrayBuffer(dataUrlOrB64) {
    if (!dataUrlOrB64) return null;
    try {
      const base64 = dataUrlOrB64.includes(',') ? dataUrlOrB64.split(',')[1] : dataUrlOrB64;
      const cleanB64 = base64.replace(/\s/g, '');
      const binaryString = atob(cleanB64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    } catch (e) {
      console.warn('Erro ao converter base64 para ArrayBuffer:', e);
      return null;
    }
  }

  base64ToUint8Array(dataUrlOrB64) {
    if (!dataUrlOrB64) return null;
    try {
      const base64 = dataUrlOrB64.includes(',') ? dataUrlOrB64.split(',')[1] : dataUrlOrB64;
      const cleanB64 = base64.replace(/\s/g, '');
      const binaryString = atob(cleanB64);
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
   * Obtém as dimensões naturais (largura e altura) de uma imagem a partir
   * de um buffer Uint8Array inspecionando os cabeçalhos binários oficiais.
   * Retorna { width, height } em pixels, de forma instantânea e síncrona.
   */
  getImageDimensionsFromBytes(bytes) {
    if (!bytes || bytes.length < 24) return null;
    try {
      // 1. PNG: Assinatura 137, 80, 78, 71 (IHDR chunk at bytes 16..23)
      if (bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71) {
        const width = ((bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19]) >>> 0;
        const height = ((bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23]) >>> 0;
        if (width > 0 && height > 0) return { width, height };
      }

      // 2. JPEG: Assinatura 0xFF, 0xD8
      if (bytes[0] === 0xFF && bytes[1] === 0xD8) {
        let offset = 2;
        while (offset < bytes.length - 8) {
          if (bytes[offset] !== 0xFF) {
            offset++;
            continue;
          }
          const marker = bytes[offset + 1];
          // Marcadores SOF0 a SOF15 (exceto DHT e DAC)
          if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) ||
              (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
            const height = ((bytes[offset + 5] << 8) | bytes[offset + 6]) >>> 0;
            const width = ((bytes[offset + 7] << 8) | bytes[offset + 8]) >>> 0;
            if (width > 0 && height > 0) return { width, height };
            break;
          } else {
            const segLen = ((bytes[offset + 2] << 8) | bytes[offset + 3]) >>> 0;
            offset += 2 + segLen;
          }
        }
      }

      // 3. GIF: 'GIF87a' ou 'GIF89a'
      if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
        const width = (bytes[6] | (bytes[7] << 8)) >>> 0;
        const height = (bytes[8] | (bytes[9] << 8)) >>> 0;
        if (width > 0 && height > 0) return { width, height };
      }

      // 4. WebP: 'RIFF' .... 'WEBP'
      if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
          bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
        if (bytes[12] === 0x56 && bytes[13] === 0x50 && bytes[14] === 0x38 && bytes[15] === 0x20) {
          const width = ((bytes[26] | (bytes[27] << 8)) & 0x3fff) >>> 0;
          const height = ((bytes[28] | (bytes[29] << 8)) & 0x3fff) >>> 0;
          if (width > 0 && height > 0) return { width, height };
        }
        if (bytes[12] === 0x56 && bytes[13] === 0x50 && bytes[14] === 0x38 && bytes[15] === 0x4C) {
          const b1 = bytes[21], b2 = bytes[22], b3 = bytes[23], b4 = bytes[24];
          const width = (1 + (((b2 & 0x3f) << 8) | b1)) >>> 0;
          const height = (1 + (((b4 & 0xf) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6))) >>> 0;
          if (width > 0 && height > 0) return { width, height };
        }
        if (bytes[12] === 0x56 && bytes[13] === 0x50 && bytes[14] === 0x38 && bytes[15] === 0x58) {
          const width = (1 + (bytes[24] | (bytes[25] << 8) | (bytes[26] << 16))) >>> 0;
          const height = (1 + (bytes[27] | (bytes[28] << 8) | (bytes[29] << 16))) >>> 0;
          if (width > 0 && height > 0) return { width, height };
        }
      }
    } catch (e) {
      console.warn('Erro ao decodificar dimensões dos bytes da imagem:', e);
    }
    return null;
  }

  /**
   * Obtém as dimensões naturais (largura e altura) de uma imagem a partir
   * de um data URL ou string Base64 via elemento Image em fallback.
   */
  getImageNaturalSize(dataUrlOrB64) {
    return new Promise((resolve) => {
      if (!dataUrlOrB64) return resolve(null);
      try {
        let mime = 'image/png';
        const clean = dataUrlOrB64.includes(',') ? dataUrlOrB64.split(',')[1] : dataUrlOrB64;
        if (clean.startsWith('/9j/')) mime = 'image/jpeg';
        else if (clean.startsWith('UklGR')) mime = 'image/webp';
        else if (clean.startsWith('R0lGOD')) mime = 'image/gif';

        const src = dataUrlOrB64.startsWith('data:')
          ? dataUrlOrB64
          : `data:${mime};base64,${clean}`;

        const img = new Image();
        let done = false;
        const timer = setTimeout(() => {
          if (!done) {
            done = true;
            resolve(null);
          }
        }, 1200);

        img.onload = () => {
          if (!done) {
            done = true;
            clearTimeout(timer);
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
          }
        };
        img.onerror = () => {
          if (!done) {
            done = true;
            clearTimeout(timer);
            resolve(null);
          }
        };
        img.src = src;
        if (img.complete && img.naturalWidth > 0) {
          done = true;
          clearTimeout(timer);
          resolve({ width: img.naturalWidth, height: img.naturalHeight });
        }
      } catch (e) {
        resolve(null);
      }
    });
  }

  /**
   * Calcula dimensões que preservam o aspect ratio original da imagem dentro de limites
   * máximos (maxW x maxH). Espelha perfeitamente o comportamento 'object-fit: contain' do PDF.
   */
  fitToAspectRatio(naturalW, naturalH, maxW, maxH) {
    if (!naturalW || !naturalH) return { width: maxW, height: maxH };
    const ar = naturalW / naturalH;
    let w = maxW;
    let h = Math.round(maxW / ar);
    if (h > maxH) {
      h = maxH;
      w = Math.round(maxH * ar);
    }
    return { width: Math.max(1, w), height: Math.max(1, h) };
  }

  /**
   * Cria um ImageRun preservando o aspect ratio original da imagem.
   * maxW e maxH definem o espaço máximo em pixels.
   */
  async createImageRunWithAR(dataUrlOrB64, bytes, maxW, maxH, ImageRun) {
    let natural = this.getImageDimensionsFromBytes(bytes);
    if (!natural) {
      natural = await this.getImageNaturalSize(dataUrlOrB64);
    }
    const dims = natural
      ? this.fitToAspectRatio(natural.width, natural.height, maxW, maxH)
      : { width: maxW, height: maxH };
    return new ImageRun({
      data: bytes,
      transformation: { width: dims.width, height: dims.height }
    });
  }

  /**
   * Cria parágrafos de imagem preservando o aspect ratio original.
   * maxW e maxH definem os limites máximos de exibição (em pixels).
   */
  async createImageParagraph(dataUrlOrB64, maxW, maxH, captionText, sourceText, docxDeps) {
    const bytes = this.base64ToUint8Array(dataUrlOrB64);
    if (!bytes) return [];

    const { Paragraph, ImageRun, TextRun, AlignmentType } = docxDeps;

    const imageRun = await this.createImageRunWithAR(dataUrlOrB64, bytes, maxW, maxH, ImageRun);

    const nodes = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 180, after: 80 },
        children: [imageRun]
      })
    ];

    if (captionText) {
      nodes.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 40, after: 40 },
          children: [
            new TextRun({
              text: captionText,
              font: 'Gill Sans MT',
              bold: true,
              italics: true,
              size: 20,
              color: '1E293B'
            })
          ]
        })
      );
    }

    if (sourceText) {
      nodes.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 20, after: 180 },
          children: [
            new TextRun({
              text: sourceText,
              font: 'Gill Sans MT',
              italics: true,
              size: 18,
              color: '64748B'
            })
          ]
        })
      );
    }

    return nodes;
  }

  createTableCaption(captionText, docxDeps) {
    const { Paragraph, TextRun } = docxDeps;
    return new Paragraph({
      spacing: { before: 260, after: 80 },
      children: [
        new TextRun({
          text: captionText,
          font: 'Gill Sans MT',
          bold: true,
          italics: true,
          size: 20,
          color: '1E293B'
        })
      ]
    });
  }

  createSourceNote(sourceText = 'Fonte: Elaborada pelos autores.', docxDeps) {
    const { Paragraph, TextRun } = docxDeps;
    return new Paragraph({
      spacing: { before: 40, after: 180 },
      children: [
        new TextRun({
          text: sourceText,
          font: 'Gill Sans MT',
          italics: true,
          size: 18,
          color: '64748B'
        })
      ]
    });
  }

  createSectionHeading(text, docxDeps, pageBreak = false) {
    const { Paragraph, TextRun, HeadingLevel } = docxDeps;
    return new Paragraph({
      pageBreakBefore: pageBreak,
      spacing: { before: 360, after: 140 },
      heading: HeadingLevel.HEADING_1,
      children: [
        new TextRun({
          text,
          font: 'Gill Sans MT',
          bold: true,
          size: 24,
          color: '1E3A8A'
        })
      ]
    });
  }

  createBodyParagraph(text, docxDeps, boldPrefix = '') {
    const { Paragraph, TextRun, AlignmentType } = docxDeps;
    const children = [];
    if (boldPrefix) {
      children.push(new TextRun({ text: boldPrefix, font: 'Gill Sans MT', bold: true, size: 21, color: '1E293B' }));
    }
    children.push(new TextRun({ text, font: 'Gill Sans MT', size: 21, color: '1E293B' }));

    return new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: 60, after: 120, line: 276 },
      children
    });
  }

  /**
   * Tabela 1: Municípios Convocados (Duas colunas emparelhadas)
   */
  createTable1Municipios(municipalities, docxDeps) {
    const { Table, TableRow, TableCell, Paragraph, TextRun, WidthType, AlignmentType, BorderStyle, ShadingType } = docxDeps;

    const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' };
    const borders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder, insideHorizontal: cellBorder, insideVertical: cellBorder };
    const headerShading = { fill: 'F1F5F9', type: ShadingType.CLEAR };

    // Ordenar: sede primeiro, depois alfabética
    const sorted = [...municipalities].sort((a, b) => {
      if (a.isSede && !b.isSede) return -1;
      if (!a.isSede && b.isSede) return 1;
      return (a.name || '').localeCompare(b.name || '');
    });

    const half = Math.ceil(sorted.length / 2);
    const col1 = sorted.slice(0, half);
    const col2 = sorted.slice(half);

    const rows = [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Código IBGE', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nome do Município', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 10, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Distância (km)', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Código IBGE', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nome do Município', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 10, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Distância (km)', font: 'Gill Sans MT', bold: true, size: 19 })] })] })
        ]
      })
    ];

    for (let i = 0; i < half; i++) {
      const m1 = col1[i];
      const m2 = col2[i] || null;

      const formatDist = (m) => {
        if (!m) return '';
        if (m.isSede) return '0';
        const num = parseFloat(m.distanceKm || 0);
        return num.toFixed(0);
      };

      rows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: m1 ? String(m1.ibgeCode || '-') : '', font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m1 ? (m1.isSede ? `${m1.name} (Sede)` : m1.name) : '', font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatDist(m1), font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: m2 ? String(m2.ibgeCode || '-') : '', font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m2 ? (m2.isSede ? `${m2.name} (Sede)` : m2.name) : '', font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatDist(m2), font: 'Gill Sans MT', size: 18 })] })] })
          ]
        })
      );
    }

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders,
      rows
    });
  }

  /**
   * Tabela 2: Estrutura do Curso (3 Colunas: Módulo | Temática | Carga horária)
   */
  createTable2Estrutura(courseModules, docxDeps) {
    const { Table, TableRow, TableCell, Paragraph, TextRun, WidthType, AlignmentType, BorderStyle, ShadingType } = docxDeps;

    const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' };
    const borders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder, insideHorizontal: cellBorder, insideVertical: cellBorder };
    const headerShading = { fill: 'F1F5F9', type: ShadingType.CLEAR };

    const rows = [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({ width: { size: 14, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Módulo', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 70, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Temática', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 16, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Carga horaria (horas)', font: 'Gill Sans MT', bold: true, size: 19 })] })] })
        ]
      })
    ];

    // Se módulos foram fornecidos e customizados
    const normMods = (courseModules && courseModules.length > 0) ? courseModules : [
      { num: '1', title: 'Transporte Escolar no Brasil - CECATE-CO', hours: '2' },
      { num: '2', title: 'Conhecendo os programas PNATE e Caminho da Escola', hours: '2' },
      { num: '3', title: 'Planejamento e Regulação do Transporte Escolar', hours: '4' },
      { num: '4', title: 'Software Eletrônico de Gestão do Transporte Escolar - SETE (Gestores)\nCompetências do CACS-FUNDEB e Sistema SETE (Conselheiros)', hours: '8' }
    ];

    normMods.forEach(m => {
      const modNum = m.moduleNumber || m.num || '1';
      let modTitle = '';
      if (m.title) modTitle = m.title;
      else if (m.gestorTopics || m.cacsTopics) {
        const gt = (m.gestorTopics || []).map(t => t.topic || '').filter(Boolean).join(' / ');
        const ct = (m.cacsTopics || []).map(t => t.topic || '').filter(Boolean).join(' / ');
        modTitle = gt === ct ? gt : `${gt} (Gestor) | ${ct} (CACS)`;
      } else {
        modTitle = m.topic || 'Temática do Módulo';
      }

      const modHours = m.workload || m.hours || '4';

      rows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(modNum), font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: modTitle, font: 'Gill Sans MT', size: 19 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(modHours), font: 'Gill Sans MT', size: 19 })] })] })
          ]
        })
      );
    });

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders,
      rows
    });
  }

  /**
   * Tabela 3: Inscritos por Município (Duas colunas emparelhadas + Total)
   */
  createTable3Inscritos(municipalities, docxDeps) {
    const { Table, TableRow, TableCell, Paragraph, TextRun, WidthType, AlignmentType, BorderStyle, ShadingType } = docxDeps;

    const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' };
    const borders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder, insideHorizontal: cellBorder, insideVertical: cellBorder };
    const headerShading = { fill: 'F1F5F9', type: ShadingType.CLEAR };

    // Filtrar municípios que tiveram inscritos (ou todos ordenados)
    const valid = municipalities.filter(m => (parseInt(m.inscribedTotal) || (parseInt(m.inscribedCACS) || 0) + (parseInt(m.inscribedGestores) || 0)) > 0);
    const list = valid.length > 0 ? valid : municipalities;

    const sorted = [...list].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    const half = Math.ceil(sorted.length / 2);
    const col1 = sorted.slice(0, half);
    const col2 = sorted.slice(half);

    let totalInsc = 0;

    const rows = [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({ width: { size: 16, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Código IBGE', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 24, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nome do Município', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 10, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Número de Inscritos', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 16, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Código IBGE', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 24, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nome do Município', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 10, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Número de Inscritos', font: 'Gill Sans MT', bold: true, size: 19 })] })] })
        ]
      })
    ];

    for (let i = 0; i < half; i++) {
      const m1 = col1[i];
      const m2 = col2[i] || null;

      const n1 = m1 ? (parseInt(m1.inscribedTotal) || (parseInt(m1.inscribedCACS) || 0) + (parseInt(m1.inscribedGestores) || 0)) : 0;
      const n2 = m2 ? (parseInt(m2.inscribedTotal) || (parseInt(m2.inscribedCACS) || 0) + (parseInt(m2.inscribedGestores) || 0)) : 0;

      totalInsc += n1 + n2;

      rows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: m1 ? String(m1.ibgeCode || '-') : '', font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m1 ? m1.name : '', font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: m1 ? String(n1) : '', font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: m2 ? String(m2.ibgeCode || '-') : '', font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m2 ? m2.name : '', font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: m2 ? String(n2) : '', font: 'Gill Sans MT', size: 18 })] })] })
          ]
        })
      );
    }

    // Linha de total
    rows.push(
      new TableRow({
        children: [
          new TableCell({ columnSpan: 2, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Total Geral de Inscritos:', font: 'Gill Sans MT', bold: true, size: 18 })] })] }),
          new TableCell({ shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(totalInsc), font: 'Gill Sans MT', bold: true, size: 18 })] })] }),
          new TableCell({ columnSpan: 3, shading: headerShading, children: [new Paragraph({ children: [] })] })
        ]
      })
    );

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders,
      rows
    });
  }

  /**
   * Tabela 4: Participação por Município (Presentes / Inscritos por segmento)
   */
  createTable4Participacao(municipalities, docxDeps) {
    const { Table, TableRow, TableCell, Paragraph, TextRun, WidthType, AlignmentType, BorderStyle, ShadingType } = docxDeps;

    const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' };
    const borders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder, insideHorizontal: cellBorder, insideVertical: cellBorder };
    const headerShading = { fill: 'F1F5F9', type: ShadingType.CLEAR };

    const sorted = [...municipalities].sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    const rows = [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({ width: { size: 16, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Código IBGE', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 32, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nome do Município', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 13, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'CACS (P/I)', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 13, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Gestor (P/I)', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 13, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Total (P/I)', font: 'Gill Sans MT', bold: true, size: 19 })] })] }),
          new TableCell({ width: { size: 13, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '% Presença', font: 'Gill Sans MT', bold: true, size: 19 })] })] })
        ]
      })
    ];

    let totPresCACS = 0, totInscCACS = 0;
    let totPresGest = 0, totInscGest = 0;
    let totPres = 0, totInsc = 0;

    sorted.forEach(m => {
      const pC = parseInt(m.presentCACS) || 0;
      const iC = parseInt(m.inscribedCACS) || 0;
      const pG = parseInt(m.presentGestores) || 0;
      const iG = parseInt(m.inscribedGestores) || 0;
      const pTot = parseInt(m.presentTotal) || (pC + pG);
      const iTot = parseInt(m.inscribedTotal) || (iC + iG);

      totPresCACS += pC;
      totInscCACS += iC;
      totPresGest += pG;
      totInscGest += iG;
      totPres += pTot;
      totInsc += iTot;

      const rate = iTot > 0 ? ((pTot / iTot) * 100).toFixed(1) : (pTot > 0 ? '100,0' : '0,0');

      rows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(m.ibgeCode || '-'), font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m.name, font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${pC}/${iC}`, font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${pG}/${iG}`, font: 'Gill Sans MT', size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${pTot}/${iTot}`, font: 'Gill Sans MT', bold: true, size: 18 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${rate.replace('.', ',')}%`, font: 'Gill Sans MT', size: 18 })] })] })
          ]
        })
      );
    });

    // Total Geral
    const globalRate = totInsc > 0 ? ((totPres / totInsc) * 100).toFixed(1) : '100,0';
    rows.push(
      new TableRow({
        children: [
          new TableCell({ columnSpan: 2, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Totais Gerais:', font: 'Gill Sans MT', bold: true, size: 18 })] })] }),
          new TableCell({ shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${totPresCACS}/${totInscCACS}`, font: 'Gill Sans MT', bold: true, size: 18 })] })] }),
          new TableCell({ shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${totPresGest}/${totInscGest}`, font: 'Gill Sans MT', bold: true, size: 18 })] })] }),
          new TableCell({ shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${totPres}/${totInsc}`, font: 'Gill Sans MT', bold: true, size: 18 })] })] }),
          new TableCell({ shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${globalRate.replace('.', ',')}%`, font: 'Gill Sans MT', bold: true, size: 18 })] })] })
        ]
      })
    );

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders,
      rows
    });
  }

  /**
   * Tabela 8: Apêndice III - Respostas Dissertativas Qualitativas da Avaliação
   */
  createTable8ApendiceIII(evaluations, docxDeps) {
    const { Table, TableRow, TableCell, Paragraph, TextRun, WidthType, AlignmentType, BorderStyle, ShadingType } = docxDeps;

    const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' };
    const borders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder, insideHorizontal: cellBorder, insideVertical: cellBorder };
    const headerShading = { fill: 'F1F5F9', type: ShadingType.CLEAR };

    const rows = [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({ width: { size: 12, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Código IBGE', font: 'Gill Sans MT', bold: true, size: 18 })] })] }),
          new TableCell({ width: { size: 18, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Município que representa:', font: 'Gill Sans MT', bold: true, size: 18 })] })] }),
          new TableCell({ width: { size: 14, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Você faz parte do:', font: 'Gill Sans MT', bold: true, size: 18 })] })] }),
          new TableCell({ width: { size: 28, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Indique dois aspectos que você mais gostou na Formação:', font: 'Gill Sans MT', bold: true, size: 18 })] })] }),
          new TableCell({ width: { size: 28, type: WidthType.PERCENTAGE }, shading: headerShading, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Indique dois aspectos que poderiam ser melhorados na Formação (com detalhes);', font: 'Gill Sans MT', bold: true, size: 18 })] })] })
        ]
      })
    ];

    evaluations.forEach(ev => {
      const liked = ev.likedAspects || '-';
      const improve = ev.improveAspects || '-';

      rows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(ev.ibgeCode || '-'), font: 'Gill Sans MT', size: 17 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: ev.municipality || '-', font: 'Gill Sans MT', size: 17 })] })] }),
            new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ev.representation || 'Gestão municipal', font: 'Gill Sans MT', size: 17 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: liked, font: 'Gill Sans MT', size: 17 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: improve, font: 'Gill Sans MT', size: 17 })] })] })
          ]
        })
      );
    });

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders,
      rows
    });
  }

  /**
   * Construtor Principal do Documento
   */

  getStateFullName(uf) {
    const map = {
      'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas', 'BA': 'Bahia', 'CE': 'Ceará',
      'DF': 'Distrito Federal', 'ES': 'Espírito Santo', 'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso',
      'MS': 'Mato Grosso do Sul', 'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
      'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
      'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
      'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
    };
    if (!uf) return '';
    const clean = String(uf).trim().toUpperCase();
    return map[clean] || uf;
  }

  getCoverLocationAndDate(training) {
    const polo = training.polo || 'Município Polo';
    const state = this.getStateFullName(training.uf) || training.uf || '';
    const dates = training.datesFormatted || training.startDate || '2026';
    if (state) {
      return `${polo}, ${state}, ${dates}`;
    }
    return `${polo}, ${dates}`;
  }

  getCoverMonthYear(training) {
    const months = {
      'janeiro': '01', 'fevereiro': '02', 'março': '03', 'marco': '03', 'abril': '04',
      'maio': '05', 'junho': '06', 'julho': '07', 'agosto': '08', 'setembro': '09',
      'outubro': '10', 'novembro': '11', 'dezembro': '12'
    };
    const str = String(training.datesFormatted || training.startDate || '').toLowerCase();
    for (const [mName, mNum] of Object.entries(months)) {
      if (str.includes(mName)) {
        const yMatch = str.match(/\b(20\d\d)\b/);
        const y = yMatch ? yMatch[1] : (training.startDate ? training.startDate.slice(0, 4) : '2026');
        return `${mNum}/${y}`;
      }
    }
    if (training.startDate && training.startDate.includes('-')) {
      const parts = training.startDate.split('-');
      if (parts.length >= 2) return `${parts[1]}/${parts[0]}`;
    }
    const now = new Date();
    return `${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  }

  /**
   * Constrói o documento Word (.docx) completo e oficial:
   * - Seção 1: Contracapa Ilustrada e Capa Oficial (Folha de Rosto Branca)
   * - Seção 2: Equipe Participante, Lista de Figuras, Lista de Tabelas, Sumário,
   *            Seções 1 a 7 e Apêndices I a III, com Cabeçalho e Rodapé institucionais
   */
  async buildDocxDocument(training, metrics, chartsData = {}) {
    if (!training) return null;

    const {
      Document,
      Paragraph,
      TextRun,
      Table,
      TableRow,
      TableCell,
      WidthType,
      AlignmentType,
      HeadingLevel,
      BorderStyle,
      ShadingType,
      ImageRun,
      Header,
      Footer,
      PageNumber,
      TabStopType,
      TabStopPosition,
      LeaderType
    } = window.docx || {};

    if (!Document) {
      console.warn('Biblioteca docx.js não carregada');
      return null;
    }

    const docxDeps = {
      Paragraph,
      TextRun,
      Table,
      TableRow,
      TableCell,
      WidthType,
      AlignmentType,
      HeadingLevel,
      BorderStyle,
      ShadingType,
      ImageRun,
      Header,
      Footer,
      PageNumber,
      TabStopType,
      TabStopPosition,
      LeaderType
    };

    const assets = window.REPORT_ASSETS || {};
    const locationAndDate = this.getCoverLocationAndDate(training);
    const coverMonthYear = this.getCoverMonthYear(training);

    const noBorder = { style: BorderStyle.NONE, size: 0, color: 'auto' };
    const grayLineBorder = { style: BorderStyle.SINGLE, size: 6, color: '94A3B8' };

    // =========================================================================
    // 1. SEÇÃO 1: CONTRACAPA E CAPA OFICIAL (SEM CABEÇALHOS/RODAPÉS NORMAIS)
    // =========================================================================
    const coverChildren = [];

    // --- PÁGINA 1: CONTRACAPA (CAPA ILUSTRADA OFICIAL) ---
    if (assets.contracapaCover) {
      const coverBytes = this.base64ToUint8Array(assets.contracapaCover);
      if (coverBytes) {
        const coverRun = await this.createImageRunWithAR(assets.contracapaCover, coverBytes, 430, 270, ImageRun);
        coverChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 80, after: 60 },
            children: [coverRun]
          })
        );
      }
    }

    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 80, after: 60 },
        children: [
          new TextRun({
            text: `RELATÓRIO DE ATIVIDADES Nº ${training.number || 16}`,
            font: 'Gill Sans MT',
            bold: true,
            size: 22,
            color: 'D97706'
          })
        ]
      }),
      // Faixa Dourada / Amarela com Título e Localização
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: 'E5B83B', type: ShadingType.CLEAR },
                borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 120, after: 40 },
                    children: [
                      new TextRun({
                        text: 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
                        font: 'Gill Sans MT',
                        bold: true,
                        size: 28,
                        color: '000000'
                      })
                    ]
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 0, after: 100 },
                    children: [
                      new TextRun({
                        text: locationAndDate,
                        font: 'Gill Sans MT',
                        bold: true,
                        size: 20,
                        color: '1E293B'
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }),
      // Subtítulo do Projeto
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { before: 140, after: 180 },
        children: [
          new TextRun({
            text: 'Projeto:  FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL',
            font: 'Gill Sans MT',
            bold: true,
            italics: true,
            size: 18,
            color: '475569'
          })
        ]
      })
    );

    // Rodapé da Contracapa (Logos em faixa cinza clara)
    if (assets.coverFooterLogos) {
      const covFootBytes = this.base64ToUint8Array(assets.coverFooterLogos);
      if (covFootBytes) {
        const footRun = await this.createImageRunWithAR(assets.coverFooterLogos, covFootBytes, 440, 60, ImageRun);
        coverChildren.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'E2E8F0', type: ShadingType.CLEAR },
                    borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 60, after: 60 },
                        children: [footRun]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        );
      }
    }

    // --- PÁGINA 2: CAPA OFICIAL (FOLHA DE ROSTO BRANCA) ---
    coverChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: { top: grayLineBorder, bottom: noBorder, left: noBorder, right: noBorder },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
                children: [
                  new Paragraph({
                    pageBreakBefore: true,
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 80, after: 0 },
                    children: [
                      new TextRun({
                        text: 'Projeto: FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL',
                        font: 'Gill Sans MT',
                        bold: true,
                        size: 19,
                        color: '334155'
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 2400, after: 80 },
        children: [
          new TextRun({
            text: `Relatório de Atividades Nº ${training.number || 16}`,
            font: 'Gill Sans MT',
            size: 22,
            color: '334155'
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [
          new TextRun({
            text: 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
            font: 'Gill Sans MT',
            bold: true,
            size: 28,
            color: '000000'
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 0 },
        children: [
          new TextRun({
            text: locationAndDate,
            font: 'Gill Sans MT',
            bold: true,
            size: 20,
            color: '1E293B'
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 2400, after: 40 },
        children: [
          new TextRun({
            text: 'Aparecida de Goiânia',
            font: 'Gill Sans MT',
            size: 20,
            color: '334155'
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 120 },
        children: [
          new TextRun({
            text: coverMonthYear,
            font: 'Gill Sans MT',
            size: 20,
            color: '334155'
          })
        ]
      })
    );

    if (assets.coverFooterLogos) {
      const covFootBytes = this.base64ToUint8Array(assets.coverFooterLogos);
      if (covFootBytes) {
        const footRun = await this.createImageRunWithAR(assets.coverFooterLogos, covFootBytes, 440, 60, ImageRun);
        coverChildren.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: { top: grayLineBorder, bottom: noBorder, left: noBorder, right: noBorder },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 80, after: 0 },
                        children: [footRun]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        );
      }
    }

    // =========================================================================
    // 2. SEÇÃO 2: CONTEÚDO PRINCIPAL (EQUIPE, LISTAS, SUMÁRIO, SEÇÕES 1-7, APÊNDICES)
    // =========================================================================
    const contentChildren = [];

    // --- FOLHA DE EQUIPE PARTICIPANTE ---
    const formatMember = (m) => {
      if (!m) return '';
      if (typeof window.formatTeamMemberFullName === 'function') {
        const res = window.formatTeamMemberFullName(m);
        if (res) return res;
      }
      const parts = [];
      if (m.pronoun && m.pronoun !== 'NENHUM' && m.pronoun !== '__unselected__') parts.push(m.pronoun.trim());
      if (m.title && m.title !== 'NENHUM' && m.title !== '__unselected__') parts.push(m.title.trim());
      if (m.name) parts.push(m.name.trim());
      return parts.join(' ') || m.fullName || m.name || '';
    };

    const teamList = training.team || window.DEFAULT_OFFICIAL_TEAM || [];
    const coordMember = teamList.find(m => m.type === 'coordenacao' || m.role === 'Coordenador Geral' || (m.role && m.role.toLowerCase().includes('coorden')) || m.name.includes('Willer'));
    const coordName = coordMember ? formatMember(coordMember) : 'Prof. Dr. Willer Luciano Carvalho';

    const ufgTechMembers = teamList.filter(m => (m.institutionGroup === 'UFG' || m.institution === 'UFG') && m.type !== 'coordenacao');
    const ufgTechNames = ufgTechMembers.length > 0
      ? ufgTechMembers.map(m => formatMember(m)).join('\n')
      : 'Eng. M.Sc. Lara Batista Ferreira de Lima\nEng. M.Sc. Matheus Henrique Morato de Moraes\nProf. Dr. Marcos Paulino Roriz Junior\nProf. Dr. Liosber Medina Garcia';

    const fndeMembers = teamList.filter(m => m.institutionGroup === 'FNDE' || m.institution === 'FNDE');
    const fndeNames = fndeMembers.length > 0
      ? fndeMembers.map(m => formatMember(m)).join('\n')
      : 'Haroldo da Silva Gomes';

    contentChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 150 },
        children: [
          new TextRun({ text: `RELATÓRIO DE ATIVIDADES Nº ${training.number || 16}`, font: 'Gill Sans MT', bold: true, size: 26, color: '1E3A8A' }),
          new TextRun({ text: '\nEQUIPE PARTICIPANTE', font: 'Gill Sans MT', bold: true, size: 22, color: '0F172A' })
        ]
      }),
      new Paragraph({
        spacing: { before: 300, after: 100 },
        children: [
          new TextRun({ text: 'UNIVERSIDADE FEDERAL DE GOIÁS - UFG', font: 'Gill Sans MT', bold: true, size: 22, color: '1E3A8A' })
        ]
      }),
      this.createBodyParagraph(coordName, docxDeps, 'Coordenação Geral: '),
      this.createBodyParagraph(ufgTechNames, docxDeps, 'Equipe Técnica: '),
      new Paragraph({
        spacing: { before: 300, after: 100 },
        children: [
          new TextRun({ text: 'FUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO - FNDE', font: 'Gill Sans MT', bold: true, size: 22, color: '1E3A8A' })
        ]
      }),
      this.createBodyParagraph(fndeNames, docxDeps, 'Coordenação-Geral da Política do Transporte Escolar - CGPTE: ')
    );

    // --- PÁGINAS PRÉ-TEXTUAIS: LISTA DE FIGURAS, LISTA DE TABELAS, SUMÁRIO ---
    contentChildren.push(
      new Paragraph({
        pageBreakBefore: true,
        spacing: { before: 200, after: 160 },
        children: [new TextRun({ text: 'Lista de Figuras', font: 'Gill Sans MT', bold: true, size: 24, color: '1E3A8A' })]
      })
    );

    const is16Hours = (training.workloadNum === 16 || String(training.workload || '').includes('16'));

    const figuresList = [
      'Figura 1: Avaliação via ferramenta kahoot.',
      'Figura 2: Avaliação via ferramenta Plickers.',
      'Figura 3. Participação segundo o tipo de representação.',
      'Figura 4. Avaliação da capacitação de todos os participantes.',
      'Figura 5. Avaliação da capacitação dos conselheiros CACS.',
      'Figura 6. Avaliação da capacitação dos gestores municipais.',
      'Figura 7. Aspectos que gostaram da capacitação.',
      'Figura 8. Aspectos que devem melhorar da capacitação',
      'Figura 9. Acomodação dos participantes.',
      'Figura 10. Apresentação inicial do curso',
      'Figura 11. Apresentação dos módulos teóricos.',
      is16Hours ? 'Figura 12. Apresentação do primeiro dia.' : 'Figura 12. Apresentação do Software SETE.',
      is16Hours ? 'Figura 13. Final da capacitação do segundo dia.' : 'Figura 13. Final da capacitação.'
    ];

    figuresList.forEach(fig => {
      contentChildren.push(
        new Paragraph({
          spacing: { before: 40, after: 60 },
          children: [new TextRun({ text: fig, font: 'Gill Sans MT', size: 20, color: '334155' })]
        })
      );
    });

    contentChildren.push(
      new Paragraph({
        spacing: { before: 300, after: 160 },
        children: [new TextRun({ text: 'Lista de Tabelas', font: 'Gill Sans MT', bold: true, size: 24, color: '1E3A8A' })]
      })
    );

    const tablesList = [
      'Tabela 1. Síntese dos dados do curso.',
      'Tabela 2. Relação dos municípios convidados e inscritos.',
      'Tabela 3. Estrutura programática e cronograma do curso.',
      'Tabela 4. Frequência dos participantes no curso.'
    ];

    tablesList.forEach(tab => {
      contentChildren.push(
        new Paragraph({
          spacing: { before: 40, after: 60 },
          children: [new TextRun({ text: tab, font: 'Gill Sans MT', size: 20, color: '334155' })]
        })
      );
    });

    // Sumário
    contentChildren.push(
      new Paragraph({
        pageBreakBefore: true,
        spacing: { before: 200, after: 180 },
        children: [new TextRun({ text: 'Sumário', font: 'Gill Sans MT', bold: true, size: 26, color: '1E3A8A' })]
      })
    );

    const summaryItems = [
      '1. INTRODUÇÃO',
      '2. DADOS BÁSICOS DO CURSO',
      '3. CONTATO COM OS MUNICÍPIOS',
      '4. DESENVOLVIMENTO DO CURSO',
      '5. AVALIAÇÃO DA CAPACITAÇÃO',
      '6. REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO',
      '7. CONSIDERAÇÕES FINAIS',
      'Apêndice I',
      'Apêndice II',
      'Apêndice III'
    ];

    summaryItems.forEach(item => {
      contentChildren.push(
        new Paragraph({
          spacing: { before: 50, after: 70 },
          children: [
            new TextRun({ text: item, font: 'Gill Sans MT', bold: true, size: 20, color: '1E293B' })
          ]
        })
      );
    });

    // =========================================================================
    // 4. SEÇÃO 1: INTRODUÇÃO
    // =========================================================================
    contentChildren.push(
      this.createSectionHeading('1. INTRODUÇÃO', docxDeps, true),
      this.createBodyParagraph(
        `O presente Relatório de Atividades consubstancia os resultados alcançados durante a realização da Capacitação em Transporte Escolar nº ${training.number || 16}, executada no município polo de ${training.polo || 'Município Polo'}, Estado de ${training.uf || 'MT'}, nas datas de ${training.datesFormatted || 'datas do curso'}. A iniciativa integra as ações estratégicas pactuadas no projeto "Fortalecendo e Aprimorando as Políticas Públicas de Transporte Escolar do Brasil", desenvolvido pela Universidade Federal de Goiás (UFG) por meio do CECATE Centro-Oeste, com financiamento do Fundo Nacional de Desenvolvimento da Educação (FNDE).`,
        docxDeps
      ),
      this.createBodyParagraph(
        `A formação tem como objetivo central qualificar os gestores municipais e os conselheiros do CACS-FUNDEB da região Centro-Oeste, aprimorando os conhecimentos relativos à execução, controle e fiscalização das políticas nacionais de transporte escolar, com ênfase no Programa Nacional de Apoio ao Transporte do Escolar (PNATE), no Programa Caminho da Escola e na operacionalização prática do Sistema Eletrônico de Gestão do Transporte Escolar (SETE).`,
        docxDeps
      )
    );

    // =========================================================================
    // 5. SEÇÃO 2: DADOS BÁSICOS DO CURSO
    // =========================================================================
    contentChildren.push(
      this.createSectionHeading('2. DADOS BÁSICOS DO CURSO', docxDeps),
      this.createBodyParagraph(
        `A capacitação contou com carga horária de ${training.workload || '16 horas'}, dividida em módulos teóricos e práticos estruturados para proporcionar imersão nas rotinas operacionais da gestão do transporte escolar. As atividades foram direcionadas a um público-alvo estratégico composto por dirigentes municipais de educação, técnicos responsáveis pela frota escolar e membros atuantes dos Conselhos de Acompanhamento e Controle Social do FUNDEB. A síntese dos parâmetros operacionais do evento é detalhada na Tabela 1:`,
        docxDeps
      ),
      this.createTableCaption('Tabela 1. Síntese dos dados do curso.', docxDeps),
      this.createTable1BasicData(training, metrics, docxDeps),
      this.createSourceNote('Fonte: CECATE-CO/UFG.', docxDeps),

      this.createBodyParagraph(
        `Para assegurar a representatividade territorial, foram formalmente convidados os municípios pertencentes à área de abrangência do polo regional, conforme convocação conjunta expedida pelo FNDE e pelo CECATE-CO. O mapeamento completo dos municípios convidados e do quantitativo de inscritos por localidade é apresentado na Tabela 2:`,
        docxDeps
      ),
      this.createTableCaption('Tabela 2. Relação dos municípios convidados e inscritos.', docxDeps),
      this.createTable2Municipalities(training.municipalities || [], docxDeps),
      this.createSourceNote('Fonte: CECATE-CO/UFG.', docxDeps)
    );

    // =========================================================================
    // 6. SEÇÃO 3: CONTATO COM OS MUNICÍPIOS
    // =========================================================================
    const munCount = (training.municipalities || []).length || 1;
    const enrolledMunCount = (training.municipalities || []).filter(m => (parseInt(m.inscribedTotal) || 0) > 0).length || munCount;
    const confirmRate = Math.min(100, Math.round((enrolledMunCount / munCount) * 100));

    contentChildren.push(
      this.createSectionHeading('3. CONTATO COM OS MUNICÍPIOS', docxDeps),
      this.createBodyParagraph(
        `A mobilização dos participantes foi conduzida pela equipe técnica do CECATE-CO em articulação contínua com a UNDIME e a Coordenação-Geral da Política do Transporte Escolar do FNDE. Foram empreendidas rodadas ativas de comunicação via mensagens eletrônicas formais, contatos telefônicos diretos com os secretários municipais e grupos dedicados em aplicativos de mensagens instantâneas.`,
        docxDeps
      ),
      this.createBodyParagraph(
        `Ao todo, foram contatados ${munCount} municípios pertencentes ao polo de ${training.polo || 'Município Polo'}, obtendo-se confirmação expressa de participação de ${enrolledMunCount} municípios (taxa de adesão institucional de ${confirmRate}%). Esse esforço de engajamento prévio revelou-se determinante para a expressiva adesão dos atores locais, superando barreiras logísticas de deslocamento na região.`,
        docxDeps
      )
    );

    // =========================================================================
    // 7. SEÇÃO 4: DESENVOLVIMENTO DO CURSO
    // =========================================================================
    contentChildren.push(
      this.createSectionHeading('4. DESENVOLVIMENTO DO CURSO', docxDeps),
      this.createBodyParagraph(
        `O desenvolvimento programático do curso seguiu cronograma pedagógico desenhado para equilibrar fundamentos legais e aplicação prática de ferramentas informatizadas. O programa completo ministrado pelos facilitadores da UFG e do FNDE é sintetizado na Tabela 3:`,
        docxDeps
      ),
      this.createTableCaption('Tabela 3. Estrutura programática e cronograma do curso.', docxDeps),
      this.createTable3Schedule(training, docxDeps),
      this.createSourceNote('Fonte: Elaborada pelos autores.', docxDeps),

      this.createBodyParagraph(
        `Durante a condução dos módulos pedagógicos, foram aplicadas dinâmicas avaliativas formativas e interativas por meio de plataformas digitais (Kahoot e Plickers), permitindo aferir em tempo real a fixação dos conceitos debatidos pelos participantes, conforme ilustrado nas Figuras 1 e 2:`,
        docxDeps
      )
    );

    // Figura 1: Kahoot
    const fig1Nodes = await this.createImageParagraph(assets.fig1Kahoot, 480, 275, 'Figura 1: Avaliação via ferramenta kahoot.', 'Fonte: Elaborada pelos autores.', docxDeps);
    if (fig1Nodes) contentChildren.push(...fig1Nodes);

    // Figura 2: Plickers
    const fig2Nodes = await this.createImageParagraph(assets.fig2Plickers, 440, 280, 'Figura 2: Avaliação via ferramenta Plickers.', 'Fonte: Elaborada pelos autores.', docxDeps);
    if (fig2Nodes) contentChildren.push(...fig2Nodes);

    // Tabela 4: Frequência
    contentChildren.push(
      this.createBodyParagraph(
        `A assiduidade dos inscritos foi rigorosamente controlada por meio de listas de presença físicas assinadas no início e no término de cada turno de trabalho. O registro consolidado da frequência diária e a taxa de certificação final são expostos na Tabela 4:`,
        docxDeps
      ),
      this.createTableCaption('Tabela 4. Frequência dos participantes no curso.', docxDeps),
      this.createTable4Attendance(training, metrics, docxDeps),
      this.createSourceNote('Fonte: Elaborada pelos autores.', docxDeps)
    );

    // =========================================================================
    // 8. SEÇÃO 5: AVALIAÇÃO DA CAPACITAÇÃO & GRÁFICOS (FIGURAS 3 A 8)
    // =========================================================================
    contentChildren.push(
      this.createSectionHeading('5. AVALIAÇÃO DA CAPACITAÇÃO', docxDeps),
      this.createBodyParagraph(
        `Ao final das atividades, foi disponibilizado aos participantes formulário estruturado de avaliação contendo itens de caracterização sociodemográfica, avaliação de desempenho dos instrutores, qualidade da infraestrutura, relevância do conteúdo programático e questões abertas qualitativas. Os resultados consolidados são apresentados nas Figuras 3 a 8:`,
        docxDeps
      )
    );

    if (chartsData.fig3) {
      const f3 = await this.createImageParagraph(chartsData.fig3, 480, 280, 'Figura 3. Participação segundo o tipo de representação.', 'Fonte: Elaborada pelos autores.', docxDeps);
      if (f3) contentChildren.push(...f3);
    }
    if (chartsData.fig4) {
      const f4 = await this.createImageParagraph(chartsData.fig4, 480, 280, 'Figura 4. Avaliação da capacitação de todos os participantes.', 'Fonte: Elaborada pelos autores.', docxDeps);
      if (f4) contentChildren.push(...f4);
    }
    if (chartsData.fig5) {
      const f5 = await this.createImageParagraph(chartsData.fig5, 480, 280, 'Figura 5. Avaliação da capacitação dos conselheiros CACS.', 'Fonte: Elaborada pelos autores.', docxDeps);
      if (f5) contentChildren.push(...f5);
    }
    if (chartsData.fig6) {
      const f6 = await this.createImageParagraph(chartsData.fig6, 480, 280, 'Figura 6. Avaliação da capacitação dos gestores municipais.', 'Fonte: Elaborada pelos autores.', docxDeps);
      if (f6) contentChildren.push(...f6);
    }
    if (chartsData.fig7) {
      const f7 = await this.createImageParagraph(chartsData.fig7, 480, 280, 'Figura 7. Aspectos que gostaram da capacitação.', 'Fonte: Elaborada pelos autores.', docxDeps);
      if (f7) contentChildren.push(...f7);
    }
    if (chartsData.fig8) {
      const f8 = await this.createImageParagraph(chartsData.fig8, 480, 280, 'Figura 8. Aspectos que devem melhorar da capacitação', 'Fonte: Elaborada pelos autores.', docxDeps);
      if (f8) contentChildren.push(...f8);
    }

    // =========================================================================
    // 9. SEÇÃO 6: REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO & FIGURAS 9 A 13
    // =========================================================================
    contentChildren.push(
      this.createSectionHeading('6. REGISTROS FOTOGRÁFICOS DA CAPACITAÇÃO', docxDeps),
      this.createBodyParagraph(
        `Durante a realização da capacitação, foram registrados diversos momentos por meio de fotografias que ilustram a participação ativa dos representantes municipais e dos conselheiros do CACS-FUNDEB. As imagens capturam desde a ambientação do local, momentos de fala dos facilitadores e participantes, até as interações durante as atividades formativas. Esses registros visuais documentam o evento e reforçam o compromisso coletivo com a melhoria da gestão do transporte escolar nos municípios, sendo apresentados nas Figuras 9 a 13:`,
        docxDeps
      )
    );

    const photos = (training.media || []).filter(m => m.type === 'photo' && m.blob);

    const photoCaptions = [
      'Figura 9. Acomodação dos participantes.',
      'Figura 10. Apresentação inicial do curso',
      'Figura 11. Apresentação dos módulos teóricos.',
      is16Hours ? 'Figura 12. Apresentação do primeiro dia.' : 'Figura 12. Apresentação do Software SETE.',
      is16Hours ? 'Figura 13. Final da capacitação do segundo dia.' : 'Figura 13. Final da capacitação.'
    ];

    if (photos.length > 0) {
      for (let idx = 0; idx < photos.length; idx++) {
        const ph = photos[idx];
        const caption = photoCaptions[idx] || ph.caption || `Figura ${idx + 9}. Registro fotográfico oficial.`;
        const phNodes = await this.createImageParagraph(ph.blob, 480, 360, caption, 'Fonte: Elaborada pelos autores.', docxDeps);
        if (phNodes) contentChildren.push(...phNodes);
      }
    } else {
      contentChildren.push(
        this.createBodyParagraph('Registros fotográficos anexados na pasta oficial do projeto.', docxDeps)
      );
    }

    // =========================================================================
    // 10. SEÇÃO 7: CONSIDERAÇÕES FINAIS
    // =========================================================================
    contentChildren.push(
      this.createSectionHeading('7. CONSIDERAÇÕES FINAIS', docxDeps),
      this.createBodyParagraph(
        `Este relatório se propôs a apresentar os detalhes do curso de capacitação em transporte escolar realizado dentro do projeto intitulado "Fortalecendo e aprimorando as políticas públicas de transporte escolar do Brasil", além de apresentar as avaliações recebidas pelos participantes. Salienta-se que, de forma geral, o curso atendeu integralmente ao objetivo de aprimorar conhecimentos de gestores e conselheiros, conforme os resultados das avaliações.`,
        docxDeps
      ),
      this.createBodyParagraph(
        `Por outro lado, pôde-se comprovar que reforçar o convite, mediante o uso de redes sociais, grupos de mensagens usados por entidades que tratam do tema e contato telefônico direto, foi fundamental para garantir a participação no evento. Também ficou evidente que a abordagem escolhida pelo CECATE-CO de disponibilizar canais contínuos de comunicação se consolida para atender às demandas de futuros aperfeiçoamentos no tema. Para finalizar, ressalta-se a importância de o processo estar inserido em um ambiente que possibilite a livre interação dos participantes com interlocutores, relatando experiências e sanando dúvidas, constituindo um espaço profícuo de retroalimentação de todas as partes do processo de transporte escolar.`,
        docxDeps
      )
    );

    // =========================================================================
    // 11. APÊNDICES I, II E III
    // =========================================================================
    // Apêndice I: FNDE
    contentChildren.push(
      this.createSectionHeading('Apêndice I: Convocação do FNDE', docxDeps, true)
    );
    if (assets.convocacaoFndeP1) {
      const p1 = await this.createImageParagraph(assets.convocacaoFndeP1, 490, 693, null, null, docxDeps);
      if (p1) contentChildren.push(...p1);
    }
    if (assets.convocacaoFndeP2) {
      const p2 = await this.createImageParagraph(assets.convocacaoFndeP2, 490, 693, null, null, docxDeps);
      if (p2) contentChildren.push(...p2);
    }

    // Apêndice II: CECATE
    contentChildren.push(
      this.createSectionHeading('Apêndice II: Convocação do CECATE', docxDeps, true)
    );
    if (assets.convocacaoCecateP1) {
      const c1 = await this.createImageParagraph(assets.convocacaoCecateP1, 490, 693, null, null, docxDeps);
      if (c1) contentChildren.push(...c1);
    }
    if (assets.convocacaoCecateP2) {
      const c2 = await this.createImageParagraph(assets.convocacaoCecateP2, 490, 693, null, null, docxDeps);
      if (c2) contentChildren.push(...c2);
    }

    // Apêndice III: Respostas Dissertativas da Avaliação
    const evals = training.evaluations || [];
    contentChildren.push(
      this.createSectionHeading('Apêndice III: Avaliação Individual das Respostas Qualitativas', docxDeps, true),
      this.createTableCaption('Tabela com as respostas dissertativas dos participantes.', docxDeps),
      this.createTable8ApendiceIII(evals, docxDeps),
      this.createSourceNote('Fonte: Formulário de Avaliação da Capacitação (FNDE/CECATE-CO).', docxDeps)
    );

    // =========================================================================
    // CABEÇALHO E RODAPÉ INSTITUCIONAIS DAS PÁGINAS NORMAIS (SEÇÃO 2)
    // =========================================================================
    let normalHeaderObj = new Header({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: `RELATÓRIO DE ATIVIDADES Nº ${training.number || 16}`,
              font: 'Gill Sans MT',
              bold: true,
              size: 18,
              color: '64748B'
            })
          ]
        })
      ]
    });

    if (assets.headerCecateLogo) {
      const headBytes = this.base64ToUint8Array(assets.headerCecateLogo);
      if (headBytes) {
        const headRun = await this.createImageRunWithAR(assets.headerCecateLogo, headBytes, 130, 38, ImageRun);
        normalHeaderObj = new Header({
          children: [
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: { top: noBorder, bottom: grayLineBorder, left: noBorder, right: noBorder },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 40, type: WidthType.PERCENTAGE },
                      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.LEFT,
                          children: [headRun]
                        })
                      ]
                    }),
                    new TableCell({
                      width: { size: 60, type: WidthType.PERCENTAGE },
                      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.RIGHT,
                          spacing: { before: 60, after: 0 },
                          children: [
                            new TextRun({
                              text: `RELATÓRIO DE ATIVIDADES Nº ${training.number || 16}`,
                              font: 'Gill Sans MT',
                              bold: true,
                              size: 18,
                              color: '64748B'
                            })
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        });
      }
    }

    let normalFooterObj = new Footer({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: 'Página ', font: 'Gill Sans MT', size: 16, color: '64748B' }),
            new TextRun({ children: [PageNumber.CURRENT], font: 'Gill Sans MT', size: 16, color: '64748B' })
          ]
        })
      ]
    });

    if (assets.footerNormalLogos) {
      const footBytes = this.base64ToUint8Array(assets.footerNormalLogos);
      if (footBytes) {
        const footNormalRun = await this.createImageRunWithAR(assets.footerNormalLogos, footBytes, 480, 58, ImageRun);
        normalFooterObj = new Footer({
          children: [
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: { top: grayLineBorder, bottom: noBorder, left: noBorder, right: noBorder },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          spacing: { before: 60, after: 20 },
                          children: [footNormalRun]
                        }),
                        new Paragraph({
                          alignment: AlignmentType.RIGHT,
                          spacing: { before: 10, after: 20 },
                          children: [
                            new TextRun({ text: 'Página ', font: 'Gill Sans MT', size: 16, color: '64748B' }),
                            new TextRun({ children: [PageNumber.CURRENT], font: 'Gill Sans MT', size: 16, color: '64748B' })
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        });
      }
    }

    // =========================================================================
    // COMPILAÇÃO DO DOCUMENTO (.DOCX) COM SEÇÃO 1 (CAPAS) E SEÇÃO 2 (CORPO)
    // =========================================================================
    return new Document({
      styles: {
        default: {
          document: {
            run: {
              font: 'Gill Sans MT',
              size: 21,
              color: '1E293B'
            },
            paragraph: {
              spacing: {
                line: 276,
                before: 60,
                after: 60
              }
            }
          }
        }
      },
      sections: [
        // Seção 1: Contracapa e Capa Oficial (sem cabeçalhos e rodapés das páginas normais)
        {
          properties: {
            page: {
              margin: { top: 1418, right: 1418, bottom: 1418, left: 1418 }
            }
          },
          headers: {
            default: new Header({ children: [] })
          },
          footers: {
            default: new Footer({ children: [] })
          },
          children: coverChildren
        },
        // Seção 2: Conteúdo Principal com Cabeçalho e Rodapé Institucionais Padronizados
        {
          properties: {
            page: {
              margin: { top: 1418, right: 1418, bottom: 1418, left: 1418 }
            }
          },
          headers: {
            default: normalHeaderObj
          },
          footers: {
            default: normalFooterObj
          },
          children: contentChildren
        }
      ]
    });
  }

  /**
   * Gera o arquivo Word (.docx) como Blob para download ou renderização direta de PDF
   */
  async generateDocxBlob(training, metrics, chartsData = {}) {
    const { Packer } = window.docx || {};
    if (!Packer) {
      console.warn('docx.Packer não está disponível');
      return null;
    }
    const doc = await this.buildDocxDocument(training, metrics, chartsData);
    if (!doc) return null;
    return await Packer.toBlob(doc);
  }

  /**
   * Gera e aciona o download direto do documento Word (.docx)
   */
  async generateAndDownload(training, metrics, chartsData = {}) {
    if (!training) {
      alert('Selecione ou salve uma capacitação primeiro.');
      return;
    }
    try {
      const blob = await this.generateDocxBlob(training, metrics, chartsData);
      if (!blob) throw new Error('Falha ao compilar blob do documento Word');

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${training.number || 16}CTE_Relatório_V00.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('Documento Word (.docx) oficial gerado com sucesso!');
    } catch (err) {
      console.error('Erro ao gerar documento Word:', err);
      alert(`Erro na geração docx: ${err.message}`);
    }
  }
}

window.reportDocxGenerator = new ReportDocxGenerator();
