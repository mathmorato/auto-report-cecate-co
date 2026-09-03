/**
 * AutoReport CECATE - Motor de Estatísticas e Tabelas Consolidadas
 * Versão: v.2.6.9
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
        distribution: [0, 0, 0, 0, 0],
        distributionPercent: [0, 0, 0, 0, 0],
        criterionCounts: Array.from({ length: 7 }, () => [0, 0, 0, 0, 0]),
        criterionDistributionPercent: Array.from({ length: 7 }, () => [0, 0, 0, 0, 0])
      };
    }

    const n = evaluations.length;
    const sums = [0, 0, 0, 0, 0, 0, 0];
    const distribution = [0, 0, 0, 0, 0]; // Contagem total de 1, 2, 3, 4, 5
    const criterionCounts = Array.from({ length: 7 }, () => [0, 0, 0, 0, 0]);

    evaluations.forEach(ev => {
      const ratings = ev.ratings || [];
      for (let i = 0; i < 7; i++) {
        const rawVal = ratings[i];
        if (rawVal === undefined || rawVal === null || rawVal === '') continue;
        const val = parseFloat(rawVal);
        if (isNaN(val) || val < 1 || val > 5) continue;

        sums[i] += val;
        const star = Math.min(5, Math.max(1, Math.round(val)));
        distribution[star - 1]++;
        criterionCounts[i][star - 1]++;
      }
    });

    const averages = sums.map((s, i) => {
      const validCount = criterionCounts[i].reduce((a, b) => a + b, 0);
      return validCount > 0 ? parseFloat((s / validCount).toFixed(2)) : 0;
    });

    const validAverages = averages.filter(a => a > 0);
    const overallMean = validAverages.length > 0
      ? parseFloat((validAverages.reduce((a, b) => a + b, 0) / validAverages.length).toFixed(2))
      : 0;

    const totalRatingsCount = distribution.reduce((a, b) => a + b, 0);
    const distributionPercent = distribution.map(count => totalRatingsCount > 0 ? parseFloat(((count / totalRatingsCount) * 100).toFixed(1)) : 0);

    // Matriz de porcentagem 7 critérios x 5 notas (1 a 5)
    const criterionDistributionPercent = criterionCounts.map(countsRow => {
      const rowTotal = countsRow.reduce((a, b) => a + b, 0);
      if (rowTotal === 0) return [0, 0, 0, 0, 0];
      return countsRow.map(cnt => parseFloat(((cnt / rowTotal) * 100).toFixed(1)));
    });

    return {
      totalResponses: n,
      averages,
      overallMean,
      distribution,
      distributionPercent,
      criterionCounts,
      criterionDistributionPercent
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
   * Gera o HTML da Tabela 2: Estrutura do Curso (com suporte a módulos com múltiplas temáticas e rowspans)
   */
  generateTable2Html(modules = []) {
    const normMods = window.courseStructureHelper ? window.courseStructureHelper.normalize(modules) : modules;
    const sorted = [...normMods].sort((a, b) => (a.order || 0) - (b.order || 0));

    let rowsHtml = '';
    let totalHoursGestor = 0;
    let totalHoursCACS = 0;

    if (sorted.length === 0) {
      rowsHtml = `
        <tr>
          <td colspan="5" style="text-align:center; padding:3rem 1.5rem; color:var(--text-muted);">
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.6rem;">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.45;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              <div style="font-size:0.95rem; font-weight:600; color:var(--text-secondary);">Nenhuma estrutura de curso selecionada no momento.</div>
              <div style="font-size:0.82rem; color:var(--text-muted);">Clique no botão <strong>"Selecionar Estrutura"</strong> acima para aplicar um modelo com seus módulos e cargas horárias.</div>
            </div>
          </td>
        </tr>
      `;
    }

    sorted.forEach(m => {
      const gTopics = Array.isArray(m.gestorTopics) ? m.gestorTopics : [];
      const cTopics = Array.isArray(m.cacsTopics) ? m.cacsTopics : [];

      if (m.isShared) {
        // Módulo compartilhado: mescla as células de Temática e Carga Horária horizontalmente (colspan=2)
        const maxRows = Math.max(gTopics.length, 1);
        for (let i = 0; i < maxRows; i++) {
          const g = gTopics[i] || null;
          rowsHtml += '<tr>';

          if (i === 0) {
            rowsHtml += `<td ${maxRows > 1 ? `rowspan="${maxRows}"` : ''} style="text-align:center; font-weight:700; vertical-align:middle; background:rgba(255,255,255,0.02);">${m.moduleNumber || '01'}</td>`;
          }

          if (g) {
            const h = parseFloat(g.hours) || 0;
            totalHoursGestor += h;
            totalHoursCACS += h;
            rowsHtml += `<td colspan="2" style="text-align:center; vertical-align:middle;">${g.topic || '-'}</td>`;
            rowsHtml += `<td colspan="2" style="text-align:center; vertical-align:middle; font-weight:600;">${h.toFixed(1).replace('.', ',')} h</td>`;
          } else {
            rowsHtml += `<td colspan="2" style="text-align:center; color:var(--text-muted);">-</td>`;
            rowsHtml += `<td colspan="2" style="text-align:center; color:var(--text-muted);">-</td>`;
          }

          rowsHtml += '</tr>';
        }
      } else {
        // Módulo não compartilhado (independente): colunas separadas para Gestor e CACS
        const maxRows = Math.max(gTopics.length, cTopics.length, 1);

        for (let i = 0; i < maxRows; i++) {
          const g = gTopics[i] || null;
          const c = cTopics[i] || null;

          rowsHtml += '<tr>';

          // Célula do Módulo (com rowspan se houver múltiplas linhas)
          if (i === 0) {
            rowsHtml += `<td ${maxRows > 1 ? `rowspan="${maxRows}"` : ''} style="text-align:center; font-weight:700; vertical-align:middle; background:rgba(255,255,255,0.02);">${m.moduleNumber || '01'}</td>`;
          }

          // Coluna Temática Gestor
          if (g) {
            totalHoursGestor += parseFloat(g.hours) || 0;
            if (gTopics.length === 1 && maxRows > 1 && i === 0) {
              rowsHtml += `<td rowspan="${maxRows}" style="text-align:center; vertical-align:middle;">${g.topic || '-'}</td>`;
            } else if (gTopics.length > 1 || maxRows === 1) {
              rowsHtml += `<td style="text-align:center; vertical-align:middle;">${g.topic || '-'}</td>`;
            }
          } else if (gTopics.length > 1) {
            rowsHtml += `<td style="text-align:center; color:var(--text-muted);">-</td>`;
          }

          // Coluna Temática CACS
          if (c) {
            totalHoursCACS += parseFloat(c.hours) || 0;
            if (cTopics.length === 1 && maxRows > 1 && i === 0) {
              rowsHtml += `<td rowspan="${maxRows}" style="text-align:center; vertical-align:middle;">${c.topic || '-'}</td>`;
            } else if (cTopics.length > 1 || maxRows === 1) {
              rowsHtml += `<td style="text-align:center; vertical-align:middle;">${c.topic || '-'}</td>`;
            }
          } else if (cTopics.length > 1) {
            rowsHtml += `<td style="text-align:center; color:var(--text-muted);">-</td>`;
          }

          // Coluna Carga Horária Gestor
          if (g) {
            const hG = parseFloat(g.hours) || 0;
            if (gTopics.length === 1 && maxRows > 1 && i === 0) {
              rowsHtml += `<td rowspan="${maxRows}" style="text-align:center; vertical-align:middle; font-weight:600;">${hG.toFixed(1).replace('.', ',')} h</td>`;
            } else if (gTopics.length > 1 || maxRows === 1) {
              rowsHtml += `<td style="text-align:center; font-weight:600;">${hG.toFixed(1).replace('.', ',')} h</td>`;
            }
          } else if (gTopics.length > 1) {
            rowsHtml += `<td style="text-align:center; color:var(--text-muted);">-</td>`;
          }

          // Coluna Carga Horária CACS
          if (c) {
            const hC = parseFloat(c.hours) || 0;
            if (cTopics.length === 1 && maxRows > 1 && i === 0) {
              rowsHtml += `<td rowspan="${maxRows}" style="text-align:center; vertical-align:middle; font-weight:600;">${hC.toFixed(1).replace('.', ',')} h</td>`;
            } else if (cTopics.length > 1 || maxRows === 1) {
              rowsHtml += `<td style="text-align:center; font-weight:600;">${hC.toFixed(1).replace('.', ',')} h</td>`;
            }
          } else if (cTopics.length > 1) {
            rowsHtml += `<td style="text-align:center; color:var(--text-muted);">-</td>`;
          }

          rowsHtml += '</tr>';
        }
      }
    });

    return `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th rowspan="2" style="width: 80px; text-align:center; vertical-align:middle;">Módulo</th>
              <th colspan="2" style="text-align:center; vertical-align:middle;">Temática</th>
              <th colspan="2" style="text-align:center; vertical-align:middle;">Carga Horária</th>
            </tr>
            <tr>
              <th style="text-align:center; vertical-align:middle;">Gestor</th>
              <th style="text-align:center; vertical-align:middle;">CACS</th>
              <th style="width: 100px; text-align:center; vertical-align:middle;">Gestor</th>
              <th style="width: 100px; text-align:center; vertical-align:middle;">CACS</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
          ${sorted.length > 0 ? `
          <tfoot>
            <tr style="font-weight:700; background:rgba(99, 102, 241, 0.08);">
              <td colspan="3" style="text-align:center; vertical-align:middle;">Total Geral de Carga Horária:</td>
              <td style="text-align:center; vertical-align:middle; font-weight:800; color:var(--accent-blue-text);">${totalHoursGestor.toFixed(1).replace('.', ',')} h</td>
              <td style="text-align:center; vertical-align:middle; font-weight:800; color:var(--accent-emerald-text);">${totalHoursCACS.toFixed(1).replace('.', ',')} h</td>
            </tr>
          </tfoot>
          ` : ''}
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

      let statusClass = 'status-count-zero';
      if (preTot >= 2) {
        statusClass = 'status-count-many';
      } else if (preTot === 1) {
        statusClass = 'status-count-one';
      }

      rowsHtml += `
        <tr>
          <td style="text-align:center; font-family:monospace;">${m.ibgeCode || '-'}</td>
          <td><strong>${m.name}</strong> (${m.uf || 'MT'})</td>
          <td style="text-align:center;">${preC}/${insC}</td>
          <td style="text-align:center;">${preG}/${insG}</td>
          <td style="text-align:center;"><span class="attendance-status-count ${statusClass}">${preTot}/${insTot}</span></td>
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
              <td style="text-align:center;"><span class="attendance-status-count ${totalPres >= 2 ? 'status-count-many' : (totalPres === 1 ? 'status-count-one' : 'status-count-zero')}">${totalPres}/${totalInsc}</span></td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  }
}

window.statsEngine = new StatsEngine();
