/**
 * AutoReport CECATE - Motor Estatístico e Geração de Tabelas Automáticas
 * Versão: v.1.0.2
 */

class StatsEngine {
  constructor() {
    this.criteriaLabels = [
      'Inscrição',
      'Divulgação',
      'Data da Formação',
      'Horário da Formação',
      'Local da Formação',
      'Duração da Formação',
      'Como você avalia a Formação'
    ];
  }

  /**
   * Consolida métricas gerais e tabelas a partir dos dados brutos de uma capacitação
   */
  calculateAllMetrics(training) {
    if (!training) return null;

    const municipalities = training.municipalities || [];
    const attendance = training.attendance || [];
    const evaluations = training.evaluations || [];
    const courseModules = training.courseModules || [];

    // 1. Métricas de Municípios e Participação
    const totalSummonedMunicipalities = municipalities.filter(m => m.isSummoned).length;
    const distances = municipalities.map(m => parseFloat(m.distanceKm) || 0).filter(d => d > 0);
    const avgDistance = distances.length > 0 ? (distances.reduce((a, b) => a + b, 0) / distances.length).toFixed(1) : 0;

    // Calcular inscritos e presentes agregando dos municípios e da lista de presença
    let totalInscribedCACS = 0;
    let totalInscribedGestores = 0;
    let totalInscribed = 0;

    let totalPresentCACS = 0;
    let totalPresentGestores = 0;
    let totalPresent = 0;

    // Municípios presentes
    const presentMunSet = new Set();
    const inscribedMunSet = new Set();

    municipalities.forEach(m => {
      const insC = parseInt(m.inscribedCACS) || 0;
      const insG = parseInt(m.inscribedGestores) || 0;
      const preC = parseInt(m.presentCACS) || 0;
      const preG = parseInt(m.presentGestores) || 0;

      totalInscribedCACS += insC;
      totalInscribedGestores += insG;
      totalInscribed += (insC + insG);

      totalPresentCACS += preC;
      totalPresentGestores += preG;
      totalPresent += (preC + preG);

      if ((insC + insG) > 0) inscribedMunSet.add(m.name);
      if ((preC + preG) > 0) presentMunSet.add(m.name);
    });

    // Se attendance list tiver dados detalhados e município tiver 0, sincronizar
    if (attendance.length > 0 && totalPresent === 0) {
      attendance.forEach(att => {
        if (att.isPresent) {
          totalPresent++;
          if (att.representation === 'CACS-FUNDEB') totalPresentCACS++;
          else totalPresentGestores++;
          if (att.municipality) presentMunSet.add(att.municipality);
        }
      });
    }

    // Taxas de Participação (%) = Presentes / Inscritos * 100
    const participationRateGeneral = totalInscribed > 0 ? ((totalPresent / totalInscribed) * 100).toFixed(1) : (totalPresent > 0 ? 100 : 0);
    const participationRateCACS = totalInscribedCACS > 0 ? ((totalPresentCACS / totalInscribedCACS) * 100).toFixed(1) : (totalPresentCACS > 0 ? 100 : 0);
    const participationRateGestores = totalInscribedGestores > 0 ? ((totalPresentGestores / totalInscribedGestores) * 100).toFixed(1) : (totalPresentGestores > 0 ? 100 : 0);

    // 2. Análise de Avaliação
    const evalStatsGeneral = this.calculateEvaluationStats(evaluations);
    const evalStatsCACS = this.calculateEvaluationStats(evaluations.filter(e => e.representation === 'CACS-FUNDEB'));
    const evalStatsGestores = this.calculateEvaluationStats(evaluations.filter(e => e.representation !== 'CACS-FUNDEB'));

    // 3. Auditoria & Validação Cruzada
    const auditIssues = [];
    if (attendance.length > 0 && evaluations.length > 0 && attendance.length !== evaluations.length) {
      auditIssues.push({
        type: 'warning',
        message: `Divergência numérica: ${attendance.length} participantes na lista de presença vs ${evaluations.length} respostas na avaliação.`
      });
    }

    municipalities.forEach(m => {
      if (!m.ibgeCode) {
        auditIssues.push({
          type: 'warning',
          message: `Município '${m.name}' está sem Código IBGE cadastrado.`
        });
      }
    });

    return {
      totalSummonedMunicipalities,
      avgDistance,
      totalInscribedMunicipalities: inscribedMunSet.size,
      totalPresentMunicipalities: presentMunSet.size,
      totalInscribedCACS,
      totalInscribedGestores,
      totalInscribed,
      totalPresentCACS,
      totalPresentGestores,
      totalPresent,
      participationRateGeneral,
      participationRateCACS,
      participationRateGestores,
      evalStatsGeneral,
      evalStatsCACS,
      evalStatsGestores,
      auditIssues
    };
  }

  /**
   * Calcula estatísticas das notas de avaliação
   */
  calculateEvaluationStats(evaluations = []) {
    if (!evaluations || evaluations.length === 0) {
      return {
        totalResponses: 0,
        averages: this.criteriaLabels.map(() => 0),
        overallMean: 0,
        distribution: [0, 0, 0, 0, 0]
      };
    }

    const n = evaluations.length;
    const sums = [0, 0, 0, 0, 0, 0, 0];
    const distribution = [0, 0, 0, 0, 0]; // Contagem de 1, 2, 3, 4, 5

    evaluations.forEach(ev => {
      const ratings = ev.ratings || [];
      for (let i = 0; i < 7; i++) {
        const val = ratings[i] !== undefined ? parseFloat(ratings[i]) : 5;
        sums[i] += val;
        const star = Math.min(5, Math.max(1, Math.round(val)));
        distribution[star - 1]++;
      }
    });

    const averages = sums.map(s => parseFloat((s / n).toFixed(2)));
    const overallMean = parseFloat((averages.reduce((a, b) => a + b, 0) / averages.length).toFixed(2));

    const totalRatingsCount = n * 7;
    const distributionPercent = distribution.map(count => parseFloat(((count / totalRatingsCount) * 100).toFixed(1)));

    return {
      totalResponses: n,
      averages,
      overallMean,
      distribution,
      distributionPercent
    };
  }

  /**
   * Gera o HTML da Tabela 1: Municípios Convocados
   */
  generateTable1Html(municipalities = []) {
    const sorted = [...municipalities].sort((a, b) => {
      if (a.isSede && !b.isSede) return -1;
      if (!a.isSede && b.isSede) return 1;
      return (a.name || '').localeCompare(b.name || '');
    });
    let rowsHtml = '';

    sorted.forEach((m, idx) => {
      rowsHtml += `
        <tr>
          <td style="text-align:center; font-family:monospace; font-weight:700;">${m.ibgeCode || '-'}</td>
          <td><strong>${m.name}</strong> ${m.isSede ? '<span class="nav-badge badge-amber" style="font-size:0.7rem; padding:0.1rem 0.4rem;">Sede</span>' : ''}</td>
          <td style="text-align:center;"><span class="nav-badge badge-blue" style="font-size:0.75rem; padding:0.1rem 0.45rem;">${m.uf || 'GO'}</span></td>
          <td style="text-align:right; font-family:monospace; font-weight:700;">${m.isSede ? '0,0 km' : `${parseFloat(m.distanceKm || 0).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`}</td>
        </tr>
      `;
    });

    return `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th style="width: 140px; text-align:center;">Código IBGE</th>
              <th>Nome do Município</th>
              <th style="width: 80px; text-align:center;">UF</th>
              <th style="width: 160px; text-align:right;">Distância (km)</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml || '<tr><td colspan="4" style="text-align:center;">Nenhum município cadastrado.</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Gera o HTML da Tabela 2: Estrutura do Curso
   */
  generateTable2Html(modules = []) {
    const sorted = [...modules].sort((a, b) => (a.order || 0) - (b.order || 0));
    let rowsHtml = '';
    let totalHoursGestor = 0;
    let totalHoursCACS = 0;

    sorted.forEach(m => {
      const hG = parseFloat(m.hoursGestor) || 0;
      const hC = parseFloat(m.hoursCACS) || 0;
      totalHoursGestor += hG;
      totalHoursCACS += hC;

      rowsHtml += `
        <tr>
          <td style="text-align:center; font-weight:700;">${m.moduleNumber || '01'}</td>
          <td>${m.topicGestor || '-'}</td>
          <td>${m.topicCACS || '-'}</td>
          <td style="text-align:center;">${hG.toFixed(1)} h</td>
          <td style="text-align:center;">${hC.toFixed(1)} h</td>
        </tr>
      `;
    });

    return `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th rowspan="2" style="width: 80px; text-align:center;">Módulo</th>
              <th colspan="2" style="text-align:center;">Temática</th>
              <th colspan="2" style="text-align:center;">Carga Horária</th>
            </tr>
            <tr>
              <th>Gestor</th>
              <th>CACS</th>
              <th style="width: 100px; text-align:center;">Gestor</th>
              <th style="width: 100px; text-align:center;">CACS</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
          <tfoot>
            <tr style="font-weight:700; background:rgba(99, 102, 241, 0.08);">
              <td colspan="3" style="text-align:right;">Total Carga Horária:</td>
              <td style="text-align:center;">${totalHoursGestor.toFixed(1)} h</td>
              <td style="text-align:center;">${totalHoursCACS.toFixed(1)} h</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  }

  /**
   * Gera o HTML da Tabela 3: Inscritos por Município
   */
  generateTable3Html(municipalities = []) {
    const sorted = [...municipalities].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    let rowsHtml = '';
    let sumCACS = 0;
    let sumGestor = 0;
    let sumTotal = 0;

    sorted.forEach(m => {
      const cacs = parseInt(m.inscribedCACS) || 0;
      const gestor = parseInt(m.inscribedGestores) || 0;
      const total = parseInt(m.inscribedTotal) || (cacs + gestor);

      sumCACS += cacs;
      sumGestor += gestor;
      sumTotal += total;

      rowsHtml += `
        <tr>
          <td style="text-align:center; font-family:monospace;">${m.ibgeCode || '-'}</td>
          <td><strong>${m.name}</strong> (${m.uf || 'MT'})</td>
          <td style="text-align:center;">${cacs}</td>
          <td style="text-align:center;">${gestor}</td>
          <td style="text-align:center; font-weight:700;">${total}</td>
        </tr>
      `;
    });

    return `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th rowspan="2" style="width: 140px; text-align:center;">Código IBGE</th>
              <th rowspan="2">Nome do Município</th>
              <th colspan="3" style="text-align:center;">Número de Inscritos</th>
            </tr>
            <tr>
              <th style="width: 100px; text-align:center;">CACS</th>
              <th style="width: 100px; text-align:center;">Gestor</th>
              <th style="width: 100px; text-align:center;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
          <tfoot>
            <tr style="font-weight:700; background:rgba(99, 102, 241, 0.08);">
              <td colspan="2" style="text-align:right;">Totais Gerais:</td>
              <td style="text-align:center;">${sumCACS}</td>
              <td style="text-align:center;">${sumGestor}</td>
              <td style="text-align:center; color:var(--accent-secondary);">${sumTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  }

  /**
   * Gera o HTML da Tabela 4: Participação por Município (Presentes / Inscritos - P/I)
   */
  generateTable4Html(municipalities = []) {
    const sorted = [...municipalities].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    let rowsHtml = '';
    let sumInscCACS = 0;
    let sumPresCACS = 0;
    let sumInscGestor = 0;
    let sumPresGestor = 0;

    sorted.forEach(m => {
      const insC = parseInt(m.inscribedCACS) || 0;
      const preC = parseInt(m.presentCACS) || 0;
      const insG = parseInt(m.inscribedGestores) || 0;
      const preG = parseInt(m.presentGestores) || 0;
      const insTot = insC + insG;
      const preTot = preC + preG;

      sumInscCACS += insC;
      sumPresCACS += preC;
      sumInscGestor += insG;
      sumPresGestor += preG;

      rowsHtml += `
        <tr>
          <td style="text-align:center; font-family:monospace;">${m.ibgeCode || '-'}</td>
          <td><strong>${m.name}</strong> (${m.uf || 'MT'})</td>
          <td style="text-align:center;">${preC}/${insC}</td>
          <td style="text-align:center;">${preG}/${insG}</td>
          <td style="text-align:center; font-weight:700; color:${preTot >= insTot && insTot > 0 ? 'var(--accent-success)' : 'inherit'};">${preTot}/${insTot}</td>
        </tr>
      `;
    });

    const totalInsc = sumInscCACS + sumInscGestor;
    const totalPres = sumPresCACS + sumPresGestor;

    return `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th rowspan="2" style="width: 140px; text-align:center;">Código IBGE</th>
              <th rowspan="2">Nome do Município</th>
              <th colspan="3" style="text-align:center;">Participação (Presentes / Inscritos)</th>
            </tr>
            <tr>
              <th style="width: 120px; text-align:center;">CACS (P/I)</th>
              <th style="width: 120px; text-align:center;">Gestor (P/I)</th>
              <th style="width: 120px; text-align:center;">Total (P/I)</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
          <tfoot>
            <tr style="font-weight:700; background:rgba(99, 102, 241, 0.08);">
              <td colspan="2" style="text-align:right;">Totais Consolidados:</td>
              <td style="text-align:center;">${sumPresCACS}/${sumInscCACS}</td>
              <td style="text-align:center;">${sumPresGestor}/${sumInscGestor}</td>
              <td style="text-align:center; color:var(--accent-secondary);">${totalPres}/${totalInsc}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  }
}

window.statsEngine = new StatsEngine();
