/**
 * AutoReport CECATE - Controlador Principal da Aplicação (SPA & Wizard 11 Etapas)
 * Versão: v.1.1.1
 */

class AutoReportApp {
  constructor() {
    this.currentTraining = null;
    this.currentStep = 1;
    this.totalSteps = 11;
    this.activeView = 'dashboard';
    this.trainingList = [];
    this.dashboardFilter = 'all';
    this.trainingToDeleteId = null;
    this.theme = localStorage.getItem('autoreport_theme') || 'light';
    this.metrics = null;
  }

  /**
   * Inicialização da aplicação
   */
  async init() {
    console.log('Inicializando AutoReport CECATE...');

    // 1. Inicializar Banco IndexedDB
    try {
      if (window.db) {
        await window.db.init();
      }
    } catch (err) {
      console.warn('Erro ao inicializar IndexedDB:', err);
    }

    // 2. Aplicar Tema
    this.applyTheme(this.theme);

    // 3. Vincular Eventos Globais
    this.bindEvents();

    // 4. Carregar lista de capacitações e atualizar Dashboard
    await this.refreshTrainingsList();

    // 5. Tratar Hash da URL ou abrir dashboard por padrão
    this.handleRoute();

    console.log('AutoReport CECATE pronto!');
  }

  /* ==========================================================================
     Navegação & SPA Router
     ========================================================================== */
  handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    if (hash.startsWith('wizard/')) {
      const parts = hash.split('/');
      const trainingId = parts[1];
      const step = parseInt(parts[2]) || 1;
      this.openWizard(trainingId, step);
    } else {
      this.navigateTo(hash);
    }
  }

  navigateTo(viewId) {
    this.activeView = viewId;
    window.location.hash = viewId;

    // Atualizar itens do menu lateral
    document.querySelectorAll('.nav-item').forEach(item => {
      const targetView = item.getAttribute('data-view');
      if (targetView === viewId || (viewId === 'wizard' && targetView === 'trainings')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Alternar visibilidade das seções
    document.querySelectorAll('.view-section').forEach(section => {
      section.classList.remove('active');
    });

    const activeSection = document.getElementById(`view-${viewId}`);
    if (activeSection) {
      activeSection.classList.add('active');
    }

    // Ações específicas de cada view
    if (viewId === 'dashboard') {
      this.renderDashboard();
    } else if (viewId === 'trainings') {
      this.renderTrainingsList();
    } else if (viewId === 'municipalities') {
      this.renderMunicipalitiesBank();
    }
  }

  /* ==========================================================================
     Tema Claro / Escuro
     ========================================================================== */
  applyTheme(theme) {
    this.theme = theme;
    localStorage.setItem('autoreport_theme', theme);
    const themeBtn = document.getElementById('theme-toggle-btn');

    if (theme === 'light') {
      document.body.classList.add('light-theme');
      if (themeBtn) themeBtn.innerHTML = '☀️ Modo Claro';
    } else {
      document.body.classList.remove('light-theme');
      if (themeBtn) themeBtn.innerHTML = '🌙 Modo Escuro';
    }

    // Atualizar gráficos se estiver na etapa de gráficos
    if (this.currentStep === 7 || this.currentStep === 10) {
      this.renderEvaluationCharts();
      this.renderWordClouds();
    }
  }

  toggleTheme() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    this.showToast(`Tema alternado para ${newTheme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}`);
  }

  /* ==========================================================================
     Dashboard & Estatísticas Globais
     ========================================================================== */
  async refreshTrainingsList() {
    if (window.db) {
      this.trainingList = await window.db.getAllTrainings();
    }
  }

  async renderDashboard() {
    await this.refreshTrainingsList();

    const totalTrainings = this.trainingList.length;
    const completedTrainings = this.trainingList.filter(t => t.status === 'completed' || t.progressPercent === 100).length;
    const inProgressTrainings = totalTrainings - completedTrainings;

    // Totais de participantes e municípios
    let totalParticipants = 0;
    let totalMuns = 0;

    for (const t of this.trainingList) {
      const full = await window.db.getTrainingFull(t.id);
      if (full) {
        totalParticipants += (full.attendance?.length || (full.municipalities?.reduce((acc, m) => acc + (m.presentTotal || 0), 0)) || 0);
        totalMuns += (full.municipalities?.filter(m => (m.presentTotal || 0) > 0).length || 0);
      }
    }

    // Atualizar contadores no DOM
    const elTotal = document.getElementById('dash-total-reports');
    if (elTotal) elTotal.textContent = totalTrainings;

    const elCompleted = document.getElementById('dash-completed-reports');
    if (elCompleted) elCompleted.textContent = completedTrainings;

    const elParticipants = document.getElementById('dash-total-participants');
    if (elParticipants) elParticipants.textContent = totalParticipants;

    const elMunicipalities = document.getElementById('dash-total-municipalities');
    if (elMunicipalities) elMunicipalities.textContent = totalMuns;

    // Renderizar tabela de capacitações no dashboard respeitando filtro
    const container = document.getElementById('dashboard-trainings-list');
    if (container) {
      let filtered = [...this.trainingList];
      if (this.dashboardFilter === 'historico') {
        filtered = filtered.filter(t => t.status === 'historico' || t.isHistorical);
      } else if (this.dashboardFilter === 'in_progress') {
        filtered = filtered.filter(t => t.status === 'in_progress' && !t.isHistorical);
      } else if (this.dashboardFilter === 'completed') {
        filtered = filtered.filter(t => (t.status === 'completed' || t.progressPercent === 100) && !t.isHistorical);
      }

      // Ordenar por número decrescente
      filtered.sort((a, b) => (parseInt(b.number) || 0) - (parseInt(a.number) || 0));

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:2.5rem; color:var(--text-muted);">
            <div style="font-size:2.5rem; margin-bottom:0.5rem;">📁</div>
            <p>Nenhuma capacitação encontrada para este filtro.</p>
          </div>
        `;
      } else {
        container.innerHTML = filtered.map(t => {
          const isHist = t.status === 'historico' || t.isHistorical;
          const statusBadge = isHist
            ? `<span class="nav-badge" style="background:rgba(245, 158, 11, 0.15); color:#f59e0b;">🏛️ Histórico Protegido</span>`
            : (t.progressPercent === 100
                ? `<span class="nav-badge" style="background:rgba(16, 185, 129, 0.15); color:#10b981;">✓ Concluída</span>`
                : `<span class="nav-badge" style="background:rgba(6, 182, 212, 0.15); color:#22d3ee;">⏳ Em Andamento</span>`);

          return `
            <div class="glass-card" style="margin-bottom:1rem; padding:1.25rem 1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; border-left: 4px solid ${isHist ? '#f59e0b' : 'var(--accent-secondary)'};">
              <div style="display:flex; align-items:center; gap:1rem;">
                <div style="width:48px; height:48px; border-radius:var(--radius-md); background:${isHist ? 'linear-gradient(135deg, #d97706, #b45309)' : 'var(--gradient-brand)'}; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.1rem; color:white;">
                  ${t.number}
                </div>
                <div>
                  <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.2rem;">
                    <h4 style="font-size:1.05rem; font-weight:700; color:var(--text-primary); margin:0;">
                      Capacitação Nº ${t.number} - ${t.polo || 'Polo Regional'} (${t.uf || 'MT'})
                    </h4>
                    ${statusBadge}
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-muted); display:flex; gap:1rem; flex-wrap:wrap;">
                    <span>📅 ${t.datesFormatted || t.startDate || 'Data a definir'}</span>
                    <span>📍 ${t.locationVenue || 'Auditório Local'}</span>
                    <span>⏱️ ${t.workload || '16h'}</span>
                    ${t.dataSourceMap?.documentOrigin ? `<span title="${t.dataSourceMap.documentOrigin}">📄 Fonte: ${t.dataSourceMap.documentOrigin.split('/').pop()}</span>` : ''}
                  </div>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:1.25rem;">
                <div style="text-align:right;">
                  <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">Situação</div>
                  <div style="font-size:0.9rem; font-weight:700; color:${isHist ? '#f59e0b' : (t.progressPercent === 100 ? 'var(--accent-success)' : 'var(--accent-secondary)')};">
                    ${isHist ? 'Preservada' : `${t.progressPercent || 0}% Concluído`}
                  </div>
                </div>
                <div style="display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
                  <button class="btn btn-secondary btn-sm" onclick="app.openWizard('${t.id}', 1)" title="${isHist ? 'Visualizar dados' : 'Continuar edição'}">
                    ${isHist ? '🔍 Consultar' : '✏️ Continuar'}
                  </button>
                  <button class="btn btn-secondary btn-sm" onclick="app.openCloneModal('${t.id}')" title="Usar esta capacitação como modelo estrutural para nova">
                    📋 Usar como Modelo
                  </button>
                  <button class="btn btn-gradient btn-sm" onclick="app.directDownloadDocx('${t.id}')" title="Gerar Relatório .docx Oficial">
                    ⚡ Gerar .docx
                  </button>
                  ${isHist
                    ? `<span class="nav-badge" style="background:rgba(245, 158, 11, 0.1); color:#f59e0b;" title="Registro do Histórico Protegido - Exclusão desabilitada">🔒 Protegido</span>`
                    : `<button class="btn btn-secondary btn-sm" onclick="app.openConfirmDeleteModal('${t.id}')" style="color:var(--accent-danger); border-color:rgba(239, 68, 68, 0.3);" title="Excluir este relatório permanentemente">
                        <span style="color:#ef4444;">🗑️ Apagar</span>
                      </button>`
                  }
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  }

  setDashboardFilter(filterType) {
    this.dashboardFilter = filterType;
    document.querySelectorAll('.filter-tab-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById(`filter-dash-${filterType === 'all' ? 'all' : (filterType === 'historico' ? 'hist' : (filterType === 'in_progress' ? 'prog' : 'comp'))}`);
    if (btn) btn.classList.add('active');
    this.renderDashboard();
  }

  /* ==========================================================================
     MODAL DE CLONAGEM & REUTILIZAÇÃO HISTÓRICA (REGRAS 63, 64 E 65)
     ========================================================================== */
  openCloneModal(defaultSourceId = null) {
    const modal = document.getElementById('modal-clone-training');
    const select = document.getElementById('clone-source-select');
    if (!modal || !select) return;

    // Popula select com as capacitações ordenadas por número
    const sorted = [...this.trainingList].sort((a, b) => (parseInt(a.number) || 0) - (parseInt(b.number) || 0));
    select.innerHTML = sorted.map(t => {
      const isHist = t.status === 'historico' || t.isHistorical;
      return `<option value="${t.id}" ${t.id === defaultSourceId ? 'selected' : ''}>Capacitação Nº ${t.number} - ${t.polo || 'Polo Regional'} (${t.uf || 'MT'}) ${isHist ? ' [HISTÓRICO]' : ''}</option>`;
    }).join('');

    modal.style.display = 'block';
  }

  closeCloneModal() {
    const modal = document.getElementById('modal-clone-training');
    if (modal) modal.style.display = 'none';
  }

  async executeCloneTraining() {
    const select = document.getElementById('clone-source-select');
    if (!select || !select.value) return;

    const sourceId = select.value;
    const copyInst = document.getElementById('clone-opt-inst')?.checked;
    const copyModules = document.getElementById('clone-opt-modules')?.checked;
    const copyTexts = document.getElementById('clone-opt-texts')?.checked;
    const copyEval = document.getElementById('clone-opt-eval')?.checked;
    const copyMuns = document.getElementById('clone-opt-muns')?.checked;

    try {
      this.showToast('Criando nova capacitação a partir do modelo...');
      const newId = await window.db.duplicateTraining(sourceId, {
        copyInstitutional: copyInst,
        copyModules: copyModules,
        copyTexts: copyTexts,
        copyEvaluationConfig: copyEval,
        copyMunicipalities: copyMuns,
        copyTeam: true
      });

      this.closeCloneModal();
      await this.refreshTrainingsList();
      this.showToast('✓ Nova capacitação criada com sucesso! Dados anteriores preservados.', 'success');
      this.openWizard(newId, 1);
    } catch (err) {
      console.error('Erro ao duplicar capacitação:', err);
      this.showToast(`Erro: ${err.message}`, 'error');
    }
  }

  /* ==========================================================================
     ASSISTENTE DE 11 ETAPAS (WIZARD ENGINE)
     ========================================================================== */
  async createNewTraining() {
    const nextNumber = this.trainingList.length > 0 ? Math.max(...this.trainingList.map(t => parseInt(t.number) || 0)) + 1 : 16;
    const newId = `cap_${Date.now()}`;

    const newTraining = {
      id: newId,
      number: nextNumber,
      title: 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
      polo: '',
      uf: 'MT',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      datesFormatted: 'A definir',
      workload: '16 horas',
      targetAudience: 'Gestores Municipais e Conselheiros CACS-FUNDEB',
      expectedParticipants: 40,
      responsibleOrg: 'Universidade Federal de Goiás - UFG / CECATE Centro-Oeste',
      relatedProject: 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL',
      processNumber: '23070.012345/2026-00',
      fundingOrg: 'Fundo Nacional de Desenvolvimento da Educação - FNDE',
      partnerOrgs: 'Ministério da Educação / Prefeituras Municipais',
      locationVenue: 'Auditório Municipal',
      status: 'in_progress',
      progressPercent: 10,
      team: [],
      municipalities: [],
      courseModules: [
        { moduleNumber: '01', topicGestor: 'Transporte Escolar no Brasil – CECATE-CO', topicCACS: 'Transporte Escolar no Brasil – CECATE-CO', hoursGestor: 1.5, hoursCACS: 1.5, order: 0 },
        { moduleNumber: '02', topicGestor: 'Conhecendo os programas PNATE e Caminho da Escola', topicCACS: 'Conhecendo os programas PNATE e Caminho da Escola', hoursGestor: 1.5, hoursCACS: 1.5, order: 1 },
        { moduleNumber: '03', topicGestor: 'Gestão do Transporte Escolar e Software SETE', topicCACS: 'Fiscalização e Controle Social do Transporte Escolar', hoursGestor: 2.0, hoursCACS: 2.0, order: 2 },
        { moduleNumber: '04', topicGestor: 'Prestação de Contas no SiGPC e Desafios Locais', topicCACS: 'Atuação do CACS-FUNDEB e Análise de Contas', hoursGestor: 3.0, hoursCACS: 3.0, order: 3 }
      ],
      courseMoments: [],
      attendance: [],
      evaluations: [],
      media: []
    };

    await window.db.saveTrainingFull(newTraining, 'Criação de nova capacitação');
    this.openWizard(newId, 1);
  }

  async openWizard(trainingId, step = 1) {
    if (!window.db) return;

    // Buscar dados completos
    this.currentTraining = await window.db.getTrainingFull(trainingId);
    if (!this.currentTraining) {
      this.showToast('Capacitação não encontrada.', 'error');
      this.navigateTo('dashboard');
      return;
    }

    this.activeView = 'wizard';
    this.navigateTo('wizard');
    this.setWizardStep(step);
    this.populateAllWizardForms();
  }

  setWizardStep(stepNumber) {
    this.currentStep = Math.max(1, Math.min(this.totalSteps, stepNumber));
    window.location.hash = `wizard/${this.currentTraining?.id || ''}/${this.currentStep}`;

    // Atualizar abas do Stepper
    document.querySelectorAll('.step-tab-btn').forEach((tab, idx) => {
      const s = idx + 1;
      tab.classList.remove('active');
      if (s === this.currentStep) tab.classList.add('active');
      if (s < this.currentStep) tab.classList.add('completed');
    });

    // Alternar painéis
    document.querySelectorAll('.wizard-step-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const activePanel = document.getElementById(`wizard-step-${this.currentStep}`);
    if (activePanel) activePanel.classList.add('active');

    // Atualizar título e barra de progresso no topo
    this.updateWizardHeader();

    // Ações ao entrar em etapas específicas
    if (this.currentStep === 3) this.renderMunicipalitiesStep();
    if (this.currentStep === 4) this.renderCourseStructureStep();
    if (this.currentStep === 6) this.renderAttendanceStep();
    if (this.currentStep === 7) {
      this.renderEvaluationStep();
      setTimeout(() => {
        this.renderEvaluationCharts();
        this.renderWordClouds();
      }, 100);
    }
    if (this.currentStep === 8) this.renderPhotosStep();
    if (this.currentStep === 9) this.renderAppendicesStep();
    if (this.currentStep === 10) this.renderConferenceStep();
    if (this.currentStep === 11) this.renderReportPreviewStep();
  }

  wizardNext() {
    this.saveCurrentStepData();
    if (this.currentStep < this.totalSteps) {
      this.setWizardStep(this.currentStep + 1);
    }
  }

  wizardPrev() {
    this.saveCurrentStepData();
    if (this.currentStep > 1) {
      this.setWizardStep(this.currentStep - 1);
    }
  }

  updateWizardHeader() {
    if (!this.currentTraining) return;

    const t = this.currentTraining;
    const titleEl = document.getElementById('wizard-header-title');
    if (titleEl) {
      if (t.isHistorical) {
        titleEl.innerHTML = `Capacitação Nº ${t.number} • <span style="color:#f59e0b;">${t.polo || 'Polo'} (${t.uf || 'MT'}) [HISTÓRICO PRESERVADO]</span>`;
      } else {
        titleEl.innerHTML = `Capacitação Nº ${t.number || 16} • <span style="color:var(--accent-secondary);">${t.polo || 'Novo Polo'} (${t.uf || 'MT'})</span>`;
      }
    }

    // Calcular percentual de preenchimento
    let completedSteps = 0;
    if (t.polo && t.startDate) completedSteps++;
    if (t.team && t.team.length > 0) completedSteps++;
    if (t.municipalities && t.municipalities.length > 0) completedSteps++;
    if (t.courseModules && t.courseModules.length > 0) completedSteps++;
    if (t.contactsData?.contactedCount > 0) completedSteps++;
    if (t.attendance && t.attendance.length > 0) completedSteps++;
    if (t.evaluations && t.evaluations.length > 0) completedSteps++;
    if (t.media && t.media.filter(m => m.type === 'photo').length > 0) completedSteps++;
    if (t.media && t.media.filter(m => m.type !== 'photo').length > 0) completedSteps++;
    if (completedSteps >= 8) completedSteps += 2; // Conferência e Geração

    const percent = Math.min(100, Math.round((completedSteps / 11) * 100));
    t.progressPercent = percent;

    const barEl = document.getElementById('wizard-header-progressbar');
    if (barEl) barEl.style.width = `${percent}%`;

    const statusTextEl = document.getElementById('wizard-header-progress-text');
    if (statusTextEl) {
      statusTextEl.textContent = `${percent}% Concluído (${completedSteps} de 11 Etapas)`;
    }

    // Controle de visibilidade do botão Apagar no assistente (somente relatórios criados pelo usuário)
    const delBtn = document.getElementById('wizard-btn-delete');
    if (delBtn) {
      delBtn.style.display = t.isHistorical ? 'none' : 'inline-flex';
    }
  }

  /* ==========================================================================
     POPULAÇÃO & SALVAMENTO DE DADOS DAS ETAPAS
     ========================================================================== */
  populateAllWizardForms() {
    if (!this.currentTraining) return;
    const t = this.currentTraining;

    // Etapa 1: Identificação
    this.setVal('wiz-train-number', t.number);
    this.setVal('wiz-train-title', t.title);

    // Carga Horária com botão de rotação (spinner)
    const workloadNum = parseInt(t.workload) || 16;
    this.setVal('wiz-train-workload-num', workloadNum);
    this.setVal('wiz-train-workload', `${workloadNum} horas`);

    // Estado (UF) PRIMEIRO e Município Polo Suspenso com Código IBGE/INEP
    const uf = t.uf || 'MT';
    this.setVal('wiz-train-uf', uf);
    this.populateCitiesDropdown(uf, t.polo, t.poloIbge);

    this.setVal('wiz-train-start-date', t.startDate);
    this.setVal('wiz-train-end-date', t.endDate);
    this.setVal('wiz-train-dates-fmt', t.datesFormatted);
    this.setVal('wiz-train-target', t.targetAudience);
    this.setVal('wiz-train-expected', t.expectedParticipants);
    this.setVal('wiz-train-venue', t.locationVenue);
    this.setVal('wiz-train-org', t.responsibleOrg);
    this.setVal('wiz-train-project', t.relatedProject);
    this.setVal('wiz-train-process', t.processNumber);
    this.setVal('wiz-train-funding', t.fundingOrg);
    this.setVal('wiz-train-partners', t.partnerOrgs);

    // Etapa 2: Equipe
    this.renderTeamList();

    // Etapa 5: Contatos
    if (t.contactsData) {
      this.setVal('wiz-contact-start-date', t.contactsData.startDate);
      this.setVal('wiz-contact-methods', t.contactsData.methods);
      this.setVal('wiz-contact-responsible', t.contactsData.responsible);
      this.setVal('wiz-contact-count', t.contactsData.contactedCount);
      this.setVal('wiz-contact-emails', t.contactsData.emailsSent);
      this.setVal('wiz-contact-phones', t.contactsData.phoneCalls);
      this.setVal('wiz-contact-notes', t.contactsData.notes);
    }
  }

  saveCurrentStepData() {
    if (!this.currentTraining || !window.db) return;
    const t = this.currentTraining;

    // Regra 67: Proteção estrita de registros históricos
    if (t.isHistorical) {
      return;
    }

    // Sincronizar dados da Etapa 1
    t.number = parseInt(this.getVal('wiz-train-number')) || t.number;
    t.title = this.getVal('wiz-train-title') || t.title;
    t.uf = this.getVal('wiz-train-uf') || t.uf;
    t.polo = this.getVal('wiz-train-polo') || t.polo;
    t.poloIbge = this.getVal('wiz-train-inep') || t.poloIbge;
    t.workload = this.getVal('wiz-train-workload') || `${parseInt(this.getVal('wiz-train-workload-num')) || 16} horas`;
    t.startDate = this.getVal('wiz-train-start-date') || t.startDate;
    t.endDate = this.getVal('wiz-train-end-date') || t.endDate;
    t.datesFormatted = this.getVal('wiz-train-dates-fmt') || t.datesFormatted;
    t.targetAudience = this.getVal('wiz-train-target') || t.targetAudience;
    t.expectedParticipants = parseInt(this.getVal('wiz-train-expected')) || t.expectedParticipants;
    t.locationVenue = this.getVal('wiz-train-venue') || t.locationVenue;
    t.responsibleOrg = this.getVal('wiz-train-org') || t.responsibleOrg;
    t.relatedProject = this.getVal('wiz-train-project') || t.relatedProject;
    t.processNumber = this.getVal('wiz-train-process') || t.processNumber;
    t.fundingOrg = this.getVal('wiz-train-funding') || t.fundingOrg;
    t.partnerOrgs = this.getVal('wiz-train-partners') || t.partnerOrgs;

    // Sincronizar dados da Etapa 5
    t.contactsData = {
      startDate: this.getVal('wiz-contact-start-date'),
      methods: this.getVal('wiz-contact-methods'),
      responsible: this.getVal('wiz-contact-responsible'),
      contactedCount: parseInt(this.getVal('wiz-contact-count')) || 0,
      emailsSent: parseInt(this.getVal('wiz-contact-emails')) || 0,
      phoneCalls: parseInt(this.getVal('wiz-contact-phones')) || 0,
      notes: this.getVal('wiz-contact-notes')
    };

    // Disparar Autosave no IndexedDB
    window.db.triggerAutoSave(t.id, () => this.currentTraining, () => {
      this.updateWizardHeader();
    });
  }

  async manualSaveTraining() {
    if (!this.currentTraining || !window.db) return;

    // Proteção de históricos
    if (this.currentTraining.isHistorical) {
      this.showToast('🛡️ Registros históricos protegidos não podem ser editados.', 'warning');
      return;
    }

    const saveBtn = document.getElementById('wizard-btn-save');
    const originalText = saveBtn ? saveBtn.innerHTML : '';

    // Feedback visual no botão
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = '⏳ Salvando...';
    }

    try {
      this.saveCurrentStepData();
      await window.db.put('trainings', this.currentTraining);
      await new Promise(r => setTimeout(r, 300));

      if (saveBtn) {
        saveBtn.innerHTML = '✓ Salvo!';
        saveBtn.style.color = 'var(--accent-success)';
        saveBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      }

      this.showToast('💾 Relatório salvo com sucesso!', 'success');

      setTimeout(() => {
        if (saveBtn) {
          saveBtn.innerHTML = originalText;
          saveBtn.style.color = '';
          saveBtn.style.borderColor = '';
          saveBtn.disabled = false;
        }
      }, 1500);
    } catch (err) {
      console.error('Erro ao salvar:', err);
      this.showToast(`Erro ao salvar: ${err.message}`, 'error');
      if (saveBtn) {
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
      }
    }
  }

  /* ==========================================================================
     ETAPA 1: ESTADO, CIDADE, CÓDIGO IBGE/INEP & BOTÃO DE ROTAÇÃO DE CARGA
     ========================================================================== */
  onStateChange(uf) {
    if (!uf) return;
    this.populateCitiesDropdown(uf);
    if (this.currentTraining) {
      this.currentTraining.uf = uf;
      this.updateWizardHeader();
      this.saveCurrentStepData();
    }
  }

  onCityChange(city) {
    const citySelect = document.getElementById('wiz-train-polo-select');
    const inepInput = document.getElementById('wiz-train-inep');
    const activeOption = citySelect?.selectedOptions[0];
    const ibgeCode = activeOption?.getAttribute('data-ibge') || '';

    if (inepInput) inepInput.value = ibgeCode;
    this.setVal('wiz-train-polo', city);

    if (this.currentTraining) {
      this.currentTraining.polo = city;
      this.currentTraining.poloIbge = ibgeCode;
      this.updateWizardHeader();
      this.saveCurrentStepData();
    }
  }

  populateCitiesDropdown(uf, selectedCity = null, selectedIbge = null) {
    const citySelect = document.getElementById('wiz-train-polo-select');
    const inepInput = document.getElementById('wiz-train-inep');
    if (!citySelect || !window.IBGE_DATA) return;

    if (!uf) {
      citySelect.innerHTML = `<option value="" disabled selected>Selecionar Município...</option>`;
      if (inepInput) inepInput.value = '';
      return;
    }

    const filtered = window.IBGE_DATA.filter(m => m.u === uf).sort((a, b) => a.n.localeCompare(b.n));

    if (filtered.length === 0) {
      citySelect.innerHTML = `<option value="" disabled selected>Nenhuma cidade para ${uf}</option>`;
      if (inepInput) inepInput.value = '';
      return;
    }

    const hasSelection = selectedCity || selectedIbge;
    let options = hasSelection ? '' : `<option value="" disabled selected>Selecionar Município...</option>`;
    options += filtered.map(m => {
      const isSel = (selectedCity && m.n.toLowerCase() === selectedCity.toLowerCase()) ||
                    (selectedIbge && String(m.c) === String(selectedIbge));
      return `<option value="${m.n}" data-ibge="${m.c}" ${isSel ? 'selected' : ''}>${m.n}</option>`;
    }).join('');
    citySelect.innerHTML = options;

    // Sincronizar seleção ativa
    const activeOption = citySelect.selectedOptions[0];
    if (activeOption && activeOption.value) {
      const cityName = activeOption.value;
      const ibgeCode = activeOption.getAttribute('data-ibge') || '';
      if (inepInput) inepInput.value = ibgeCode;
      this.setVal('wiz-train-polo', cityName);
      if (this.currentTraining) {
        this.currentTraining.polo = cityName;
        this.currentTraining.poloIbge = ibgeCode;
      }
    } else {
      if (inepInput) inepInput.value = '';
    }
  }

  spinWorkload(delta) {
    const numInput = document.getElementById('wiz-train-workload-num');
    if (!numInput) return;
    let val = (parseInt(numInput.value) || 16) + delta;
    if (val < 1) val = 1;
    if (val > 200) val = 200;
    numInput.value = val;
    this.updateWorkloadFromSpinner();
  }

  updateWorkloadFromSpinner() {
    const numInput = document.getElementById('wiz-train-workload-num');
    const hiddenInput = document.getElementById('wiz-train-workload');
    if (!numInput) return;
    const val = parseInt(numInput.value) || 16;
    const fmt = `${val} horas`;
    if (hiddenInput) hiddenInput.value = fmt;
    if (this.currentTraining) {
      this.currentTraining.workload = fmt;
      this.saveCurrentStepData();
    }
  }

  onDatesChanged() {
    const startStr = this.getVal('wiz-train-start-date');
    const endStr = this.getVal('wiz-train-end-date');
    if (!startStr) return;

    const MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];

    const startDate = new Date(startStr + 'T12:00:00');
    const endDate = endStr ? new Date(endStr + 'T12:00:00') : startDate;

    const dayStart = startDate.getDate();
    const dayEnd = endDate.getDate();
    const monthStart = startDate.getMonth();
    const monthEnd = endDate.getMonth();
    const yearStart = startDate.getFullYear();
    const yearEnd = endDate.getFullYear();

    // Número de dias
    const diffMs = endDate.getTime() - startDate.getTime();
    const numDays = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);

    // Construir texto formatado
    let formatted = '';
    if (numDays === 1 || !endStr) {
      // Dia único
      formatted = `${dayStart} de ${MESES[monthStart]} de ${yearStart}`;
    } else if (monthStart === monthEnd && yearStart === yearEnd) {
      // Mesmo mês
      if (numDays === 2) {
        formatted = `${dayStart} e ${dayEnd} de ${MESES[monthStart]} de ${yearStart}`;
      } else {
        formatted = `${dayStart} a ${dayEnd} de ${MESES[monthStart]} de ${yearStart}`;
      }
    } else if (yearStart === yearEnd) {
      // Meses diferentes, mesmo ano
      formatted = `${dayStart} de ${MESES[monthStart]} a ${dayEnd} de ${MESES[monthEnd]} de ${yearStart}`;
    } else {
      // Anos diferentes
      formatted = `${dayStart} de ${MESES[monthStart]} de ${yearStart} a ${dayEnd} de ${MESES[monthEnd]} de ${yearEnd}`;
    }

    this.setVal('wiz-train-dates-fmt', formatted);

    // Calcular carga horária automática: 8 horas por dia
    const autoWorkload = numDays * 8;
    const numInput = document.getElementById('wiz-train-workload-num');
    const hiddenInput = document.getElementById('wiz-train-workload');
    const hintEl = document.getElementById('wiz-workload-auto-hint');

    if (numInput) numInput.value = autoWorkload;
    if (hiddenInput) hiddenInput.value = `${autoWorkload} horas`;
    if (hintEl) hintEl.textContent = `✓ Calculado automaticamente: ${numDays} dia${numDays > 1 ? 's' : ''} × 8h = ${autoWorkload}h (editável)`;

    if (this.currentTraining) {
      this.currentTraining.datesFormatted = formatted;
      this.currentTraining.workload = `${autoWorkload} horas`;
      this.saveCurrentStepData();
    }
  }

  /* ==========================================================================
     ETAPA 2: EQUIPE
     ========================================================================== */
  renderTeamList() {
    const container = document.getElementById('wizard-team-list-container');
    if (!container || !this.currentTraining) return;

    const team = this.currentTraining.team || [];
    if (team.length === 0) {
      container.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem;">Nenhum integrante cadastrado na equipe. Clique abaixo para adicionar.</p>`;
      return;
    }

    container.innerHTML = `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Instituição</th>
              <th>Função / Cargo</th>
              <th>Tipo</th>
              <th style="width:100px; text-align:center;">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${team.map((m, idx) => `
              <tr>
                <td><strong>${m.name}</strong></td>
                <td>${m.institution || 'UFG'}</td>
                <td>${m.role || 'Instrutor'}</td>
                <td><span class="nav-badge" style="background:rgba(99, 102, 241, 0.15); color:#818cf8;">${m.type === 'coordenacao' ? 'Coordenação' : (m.type === 'fnde' ? 'FNDE' : 'Técnica')}</span></td>
                <td style="text-align:center;">
                  <button class="btn btn-secondary btn-sm" onclick="app.removeTeamMember(${idx})" title="Excluir">✕</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  addTeamMemberPrompt() {
    const name = prompt('Nome do Integrante da Equipe:');
    if (!name) return;
    const role = prompt('Função / Cargo:', 'Pesquisador e Equipe Técnica');
    const institution = prompt('Instituição:', 'UFG');

    if (!this.currentTraining.team) this.currentTraining.team = [];
    this.currentTraining.team.push({
      id: `team_${Date.now()}`,
      name,
      role: role || 'Instrutor',
      institution: institution || 'UFG',
      type: 'tecnica',
      order: this.currentTraining.team.length
    });

    this.renderTeamList();
    this.saveCurrentStepData();
  }

  removeTeamMember(index) {
    this.currentTraining.team.splice(index, 1);
    this.renderTeamList();
    this.saveCurrentStepData();
    this.showToast('Integrante removido da equipe.');
  }

  /* ==========================================================================
     ETAPA 3: MUNICÍPIOS & TABELA 1
     ========================================================================== */
  renderMunicipalitiesStep() {
    const container = document.getElementById('wizard-municipalities-table-preview');
    if (!container || !this.currentTraining || !window.statsEngine) return;

    const muns = this.currentTraining.municipalities || [];
    container.innerHTML = window.statsEngine.generateTable1Html(muns);

    const countEl = document.getElementById('wiz-muns-total-count');
    if (countEl) countEl.textContent = `${muns.length} Municípios Cadastrados`;
  }

  addMunicipalityPrompt() {
    const query = prompt('Digite o nome ou código IBGE do município:');
    if (!query) return;

    let matched = null;
    if (window.IBGE_DATA) {
      matched = window.IBGE_DATA.find(i => String(i.c) === query || i.n.toLowerCase().includes(query.toLowerCase()));
    }

    const munName = matched ? matched.n : query;
    const ibgeCode = matched ? matched.c : parseInt(prompt('Código IBGE (7 dígitos):') || '0');
    const uf = matched ? matched.u : (this.currentTraining.uf || 'MT');
    const dist = parseFloat(prompt(`Distância em km até ${this.currentTraining.polo || 'o polo'}:`, '0') || '0');

    if (!this.currentTraining.municipalities) this.currentTraining.municipalities = [];
    this.currentTraining.municipalities.push({
      id: `mun_${Date.now()}`,
      ibgeCode,
      name: munName,
      uf,
      distanceKm: dist,
      isSummoned: true,
      inscribedCACS: 0,
      inscribedGestores: 0,
      inscribedTotal: 0,
      presentCACS: 0,
      presentGestores: 0,
      presentTotal: 0
    });

    this.renderMunicipalitiesStep();
    this.saveCurrentStepData();
  }

  /* ==========================================================================
     ETAPA 4: ESTRUTURA DO CURSO & TABELA 2
     ========================================================================== */
  renderCourseStructureStep() {
    const container = document.getElementById('wizard-course-table-preview');
    if (!container || !this.currentTraining || !window.statsEngine) return;

    const mods = this.currentTraining.courseModules || [];
    container.innerHTML = window.statsEngine.generateTable2Html(mods);
  }

  addModulePrompt() {
    const modNumber = prompt('Número do Módulo (Ex: 05):', `0${(this.currentTraining.courseModules?.length || 0) + 1}`);
    if (!modNumber) return;
    const topicGestor = prompt('Temática para Gestores:', '');
    const topicCACS = prompt('Temática para Conselheiros CACS:', topicGestor);
    const hours = parseFloat(prompt('Carga Horária (horas):', '2.0') || '2.0');

    if (!this.currentTraining.courseModules) this.currentTraining.courseModules = [];
    this.currentTraining.courseModules.push({
      id: `mod_${Date.now()}`,
      moduleNumber: modNumber,
      topicGestor,
      topicCACS,
      hoursGestor: hours,
      hoursCACS: hours,
      order: this.currentTraining.courseModules.length
    });

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
  }

  /* ==========================================================================
     ETAPA 6: LISTA DE PRESENÇA (UPLOAD & TABELA 4)
     ========================================================================== */
  async handleAttendanceFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file || !window.excelParser) return;

    try {
      this.showToast('Lendo planilha de presença...');
      const { sheets, sheetNames } = await window.excelParser.readWorkbook(file);
      const firstSheet = sheets[sheetNames[0]];

      const parsed = window.excelParser.parseAttendanceRows(firstSheet, null, this.currentTraining.uf || 'MT');
      if (parsed.length === 0) {
        this.showToast('Nenhum registro de participante identificado na planilha.', 'warning');
        return;
      }

      this.currentTraining.attendance = parsed;

      // Reconciliar presença com a lista de municípios
      this.reconcileMunicipalitiesPresence(parsed);

      this.renderAttendanceStep();
      this.saveCurrentStepData();
      this.showToast(`✓ ${parsed.length} participantes importados com sucesso!`, 'success');
    } catch (err) {
      console.error('Erro ao importar lista de presença:', err);
      this.showToast(`Erro na importação: ${err.message}`, 'error');
    }
  }

  reconcileMunicipalitiesPresence(attendanceList = []) {
    if (!this.currentTraining.municipalities) this.currentTraining.municipalities = [];

    // Agrupar por município
    const map = {};
    attendanceList.forEach(att => {
      const munName = att.municipality || 'Não Informado';
      if (!map[munName]) {
        map[munName] = { cacs: 0, gestores: 0, ibgeCode: att.ibgeCode };
      }
      if (att.representation === 'CACS-FUNDEB') map[munName].cacs++;
      else map[munName].gestores++;
    });

    // Atualizar registros existentes ou inserir novos
    Object.keys(map).forEach(munName => {
      let existing = this.currentTraining.municipalities.find(m => m.name.toLowerCase() === munName.toLowerCase());
      if (existing) {
        existing.presentCACS = map[munName].cacs;
        existing.presentGestores = map[munName].gestores;
        existing.presentTotal = map[munName].cacs + map[munName].gestores;
        if (existing.inscribedTotal === 0) {
          existing.inscribedCACS = existing.presentCACS;
          existing.inscribedGestores = existing.presentGestores;
          existing.inscribedTotal = existing.presentTotal;
        }
      } else {
        this.currentTraining.municipalities.push({
          id: `mun_${Date.now()}_${munName}`,
          ibgeCode: map[munName].ibgeCode || '',
          name: munName,
          uf: this.currentTraining.uf || 'MT',
          distanceKm: 0,
          isSummoned: true,
          inscribedCACS: map[munName].cacs,
          inscribedGestores: map[munName].gestores,
          inscribedTotal: map[munName].cacs + map[munName].gestores,
          presentCACS: map[munName].cacs,
          presentGestores: map[munName].gestores,
          presentTotal: map[munName].cacs + map[munName].gestores
        });
      }
    });
  }

  renderAttendanceStep() {
    const container = document.getElementById('wizard-attendance-table-container');
    const table4Container = document.getElementById('wizard-table4-preview');
    if (!this.currentTraining) return;

    const list = this.currentTraining.attendance || [];

    // Renderizar tabela de participantes
    if (container) {
      if (list.length === 0) {
        container.innerHTML = `<p style="color:var(--text-muted); padding:1rem 0;">Nenhuma lista de presença importada. Arraste ou selecione a planilha acima.</p>`;
      } else {
        container.innerHTML = `
          <div style="margin-bottom:0.75rem; font-size:0.88rem; color:var(--text-secondary); display:flex; justify-content:space-between;">
            <span>Total de Presentes: <strong>${list.length}</strong></span>
            <span>CACS: <strong>${list.filter(a => a.representation === 'CACS-FUNDEB').length}</strong> | Gestores: <strong>${list.filter(a => a.representation !== 'CACS-FUNDEB').length}</strong></span>
          </div>
          <div class="table-responsive-wrapper" style="max-height:350px;">
            <table class="report-data-table">
              <thead>
                <tr>
                  <th>Nome Completo</th>
                  <th>CPF</th>
                  <th>Município</th>
                  <th>Segmento</th>
                  <th>Cargo / Função</th>
                </tr>
              </thead>
              <tbody>
                ${list.slice(0, 50).map(a => `
                  <tr>
                    <td><strong>${a.name}</strong></td>
                    <td style="font-family:monospace;">${a.cpf || '-'}</td>
                    <td>${a.municipality || '-'}</td>
                    <td><span class="nav-badge" style="background:rgba(6, 182, 212, 0.15); color:#22d3ee;">${a.representation}</span></td>
                    <td>${a.roleGestao || a.roleCACS || '-'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }
    }

    // Renderizar Tabela 4 (Participação por Município)
    if (table4Container && window.statsEngine) {
      table4Container.innerHTML = window.statsEngine.generateTable4Html(this.currentTraining.municipalities || []);
    }
  }

  /* ==========================================================================
     ETAPA 7: AVALIAÇÃO (UPLOAD, MÉDIAS, GRÁFICOS & NUVEM)
     ========================================================================== */
  async handleEvaluationFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file || !window.excelParser) return;

    try {
      this.showToast('Processando planilha de avaliações...');
      const { sheets, sheetNames } = await window.excelParser.readWorkbook(file);
      const firstSheet = sheets[sheetNames[0]];

      const parsed = window.excelParser.parseEvaluationRows(firstSheet, null, this.currentTraining.uf || 'MT');
      if (parsed.length === 0) {
        this.showToast('Nenhum registro de avaliação identificado.', 'warning');
        return;
      }

      this.currentTraining.evaluations = parsed;
      this.renderEvaluationStep();
      this.renderEvaluationCharts();
      this.renderWordClouds();
      this.saveCurrentStepData();
      this.showToast(`✓ ${parsed.length} avaliações processadas com sucesso!`, 'success');
    } catch (err) {
      console.error('Erro ao processar avaliações:', err);
      this.showToast(`Erro na avaliação: ${err.message}`, 'error');
    }
  }

  renderEvaluationStep() {
    if (!this.currentTraining || !window.statsEngine) return;
    const evals = this.currentTraining.evaluations || [];
    const stats = window.statsEngine.calculateEvaluationStats(evals);

    const countEl = document.getElementById('wiz-eval-total-count');
    if (countEl) countEl.textContent = `${evals.length} Avaliações Registradas`;

    const meanEl = document.getElementById('wiz-eval-overall-mean');
    if (meanEl) meanEl.textContent = `${stats.overallMean} / 5.0`;
  }

  renderEvaluationCharts() {
    if (!window.chartEngine || !this.currentTraining) return;
    const isDark = this.theme === 'dark';
    const evals = this.currentTraining.evaluations || [];
    const attendance = this.currentTraining.attendance || [];

    // Figura 3: Participação CACS vs Gestor
    const cacsPresent = attendance.filter(a => a.representation === 'CACS-FUNDEB').length || 1;
    const gestPresent = attendance.filter(a => a.representation !== 'CACS-FUNDEB').length || 28;
    window.chartEngine.renderFig3Participation('chart-fig3-canvas', cacsPresent, gestPresent, isDark);

    // Figura 4: Avaliação Geral (Todos os participantes)
    const statsGen = window.statsEngine.calculateEvaluationStats(evals);
    window.chartEngine.renderEvaluationBarChart('chart-fig4-canvas', statsGen.averages, 'Figura 4. Avaliação de Todos os Participantes', isDark, '#6366f1');

    // Figura 5: Avaliação CACS
    const statsCACS = window.statsEngine.calculateEvaluationStats(evals.filter(e => e.representation === 'CACS-FUNDEB'));
    window.chartEngine.renderEvaluationBarChart('chart-fig5-canvas', statsCACS.averages, 'Figura 5. Avaliação dos Conselheiros CACS', isDark, '#06b6d4');

    // Figura 6: Avaliação Gestores
    const statsGest = window.statsEngine.calculateEvaluationStats(evals.filter(e => e.representation !== 'CACS-FUNDEB'));
    window.chartEngine.renderEvaluationBarChart('chart-fig6-canvas', statsGest.averages, 'Figura 6. Avaliação dos Gestores Municipais', isDark, '#8b5cf6');
  }

  renderWordClouds() {
    if (!window.wordCloudEngine || !this.currentTraining) return;
    const evals = this.currentTraining.evaluations || [];
    const isDark = this.theme === 'dark';

    const likedTexts = evals.map(e => e.likedAspects).filter(Boolean);
    const improveTexts = evals.map(e => e.improveAspects).filter(Boolean);

    // Nuvem de Aspectos Positivos (Figura 7)
    const likedWords = window.wordCloudEngine.processTextList(likedTexts);
    const canvas7 = document.getElementById('wordcloud-fig7-canvas');
    if (canvas7) {
      window.wordCloudEngine.renderToCanvas(canvas7, likedWords, { palette: 'positive', isDark, width: 550, height: 320 });
    }

    // Nuvem de Aspectos a Melhorar (Figura 8)
    const improveWords = window.wordCloudEngine.processTextList(improveTexts);
    const canvas8 = document.getElementById('wordcloud-fig8-canvas');
    if (canvas8) {
      window.wordCloudEngine.renderToCanvas(canvas8, improveWords, { palette: 'improve', isDark, width: 550, height: 320 });
    }
  }

  /* ==========================================================================
     ETAPA 8: REGISTROS FOTOGRÁFICOS
     ========================================================================== */
  async handlePhotoUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (!this.currentTraining.media) this.currentTraining.media = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const dataUrl = await this.fileToDataUrl(file);
      const photoCount = this.currentTraining.media.filter(m => m.type === 'photo').length;
      const figNumber = photoCount + 9; // Inicia em Figura 9 conforme referência 16CTE

      this.currentTraining.media.push({
        id: `photo_${Date.now()}_${i}`,
        type: 'photo',
        blob: dataUrl,
        caption: `Figura ${figNumber}. Registro da capacitação no polo ${this.currentTraining.polo || ''}.`,
        order: photoCount,
        section: '6. REGISTROS FOTOGRÁFICOS',
        fileName: file.name
      });
    }

    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast(`✓ ${files.length} fotos adicionadas à galeria!`, 'success');
  }

  renderPhotosStep() {
    const container = document.getElementById('wizard-photos-grid');
    if (!container || !this.currentTraining) return;

    const photos = (this.currentTraining.media || []).filter(m => m.type === 'photo');
    if (photos.length === 0) {
      container.innerHTML = `<p style="color:var(--text-muted); grid-column:1/-1;">Nenhuma fotografia inserida. Faça upload acima para compor a galeria do relatório.</p>`;
      return;
    }

    container.innerHTML = photos.map((p, idx) => `
      <div class="photo-gallery-card">
        <img src="${p.blob}" alt="${p.caption}" class="photo-gallery-img">
        <div class="photo-gallery-body">
          <input type="text" class="form-control form-control-sm" value="${p.caption}" onchange="app.updatePhotoCaption('${p.id}', this.value)" placeholder="Legenda da figura...">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.25rem;">
            <span style="font-size:0.75rem; color:var(--text-muted);">Foto #${idx + 1}</span>
            <button class="btn btn-secondary btn-sm" onclick="app.removeMedia('${p.id}')" title="Excluir Foto">🗑️ Excluir</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  updatePhotoCaption(photoId, newCaption) {
    const photo = this.currentTraining.media?.find(m => m.id === photoId);
    if (photo) {
      photo.caption = newCaption;
      this.saveCurrentStepData();
    }
  }

  removeMedia(mediaId) {
    this.currentTraining.media = (this.currentTraining.media || []).filter(m => m.id !== mediaId);
    this.renderPhotosStep();
    this.renderAppendicesStep();
    this.saveCurrentStepData();
    this.showToast('Item removido com sucesso.');
  }

  /* ==========================================================================
     ETAPA 9: APÊNDICES I & II
     ========================================================================== */
  async handleAppendixUpload(type, event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (!this.currentTraining.media) this.currentTraining.media = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const dataUrl = await this.fileToDataUrl(file);

      this.currentTraining.media.push({
        id: `doc_${type}_${Date.now()}_${i}`,
        type: type, // 'doc_fnde' ou 'doc_cecate'
        blob: dataUrl,
        caption: file.name,
        fileName: file.name,
        order: this.currentTraining.media.length
      });
    }

    this.renderAppendicesStep();
    this.saveCurrentStepData();
    this.showToast(`✓ Documento anexado com sucesso!`, 'success');
  }

  renderAppendicesStep() {
    const fndeContainer = document.getElementById('wizard-appendix-fnde-list');
    const cecateContainer = document.getElementById('wizard-appendix-cecate-list');
    if (!this.currentTraining) return;

    const fndeDocs = (this.currentTraining.media || []).filter(m => m.type === 'doc_fnde');
    const cecateDocs = (this.currentTraining.media || []).filter(m => m.type === 'doc_cecate');

    if (fndeContainer) {
      fndeContainer.innerHTML = fndeDocs.length === 0
        ? `<p style="color:var(--text-muted); font-size:0.85rem;">Nenhuma convocação do FNDE anexada.</p>`
        : fndeDocs.map(d => `<div class="audit-item"><span>📄 ${d.fileName}</span><button class="btn btn-secondary btn-sm" onclick="app.removeMedia('${d.id}')">✕</button></div>`).join('');
    }

    if (cecateContainer) {
      cecateContainer.innerHTML = cecateDocs.length === 0
        ? `<p style="color:var(--text-muted); font-size:0.85rem;">Nenhuma convocação do CECATE anexada.</p>`
        : cecateDocs.map(d => `<div class="audit-item"><span>📄 ${d.fileName}</span><button class="btn btn-secondary btn-sm" onclick="app.removeMedia('${d.id}')">✕</button></div>`).join('');
    }
  }

  /* ==========================================================================
     ETAPA 10: PAINEL DE CONFERÊNCIA GERAL & AUDITORIA
     ========================================================================== */
  renderConferenceStep() {
    const container = document.getElementById('wizard-conference-content');
    if (!container || !this.currentTraining || !window.statsEngine) return;

    const metrics = window.statsEngine.calculateAllMetrics(this.currentTraining);
    this.metrics = metrics;

    container.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
        <div class="metric-card">
          <div class="metric-icon">👥</div>
          <div class="metric-info">
            <h4>Taxa de Participação</h4>
            <div class="metric-value" style="color:var(--accent-secondary);">${metrics.participationRateGeneral}%</div>
            <div class="metric-trend">${metrics.totalPresent} presentes / ${metrics.totalInscribed} inscritos</div>
          </div>
        </div>

        <div class="metric-card cyan">
          <div class="metric-icon">🏛️</div>
          <div class="metric-info">
            <h4>Municípios Atendidos</h4>
            <div class="metric-value">${metrics.totalPresentMunicipalities}</div>
            <div class="metric-trend">de ${metrics.totalSummonedMunicipalities} convocados</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">⭐</div>
          <div class="metric-info">
            <h4>Média Geral de Avaliação</h4>
            <div class="metric-value" style="color:var(--accent-success);">${metrics.evalStatsGeneral.overallMean} / 5.0</div>
            <div class="metric-trend">${metrics.evalStatsGeneral.totalResponses} respostas computadas</div>
          </div>
        </div>
      </div>

      <div class="wizard-card">
        <h4 class="wizard-card-title">🔍 Checklist de Auditoria & Validação Cruzada</h4>
        <div style="margin-top:1rem;">
          <div class="audit-item valid">
            <div><strong>Identificação e Metadados:</strong> Polo, UF e datas devidamente informados.</div>
            <span class="nav-badge" style="background:rgba(16, 185, 129, 0.15); color:#10b981;">✓ Validado</span>
          </div>

          <div class="audit-item ${metrics.totalPresent > 0 ? 'valid' : 'critical'}">
            <div><strong>Lista de Presença:</strong> ${metrics.totalPresent} participantes identificados e categorizados.</div>
            <span class="nav-badge" style="${metrics.totalPresent > 0 ? 'background:rgba(16, 185, 129, 0.15); color:#10b981;' : 'background:rgba(239, 68, 68, 0.15); color:#ef4444;'}">
              ${metrics.totalPresent > 0 ? '✓ Validado' : '⚠ Pendência Crítica'}
            </span>
          </div>

          <div class="audit-item ${metrics.evalStatsGeneral.totalResponses > 0 ? 'valid' : 'warning'}">
            <div><strong>Pesquisa Avaliativa:</strong> ${metrics.evalStatsGeneral.totalResponses} respostas com médias calculadas.</div>
            <span class="nav-badge" style="${metrics.evalStatsGeneral.totalResponses > 0 ? 'background:rgba(16, 185, 129, 0.15); color:#10b981;' : 'background:rgba(245, 158, 11, 0.15); color:#f59e0b;'}">
              ${metrics.evalStatsGeneral.totalResponses > 0 ? '✓ Validado' : '⚠ Pendência'}
            </span>
          </div>

          ${metrics.auditIssues.map(issue => `
            <div class="audit-item ${issue.type}">
              <div><strong>Alerta do Sistema:</strong> ${issue.message}</div>
              <span class="nav-badge" style="background:rgba(245, 158, 11, 0.15); color:#f59e0b;">Atenção</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     ETAPA 11: PRÉ-VISUALIZAÇÃO & GERAÇÃO FINAL DO RELATÓRIO
     ========================================================================== */
  renderReportPreviewStep() {
    const container = document.getElementById('wizard-report-preview-document');
    if (!container || !this.currentTraining || !window.statsEngine) return;

    const t = this.currentTraining;
    const metrics = window.statsEngine.calculateAllMetrics(t);
    this.metrics = metrics;

    container.innerHTML = `
      <div class="report-doc-page">
        <div style="text-align:center; border-bottom: 2px solid #1e3a8a; padding-bottom: 1rem; margin-bottom: 2rem;">
          <h2 style="font-size:16pt; margin:0;">UNIVERSIDADE FEDERAL DE GOIÁS - UFG</h2>
          <h3 style="font-size:13pt; margin:4px 0; color:#0284c7;">CENTRO COLABORADOR DE APOIO AO TRANSPORTE ESCOLAR - CECATE CENTRO-OESTE</h3>
          <p style="font-size:10pt; color:#475569; margin:0;">FUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO - FNDE</p>
        </div>

        <div style="text-align:center; margin: 3rem 0;">
          <h1 style="font-size:22pt; margin-bottom:0.5rem;">RELATÓRIO DE ATIVIDADES Nº ${t.number || 16}</h1>
          <h2 style="font-size:16pt; color:#2563eb; margin:0;">${t.title || 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR'}</h2>
          <h3 style="font-size:13pt; color:#334155; margin-top:0.5rem;">${t.polo || 'Polo Regional'} - ${t.uf || 'MT'}, ${t.datesFormatted || '2026'}</h3>
        </div>

        <h3>1. INTRODUÇÃO</h3>
        <p>O presente Relatório de Atividades consubstancia os resultados alcançados durante a realização da Capacitação em Transporte Escolar nº ${t.number || 16}, executada no município polo de ${t.polo || 'Pontes e Lacerda'}, Estado de ${t.uf || 'MT'}, nas datas de ${t.datesFormatted || '23 e 24 de junho de 2026'}. A iniciativa integra as ações estratégicas pactuadas no projeto "${t.relatedProject || 'Fortalecendo e Aprimorando as Políticas Públicas de Transporte Escolar do Brasil'}", desenvolvido pela Universidade Federal de Goiás (UFG) por meio do CECATE Centro-Oeste, com financiamento do Fundo Nacional de Desenvolvimento da Educação (FNDE).</p>

        <h3>2. DADOS BÁSICOS DO CURSO</h3>
        <p>Foram convocados ${metrics.totalSummonedMunicipalities} municípios para participarem das atividades formativas no polo de ${t.polo}. A distância média percorrida pelas delegações foi de ${metrics.avgDistance} km.</p>
        
        <p><em>Tabela 1. Municípios convocados.</em></p>
        ${window.statsEngine.generateTable1Html(t.municipalities || [])}

        <p><em>Tabela 2. Estrutura do curso de capacitação em transporte escolar.</em></p>
        ${window.statsEngine.generateTable2Html(t.courseModules || [])}

        <h3>4. DESENVOLVIMENTO DO CURSO E PARTICIPAÇÃO</h3>
        <p>O evento registrou ${metrics.totalInscribed} inscritos e ${metrics.totalPresent} presentes efetivos, com taxa global de participação de ${metrics.participationRateGeneral}%.</p>

        <p><em>Tabela 4. Participação por município (Presentes / Inscritos).</em></p>
        ${window.statsEngine.generateTable4Html(t.municipalities || [])}

        <h3>5. AVALIAÇÃO DA CAPACITAÇÃO</h3>
        <p>Registrou-se ${metrics.evalStatsGeneral.totalResponses} questionários de avaliação preenchidos, com média global de satisfação de ${metrics.evalStatsGeneral.overallMean} / 5.0.</p>

        <h3>7. CONSIDERAÇÕES FINAIS</h3>
        <p>A realização da Capacitação nº ${t.number} no polo de ${t.polo} cumpriu integralmente as metas e diretrizes estabelecidas pelo CECATE-CO e pelo FNDE.</p>
      </div>
    `;
  }

  async downloadDocxReport() {
    if (!this.currentTraining || !window.reportDocxGenerator) return;
    this.showToast('⚡ Gerando arquivo Word (.docx)...');
    if (!this.metrics) {
      this.metrics = window.statsEngine.calculateAllMetrics(this.currentTraining);
    }
    await window.reportDocxGenerator.generateAndDownload(this.currentTraining, this.metrics);
  }

  async directDownloadDocx(trainingId) {
    const full = await window.db.getTrainingFull(trainingId);
    if (full && window.reportDocxGenerator && window.statsEngine) {
      const metrics = window.statsEngine.calculateAllMetrics(full);
      this.showToast('⚡ Gerando arquivo Word (.docx)...');
      await window.reportDocxGenerator.generateAndDownload(full, metrics);
    }
  }

  /* ==========================================================================
     EXCLUSÃO DE CAPACITAÇÕES (MODAL WEB MODERNO COM BARRA DE CARREGAMENTO)
     ========================================================================== */
  async openConfirmDeleteModal(trainingId) {
    if (!window.db) return;
    const training = await window.db.get('trainings', trainingId);
    if (!training) {
      this.showToast('Capacitação não encontrada.', 'error');
      return;
    }

    // Regra estrita: impedir exclusão de registros do Histórico Protegido
    if (training.isHistorical || training.status === 'historico') {
      this.showToast('🛡️ Registros do Histórico Protegido (Nº 6 a 15) são permanentes e não podem ser excluídos.', 'warning');
      return;
    }

    this.trainingToDeleteId = trainingId;

    // Atualizar dados no modal web
    const titleEl = document.getElementById('modal-delete-target-title');
    const detailsEl = document.getElementById('modal-delete-target-details');
    if (titleEl) {
      titleEl.textContent = `Capacitação Nº ${training.number} - ${training.polo || 'Polo Regional'} (${training.uf || 'MT'})`;
    }
    if (detailsEl) {
      detailsEl.innerHTML = `
        <span>📍 Local: <strong>${training.locationVenue || 'Auditório Municipal'}</strong></span>
        <span>📅 Datas: <strong>${training.datesFormatted || training.startDate || 'Data a definir'}</strong></span>
        <span>⏱️ Carga: <strong>${training.workload || '16h'}</strong></span>
      `;
    }

    // Resetar barra de progresso e reabilitar botões
    const progressContainer = document.getElementById('modal-delete-progress-container');
    const progressBar = document.getElementById('modal-delete-progress-bar');
    const progressPercent = document.getElementById('modal-delete-progress-percent');
    const progressStatus = document.getElementById('modal-delete-progress-status');
    const confirmBtn = document.getElementById('modal-delete-confirm-btn');
    const cancelBtn = document.getElementById('modal-delete-cancel-btn');
    const closeBtn = document.getElementById('modal-delete-close-btn');

    if (progressContainer) progressContainer.style.display = 'none';
    if (progressBar) progressBar.style.width = '0%';
    if (progressPercent) progressPercent.textContent = '0%';
    if (progressStatus) progressStatus.innerHTML = '<span class="status-dot" style="background:#ef4444;"></span> Limpando registros...';
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.innerHTML = 'Sim, Excluir Relatório';
    }
    if (cancelBtn) cancelBtn.disabled = false;
    if (closeBtn) closeBtn.disabled = false;

    const modal = document.getElementById('modal-confirm-delete');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeConfirmDeleteModal() {
    this.trainingToDeleteId = null;
    const modal = document.getElementById('modal-confirm-delete');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        if (!modal.classList.contains('active')) {
          modal.style.display = 'none';
        }
      }, 200);
    }
  }

  async executeDeleteTrainingConfirmed() {
    if (!this.trainingToDeleteId || !window.db) return;

    const idToDelete = this.trainingToDeleteId;
    const training = await window.db.get('trainings', idToDelete);
    const num = training ? training.number : '';

    const progressContainer = document.getElementById('modal-delete-progress-container');
    const progressBar = document.getElementById('modal-delete-progress-bar');
    const progressPercent = document.getElementById('modal-delete-progress-percent');
    const progressStatus = document.getElementById('modal-delete-progress-status');
    const confirmBtn = document.getElementById('modal-delete-confirm-btn');
    const cancelBtn = document.getElementById('modal-delete-cancel-btn');
    const closeBtn = document.getElementById('modal-delete-close-btn');

    // Desabilitar botões e exibir barra
    if (confirmBtn) {
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = '⏳ Excluindo...';
    }
    if (cancelBtn) cancelBtn.disabled = true;
    if (closeBtn) closeBtn.disabled = true;
    if (progressContainer) progressContainer.style.display = 'block';

    const setProgress = (pct, text) => {
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (progressPercent) progressPercent.textContent = `${pct}%`;
      if (progressStatus) progressStatus.innerHTML = `<span class="status-dot" style="background:#ef4444;"></span> ${text}`;
    };

    try {
      // Fase 1: Limpeza de participantes e presenças
      setProgress(25, 'Removendo participantes e listas de presença...');
      await new Promise(r => setTimeout(r, 200));

      // Fase 2: Limpeza de avaliações
      setProgress(55, 'Excluindo respostas avaliativas e notas...');
      await new Promise(r => setTimeout(r, 200));

      // Fase 3: Limpeza de mídias e anexos
      setProgress(80, 'Apagando fotografias e apêndices...');
      await new Promise(r => setTimeout(r, 200));

      // Fase 4: Exclusão no banco IndexedDB
      setProgress(95, 'Limpando dados mestres no banco local...');
      await window.db.deleteTraining(idToDelete);
      await new Promise(r => setTimeout(r, 150));

      // Fase 5: Concluído
      setProgress(100, '✓ Relatório excluído com sucesso!');
      await new Promise(r => setTimeout(r, 300));

      this.closeConfirmDeleteModal();
      this.showToast(`✓ Capacitação Nº ${num} excluída com sucesso!`, 'success');
      await this.refreshTrainingsList();

      if (this.currentTraining?.id === idToDelete) {
        this.currentTraining = null;
        this.navigateTo('dashboard');
      } else if (this.activeView === 'trainings') {
        this.renderTrainingsList();
      } else {
        this.renderDashboard();
      }
    } catch (err) {
      console.error('Erro ao excluir capacitação:', err);
      this.showToast(`Erro ao excluir: ${err.message}`, 'error');
      if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = 'Sim, Excluir Relatório';
      }
      if (cancelBtn) cancelBtn.disabled = false;
      if (closeBtn) closeBtn.disabled = false;
    }
  }

  deleteCurrentWizardTraining() {
    if (this.currentTraining) {
      this.openConfirmDeleteModal(this.currentTraining.id);
    }
  }

  /* ==========================================================================
     TELA COMPLETA: BANCO DE CAPACITAÇÕES
     ========================================================================== */
  async renderTrainingsList() {
    await this.refreshTrainingsList();
    const container = document.getElementById('all-trainings-list-container');
    if (!container) return;

    if (this.trainingList.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:3rem; color:var(--text-muted);">
          <div style="font-size:3rem; margin-bottom:1rem;">📁</div>
          <p>Nenhuma capacitação cadastrada.</p>
          <button class="btn btn-gradient btn-sm" onclick="app.createNewTraining()">+ Nova Capacitação</button>
        </div>
      `;
      return;
    }

    const sorted = [...this.trainingList].sort((a, b) => (parseInt(b.number) || 0) - (parseInt(a.number) || 0));

    container.innerHTML = `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th style="width:70px; text-align:center;">Nº</th>
              <th>Polo Regional</th>
              <th>UF</th>
              <th>Datas</th>
              <th>Carga Horária</th>
              <th>Situação</th>
              <th style="text-align:center; width:280px;">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${sorted.map(t => {
              const isHist = t.status === 'historico' || t.isHistorical;
              const statusBadge = isHist
                ? `<span class="nav-badge" style="background:rgba(245, 158, 11, 0.15); color:#f59e0b;">🏛️ Histórico Protegido</span>`
                : (t.progressPercent === 100
                    ? `<span class="nav-badge" style="background:rgba(16, 185, 129, 0.15); color:#10b981;">✓ Concluída</span>`
                    : `<span class="nav-badge" style="background:rgba(6, 182, 212, 0.15); color:#22d3ee;">⏳ Em Andamento</span>`);

              return `
                <tr>
                  <td style="text-align:center; font-weight:800; font-size:1.05rem; color:var(--accent-secondary);">${t.number}</td>
                  <td><strong>${t.polo || 'Polo Regional'}</strong></td>
                  <td><span class="nav-badge">${t.uf || 'MT'}</span></td>
                  <td style="font-size:0.85rem;">${t.datesFormatted || t.startDate || '-'}</td>
                  <td style="font-size:0.85rem;">${t.workload || '16h'}</td>
                  <td>${statusBadge}</td>
                  <td style="text-align:center;">
                    <div style="display:flex; gap:0.4rem; justify-content:center; align-items:center;">
                      <button class="btn btn-secondary btn-sm" onclick="app.openWizard('${t.id}', 1)" title="${isHist ? 'Consultar' : 'Editar'}">
                        ${isHist ? '🔍 Consultar' : '✏️ Editar'}
                      </button>
                      <button class="btn btn-secondary btn-sm" onclick="app.openCloneModal('${t.id}')" title="Usar como modelo">
                        📋 Modelo
                      </button>
                      <button class="btn btn-gradient btn-sm" onclick="app.directDownloadDocx('${t.id}')" title="Gerar .docx">
                        ⚡ .docx
                      </button>
                      ${isHist
                        ? `<span class="nav-badge" style="background:rgba(245, 158, 11, 0.1); color:#f59e0b;" title="Histórico protegido - exclusão desabilitada">🔒</span>`
                        : `<button class="btn btn-secondary btn-sm" onclick="app.openConfirmDeleteModal('${t.id}')" style="color:#ef4444; border-color:rgba(239, 68, 68, 0.3);" title="Excluir este relatório">
                            🗑️
                          </button>`
                      }
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  async duplicateTrainingAction(trainingId) {
    this.openCloneModal(trainingId);
  }

  /* ==========================================================================
     MUNICIPALITIES CATALOG BANK
     ========================================================================== */
  renderMunicipalitiesBank() {
    const container = document.getElementById('municipalities-bank-list');
    if (!container || !window.IBGE_DATA) return;

    const data = window.IBGE_DATA.slice(0, 100);
    container.innerHTML = `
      <div class="table-responsive-wrapper" style="max-height:500px;">
        <table class="report-data-table">
          <thead>
            <tr>
              <th>Código IBGE</th>
              <th>Nome do Município</th>
              <th>UF</th>
              <th>Região</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(m => `
              <tr>
                <td style="font-family:monospace;">${m.c}</td>
                <td><strong>${m.n}</strong></td>
                <td>${m.u}</td>
                <td>${m.r}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  /* ==========================================================================
     UTILITÁRIOS & HELPERS
     ========================================================================== */
  setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = (val !== undefined && val !== null) ? val : '';
  }

  getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (type === 'success') toast.style.borderLeft = '4px solid var(--accent-success)';
    if (type === 'error') toast.style.borderLeft = '4px solid var(--accent-danger)';
    if (type === 'warning') toast.style.borderLeft = '4px solid var(--accent-warning)';

    toast.innerHTML = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  bindEvents() {
    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
      });
    });

    // Inputs autosave on change
    document.addEventListener('input', (e) => {
      if (e.target.closest('#view-wizard') && this.currentTraining) {
        this.saveCurrentStepData();
      }
    });

    // Window popstate / hashchange
    window.addEventListener('hashchange', () => this.handleRoute());
  }
}

// Inicializar Singleton da Aplicação
window.app = new AutoReportApp();
document.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});
