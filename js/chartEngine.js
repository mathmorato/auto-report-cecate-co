/**
 * AutoReport CECATE - Motor Gráfico de Relatório (Chart Engine)
 * Versão: v.1.0.2
 */

class ChartEngine {
  constructor() {
    this.chartInstances = {};
  }

  /**
   * Destrói instância anterior de um canvas para evitar vazamentos
   */
  destroyIfExists(canvasId) {
    if (this.chartInstances[canvasId]) {
      this.chartInstances[canvasId].destroy();
      delete this.chartInstances[canvasId];
    }
  }

  /**
   * Figura 3: Gráfico de Participação segundo tipo de representação (CACS vs Gestores)
   */
  renderFig3Participation(canvasId, presentCACS = 0, presentGestores = 0, isDark = true) {
    this.destroyIfExists(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return null;

    const ctx = canvas.getContext('2d');
    const total = (presentCACS + presentGestores) || 1;
    const percCACS = ((presentCACS / total) * 100).toFixed(1);
    const percGest = ((presentGestores / total) * 100).toFixed(1);

    this.chartInstances[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [`Conselheiros CACS-FUNDEB (${presentCACS} - ${percCACS}%)`, `Gestores Municipais (${presentGestores} - ${percGest}%)`],
        datasets: [{
          data: [presentCACS, presentGestores],
          backgroundColor: ['#06b6d4', '#6366f1'],
          borderWidth: 2,
          borderColor: isDark ? '#111827' : '#ffffff',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: isDark ? '#e2e8f0' : '#1e293b',
              font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
              padding: 15
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.label}: ${context.raw} participantes`
            }
          }
        },
        cutout: '62%'
      }
    });

    return this.chartInstances[canvasId];
  }

  /**
   * Figuras 4, 5 e 6: Gráfico de Avaliação das Médias por Critério (Escala 1 a 5)
   */
  renderEvaluationBarChart(canvasId, averages = [], title = 'Avaliação da Capacitação', isDark = true, barColor = '#6366f1') {
    this.destroyIfExists(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return null;

    const ctx = canvas.getContext('2d');
    const labels = [
      '1. Inscrição',
      '2. Divulgação',
      '3. Data',
      '4. Horário',
      '5. Local',
      '6. Duração',
      '7. Avaliação Geral'
    ];

    const safeAverages = labels.map((_, i) => (averages[i] !== undefined ? averages[i] : 4.5));

    this.chartInstances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Nota Média (1 a 5)',
          data: safeAverages,
          backgroundColor: barColor,
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y', // Barras horizontais elegantes como no relatório de referência
        scales: {
          x: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
              color: isDark ? '#94a3b8' : '#64748b',
              font: { family: 'Inter', size: 11 }
            },
            grid: {
              color: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'
            }
          },
          y: {
            ticks: {
              color: isDark ? '#e2e8f0' : '#1e293b',
              font: { family: 'Plus Jakarta Sans', size: 12, weight: '500' }
            },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { display: false },
          title: {
            display: !!title,
            text: title,
            color: isDark ? '#f8fafc' : '#0f172a',
            font: { family: 'Plus Jakarta Sans', size: 13, weight: '700' },
            padding: { bottom: 12 }
          },
          tooltip: {
            callbacks: {
              label: (context) => ` Média: ${context.raw.toFixed(2)} / 5.0`
            }
          }
        }
      }
    });

    return this.chartInstances[canvasId];
  }

  /**
   * Exporta qualquer gráfico como imagem Base64
   */
  exportChartAsDataURL(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return '';
    return canvas.toDataURL('image/png');
  }
}

window.chartEngine = new ChartEngine();
