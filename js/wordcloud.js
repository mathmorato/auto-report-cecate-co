/**
 * AutoReport CECATE - Motor Nativo de Nuvem de Palavras (Word Cloud Engine)
 * Versão: v.1.0.2
 */

class WordCloudEngine {
  constructor() {
    // Dicionário mestre de stopwords em português
    this.defaultStopwords = new Set([
      'a', 'ao', 'aos', 'aquela', 'aquelas', 'aquele', 'aqueles', 'aquilo', 'as', 'até',
      'com', 'como', 'da', 'das', 'de', 'dela', 'delas', 'dele', 'deles', 'depois', 'do',
      'dos', 'e', 'ela', 'elas', 'ele', 'eles', 'em', 'entre', 'era', 'eram', 'éramos',
      'essa', 'essas', 'esse', 'esses', 'esta', 'estamos', 'estão', 'estas', 'estava',
      'estavam', 'estávamos', 'este', 'esteja', 'estejam', 'estejamos', 'estes', 'esteve',
      'estive', 'estivemos', 'estiver', 'estivera', 'estiveram', 'estivéramos', 'estiverem',
      'estivermos', 'estivesse', 'estivessem', 'estivéssemos', 'estou', 'eu', 'foi', 'fomos',
      'for', 'fora', 'foram', 'fôramos', 'forem', 'formos', 'fosse', 'fossem', 'fôssemos',
      'fui', 'há', 'haja', 'hajam', 'hajamos', 'hão', 'havemos', 'hei', 'houve', 'houvemos',
      'houver', 'houvera', 'houverá', 'houveram', 'houvéramos', 'houverão', 'houverei',
      'houverem', 'houveremos', 'houveria', 'houveriam', 'houveríamos', 'houvesse',
      'houvessem', 'houvéssemos', 'isso', 'isto', 'já', 'lhe', 'lhes', 'mais', 'mas', 'me',
      'mesmo', 'meu', 'meus', 'minha', 'minhas', 'muito', 'muitos', 'na', 'não', 'nas',
      'nem', 'no', 'nos', 'nós', 'nossa', 'nossas', 'nosso', 'nossos', 'num', 'numa',
      'o', 'os', 'ou', 'para', 'pela', 'pelas', 'pelo', 'pelos', 'por', 'qual', 'quando',
      'que', 'quem', 'são', 'se', 'seja', 'sejam', 'sejamos', 'sem', 'ser', 'será',
      'serão', 'serei', 'seremos', 'seria', 'seriam', 'seríamos', 'seu', 'seus', 'só',
      'somos', 'sou', 'sua', 'suas', 'também', 'te', 'tem', 'tém', 'temos', 'tenha',
      'tenham', 'tenhamos', 'tenho', 'ter', 'terá', 'terão', 'terei', 'teremos', 'teria',
      'teriam', 'teríamos', 'teu', 'teus', 'teve', 'tinha', 'tinham', 'tínhamos', 'tive',
      'tivemos', 'tiver', 'tivera', 'tiveram', 'tivéramos', 'tiverem', 'tivermos',
      'tivesse', 'tivessem', 'tivéssemos', 'tu', 'tua', 'tuas', 'um', 'uma', 'você',
      'vocês', 'vos', 'tudo', 'todos', 'todas', 'todo', 'toda', 'nada', 'bem', 'bom',
      'boa', 'outro', 'outra', 'outros', 'outras', 'assim', 'onde', 'sobre', 'pois',
      // Termos contextuais genéricos que devem ser desconsiderados se vazios
      'curso', 'formação', 'capacitação', 'forma', 'aplica', 'nenhum', 'nada', 'obrigado',
      'parabéns', 'dia', 'dias', 'parte', 'geral', 'sendo', 'sobre', 'vez', 'vezes'
    ]);

    this.customStopwords = new Set();
    this.synonymMap = {
      'conteudos': 'conteúdo',
      'conteudo': 'conteúdo',
      'didatica': 'didática',
      'explicacao': 'explicação',
      'explicacoes': 'explicação',
      'conhecimentos': 'conhecimento',
      'aprendizado': 'aprendizado',
      'aprendizagem': 'aprendizado',
      'informacoes': 'informação',
      'informacao': 'informação',
      'praticas': 'prática',
      'pratica': 'prática',
      'horarios': 'horário',
      'horario': 'horário',
      'duracao': 'duração',
      'municipios': 'municípios',
      'municipio': 'municípios',
      'tempo': 'tempo',
      'material': 'material didático',
      'materiais': 'material didático'
    };

    this.colorPalettes = {
      positive: ['#6366f1', '#06b6d4', '#10b981', '#3b82f6', '#8b5cf6', '#22c55e', '#14b8a6'],
      improve: ['#f59e0b', '#ec4899', '#f97316', '#8b5cf6', '#06b6d4', '#eab308', '#6366f1']
    };
  }

  /**
   * Normaliza um texto removendo acentos e pontuações para análise
   */
  normalizeWord(word) {
    if (!word) return '';
    let clean = word.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'’“”…\[\]]/g, '')
      .trim();
    
    // Mapeamento de sinônimos/lematização
    const unaccented = clean.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (this.synonymMap[unaccented]) {
      return this.synonymMap[unaccented];
    }
    if (this.synonymMap[clean]) {
      return this.synonymMap[clean];
    }
    return clean;
  }

  /**
   * Processa uma lista de respostas textuais e retorna a contagem ponderada de palavras
   */
  processTextList(texts = []) {
    const wordCounts = {};

    texts.forEach(text => {
      if (!text || typeof text !== 'string') return;

      // Dividir por espaços, quebras de linha e separadores comuns
      const tokens = text.split(/[\s,;\n\r\t\/\+\-]+/);

      tokens.forEach(rawToken => {
        const word = this.normalizeWord(rawToken);
        if (word.length >= 3 && !this.defaultStopwords.has(word) && !this.customStopwords.has(word)) {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });
    });

    // Converter para array ordenado
    return Object.entries(wordCounts)
      .map(([text, count]) => ({ text, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Renderiza uma nuvem de palavras em um elemento HTML Canvas
   */
  renderToCanvas(canvas, words = [], options = {}) {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const width = options.width || canvas.width || 600;
    const height = options.height || canvas.height || 350;
    const palette = this.colorPalettes[options.palette || 'positive'];
    const maxWords = options.maxWords || 35;
    const isDark = options.isDark !== false;

    canvas.width = width;
    canvas.height = height;

    // Fundo
    ctx.fillStyle = isDark ? '#0f172a' : '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (!words || words.length === 0) {
      ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Nenhuma resposta registrada para gerar a nuvem.', width / 2, height / 2);
      return canvas;
    }

    const slicedWords = words.slice(0, maxWords);
    const maxCount = slicedWords[0]?.count || 1;
    const minCount = slicedWords[slicedWords.length - 1]?.count || 1;

    // Escala de fontes
    const minFontSize = options.minFontSize || 14;
    const maxFontSize = options.maxFontSize || 42;

    const placedBoxes = [];

    // Algoritmo de distribuição em espiral
    slicedWords.forEach((item, index) => {
      // Normalização do tamanho
      let fontSize = minFontSize;
      if (maxCount > minCount) {
        fontSize = minFontSize + ((item.count - minCount) / (maxCount - minCount)) * (maxFontSize - minFontSize);
      } else {
        fontSize = (minFontSize + maxFontSize) / 2;
      }

      ctx.font = `bold ${Math.round(fontSize)}px 'Plus Jakarta Sans', Inter, sans-serif`;
      const metrics = ctx.measureText(item.text);
      const textWidth = metrics.width;
      const textHeight = fontSize;

      let placed = false;
      let angle = 0;
      let radius = 0;
      const step = 0.35;
      const centerX = width / 2;
      const centerY = height / 2;

      while (!placed && radius < Math.max(width, height) / 2) {
        const x = centerX + radius * Math.cos(angle) - textWidth / 2;
        const y = centerY + radius * Math.sin(angle) + textHeight / 3;

        // Caixa delimitadora
        const box = { x: x - 4, y: y - textHeight, w: textWidth + 8, h: textHeight + 6 };

        // Testar colisão com palavras já posicionadas
        let collision = false;
        if (box.x < 10 || box.x + box.w > width - 10 || box.y < 10 || box.y + box.h > height - 10) {
          collision = true;
        } else {
          for (const p of placedBoxes) {
            if (!(box.x + box.w < p.x || box.x > p.x + p.w || box.y + box.h < p.y || box.y > p.y + p.h)) {
              collision = true;
              break;
            }
          }
        }

        if (!collision) {
          // Posicionar e desenhar
          ctx.fillStyle = palette[index % palette.length];
          ctx.fillText(item.text, x, y);
          placedBoxes.push(box);
          placed = true;
        }

        angle += step;
        radius += 0.8;
      }
    });

    return canvas;
  }

  /**
   * Exporta a nuvem como imagem PNG em Base64
   */
  exportAsDataURL(canvas) {
    if (!canvas) return '';
    return canvas.toDataURL('image/png');
  }
}

window.wordCloudEngine = new WordCloudEngine();
