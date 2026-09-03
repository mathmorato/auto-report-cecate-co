/**
 * AutoReport CECATE - Controlador Principal da Aplicação (SPA & Wizard 11 Etapas)
 * Versão: v.2.9.3
 */

window.icons = {
  edit: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
  delete: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
  search: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  lock: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  plus: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  close: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  save: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`,
  user: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  building: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="6" x2="9" y2="6.01"></line><line x1="15" y1="6" x2="15" y2="6.01"></line><line x1="9" y1="10" x2="9" y2="10.01"></line><line x1="15" y1="10" x2="15" y2="10.01"></line><line x1="9" y1="14" x2="9" y2="14.01"></line><line x1="15" y1="14" x2="15" y2="14.01"></line><line x1="9" y1="18" x2="15" y2="18"></line></svg>`,
  check: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  logout: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 5 12 10 7"></polyline><line x1="15" y1="12" x2="5" y2="12"></line></svg>`,
  filter: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`,
  stepForward: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-left:5px;"><line x1="5" y1="12" x2="15" y2="12"></line><polyline points="10 7 15 12 10 17"></polyline><line x1="19" y1="5" x2="19" y2="19"></line></svg>`,
  stepBackward: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-2px; margin-right:5px;"><line x1="5" y1="5" x2="5" y2="19"></line><line x1="19" y1="12" x2="9" y2="12"></line><polyline points="14 7 9 12 14 17"></polyline></svg>`,
  sede: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 10v2"></path><path d="M15 10v2"></path><path d="M9 14v2"></path><path d="M15 14v2"></path></svg>`,
  rename: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><rect x="2" y="5.5" width="16" height="12" rx="2.5"></rect><circle cx="6.5" cy="13" r="1.8"></circle><path d="M8.3 11.2v3.6"></path><path d="M10.3 9.2v5.6"></path><circle cx="12.3" cy="13" r="1.8"></circle><line x1="18" y1="2.5" x2="18" y2="21.5"></line><path d="M16 2.5h4"></path><path d="M16 21.5h4"></path></svg>`,
  pin: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  calendar: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  clock: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  file: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
  camera: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
  folder: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`
};

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
    this.currentTeamFilter = 'all';
    this.currentMasterTeamFilter = 'all';
    this.memberToDelete = null;
    this.version = 'v.2.9.3';
  }

  /**
   * Inicialização da aplicação
   */
  async init() {
    console.log(`Inicializando AutoReport CECATE ${this.version}...`);

    // Sincronizar versão em todos os rodapés (principal e lateral)
    const footerVerEl = document.getElementById('app-footer-version');
    if (footerVerEl) footerVerEl.textContent = this.version;
    const sidebarVerEl = document.querySelector('.sidebar-footer div:last-child');
    if (sidebarVerEl) sidebarVerEl.textContent = this.version;

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

    // 3. Inicializar Configurações Globais
    this.initGlobalSettings();

    // 4. Vincular Eventos Globais
    this.bindEvents();
    this.initDragAndDropHandlers();

    // 4. Carregar lista de capacitações e atualizar Dashboard
    await this.refreshTrainingsList();

    // 5. Na inicialização ou recarregamento, sempre abrir no Dashboard limpo
    history.replaceState(null, '', window.location.pathname);
    this.navigateTo('dashboard', false);

    console.log('AutoReport CECATE pronto!');
  }

  /* ==========================================================================
     Navegação & SPA Router
     ========================================================================== */
  handleRoute() {
    const hash = window.location.hash.replace('#', '');
    if (!hash || hash === 'dashboard') {
      this.navigateTo('dashboard', false);
    } else if (hash.startsWith('wizard/')) {
      const parts = hash.split('/');
      const trainingId = parts[1];
      const step = parseInt(parts[2]) || 1;
      if (this.currentTraining && this.currentTraining.id === trainingId) {
        this.navigateTo('wizard', false);
        this.setWizardStep(step);
      } else {
        this.openWizard(trainingId, step);
      }
    } else if (hash === 'wizard') {
      if (this.currentTraining) {
        this.navigateTo('wizard', false);
      } else {
        this.navigateTo('dashboard', false);
      }
    } else if (['trainings', 'municipalities', 'team', 'course-structure', 'settings'].includes(hash)) {
      this.navigateTo(hash, false);
    } else {
      this.navigateTo('dashboard', false);
    }
  }

  navigateTo(viewId, updateHash = true) {
    this.activeView = viewId;
    if (updateHash && viewId !== 'wizard') {
      window.location.hash = viewId;
    }

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
    } else if (viewId === 'team') {
      this.renderMasterTeamManagement();
    } else if (viewId === 'course-structure') {
      this.renderCourseTemplatesCatalog();
      this.renderGlobalMasterCourseStructure();
    }
  }

  /* ==========================================================================
     Tema Claro / Escuro
     ========================================================================== */
  applyTheme(theme) {
    this.theme = theme;
    localStorage.setItem('autoreport_theme', theme);
    const themeBtn = document.getElementById('theme-toggle-btn');

    const sunIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    if (theme === 'light') {
      document.body.classList.add('light-theme');
      if (themeBtn) themeBtn.innerHTML = `${sunIcon} Modo Claro`;
    } else {
      document.body.classList.remove('light-theme');
      if (themeBtn) themeBtn.innerHTML = `${moonIcon} Modo Escuro`;
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
    if (window.db && window.db.supabase) {
      window.db.syncFromCloud().catch(() => {});
    }
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

    // Atualizar badged counters das sub-abas de filtro
    const cntAll = totalTrainings;
    const cntHist = this.trainingList.filter(t => t.status === 'historico' || t.isHistorical).length;
    const cntProg = this.trainingList.filter(t => t.status === 'in_progress' && !t.isHistorical).length;
    const cntComp = this.trainingList.filter(t => (t.status === 'completed' || t.progressPercent === 100) && !t.isHistorical).length;

    const elCntAll = document.getElementById('dash-count-all');
    if (elCntAll) elCntAll.textContent = cntAll;
    const elCntHist = document.getElementById('dash-count-hist');
    if (elCntHist) elCntHist.textContent = cntHist;
    const elCntProg = document.getElementById('dash-count-prog');
    if (elCntProg) elCntProg.textContent = cntProg;
    const elCntComp = document.getElementById('dash-count-comp');
    if (elCntComp) elCntComp.textContent = cntComp;

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
            <div style="display:flex; justify-content:center; margin-bottom:0.75rem; color:var(--text-muted);">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <p>Nenhuma capacitação encontrada para este filtro.</p>
          </div>
        `;
      } else {
        container.innerHTML = filtered.map(t => {
          const isHist = t.status === 'historico' || t.isHistorical;
          const statusBadge = isHist
            ? `<span class="nav-badge badge-amber">Histórico Protegido</span>`
            : (t.progressPercent === 100
                ? `<span class="nav-badge badge-emerald" style="display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Concluída</span>`
                : `<span class="nav-badge badge-cyan" style="display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Em Andamento</span>`);

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
                    <span><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${t.datesFormatted || t.startDate || 'Data a definir'}</span>
                    <span><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${t.locationVenue || 'Auditório Local'}</span>
                    <span><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${t.workload || '16h'}</span>
                    ${t.dataSourceMap?.documentOrigin ? `<span title="${t.dataSourceMap.documentOrigin}"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg> Fonte: ${t.dataSourceMap.documentOrigin.split('/').pop()}</span>` : ''}
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
                    ${isHist ? `${window.icons.search} Consultar` : `${window.icons.edit} Continuar`}
                  </button>
                  ${isHist
                    ? `<span class="nav-badge badge-amber" style="font-size:0.75rem; padding:0.25rem 0.55rem; display:inline-flex; align-items:center; gap:0.25rem;" title="Registro do Histórico Protegido - Exclusão desabilitada">${window.icons.lock} Protegido</span>`
                    : `<button class="btn btn-secondary btn-sm btn-action-delete" onclick="app.openConfirmDeleteModal('${t.id}')" style="display:inline-flex; align-items:center;" title="Excluir este relatório permanentemente">
                        ${window.icons.delete} Excluir
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
      this.showToast('Nova capacitação criada com sucesso! Dados anteriores preservados.', 'success');
      this.openWizard(newId, 1);
    } catch (err) {
      console.error('Erro ao duplicar capacitação:', err);
      this.showToast(`Erro: ${err.message}`, 'error');
    }
  }

  /* ==========================================================================
     ASSISTENTE DE 11 ETAPAS (WIZARD ENGINE)
     ========================================================================== */
  createNewTraining() {
    this.createNewTrainingBlank();
  }

  openNewTrainingOptionsModal() {
    const modal = document.getElementById('modal-new-training-options');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeNewTrainingOptionsModal() {
    const modal = document.getElementById('modal-new-training-options');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
  }

  async createNewTrainingBlank() {
    const newId = `cap_${Date.now()}`;

    const defaultOrg = localStorage.getItem('autoreport_setting_org') || 'Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste (CECATE-CO)';
    const defaultFunding = localStorage.getItem('autoreport_setting_funding') || 'Fundo Nacional de Desenvolvimento da Educação - FNDE';
    const defaultProject = localStorage.getItem('autoreport_setting_proj') || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL';
    const defaultProcess = localStorage.getItem('autoreport_setting_process') || '23070.012345/2026-00';

    const newTraining = {
      id: newId,
      number: '',
      title: 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
      polo: '',
      uf: '',
      poloIbge: '',
      startDate: '',
      endDate: '',
      datesFormatted: '',
      workload: '',
      targetAudience: 'Gestores Municipais e Conselheiros CACS-FUNDEB',
      expectedParticipants: '',
      responsibleOrg: defaultOrg,
      relatedProject: defaultProject,
      processNumber: defaultProcess,
      fundingOrg: defaultFunding,
      partnerOrgs: '',
      locationVenue: '',
      locationAddress: '',
      status: 'in_progress',
      progressPercent: 0,
      team: (window.getMasterTeam ? window.getMasterTeam() : (window.DEFAULT_OFFICIAL_TEAM || [])).map(m => ({ ...m })),
      municipalities: [],
      courseModules: window.courseStructureHelper ? window.courseStructureHelper.getMasterCopy() : (window.DEFAULT_COURSE_STRUCTURE || []),
      courseMoments: [],
      attendance: [],
      evaluations: [],
      media: []
    };

    await window.db.saveTrainingFull(newTraining, 'Criação de nova capacitação em branco');
    this.openWizard(newId, 1);
  }

  /* ==========================================================================
     IMPORTAÇÃO EM MASSA DE MUNICÍPIOS POR PLANILHA (.XLSX, .CSV)
     ========================================================================== */
  openImportMunicipalitiesModal(targetContext = 'wizard') {
    this.munImportContext = targetContext;
    this.munImportParsedData = null;
    this.munImportSearchFilter = '';

    const uploadStep = document.getElementById('mun-import-step-upload');
    const procStep = document.getElementById('mun-import-step-processing');
    const confStep = document.getElementById('mun-import-step-conference');
    const backBtn = document.getElementById('mun-import-back-btn');
    const confBtn = document.getElementById('mun-import-confirm-btn');
    const fileInput = document.getElementById('mun-excel-file-input');

    if (fileInput) fileInput.value = '';
    if (uploadStep) uploadStep.style.display = 'block';
    if (procStep) procStep.style.display = 'none';
    if (confStep) confStep.style.display = 'none';
    if (backBtn) backBtn.style.display = 'none';
    if (confBtn) confBtn.style.display = 'none';

    const modal = document.getElementById('modal-import-municipalities');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeImportMunicipalitiesModal() {
    const modal = document.getElementById('modal-import-municipalities');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
    this.munImportParsedData = null;
  }

  backToSpreadsheetUploadStep() {
    const uploadStep = document.getElementById('mun-import-step-upload');
    const procStep = document.getElementById('mun-import-step-processing');
    const confStep = document.getElementById('mun-import-step-conference');
    const backBtn = document.getElementById('mun-import-back-btn');
    const confBtn = document.getElementById('mun-import-confirm-btn');

    if (uploadStep) uploadStep.style.display = 'block';
    if (procStep) procStep.style.display = 'none';
    if (confStep) confStep.style.display = 'none';
    if (backBtn) backBtn.style.display = 'none';
    if (confBtn) confBtn.style.display = 'none';
  }

  async onMunicipalitiesSpreadsheetSelected(file) {
    if (!file || !window.excelParser) return;

    const uploadStep = document.getElementById('mun-import-step-upload');
    const procStep = document.getElementById('mun-import-step-processing');
    const confStep = document.getElementById('mun-import-step-conference');
    const backBtn = document.getElementById('mun-import-back-btn');
    const confBtn = document.getElementById('mun-import-confirm-btn');
    const statusText = document.getElementById('mun-import-processing-status');

    if (uploadStep) uploadStep.style.display = 'none';
    if (procStep) procStep.style.display = 'block';
    if (statusText) statusText.textContent = `Lendo "${file.name}" e validando dados municipais...`;

    try {
      let poloName = 'Polo Regional';
      let poloUf = 'GO';
      let existingMuns = [];

      if (this.munImportContext === 'wizard' && this.currentTraining) {
        poloName = this.currentTraining.polo || 'Polo Regional';
        poloUf = this.currentTraining.uf || 'GO';
        existingMuns = this.currentTraining.municipalities || [];
      } else if (window.db) {
        existingMuns = (await window.db.getAll('municipalities')) || [];
      }

      const poloLabel = document.getElementById('mun-import-polo-name');
      if (poloLabel) poloLabel.textContent = `${poloName} (${poloUf})`;

      // Executar parsing e cálculo em lote
      const parsed = await window.excelParser.parseMunicipalitiesSpreadsheet(file, poloName, poloUf, existingMuns);
      this.munImportParsedData = parsed;

      setTimeout(() => {
        if (procStep) procStep.style.display = 'none';
        if (confStep) confStep.style.display = 'block';
        if (backBtn) backBtn.style.display = 'inline-flex';
        if (confBtn) confBtn.style.display = 'inline-flex';

        this.renderMunicipalitiesImportConference();
      }, 400);

    } catch (err) {
      console.error('Erro ao processar planilha de municípios:', err);
      this.showToast(`Erro ao ler planilha: ${err.message}`, 'error');
      this.backToSpreadsheetUploadStep();
    }
  }

  renderMunicipalitiesImportConference(searchTerm = this.munImportSearchFilter || '') {
    if (!this.munImportParsedData) return;
    const { validRows, invalidRows, stats } = this.munImportParsedData;

    // Atualizar Contadores do Topo
    const elTotal = document.getElementById('mun-stat-total');
    const elNew = document.getElementById('mun-stat-new');
    const elExist = document.getElementById('mun-stat-existing');
    const elUpdate = document.getElementById('mun-stat-update');
    const elError = document.getElementById('mun-stat-error');
    const elSelected = document.getElementById('mun-stat-selected');
    const elConfirmBtnText = document.getElementById('mun-import-confirm-btn-text');

    const selectedCount = validRows.filter(r => r.selected).length;

    if (elTotal) elTotal.textContent = stats.total;
    if (elNew) elNew.textContent = stats.newCount;
    if (elExist) elExist.textContent = stats.alreadyExistsCount;
    if (elUpdate) elUpdate.textContent = stats.updateCount;
    if (elError) elError.textContent = stats.errorCount;
    if (elSelected) elSelected.textContent = selectedCount;
    if (elConfirmBtnText) elConfirmBtnText.textContent = `Importar Selecionados (${selectedCount})`;

    // Banner de Avisos / Erros
    const warnBox = document.getElementById('mun-import-warnings-box');
    const warnList = document.getElementById('mun-import-warnings-list');
    const warnTitle = document.getElementById('mun-import-warnings-title');

    if (invalidRows && invalidRows.length > 0) {
      if (warnBox) warnBox.style.display = 'block';
      if (warnTitle) warnTitle.textContent = `${invalidRows.length} registro(s) precisam de atenção (não serão importados):`;
      if (warnList) {
        warnList.innerHTML = invalidRows.map(inv => `
          <li><strong>Linha ${inv.lineNum}:</strong> ${inv.errors.join(' • ')} (${inv.rawName || 'Sem nome'}, ${inv.rawUf || 'Sem UF'})</li>
        `).join('');
      }
    } else {
      if (warnBox) warnBox.style.display = 'none';
    }

    // Filtragem de busca
    const term = searchTerm.toLowerCase().trim();
    const filteredRows = validRows.filter(r => {
      if (!term) return true;
      return (
        r.name.toLowerCase().includes(term) ||
        r.ibgeCode.includes(term) ||
        r.uf.toLowerCase().includes(term) ||
        r.status.toLowerCase().includes(term)
      );
    });

    const tbody = document.getElementById('mun-import-table-tbody');
    if (!tbody) return;

    if (filteredRows.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">
            Nenhum município corresponde aos critérios de busca.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filteredRows.map(r => {
      let statusBadge = '';
      if (r.status === 'new') {
        statusBadge = '<span class="nav-badge badge-emerald font-bold">Novo</span>';
      } else if (r.status === 'already_exists') {
        statusBadge = '<span class="nav-badge badge-blue">Já cadastrado</span>';
      } else if (r.status === 'update') {
        statusBadge = `<span class="nav-badge badge-amber font-bold" title="${r.diffText}">Atualizar</span>`;
      }

      return `
        <tr style="background:${r.selected ? 'rgba(59, 130, 246, 0.04)' : 'transparent'};">
          <td style="text-align:center;">
            <input type="checkbox" ${r.selected ? 'checked' : ''} onchange="app.toggleImportMunicipalityRow(${r.lineNum}, this.checked)">
          </td>
          <td style="text-align:center;">
            <span class="font-mono" style="font-weight:700; color:var(--accent-blue-text); font-size:0.92rem;">${r.ibgeCode}</span>
          </td>
          <td>
            <strong style="color:var(--text-primary); font-size:0.92rem;">${r.name}</strong>
            ${r.isSede ? '<span class="nav-badge badge-amber" style="font-size:0.7rem; padding:0.1rem 0.4rem; margin-left:0.4rem; font-weight:700;">Sede</span>' : ''}
            ${r.diffText ? `<div style="font-size:0.75rem; color:var(--accent-amber-text); margin-top:2px;">↳ ${r.diffText}</div>` : ''}
          </td>
          <td style="text-align:center;">
            <span class="nav-badge badge-blue font-bold">${r.uf}</span>
          </td>
          <td style="text-align:right;">
            <span class="font-mono" style="font-weight:700; color:${r.isSede ? 'var(--accent-amber-text)' : 'var(--accent-emerald-text)'}; font-size:0.95rem;">
              ${r.isSede ? '0,0 km' : `${parseFloat(r.distanceKm || 0).toFixed(1).replace('.', ',')} km`}
            </span>
          </td>
          <td style="text-align:center;">
            ${statusBadge}
          </td>
        </tr>
      `;
    }).join('');

    // Atualizar estado do master checkbox
    const masterCheck = document.getElementById('mun-import-master-check');
    if (masterCheck) {
      masterCheck.checked = validRows.length > 0 && validRows.every(r => r.selected);
      masterCheck.indeterminate = validRows.some(r => r.selected) && !validRows.every(r => r.selected);
    }
  }

  toggleAllImportMunicipalities(checked) {
    if (!this.munImportParsedData) return;
    this.munImportParsedData.validRows.forEach(r => {
      r.selected = checked;
    });
    this.renderMunicipalitiesImportConference();
  }

  toggleImportMunicipalityRow(lineNum, checked) {
    if (!this.munImportParsedData) return;
    const row = this.munImportParsedData.validRows.find(r => r.lineNum === lineNum);
    if (row) {
      row.selected = checked;
    }
    this.renderMunicipalitiesImportConference();
  }

  filterImportMunicipalitiesTable(term) {
    this.munImportSearchFilter = term;
    this.renderMunicipalitiesImportConference(term);
  }

  async confirmImportMunicipalities() {
    if (!this.munImportParsedData) return;
    const selectedRows = this.munImportParsedData.validRows.filter(r => r.selected);

    if (selectedRows.length === 0) {
      this.showToast('Nenhum município foi selecionado para importação.', 'warning');
      return;
    }

    try {
      let insertedCount = 0;
      let updatedCount = 0;

      if (this.munImportContext === 'wizard' && this.currentTraining) {
        if (!this.currentTraining.municipalities) {
          this.currentTraining.municipalities = [];
        }
        const muns = this.currentTraining.municipalities;

        selectedRows.forEach(r => {
          const existingIdx = muns.findIndex(m => String(m.ibgeCode).trim() === String(r.ibgeCode).trim());
          if (existingIdx !== -1) {
            // Atualização
            muns[existingIdx].name = r.name;
            muns[existingIdx].uf = r.uf;
            muns[existingIdx].distanceKm = r.distanceKm;
            muns[existingIdx].isSede = r.isSede;
            updatedCount++;
          } else {
            // Novo
            muns.push({
              id: `mun_imp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
              ibgeCode: String(r.ibgeCode).trim(),
              name: r.name,
              uf: r.uf,
              distanceKm: r.distanceKm,
              isSummoned: true,
              isSede: r.isSede,
              inscribedCACS: 2,
              inscribedGestores: 2,
              inscribedTotal: 4,
              presentCACS: 0,
              presentGestores: 0,
              presentTotal: 0
            });
            insertedCount++;
          }
        });

        this.ensurePoloInMunicipalities();
        await window.db.saveTrainingFull(this.currentTraining, `Importação em massa de ${selectedRows.length} municípios via planilha Excel`);
        this.renderMunicipalitiesStep();

      } else if (window.db) {
        // Salvar no Catálogo Geral de Municípios
        for (const r of selectedRows) {
          await window.db.put('municipalities', {
            id: `mun_cat_${r.ibgeCode}`,
            ibgeCode: String(r.ibgeCode).trim(),
            name: r.name,
            uf: r.uf,
            distanceKm: r.distanceKm,
            updatedAt: new Date().toISOString()
          });
          insertedCount++;
        }
        this.renderMunicipalitiesBank();
      }

      this.closeImportMunicipalitiesModal();
      this.showToast(`Importação concluída com sucesso! ${insertedCount} cadastrado(s), ${updatedCount} atualizado(s).`, 'success');

    } catch (err) {
      console.error('Erro ao salvar municípios importados:', err);
      this.showToast(`Erro ao salvar no banco de dados: ${err.message}`, 'error');
    }
  }

  /* ==========================================================================
     LEITURA INTELIGENTE OCR DE CONVOCAÇÃO CECATE (PDF)
     ========================================================================== */
  openImportConvocacaoModal() {
    this.extractedConvocacaoData = null;
    
    // Resetar visões do modal
    const uploadStep = document.getElementById('convocacao-upload-step');
    const procStep = document.getElementById('convocacao-processing-step');
    const resStep = document.getElementById('convocacao-results-step');
    const applyBtn = document.getElementById('convocacao-apply-btn');

    if (uploadStep) uploadStep.style.display = 'block';
    if (procStep) procStep.style.display = 'none';
    if (resStep) resStep.style.display = 'none';
    if (applyBtn) applyBtn.style.display = 'none';

    const modal = document.getElementById('modal-import-convocacao');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeImportConvocacaoModal() {
    const modal = document.getElementById('modal-import-convocacao');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
  }

  async handleConvocacaoFileSelected(file) {
    if (!file || !window.convocacaoParser) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      this.showToast('Por favor, selecione um arquivo PDF de Convocação.', 'warning');
      return;
    }

    this.currentConvocacaoFile = file;

    const uploadStep = document.getElementById('convocacao-upload-step');
    const procStep = document.getElementById('convocacao-processing-step');
    const resStep = document.getElementById('convocacao-results-step');
    const loadedCard = document.getElementById('convocacao-file-loaded-card');
    const loadedFileName = document.getElementById('convocacao-loaded-file-name');
    const statusText = document.getElementById('convocacao-status-text');
    const progressFill = document.getElementById('convocacao-progress-fill');

    // Ocultar área de upload/botão de enviar e exibir card do arquivo selecionado
    if (uploadStep) uploadStep.style.display = 'none';
    if (loadedCard) loadedCard.style.display = 'flex';
    if (loadedFileName) loadedFileName.textContent = file.name;

    if (procStep) procStep.style.display = 'block';
    if (resStep) resStep.style.display = 'none';

    try {
      if (statusText) statusText.textContent = 'Carregando arquivo PDF e inicializando leitor OCR...';
      if (progressFill) progressFill.style.width = '30%';

      const { fullText, pageTexts } = await window.convocacaoParser.extractTextFromPdf(file);

      if (statusText) statusText.textContent = 'Executando OCR e varredura completa de tópicos e municípios...';
      if (progressFill) progressFill.style.width = '70%';

      await new Promise(r => setTimeout(r, 300));

      const parsed = window.convocacaoParser.parseConvocacaoText(fullText);
      this.extractedConvocacaoData = parsed;

      if (progressFill) progressFill.style.width = '100%';
      await new Promise(r => setTimeout(r, 200));

      // Atualizar interface dos resultados com controles editáveis
      if (procStep) procStep.style.display = 'none';
      if (resStep) resStep.style.display = 'block';

      this.setVal('res-conv-polo-input', parsed.polo || '');
      this.setVal('res-conv-uf-select', parsed.uf || 'MT');
      this.setVal('res-conv-ibge-input', parsed.poloIbge || '');
      this.setVal('res-conv-dates-input', parsed.datesFormatted || '');
      this.setVal('res-conv-workload-input', parsed.workload || '16 horas');
      this.setVal('res-conv-venue-input', parsed.venue || '');
      this.setVal('res-conv-address-input', parsed.address || '');

      this.renderConvocacaoExtractedMunicipalities();

      const applyBtn = document.getElementById('convocacao-apply-btn');
      if (applyBtn) applyBtn.style.display = 'inline-flex';

      this.showToast('Convocação analisada com sucesso!');

    } catch (err) {
      console.error('Erro na leitura da convocação:', err);
      this.showToast(`Erro ao ler PDF: ${err.message}`, 'error');
      if (procStep) procStep.style.display = 'none';
      if (loadedCard) loadedCard.style.display = 'none';
      if (uploadStep) uploadStep.style.display = 'block';
    }
  }

  removeLoadedConvocacaoFile() {
    const fileInput = document.getElementById('convocacao-file-input');
    const loadedCard = document.getElementById('convocacao-file-loaded-card');
    const uploadStep = document.getElementById('convocacao-upload-step');
    const procStep = document.getElementById('convocacao-processing-step');
    const resStep = document.getElementById('convocacao-results-step');
    const applyBtn = document.getElementById('convocacao-apply-btn');

    if (fileInput) fileInput.value = '';
    if (loadedCard) loadedCard.style.display = 'none';
    if (procStep) procStep.style.display = 'none';
    if (resStep) resStep.style.display = 'none';
    if (applyBtn) applyBtn.style.display = 'none';
    if (uploadStep) uploadStep.style.display = 'block';

    this.extractedConvocacaoData = null;
    this.showToast('Arquivo de convocação removido. Você pode enviar outro PDF.');
  }

  updateConvocacaoExtractedField(field, value) {
    if (!this.extractedConvocacaoData) return;
    this.extractedConvocacaoData[field] = value;

    // Se alterou a UF, tentar re-sincronizar IBGE do polo se não houver um customizado
    if (field === 'uf' || field === 'polo') {
      const poloName = this.getVal('res-conv-polo-input') || this.extractedConvocacaoData.polo;
      const ufVal = this.getVal('res-conv-uf-select') || this.extractedConvocacaoData.uf;
      if (window.IBGE_DATA) {
        const match = window.IBGE_DATA.find(m => m.u === ufVal && m.n.toLowerCase() === poloName.toLowerCase());
        if (match) {
          this.extractedConvocacaoData.poloIbge = String(match.c);
          this.setVal('res-conv-ibge-input', match.c);
        }
      }
    }
  }

  renderConvocacaoExtractedMunicipalities() {
    if (!this.extractedConvocacaoData) return;
    const muns = this.extractedConvocacaoData.allMunicipalities || [];
    const poloName = this.extractedConvocacaoData.polo || 'Polo';
    const poloUf = this.extractedConvocacaoData.uf || 'MT';

    const badgeEl = document.getElementById('res-conv-muns-badge');
    const listEl = document.getElementById('res-conv-muns-list');

    const expPartCount = muns.length * 4;
    if (badgeEl) badgeEl.textContent = `${muns.length} Municípios (${expPartCount} Participantes Previstos)`;
    if (listEl) {
      if (muns.length === 0) {
        listEl.innerHTML = `<span style="color:var(--text-muted); font-size:0.8rem;">Nenhum município listado. Clique acima para adicionar.</span>`;
      } else {
        listEl.innerHTML = muns.map((m, idx) => {
          const distVal = m.distanceKm !== undefined ? m.distanceKm : window.convocacaoParser.calculateDistanceToPolo(m.name, m.uf || poloUf, poloName, poloUf);
          m.distanceKm = distVal;

          return `
            <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:0.4rem 0.6rem; font-size:0.78rem; display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.25rem;">
              <span style="font-weight:700; color:var(--text-primary); display:inline-flex; align-items:center;">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${m.name} (${m.uf || poloUf})
              </span>
              <span style="font-family:monospace; color:var(--accent-secondary); font-size:0.72rem;">IBGE: ${m.code || 'N/A'}</span>
              <div style="display:flex; align-items:center; gap:0.2rem;">
                <span style="font-size:0.72rem; color:var(--text-muted);">Distância:</span>
                <input type="number" step="0.1" min="0" value="${parseFloat(distVal).toFixed(1)}" style="width:65px; font-size:0.75rem; padding:0.1rem 0.3rem; text-align:right; font-family:monospace;" class="form-control form-control-sm" onchange="app.updateConvocacaoMunicipalityDistance(${idx}, this.value)">
                <span style="font-size:0.72rem; color:var(--text-muted);">km</span>
              </div>
              <button type="button" onclick="app.removeConvocacaoMunicipality(${idx})" style="background:none; border:none; color:#ef4444; font-weight:bold; cursor:pointer; font-size:0.85rem; padding:0 0.2rem; display:inline-flex; align-items:center; justify-content:center;" title="Remover município">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          `;
        }).join('');
      }
    }
  }

  updateConvocacaoMunicipalityDistance(index, value) {
    if (!this.extractedConvocacaoData?.allMunicipalities?.[index]) return;
    this.extractedConvocacaoData.allMunicipalities[index].distanceKm = parseFloat(value) || 0.0;
  }

  removeConvocacaoMunicipality(index) {
    if (!this.extractedConvocacaoData?.allMunicipalities) return;
    this.extractedConvocacaoData.allMunicipalities.splice(index, 1);
    this.renderConvocacaoExtractedMunicipalities();
  }

  addConvocacaoMunicipalityPrompt() {
    this.openAddMunicipalityModal('convocacao');
  }

  async applyExtractedConvocacaoData() {
    if (!this.extractedConvocacaoData) return;

    const data = this.extractedConvocacaoData;
    this.closeImportConvocacaoModal();

    try {
      // Se não houver relatório aberto ou se for histórico, criar um novo
      let training = this.currentTraining;
      if (!training || training.isHistorical) {
        const nextNumber = this.trainingList.length > 0 ? Math.max(...this.trainingList.map(t => parseInt(t.number) || 0)) + 1 : 15;
        const newId = `cap_${Date.now()}`;

        training = {
          id: newId,
          number: nextNumber,
          title: data.title || 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
          polo: data.polo || '',
          uf: data.uf || 'MT',
          startDate: data.startDate || new Date().toISOString().split('T')[0],
          endDate: data.endDate || new Date().toISOString().split('T')[0],
          datesFormatted: data.datesFormatted || 'A definir',
          workload: data.workload || '16 horas',
          targetAudience: data.targetAudience || 'Gestores Municipais e Conselheiros CACS-FUNDEB',
          expectedParticipants: data.expectedParticipants || 40,
          responsibleOrg: 'Universidade Federal de Goiás - UFG / CECATE Centro-Oeste',
          relatedProject: 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL',
          processNumber: '23070.012345/2026-00',
          fundingOrg: 'Fundo Nacional de Desenvolvimento da Educação - FNDE',
          partnerOrgs: 'Ministério da Educação / Prefeituras Municipais',
          locationVenue: data.venue || 'Auditório Municipal',
          status: 'in_progress',
          progressPercent: 15,
          team: (window.getMasterTeam ? window.getMasterTeam() : (window.DEFAULT_OFFICIAL_TEAM || [])).map(m => ({ ...m })),
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
      } else {
        // Atualizar dados no relatório existente
        const munCount = data.allMunicipalities?.length || data.invitedMunicipalitiesCount || 0;
        const expParticipants = munCount * 4;

        training.title = data.title || training.title || 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR';
        training.polo = data.polo || training.polo;
        training.uf = data.uf || training.uf;
        training.poloIbge = data.poloIbge || training.poloIbge;
        training.startDate = data.startDate || training.startDate;
        training.endDate = data.endDate || training.endDate;
        training.datesFormatted = data.datesFormatted || training.datesFormatted;
        training.workload = data.workload || training.workload || '16 horas';
        training.locationVenue = data.venue || training.locationVenue;
        training.locationAddress = data.address || training.locationAddress;
        training.targetAudience = data.targetAudience || training.targetAudience || 'Gestores Municipais e Conselheiros CACS-FUNDEB';
        training.expectedParticipants = expParticipants || training.expectedParticipants;
        training.responsibleOrg = training.responsibleOrg || 'Universidade Federal de Goiás - UFG / CECATE Centro-Oeste';
        training.relatedProject = training.relatedProject || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL';
        training.processNumber = training.processNumber || '23070.012345/2026-00';
        training.fundingOrg = training.fundingOrg || 'Fundo Nacional de Desenvolvimento da Educação - FNDE';
        training.partnerOrgs = training.partnerOrgs || 'Ministério da Educação / Prefeituras Municipais';
      }

      // Sincronizar Municípios Convocados com distâncias calculadas pelo polo
      if (data.allMunicipalities.length > 0) {
        const poloName = data.polo || training.polo || '';
        const poloUf = data.uf || training.uf || 'MT';

        // Salvar nome do arquivo anexado para exibir o card em Etapa 1
        const filename = this.currentConvocacaoFile?.name || 'Convocacao_CECATE.pdf';
        training.attachedFileName = filename;

        training.municipalities = data.allMunicipalities.map((m, idx) => ({
          id: `mun_${Date.now()}_${idx}`,
          ibgeCode: String(m.code || '0000000'),
          name: m.name,
          uf: m.uf || poloUf,
          distanceKm: m.distanceKm !== undefined ? m.distanceKm : window.convocacaoParser.calculateDistanceToPolo(m.name, m.uf || poloUf, poloName, poloUf),
          isSummoned: true,
          inscribedCACS: 2,
          inscribedGestores: 2,
          inscribedTotal: 4,
          presentCACS: 0,
          presentGestores: 0,
          presentTotal: 0
        }));
      }

      await window.db.saveTrainingFull(training, 'Preenchimento automático via Convocação PDF');
      this.currentTraining = training;
      await this.refreshTrainingsList();

      this.showToast('Relatório preenchido automaticamente com sucesso!', 'success');
      this.openWizard(training.id, 1);

    } catch (err) {
      console.error('Erro ao aplicar convocação:', err);
      this.showToast(`Erro ao aplicar dados: ${err.message}`, 'error');
    }
  }

  async openWizard(trainingId, step = 1) {
    if (!window.db) return;

    // Buscar dados completos
    this.currentTraining = await window.db.getTrainingFull(trainingId);
    if (!this.currentTraining) {
      this.showToast('Capacitação não encontrada.', 'error');
      this.navigateTo('dashboard', false);
      return;
    }

    this.activeView = 'wizard';
    this.navigateTo('wizard', false);
    this.setWizardStep(step);
    this.populateAllWizardForms();
  }

  validateCurrentStep(stepNumber = this.currentStep) {
    if (!this.currentTraining) return true;
    const t = this.currentTraining;

    // Registros históricos são livres de validação pois são apenas para consulta
    if (t.isHistorical || t.status === 'historico') return true;

    if (stepNumber === 1) {
      const missing = [];
      const num = this.getVal('wiz-train-number');
      const title = this.getVal('wiz-train-title');
      const uf = this.getVal('wiz-train-uf');
      const polo = this.getVal('wiz-train-polo');
      const venue = this.getVal('wiz-train-venue');
      const address = this.getVal('wiz-train-address');
      const startDate = this.getVal('wiz-train-start-date');
      const workload = this.getVal('wiz-train-workload-num') || this.getVal('wiz-train-workload');

      if (!num) missing.push('Número do Relatório');
      if (!title) missing.push('Título da Capacitação');
      if (!uf) missing.push('Estado (UF)');
      if (!polo) missing.push('Município Polo');
      if (!venue) missing.push('Local');
      if (!address) missing.push('Endereço Completo');
      if (!startDate) missing.push('Data Inicial');
      if (!workload) missing.push('Carga Horária');

      if (missing.length > 0) {
        this.showToast(`Por favor, preencha os campos obrigatórios (*) para avançar: ${missing.join(', ')}.`, 'warning');
        
        if (!num) { const el = document.getElementById('wiz-train-number'); if (el) el.focus(); }
        else if (!title) { const el = document.getElementById('wiz-train-title'); if (el) el.focus(); }
        else if (!uf) { const el = document.getElementById('wiz-train-uf'); if (el) el.focus(); }
        else if (!polo) { const el = document.getElementById('wiz-train-polo-select'); if (el) el.focus(); }
        else if (!venue) { const el = document.getElementById('wiz-train-venue'); if (el) el.focus(); }
        else if (!address) { const el = document.getElementById('wiz-train-address'); if (el) el.focus(); }
        else if (!startDate) { const el = document.getElementById('wiz-train-start-date'); if (el) el.focus(); }
        else if (!workload) { const el = document.getElementById('wiz-train-workload-num'); if (el) el.focus(); }

        return false;
      }

      // Validação estrita das Datas (DD/MM/AAAA e Data Final >= Data Inicial)
      const sVal = this.getVal('wiz-train-start-date');
      const eVal = this.getVal('wiz-train-end-date');

      const sDate = this.parseDateValue(sVal);
      if (!sDate) {
        this.showToast('Data Inicial inválida. Informe uma data válida no formato DD/MM/AAAA.', 'warning');
        const startInput = document.getElementById('wiz-train-start-date');
        if (startInput) startInput.focus();
        return false;
      }

      if (eVal && eVal.trim().length === 10) {
        const eDate = this.parseDateValue(eVal);
        if (!eDate) {
          this.showToast('Data Final inválida. Informe uma data válida no formato DD/MM/AAAA.', 'warning');
          const endInput = document.getElementById('wiz-train-end-date');
          if (endInput) endInput.focus();
          return false;
        }

        if (eDate.getTime() < sDate.getTime()) {
          this.showToast('A Data Final deve ser maior ou igual à Data Inicial.', 'warning');
          const endInput = document.getElementById('wiz-train-end-date');
          if (endInput) {
            endInput.focus();
            endInput.style.borderColor = 'var(--accent-rose, #ef4444)';
          }
          const errEl = document.getElementById('wiz-date-final-error');
          if (errEl) {
            errEl.style.display = 'block';
            errEl.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>A Data Final não pode ser anterior à Data Inicial.`;
          }
          return false;
        }
      }

      const datesFmt = this.getVal('wiz-train-dates-fmt');
      if (datesFmt && (datesFmt.includes('NaN') || datesFmt.includes('undefined'))) {
        this.showToast('Texto de datas inconsistente. Por favor, revise as datas informadas.', 'warning');
        const startInput = document.getElementById('wiz-train-start-date');
        if (startInput) startInput.focus();
        return false;
      }
    }

    if (stepNumber === 2) {
      if (!t.team || t.team.length === 0) {
        this.showToast('Adicione pelo menos um integrante à Equipe Participante na Etapa 2 antes de avançar.', 'warning');
        return false;
      }
    }

    if (stepNumber === 3) {
      if (!t.municipalities || t.municipalities.length === 0) {
        this.showToast('Cadastre pelo menos um Município Convocado na Etapa 3 antes de avançar.', 'warning');
        return false;
      }
    }

    if (stepNumber === 4) {
      const mods = t.courseModules || [];
      let totalHours = 0;
      let hasValidTopics = false;

      mods.forEach(m => {
        (m.gestorTopics || []).forEach(top => {
          if (top.topic && top.topic.trim() && top.topic !== '-') hasValidTopics = true;
          totalHours += parseFloat(top.hours) || 0;
        });
        (m.cacsTopics || []).forEach(top => {
          if (top.topic && top.topic.trim() && top.topic !== '-') hasValidTopics = true;
          totalHours += parseFloat(top.hours) || 0;
        });
      });

      if (!mods || mods.length === 0 || !hasValidTopics || totalHours <= 0) {
        this.showToast('Por favor, selecione ou configure uma Estrutura do Curso válida antes de avançar.', 'warning');
        this.openSelectCourseTemplateModal();
        return false;
      }
    }

    if (stepNumber === 5) {
      const contactDateVal = this.getVal('wiz-contact-start-date');
      if (contactDateVal && !this.validateContactStartDate(contactDateVal, true)) {
        const cInput = document.getElementById('wiz-contact-start-date');
        if (cInput) cInput.focus();
        return false;
      }
    }

    return true;
  }

  setWizardStep(stepNumber) {
    const targetStep = Math.max(1, Math.min(this.totalSteps, stepNumber));

    // Se estiver tentando avançar para uma etapa posterior, salvar e validar a etapa atual
    if (targetStep > this.currentStep) {
      this.saveCurrentStepData();
      if (!this.validateCurrentStep(this.currentStep)) {
        return; // Impede avançar se não preencheu todos os itens!
      }
    } else if (targetStep < this.currentStep) {
      // Salvar progresso ao retornar para etapas anteriores
      this.saveCurrentStepData();
    }

    this.currentStep = targetStep;
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
    if (this.currentStep === 5) this.renderContactsStep();
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

    // Sempre rolar para o topo absoluto da página ao alternar etapas
    this.scrollToTop();
    setTimeout(() => this.scrollToTop(), 60);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    const scrollContainers = [
      '.content-area',
      '.main-content',
      '.app-container',
      '.app-layout',
      '.wizard-container',
      '.wizard-body-layout',
      '.wizard-main-content',
      '.wizard-step-panel',
      '#view-wizard',
      'main'
    ];

    scrollContainers.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (el && el.scrollTop > 0) {
          el.scrollTop = 0;
        }
      });
    });

    const topTarget = document.getElementById('wizard-header-title') || document.querySelector('.wizard-header') || document.querySelector('.content-area');
    if (topTarget && typeof topTarget.scrollIntoView === 'function') {
      try {
        topTarget.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'instant' });
      } catch (e) {
        topTarget.scrollIntoView(true);
      }
    }
  }

  wizardNext() {
    this.saveCurrentStepData();
    if (!this.validateCurrentStep()) {
      return; // Bloqueado se não preencheu todos os itens!
    }
    if (this.currentStep < this.totalSteps) {
      this.setWizardStep(this.currentStep + 1);
      this.scrollToTop();
    }
  }

  wizardPrev() {
    this.saveCurrentStepData();
    if (this.currentStep > 1) {
      this.setWizardStep(this.currentStep - 1);
      this.scrollToTop();
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
        const poloText = t.polo ? `${t.polo} (${t.uf || 'UF'})` : 'Nova Capacitação em Branco';
        titleEl.innerHTML = `Capacitação Nº ${t.number || 16} • <span style="color:var(--accent-secondary);">${poloText}</span>`;
      }
    }

    // Calcular percentual de preenchimento
    let completedSteps = 0;
    if (t.polo && t.startDate) completedSteps++;
    if (t.team && t.team.length > 0) completedSteps++;
    if (t.municipalities && t.municipalities.length > 0) completedSteps++;
    if (t.courseModules && t.courseModules.length > 0) completedSteps++;
    if (t.contactsData?.startDate || t.contactsData?.methods) completedSteps++;
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
  }

  /* ==========================================================================
     POPULAÇÃO & SALVAMENTO DE DADOS DAS ETAPAS
     ========================================================================== */
  populateAllWizardForms() {
    if (!this.currentTraining) return;
    const t = this.currentTraining;

    // Etapa 1: Identificação
    this.setVal('wiz-train-number', t.number || '');
    this.setVal('wiz-train-title', t.title || '');

    // Carga Horária com botão de rotação (spinner)
    const workloadNum = t.workload ? parseInt(t.workload) : '';
    this.setVal('wiz-train-workload-num', workloadNum);
    this.setVal('wiz-train-workload', t.workload || '');
    const hintEl = document.getElementById('wiz-workload-auto-hint');
    if (hintEl) hintEl.textContent = t.workload ? `Carga horária configurada: ${t.workload}` : '';

    // Estado (UF) PRIMEIRO e Município Polo Suspenso com Código IBGE/INEP
    const uf = t.uf || '';
    this.setVal('wiz-train-uf', uf);
    this.populateCitiesDropdown(uf, t.polo || '', t.poloIbge || '');

    this.setVal('wiz-train-start-date', this.isoToDmy(t.startDate) || t.startDate || '');
    this.setVal('wiz-train-end-date', this.isoToDmy(t.endDate) || t.endDate || '');
    this.setVal('wiz-train-dates-fmt', t.datesFormatted || '');

    const endInput = document.getElementById('wiz-train-end-date');
    if (endInput) {
      endInput.style.borderColor = '';
    }
    const errEl = document.getElementById('wiz-date-final-error');
    if (errEl) {
      errEl.style.display = 'none';
      errEl.textContent = '';
    }
    this.setVal('wiz-train-target', t.targetAudience || '');
    this.setVal('wiz-train-expected', t.expectedParticipants || '');
    this.setVal('wiz-train-venue', t.locationVenue || '');
    this.setVal('wiz-train-address', t.locationAddress || '');
    this.setVal('wiz-train-org', t.responsibleOrg || localStorage.getItem('autoreport_setting_org') || 'Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste (CECATE-CO)');

    const defaultProj = localStorage.getItem('autoreport_setting_proj') || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL';
    const defaultProc = localStorage.getItem('autoreport_setting_process') || '23070.012345/2026-00';
    this.setVal('wiz-train-project', t.relatedProject || defaultProj);
    this.setVal('wiz-train-process', t.processNumber || defaultProc);
    this.setVal('wiz-train-funding', t.fundingOrg || localStorage.getItem('autoreport_setting_funding') || 'Fundo Nacional de Desenvolvimento da Educação - FNDE');
    this.setVal('wiz-train-partners', t.partnerOrgs || '');

    // Exibir card do arquivo de convocação anexado em Etapa 1 (se existir)
    const attachedCard = document.getElementById('etapa1-convocacao-attached-card');
    const attachedFilename = document.getElementById('etapa1-attached-filename');
    if (attachedCard && attachedFilename) {
      if (t.attachedFileName) {
        attachedCard.style.display = 'flex';
        attachedFilename.textContent = t.attachedFileName;
      } else {
        attachedCard.style.display = 'none';
      }
    }

    // Etapa 2: Equipe
    this.renderTeamList();

    // Etapa 5: Contatos
    this.renderContactsStep();

    // Etapa 6: Inscrições & Presença
    this.renderAttendanceStep();
  }

  renderContactsStep() {
    if (!this.currentTraining) return;
    const t = this.currentTraining;
    const cd = t.contactsData || {};

    const sDate = this.isoToDmy(cd.startDate) || cd.startDate || '';
    const sMethods = cd.methods || '';

    this.setVal('wiz-contact-start-date', sDate);
    this.setVal('wiz-contact-methods', sMethods);
    this.syncContactCheckboxesFromSavedMethods(sMethods);
    this.setVal('wiz-contact-responsible', cd.responsible || 'Equipe de Articulação Institucional CECATE-CO');
    this.setVal('wiz-contact-notes', cd.notes || '');
    this.updateContactDateHint();
    if (sDate) {
      this.validateContactStartDate(sDate, false);
    }
  }

  updateContactMethodsFromCheckboxes() {
    const checkboxes = document.querySelectorAll('.contact-method-checkbox:checked');
    const selected = Array.from(checkboxes).map(cb => cb.value);

    let formattedString = '';
    if (selected.length === 1) {
      formattedString = selected[0];
    } else if (selected.length === 2) {
      formattedString = `${selected[0]} e ${selected[1]}`;
    } else if (selected.length > 2) {
      const last = selected[selected.length - 1];
      const initial = selected.slice(0, selected.length - 1);
      formattedString = `${initial.join(', ')} e ${last}`;
    }

    const hiddenInput = document.getElementById('wiz-contact-methods');
    if (hiddenInput) {
      hiddenInput.value = formattedString;
    }

    if (this.currentTraining) {
      if (!this.currentTraining.contactsData) this.currentTraining.contactsData = {};
      this.currentTraining.contactsData.methods = formattedString;
      this.currentTraining.contactsData.selectedChannels = selected;
      this.saveCurrentStepData();
    }
  }

  syncContactCheckboxesFromSavedMethods(methodsString) {
    const hiddenInput = document.getElementById('wiz-contact-methods');
    if (hiddenInput && methodsString !== undefined) {
      hiddenInput.value = methodsString || '';
    }

    const t = this.currentTraining;
    const savedChannels = t?.contactsData?.selectedChannels;
    const str = (methodsString || '').toLowerCase().trim();
    const checkboxes = document.querySelectorAll('.contact-method-checkbox');

    checkboxes.forEach(cb => {
      if (Array.isArray(savedChannels) && savedChannels.length > 0) {
        cb.checked = savedChannels.includes(cb.value);
        return;
      }
      if (!str) {
        cb.checked = false;
        return;
      }
      const val = cb.value.toLowerCase();
      if (val === 'ofícios') {
        cb.checked = str.includes('ofício') || str.includes('oficio');
      } else if (val === 'e-mails') {
        cb.checked = str.includes('e-mail') || str.includes('email');
      } else if (val === 'telefones') {
        cb.checked = str.includes('telefone') || str.includes('ligaç');
      } else if (val === 'whatsapp') {
        cb.checked = str.includes('whatsapp') || str.includes('zap') || str.includes('wpp');
      } else if (val === 'reuniões virtuais') {
        cb.checked = str.includes('reuniã') || str.includes('virtual') || str.includes('videoconfer');
      } else {
        cb.checked = str.includes(val);
      }
    });
  }

  removeEtapa1ConvocacaoFile() {
    if (!this.currentTraining) return;
    this.currentTraining.attachedFileName = null;
    this.currentTraining.polo = '';
    this.currentTraining.poloIbge = '';
    this.currentTraining.datesFormatted = '';
    this.currentTraining.locationVenue = '';
    this.currentTraining.locationAddress = '';
    this.currentTraining.expectedParticipants = '';
    this.currentTraining.municipalities = [];

    const attachedCard = document.getElementById('etapa1-convocacao-attached-card');
    if (attachedCard) attachedCard.style.display = 'none';

    this.populateAllWizardForms();
    if (this.currentStep === 3) this.renderMunicipalitiesStep();
    this.saveCurrentStepData();
    this.showToast('Convocação desanexada e dados redefinidos.');
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
    t.title = this.getVal('wiz-train-title');
    t.uf = this.getVal('wiz-train-uf');
    t.polo = this.getVal('wiz-train-polo');
    t.poloIbge = this.getVal('wiz-train-inep');
    t.workload = this.getVal('wiz-train-workload') || (this.getVal('wiz-train-workload-num') ? `${this.getVal('wiz-train-workload-num')} horas` : '');
    t.startDate = this.dmyToIso(this.getVal('wiz-train-start-date')) || this.getVal('wiz-train-start-date');
    t.endDate = this.dmyToIso(this.getVal('wiz-train-end-date')) || this.getVal('wiz-train-end-date');
    t.datesFormatted = this.getVal('wiz-train-dates-fmt');
    t.targetAudience = this.getVal('wiz-train-target');
    t.expectedParticipants = parseInt(this.getVal('wiz-train-expected')) || '';
    t.locationVenue = this.getVal('wiz-train-venue');
    t.locationAddress = this.getVal('wiz-train-address');
    t.responsibleOrg = this.getVal('wiz-train-org') || localStorage.getItem('autoreport_setting_org') || 'Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste (CECATE-CO)';
    t.relatedProject = this.getVal('wiz-train-project') || localStorage.getItem('autoreport_setting_proj') || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL';
    t.processNumber = this.getVal('wiz-train-process') || localStorage.getItem('autoreport_setting_process') || '23070.012345/2026-00';
    t.fundingOrg = this.getVal('wiz-train-funding') || localStorage.getItem('autoreport_setting_funding') || 'Fundo Nacional de Desenvolvimento da Educação - FNDE';
    t.partnerOrgs = this.getVal('wiz-train-partners');

    // Sincronizar dados da Etapa 5
    const checkedBoxes = document.querySelectorAll('.contact-method-checkbox:checked');
    const selectedChannels = Array.from(checkedBoxes).map(cb => cb.value);
    t.contactsData = {
      startDate: this.dmyToIso(this.getVal('wiz-contact-start-date')) || this.getVal('wiz-contact-start-date') || '',
      methods: this.getVal('wiz-contact-methods') || '',
      selectedChannels: selectedChannels.length > 0 ? selectedChannels : (t.contactsData?.selectedChannels || []),
      responsible: this.getVal('wiz-contact-responsible') || '',
      notes: this.getVal('wiz-contact-notes') || ''
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
      this.showToast('Registros históricos protegidos não podem ser editados.', 'warning');
      return;
    }

    const saveBtn = document.getElementById('wizard-btn-save');
    const originalText = saveBtn ? saveBtn.innerHTML : '';

    // Feedback visual no botão
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>Salvando...';
    }

    try {
      this.saveCurrentStepData();
      await window.db.saveTrainingFull(this.currentTraining, 'Salvamento manual do usuário');
      await new Promise(r => setTimeout(r, 300));

      if (saveBtn) {
        saveBtn.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>Salvo!';
        saveBtn.style.color = 'var(--accent-success)';
        saveBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      }

      this.showToast('Relatório salvo com sucesso!', 'success');

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

      // Recalcular automaticamente a distância em linha reta para todos os municípios cadastrados na Tabela 1 em relação ao novo polo
      if (this.currentTraining.municipalities && this.currentTraining.municipalities.length > 0) {
        const ufVal = this.currentTraining.uf || 'MT';
        this.currentTraining.municipalities.forEach(m => {
          m.distanceKm = window.convocacaoParser.calculateDistanceToPolo(m.name, m.uf || ufVal, city, ufVal);
        });
        if (this.currentStep === 3) this.renderMunicipalitiesStep();
        this.showToast(`Polo alterado para ${city}! Distâncias da Tabela 1 recalculadas em linha reta.`);
      }

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

  dmyToIso(dmy) {
    if (!dmy) return '';
    const m = dmy.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (m) return `${m[3]}-${m[2]}-${m[1]}`;
    if (/^\d{4}-\d{2}-\d{2}$/.test(dmy.trim())) return dmy.trim();
    return '';
  }

  isoToDmy(iso) {
    if (!iso) return '';
    const m = iso.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return `${m[3]}/${m[2]}/${m[1]}`;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(iso.trim())) return iso.trim();
    return '';
  }

  parseDateValue(str) {
    if (!str) return null;
    const s = str.trim();
    // Suporte ao formato brasileiro DD/MM/AAAA
    const mDmy = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (mDmy) {
      const d = parseInt(mDmy[1], 10);
      const m = parseInt(mDmy[2], 10) - 1;
      const y = parseInt(mDmy[3], 10);
      const dt = new Date(y, m, d, 12, 0, 0);
      if (!isNaN(dt.getTime()) && dt.getDate() === d && dt.getMonth() === m && dt.getFullYear() === y) {
        return dt;
      }
      return null;
    }
    // Suporte ao formato ISO YYYY-MM-DD
    const mIso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (mIso) {
      const y = parseInt(mIso[1], 10);
      const m = parseInt(mIso[2], 10) - 1;
      const d = parseInt(mIso[3], 10);
      const dt = new Date(y, m, d, 12, 0, 0);
      if (!isNaN(dt.getTime()) && dt.getDate() === d && dt.getMonth() === m && dt.getFullYear() === y) {
        return dt;
      }
      return null;
    }
    return null;
  }

  onDateMaskInput(input) {
    if (!input) return;
    let v = input.value.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5) {
      input.value = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
      input.value = `${v.slice(0, 2)}/${v.slice(2)}`;
    } else {
      input.value = v;
    }
    // Se completou os 10 caracteres (DD/MM/AAAA), dispara cálculo automático imediatamente
    if (input.value.length === 10) {
      if (input.id === 'wiz-contact-start-date') {
        this.validateContactStartDate(input.value, true);
        this.saveCurrentStepData();
      } else {
        this.onDatesChanged();
      }
    } else if (input.id === 'wiz-contact-start-date') {
      const errEl = document.getElementById('wiz-contact-date-error');
      if (errEl) errEl.style.display = 'none';
      input.style.borderColor = '';
    }
  }

  openNativeDatePicker(field) {
    const picker = document.getElementById(`wiz-train-${field}-date-picker`) || document.getElementById('wiz-contact-start-date-picker');
    const textInput = document.getElementById(`wiz-train-${field}-date`) || document.getElementById('wiz-contact-start-date');
    if (picker) {
      if (textInput && textInput.value) {
        const iso = this.dmyToIso(textInput.value);
        if (iso) picker.value = iso;
      }
      if (field === 'end') {
        const startInput = document.getElementById('wiz-train-start-date');
        if (startInput && startInput.value) {
          const isoStart = this.dmyToIso(startInput.value);
          if (isoStart) picker.min = isoStart;
        }
      }
      if (field === 'contact') {
        const startTrainingDate = this.currentTraining?.startDate || this.dmyToIso(this.getVal('wiz-train-start-date'));
        if (startTrainingDate) {
          const tDate = this.parseDateValue(startTrainingDate);
          if (tDate) {
            const maxAllowedDate = new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate() - 7, 12, 0, 0);
            const y = maxAllowedDate.getFullYear();
            const m = String(maxAllowedDate.getMonth() + 1).padStart(2, '0');
            const d = String(maxAllowedDate.getDate()).padStart(2, '0');
            picker.max = `${y}-${m}-${d}`;
          }
        }
      }
      try {
        if (typeof picker.showPicker === 'function') {
          picker.showPicker();
        } else {
          picker.click();
        }
      } catch (e) {
        picker.click();
      }
    }
  }

  onNativeDatePicked(field, isoValue) {
    if (!isoValue) return;
    const textInput = field === 'contact' 
      ? document.getElementById('wiz-contact-start-date')
      : document.getElementById(`wiz-train-${field}-date`);
    if (textInput) {
      textInput.value = this.isoToDmy(isoValue);
      if (field !== 'contact') {
        this.onDatesChanged();
      } else {
        this.validateContactStartDate(textInput.value, true);
        this.saveCurrentStepData();
      }
    }
  }

  validateContactStartDate(contactDateStr, showToastIfInvalid = true) {
    const input = document.getElementById('wiz-contact-start-date');
    const errEl = document.getElementById('wiz-contact-date-error');

    if (!contactDateStr || !contactDateStr.trim()) {
      if (errEl) errEl.style.display = 'none';
      if (input) input.style.borderColor = '';
      return true;
    }

    const cDate = this.parseDateValue(contactDateStr);
    if (!cDate) {
      if (errEl) {
        errEl.textContent = 'Data de início inválida. Use o formato DD/MM/AAAA.';
        errEl.style.display = 'block';
      }
      if (input) input.style.borderColor = 'var(--accent-rose-border, #f43f5e)';
      if (showToastIfInvalid) {
        this.showToast('Data de Início dos Contatos inválida. Utilize o formato DD/MM/AAAA.', 'warning');
      }
      return false;
    }

    const tStartRaw = this.currentTraining?.startDate || this.dmyToIso(this.getVal('wiz-train-start-date'));
    if (!tStartRaw) {
      if (errEl) errEl.style.display = 'none';
      if (input) input.style.borderColor = '';
      return true;
    }

    const tDate = this.parseDateValue(tStartRaw);
    if (!tDate) {
      if (errEl) errEl.style.display = 'none';
      if (input) input.style.borderColor = '';
      return true;
    }

    // Regra institucional: a data de início dos contatos não pode ser maior que 1 semana antes do 1º dia da capacitação
    const maxAllowedDate = new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate() - 7, 12, 0, 0);
    const maxAllowedDmy = `${String(maxAllowedDate.getDate()).padStart(2, '0')}/${String(maxAllowedDate.getMonth() + 1).padStart(2, '0')}/${maxAllowedDate.getFullYear()}`;
    const tStartDmy = `${String(tDate.getDate()).padStart(2, '0')}/${String(tDate.getMonth() + 1).padStart(2, '0')}/${tDate.getFullYear()}`;

    if (cDate.getTime() > maxAllowedDate.getTime()) {
      const msg = `A data de início dos contatos (${this.isoToDmy(this.dmyToIso(contactDateStr))}) não pode ser maior que uma semana antes do primeiro dia da capacitação (${tStartDmy}). Limite máximo permitido: ${maxAllowedDmy}.`;
      if (errEl) {
        errEl.textContent = `A data não pode ser posterior a ${maxAllowedDmy} (pelo menos 1 semana antes da capacitação em ${tStartDmy}).`;
        errEl.style.display = 'block';
      }
      if (input) input.style.borderColor = 'var(--accent-rose-border, #f43f5e)';
      if (showToastIfInvalid) {
        this.showToast(msg, 'warning');
      }
      return false;
    }

    if (errEl) errEl.style.display = 'none';
    if (input) input.style.borderColor = '';
    return true;
  }

  updateContactDateHint() {
    const hintEl = document.getElementById('wiz-contact-date-hint');
    if (!hintEl) return;

    const startTrainingDate = this.currentTraining?.startDate || this.dmyToIso(this.getVal('wiz-train-start-date'));
    if (!startTrainingDate) {
      hintEl.innerHTML = '<span style="color:var(--text-muted); font-size:0.75rem;">Defina a Data Inicial na Etapa 1 para calcular o prazo limite de contato.</span>';
      return;
    }

    const tDate = this.parseDateValue(startTrainingDate);
    if (!tDate) return;

    const maxAllowedDate = new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate() - 7, 12, 0, 0);
    const maxAllowedDmy = `${String(maxAllowedDate.getDate()).padStart(2, '0')}/${String(maxAllowedDate.getMonth() + 1).padStart(2, '0')}/${maxAllowedDate.getFullYear()}`;
    const tStartDmy = `${String(tDate.getDate()).padStart(2, '0')}/${String(tDate.getMonth() + 1).padStart(2, '0')}/${tDate.getFullYear()}`;

    hintEl.innerHTML = `<span style="color:var(--text-muted); font-size:0.75rem;">Início da Capacitação: <strong>${tStartDmy}</strong> | Limite máximo para contato: <strong style="color:var(--accent-blue-text);">${maxAllowedDmy}</strong> (pelo menos 7 dias antes)</span>`;
  }

  onContactDateBlur(input) {
    if (!input || !input.value) {
      const errEl = document.getElementById('wiz-contact-date-error');
      if (errEl) errEl.style.display = 'none';
      if (input) input.style.borderColor = '';
      return;
    }
    this.validateContactStartDate(input.value, true);
  }

  onDatesBlur(field) {
    const startInput = document.getElementById('wiz-train-start-date');
    const endInput = document.getElementById('wiz-train-end-date');
    const startVal = startInput ? (startInput.value || '').trim() : '';
    const endVal = endInput ? (endInput.value || '').trim() : '';

    if (startVal.length === 10 && endVal.length === 10) {
      const sDate = this.parseDateValue(startVal);
      const eDate = this.parseDateValue(endVal);
      if (sDate && eDate) {
        if (eDate.getTime() < sDate.getTime()) {
          this.showToast('A Data Final deve ser maior ou igual à Data Inicial.', 'warning');
          const errEl = document.getElementById('wiz-date-final-error');
          if (errEl) {
            errEl.style.display = 'block';
            errEl.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>A Data Final não pode ser anterior à Data Inicial.`;
          }
          if (endInput) {
            endInput.style.borderColor = 'var(--accent-rose, #ef4444)';
          }
        } else {
          const errEl = document.getElementById('wiz-date-final-error');
          if (errEl) {
            errEl.style.display = 'none';
            errEl.textContent = '';
          }
          if (endInput) {
            endInput.style.borderColor = '';
          }
        }
      }
    }
  }

  onDatesChanged() {
    const startInput = document.getElementById('wiz-train-start-date');
    const endInput = document.getElementById('wiz-train-end-date');
    const fmtInput = document.getElementById('wiz-train-dates-fmt');
    const errorEl = document.getElementById('wiz-date-final-error');
    if (!startInput) return;

    const startVal = (startInput.value || '').trim();
    const endVal = endInput ? (endInput.value || '').trim() : '';

    const startDate = this.parseDateValue(startVal);

    if (!startDate) {
      if (errorEl) {
        errorEl.style.display = 'none';
        errorEl.textContent = '';
      }
      if (endInput) endInput.style.borderColor = '';
      return;
    }

    let endDate = startDate;
    let isEndInvalid = false;

    if (endVal && endVal.length === 10) {
      const parsedEnd = this.parseDateValue(endVal);
      if (parsedEnd) {
        if (parsedEnd.getTime() < startDate.getTime()) {
          isEndInvalid = true;
          if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:3px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>A Data Final não pode ser anterior à Data Inicial.`;
          }
          if (endInput) endInput.style.borderColor = 'var(--accent-rose, #ef4444)';
          this.showToast('A Data Final deve ser maior ou igual à Data Inicial.', 'warning');
          endDate = startDate;
        } else {
          endDate = parsedEnd;
          if (errorEl) {
            errorEl.style.display = 'none';
            errorEl.textContent = '';
          }
          if (endInput) endInput.style.borderColor = '';
        }
      }
    } else {
      if (errorEl) {
        errorEl.style.display = 'none';
        errorEl.textContent = '';
      }
      if (endInput) endInput.style.borderColor = '';
    }

    const MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];

    const dayStart = startDate.getDate();
    const dayEnd = endDate.getDate();
    const monthStart = startDate.getMonth();
    const monthEnd = endDate.getMonth();
    const yearStart = startDate.getFullYear();
    const yearEnd = endDate.getFullYear();

    // Verificação estrita contra NaN
    if (isNaN(dayStart) || isNaN(dayEnd) || isNaN(monthStart) || isNaN(monthEnd) || isNaN(yearStart) || isNaN(yearEnd)) {
      return;
    }

    // Número de dias
    const diffMs = endDate.getTime() - startDate.getTime();
    const numDays = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);

    // Construir texto formatado para o relatório técnico
    let formatted = '';
    if (numDays === 1 || !endVal || isEndInvalid || startVal === endVal) {
      // Dia único
      formatted = `${dayStart} de ${MESES[monthStart]} de ${yearStart}`;
    } else if (monthStart === monthEnd && yearStart === yearEnd) {
      // Mesmo mês
      if (numDays === 2 && dayEnd === dayStart + 1) {
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
    if (hintEl) hintEl.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>Calculado automaticamente: ${numDays} dia${numDays > 1 ? 's' : ''} × 8h = ${autoWorkload}h (editável)`;

    if (this.currentTraining) {
      this.currentTraining.startDate = this.dmyToIso(startVal) || startVal;
      this.currentTraining.endDate = isEndInvalid ? '' : (this.dmyToIso(endVal) || endVal || this.currentTraining.startDate);
      this.currentTraining.datesFormatted = formatted;
      this.currentTraining.workload = `${autoWorkload} horas`;
      this.updateContactDateHint();
      const contactDateVal = this.getVal('wiz-contact-start-date');
      if (contactDateVal) {
        this.validateContactStartDate(contactDateVal, false);
      }
      this.saveCurrentStepData();
    }
  }

  /* ==========================================================================
     ETAPA 2: EQUIPE PARTICIPANTE (UFG & FNDE)
     ========================================================================== */
  setTeamFilter(filter) {
    this.currentTeamFilter = filter;
    document.querySelectorAll('.team-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`team-tab-${filter.toLowerCase()}`);
    if (activeBtn) activeBtn.classList.add('active');
    this.renderTeamList();
  }

  restoreDefaultTeam() {
    if (!this.currentTraining) return;
    if (confirm('Deseja restaurar a Equipe Padrão Oficial do CECATE/UFG e FNDE? Todas as alterações manuais nesta capacitação serão redefinidas para o padrão.')) {
      this.currentTraining.team = (window.getMasterTeam ? window.getMasterTeam() : window.DEFAULT_OFFICIAL_TEAM).map(m => ({ ...m }));
      this.renderTeamList();
      this.saveCurrentStepData();
      this.showToast('Equipe padrão oficial CECATE (UFG) e FNDE restaurada com sucesso!', 'success');
    }
  }

  /* --------------------------------------------------------------------------
     ALERTA DE SEGURANÇA E SALVAMENTO AO SAIR PARA EQUIPE TÉCNICA
     -------------------------------------------------------------------------- */
  promptNavigateToTeam() {
    const modal = document.getElementById('modal-confirm-navigate-team');
    if (!modal) {
      this.navigateTo('team');
      return;
    }
    // Redefinir estados dos botões e alertas do modal
    const statusEl = document.getElementById('modal-nav-team-status');
    const saveBtn = document.getElementById('modal-nav-team-btn-save');
    const continueBtn = document.getElementById('modal-nav-team-btn-continue');
    const cancelBtn = document.getElementById('modal-nav-team-btn-cancel');

    if (statusEl) {
      statusEl.style.display = 'none';
      statusEl.innerHTML = '';
    }
    if (saveBtn) {
      saveBtn.style.display = 'inline-flex';
      saveBtn.disabled = false;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span id="modal-nav-team-btn-save-text">Salvar Alterações</span>
      `;
    }
    if (continueBtn) {
      continueBtn.style.display = 'none';
    }
    if (cancelBtn) {
      cancelBtn.style.display = 'inline-flex';
    }

    modal.style.display = 'flex';
    modal.classList.add('active');
  }

  closeNavigateTeamModal() {
    const modal = document.getElementById('modal-confirm-navigate-team');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
  }

  async saveAndPrepareNavigateToTeam() {
    const statusEl = document.getElementById('modal-nav-team-status');
    const saveBtn = document.getElementById('modal-nav-team-btn-save');
    const continueBtn = document.getElementById('modal-nav-team-btn-continue');

    // 1. Ativar rodela de carregamento no botão e status
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite; vertical-align:-2px;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span>Salvando dados...</span>
      `;
    }

    if (statusEl) {
      statusEl.style.display = 'flex';
      statusEl.style.alignItems = 'center';
      statusEl.style.justifyContent = 'center';
      statusEl.style.gap = '0.5rem';
      statusEl.style.background = 'rgba(59, 130, 246, 0.15)';
      statusEl.style.border = '1px solid rgba(59, 130, 246, 0.35)';
      statusEl.style.color = '#60a5fa';
      statusEl.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span>Gravando dados da capacitação com segurança...</span>
      `;
    }

    try {
      // 2. Salvar dados atuais do formulário e persistir no IndexedDB
      this.saveCurrentStepData();

      if (this.currentTraining && window.db) {
        await window.db.saveTrainingFull(this.currentTraining, 'Salvamento prévio antes de navegar para Equipe Técnica');
      }

      // Pequena pausa para percepção visual do processo concluído
      await new Promise(res => setTimeout(res, 600));

      // 3. Sucesso: esconde botão de salvar e somente agora exibe o botão de continuar
      if (statusEl) {
        statusEl.style.background = 'rgba(16, 185, 129, 0.18)';
        statusEl.style.border = '1px solid rgba(16, 185, 129, 0.4)';
        statusEl.style.color = '#34d399';
        statusEl.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Dados salvos com sucesso! Você pode prosseguir com segurança.</span>
        `;
      }

      if (saveBtn) {
        saveBtn.style.display = 'none';
      }

      // SOMENTE DEPOIS APARECER O BOTÃO DE CONTINUAR
      if (continueBtn) {
        continueBtn.style.display = 'inline-flex';
      }

      this.showToast('Dados salvos com segurança!', 'success');
    } catch (err) {
      console.error('Erro ao salvar dados antes de navegar:', err);
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          <span>Tentar Salvar Novamente</span>
        `;
      }
      if (statusEl) {
        statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
        statusEl.style.border = '1px solid rgba(239, 68, 68, 0.35)';
        statusEl.style.color = '#f87171';
        statusEl.innerHTML = 'Ocorreu um erro ao salvar os dados. Tente novamente.';
      }
      this.showToast('Erro ao salvar alterações.', 'error');
    }
  }

  proceedNavigateToTeam() {
    this.closeNavigateTeamModal();
    this.navigateTo('team');
  }

  /* --------------------------------------------------------------------------
     ALERTA DE SEGURANÇA E SALVAMENTO AO SAIR PARA DASHBOARD
     -------------------------------------------------------------------------- */
  promptExitWizardToDashboard() {
    const modal = document.getElementById('modal-confirm-exit-wizard');
    if (!modal) {
      this.navigateTo('dashboard');
      return;
    }
    const statusEl = document.getElementById('modal-exit-wiz-status');
    const saveBtn = document.getElementById('modal-exit-wiz-btn-save');
    const continueBtn = document.getElementById('modal-exit-wiz-btn-continue');
    const cancelBtn = document.getElementById('modal-exit-wiz-btn-cancel');

    if (statusEl) {
      statusEl.style.display = 'none';
      statusEl.innerHTML = '';
    }
    if (saveBtn) {
      saveBtn.style.display = 'inline-flex';
      saveBtn.disabled = false;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span id="modal-exit-wiz-btn-save-text">Salvar Alterações</span>
      `;
    }
    if (continueBtn) {
      continueBtn.style.display = 'none';
    }
    if (cancelBtn) {
      cancelBtn.style.display = 'inline-flex';
    }

    modal.style.display = 'flex';
    modal.classList.add('active');
  }

  closeExitWizardModal() {
    const modal = document.getElementById('modal-confirm-exit-wizard');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
  }

  async saveAndPrepareExitToDashboard() {
    const statusEl = document.getElementById('modal-exit-wiz-status');
    const saveBtn = document.getElementById('modal-exit-wiz-btn-save');
    const continueBtn = document.getElementById('modal-exit-wiz-btn-continue');

    // 1. Rodela de carregamento giratória
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite; vertical-align:-2px;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span>Salvando dados...</span>
      `;
    }

    if (statusEl) {
      statusEl.style.display = 'flex';
      statusEl.style.alignItems = 'center';
      statusEl.style.justifyContent = 'center';
      statusEl.style.gap = '0.5rem';
      statusEl.style.background = 'rgba(59, 130, 246, 0.15)';
      statusEl.style.border = '1px solid rgba(59, 130, 246, 0.35)';
      statusEl.style.color = '#60a5fa';
      statusEl.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span>Gravando dados da capacitação com segurança...</span>
      `;
    }

    try {
      // 2. Persistir no IndexedDB
      this.saveCurrentStepData();

      if (this.currentTraining && window.db) {
        await window.db.saveTrainingFull(this.currentTraining, 'Salvamento prévio antes de sair para o Dashboard');
      }

      await new Promise(res => setTimeout(res, 600));

      // 3. Exibir confirmação e liberar botão de continuar
      if (statusEl) {
        statusEl.style.background = 'rgba(16, 185, 129, 0.18)';
        statusEl.style.border = '1px solid rgba(16, 185, 129, 0.4)';
        statusEl.style.color = '#34d399';
        statusEl.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Dados salvos com sucesso! Você pode prosseguir com segurança.</span>
        `;
      }

      if (saveBtn) {
        saveBtn.style.display = 'none';
      }

      // SOMENTE DEPOIS APARECER O BOTÃO DE CONTINUAR
      if (continueBtn) {
        continueBtn.style.display = 'inline-flex';
      }

      this.showToast('Dados salvos com segurança!', 'success');
    } catch (err) {
      console.error('Erro ao salvar dados antes de sair:', err);
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          <span>Tentar Salvar Novamente</span>
        `;
      }
      if (statusEl) {
        statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
        statusEl.style.border = '1px solid rgba(239, 68, 68, 0.35)';
        statusEl.style.color = '#f87171';
        statusEl.innerHTML = 'Ocorreu um erro ao salvar os dados. Tente novamente.';
      }
      this.showToast('Erro ao salvar alterações.', 'error');
    }
  }

  proceedExitToDashboard() {
    this.closeExitWizardModal();
    this.navigateTo('dashboard');
  }

  /* --------------------------------------------------------------------------
     ALERTA DE SEGURANÇA E SALVAMENTO AO NAVEGAR PARA ESTRUTURA DO CURSO
     -------------------------------------------------------------------------- */
  promptNavigateToCourseStructure() {
    if (!this.currentTraining || !Array.isArray(this.currentTraining.courseModules) || this.currentTraining.courseModules.length === 0) {
      this.showToast('Nenhuma estrutura de curso selecionada no momento. Por favor, clique em "Selecionar Estrutura" para escolher uma.', 'warning');
      this.openSelectCourseTemplateModal();
      return;
    }

    // Identificar a estrutura de curso atualmente selecionada para esta capacitação
    let selectedTpl = null;
    if (window.courseStructureHelper) {
      const list = window.courseStructureHelper.getTemplatesList();
      if (this.currentTraining.baseTemplateId) {
        selectedTpl = list.find(t => t.id === this.currentTraining.baseTemplateId);
      }
      if (!selectedTpl && this.currentTraining.baseTemplateName && this.currentTraining.baseTemplateName !== 'Nenhuma selecionada') {
        selectedTpl = list.find(t => t.name.toLowerCase() === this.currentTraining.baseTemplateName.toLowerCase());
      }
      if (!selectedTpl) {
        selectedTpl = window.courseStructureHelper.getDefaultTemplate();
      }
    }

    const tplName = selectedTpl ? selectedTpl.name : (this.currentTraining.baseTemplateName || 'Modelo Padrão');
    this.targetTemplateIdForEdit = selectedTpl ? selectedTpl.id : 'template_default_official';

    const modal = document.getElementById('modal-confirm-navigate-structure');
    if (!modal) {
      this.proceedNavigateToCourseStructure();
      return;
    }

    const descEl = document.getElementById('modal-nav-structure-desc');
    if (descEl) {
      descEl.innerHTML = `Você está prestes a sair do preenchimento desta capacitação para editar a estrutura <strong style="color:var(--accent-blue-text);">${tplName}</strong> na seção de Estrutura do Curso. Para evitar perda de dados, as informações desta capacitação serão salvas com segurança antes de prosseguir.`;
    }

    const statusEl = document.getElementById('modal-nav-structure-status');
    const saveBtn = document.getElementById('modal-nav-structure-btn-save');
    const continueBtn = document.getElementById('modal-nav-structure-btn-continue');
    const cancelBtn = document.getElementById('modal-nav-structure-btn-cancel');

    if (statusEl) {
      statusEl.style.display = 'none';
      statusEl.innerHTML = '';
    }
    if (saveBtn) {
      saveBtn.style.display = 'inline-flex';
      saveBtn.disabled = false;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span id="modal-nav-structure-btn-save-text">Salvar e Prosseguir para Edição</span>
      `;
    }
    if (continueBtn) {
      continueBtn.style.display = 'none';
    }
    if (cancelBtn) {
      cancelBtn.style.display = 'inline-block';
    }

    modal.style.display = 'flex';
  }

  closeNavigateStructureModal() {
    const modal = document.getElementById('modal-confirm-navigate-structure');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  async saveAndPrepareNavigateToStructure() {
    const statusEl = document.getElementById('modal-nav-structure-status');
    const saveBtn = document.getElementById('modal-nav-structure-btn-save');
    const continueBtn = document.getElementById('modal-nav-structure-btn-continue');

    // 1. Ativar spinner
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span>Salvando Dados...</span>
      `;
    }

    if (statusEl) {
      statusEl.style.display = 'flex';
      statusEl.style.alignItems = 'center';
      statusEl.style.justifyContent = 'center';
      statusEl.style.gap = '0.5rem';
      statusEl.style.background = 'rgba(59, 130, 246, 0.15)';
      statusEl.style.border = '1px solid rgba(59, 130, 246, 0.35)';
      statusEl.style.color = '#60a5fa';
      statusEl.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 0.8s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
        <span>Gravando dados da capacitação com segurança...</span>
      `;
    }

    try {
      // 2. Salvar dados atuais do formulário e persistir no IndexedDB
      this.saveCurrentStepData();

      if (this.currentTraining && window.db) {
        await window.db.saveTrainingFull(this.currentTraining, 'Salvamento prévio antes de navegar para Estrutura do Curso');
      }

      await new Promise(res => setTimeout(res, 500));

      // 3. Exibir confirmação e redirecionar
      if (statusEl) {
        statusEl.style.background = 'rgba(16, 185, 129, 0.18)';
        statusEl.style.border = '1px solid rgba(16, 185, 129, 0.4)';
        statusEl.style.color = '#34d399';
        statusEl.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Dados salvos! Redirecionando para a edição da estrutura selecionada...</span>
        `;
      }

      if (saveBtn) {
        saveBtn.style.display = 'none';
      }

      if (continueBtn) {
        continueBtn.style.display = 'inline-flex';
      }

      this.showToast('Dados salvos com segurança! Abrindo edição...', 'success');

      // Redirecionamento suave automático para a estrutura selecionada
      setTimeout(() => {
        this.proceedNavigateToCourseStructure();
      }, 650);
    } catch (err) {
      console.error('Erro ao salvar dados antes de navegar para estrutura:', err);
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          <span>Tentar Salvar Novamente</span>
        `;
      }
      if (statusEl) {
        statusEl.style.background = 'rgba(239, 68, 68, 0.15)';
        statusEl.style.border = '1px solid rgba(239, 68, 68, 0.35)';
        statusEl.style.color = '#f87171';
        statusEl.innerHTML = 'Ocorreu um erro ao salvar os dados. Tente novamente.';
      }
      this.showToast('Erro ao salvar alterações.', 'error');
    }
  }

  proceedNavigateToCourseStructure() {
    this.closeNavigateStructureModal();
    const targetId = this.targetTemplateIdForEdit || this.currentTraining?.baseTemplateId || 'template_default_official';
    this.activeTemplateId = targetId;
    this.navigateTo('course-structure');
    if (this.selectCourseTemplateForEdit) {
      this.selectCourseTemplateForEdit(targetId);
    }
    setTimeout(() => {
      const editorWrapper = document.getElementById('course-template-editor-wrapper') || document.getElementById('active-template-editor-title');
      if (editorWrapper) {
        editorWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  }

  confirmClearCourseStructure() {
    this.openConfirmModal({
      title: 'Remover Estrutura',
      msg: 'Deseja realmente remover a estrutura de curso escolhida para esta capacitação? A Tabela 2 ficará sem estrutura até que você selecione um novo modelo.',
      btnText: 'Sim, Remover Estrutura',
      successTitle: 'Estrutura Removida!',
      successMsg: 'A seleção da estrutura de curso foi removida com sucesso.',
      onConfirm: async () => {
        if (!this.currentTraining) return;
        this.currentTraining.courseModules = [];
        this.currentTraining.baseTemplateId = null;
        this.currentTraining.baseTemplateName = 'Nenhuma selecionada';
        this.currentTraining.isCustomized = false;
        if (window.db) {
          await window.db.saveTrainingFull(this.currentTraining, 'Limpeza da estrutura de curso selecionada');
        }
        this.renderCourseStructureStep();
        this.showToast('Estrutura removida com sucesso. Selecione um novo modelo quando desejar.', 'info');
      }
    });
  }

  renderTeamList() {
    const container = document.getElementById('wizard-team-list-container');
    if (!container || !this.currentTraining) return;

    // Sincronizar sempre todas as informações da Equipe Técnica central (UFG & FNDE)
    this.currentTraining.team = (window.getMasterTeam ? window.getMasterTeam() : (window.DEFAULT_OFFICIAL_TEAM || [])).map(m => ({ ...m }));

    const team = this.currentTraining.team;

    // Atualizar contadores das sub-abas
    const ufgCount = team.filter(m => (m.institutionGroup === 'UFG' || m.institution === 'UFG' || m.type === 'coordenacao' || m.type === 'tecnica')).length;
    const fndeCount = team.filter(m => (m.institutionGroup === 'FNDE' || m.institution === 'FNDE' || m.type === 'fnde')).length;

    const countAllEl = document.getElementById('team-count-all');
    const countUfgEl = document.getElementById('team-count-ufg');
    const countFndeEl = document.getElementById('team-count-fnde');

    if (countAllEl) countAllEl.textContent = team.length;
    if (countUfgEl) countUfgEl.textContent = ufgCount;
    if (countFndeEl) countFndeEl.textContent = fndeCount;

    // Filtrar membros conforme a aba ativa
    let displayList = team.map((m, originalIndex) => ({ ...m, originalIndex }));
    if (this.currentTeamFilter === 'UFG') {
      displayList = displayList.filter(m => (m.institutionGroup === 'UFG' || m.institution === 'UFG' || m.type === 'coordenacao' || m.type === 'tecnica'));
    } else if (this.currentTeamFilter === 'FNDE') {
      displayList = displayList.filter(m => (m.institutionGroup === 'FNDE' || m.institution === 'FNDE' || m.type === 'fnde'));
    }

    if (displayList.length === 0) {
      container.innerHTML = `
        <div style="padding:2rem; text-align:center; color:var(--text-muted); background:var(--bg-input); border-radius:var(--radius-md);">
          Nenhum integrante cadastrado nesta categoria na Equipe Técnica.
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th style="width:140px;">Pronome</th>
              <th style="width:120px;">Titulação</th>
              <th style="min-width:240px;">Nome do Integrante</th>
              <th style="width:120px; text-align:center;">Instituição</th>
              <th style="min-width:320px;">Cargo / Função Oficial</th>
            </tr>
          </thead>
          <tbody>
            ${displayList.map(item => {
              const isUfg = item.institutionGroup === 'UFG' || item.institution === 'UFG';

              return `
                <tr>
                  <td><span style="color:var(--text-secondary); font-weight:600;">${item.pronoun || '-'}</span></td>
                  <td><span style="color:var(--text-secondary); font-weight:600;">${item.title || '-'}</span></td>
                  <td><strong style="color:var(--text-primary); font-size:0.9rem;">${item.name || ''}</strong></td>
                  <td style="text-align:center;">
                    <span class="nav-badge ${isUfg ? 'badge-amber' : 'badge-blue'}">
                      ${item.institution || 'UFG'}
                    </span>
                  </td>
                  <td><span style="color:var(--text-secondary); font-size:0.85rem;">${item.role || 'Equipe Técnica'}</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  updateTeamMemberField(index, field, value) {
    if (!this.currentTraining?.team?.[index]) return;
    const member = this.currentTraining.team[index];
    member[field] = value;

    if (field === 'pronoun' || field === 'title' || field === 'name') {
      member.fullName = window.formatTeamMemberFullName(member);
    }

    if (field === 'institution') {
      member.institutionGroup = value;
      if (value === 'FNDE') member.type = 'fnde';
      else if (member.role?.includes('Coordenador do Projeto')) member.type = 'coordenacao';
      else member.type = 'tecnica';
    }

    if (field === 'role') {
      if (value.includes('CGPTE') || value.includes('CMATE') || value.includes('COATE') || value.includes('COACE') || value.includes('FNDE')) {
        member.institution = 'FNDE';
        member.institutionGroup = 'FNDE';
        member.type = 'fnde';
      }
    }

    this.saveCurrentStepData();
  }

  addTeamMemberPrompt() {
    this.openTeamMemberEditor('wizard', -1);
  }

  removeTeamMember(index) {
    this.openConfirmDeleteMemberModal('wizard', index);
  }

  /* ==========================================================================
     VIEW GLOBAL: GERENCIAMENTO DA EQUIPE TÉCNICA (MASTER)
     ========================================================================== */
  setMasterTeamFilter(filter) {
    this.currentMasterTeamFilter = filter;
    document.querySelectorAll('.master-team-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`master-team-tab-${filter.toLowerCase()}`);
    if (activeBtn) activeBtn.classList.add('active');
    this.renderMasterTeamManagement();
  }

  renderMasterTeamManagement() {
    const container = document.getElementById('master-team-list-container');
    if (!container) return;

    const masterTeam = window.getMasterTeam();

    const ufgCount = masterTeam.filter(m => (m.institutionGroup === 'UFG' || m.institution === 'UFG' || m.type === 'coordenacao' || m.type === 'tecnica')).length;
    const fndeCount = masterTeam.filter(m => (m.institutionGroup === 'FNDE' || m.institution === 'FNDE' || m.type === 'fnde')).length;

    const countAllEl = document.getElementById('master-team-count-all');
    const countUfgEl = document.getElementById('master-team-count-ufg');
    const countFndeEl = document.getElementById('master-team-count-fnde');

    if (countAllEl) countAllEl.textContent = masterTeam.length;
    if (countUfgEl) countUfgEl.textContent = ufgCount;
    if (countFndeEl) countFndeEl.textContent = fndeCount;

    let displayList = masterTeam.map((m, originalIndex) => ({ ...m, originalIndex }));
    if (this.currentMasterTeamFilter === 'UFG') {
      displayList = displayList.filter(m => (m.institutionGroup === 'UFG' || m.institution === 'UFG' || m.type === 'coordenacao' || m.type === 'tecnica'));
    } else if (this.currentMasterTeamFilter === 'FNDE') {
      displayList = displayList.filter(m => (m.institutionGroup === 'FNDE' || m.institution === 'FNDE' || m.type === 'fnde'));
    }

    container.innerHTML = `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th style="width:140px;">Pronome</th>
              <th style="width:120px;">Titulação</th>
              <th style="min-width:240px;">Nome do Integrante</th>
              <th style="width:110px; text-align:center;">Instituição</th>
              <th style="min-width:320px;">Cargo / Função Oficial</th>
              <th style="width:160px; text-align:center;">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${displayList.map(item => {
              const idx = item.originalIndex;
              const isUfg = item.institutionGroup === 'UFG' || item.institution === 'UFG';

              return `
                <tr>
                  <td><span style="color:var(--text-secondary); font-weight:600;">${item.pronoun || '-'}</span></td>
                  <td><span style="color:var(--text-secondary); font-weight:600;">${item.title || '-'}</span></td>
                  <td><strong style="color:var(--text-primary); font-size:0.9rem;">${item.name || ''}</strong></td>
                  <td style="text-align:center;">
                    <span class="nav-badge ${isUfg ? 'badge-amber' : 'badge-blue'}">
                      ${item.institution || 'UFG'}
                    </span>
                  </td>
                  <td><span style="color:var(--text-secondary); font-size:0.85rem;">${item.role || 'Equipe Técnica'}</span></td>
                  <td style="text-align:center; white-space:nowrap;">
                    <div style="display:inline-flex; gap:0.4rem; justify-content:center; align-items:center;">
                      <button type="button" class="btn btn-secondary btn-sm btn-action-edit" onclick="app.openTeamMemberEditor('master', ${idx})" style="font-size:0.75rem; padding:0.25rem 0.55rem; display:inline-flex; align-items:center;" title="Editar este integrante">${window.icons.edit} Editar</button>
                      <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.removeMasterTeamMember(${idx})" style="font-size:0.75rem; padding:0.25rem 0.55rem; display:inline-flex; align-items:center;" title="Excluir do catálogo geral">${window.icons.delete} Excluir</button>
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

  updateMasterTeamMemberField(index, field, value) {
    const masterTeam = window.getMasterTeam();
    if (!masterTeam[index]) return;

    masterTeam[index][field] = value;
    if (field === 'pronoun' || field === 'title' || field === 'name') {
      masterTeam[index].fullName = window.formatTeamMemberFullName(masterTeam[index]);
    }

    if (field === 'institution') {
      masterTeam[index].institutionGroup = value;
      if (value === 'FNDE') masterTeam[index].type = 'fnde';
      else if (masterTeam[index].role?.includes('Coordenador do Projeto')) masterTeam[index].type = 'coordenacao';
      else masterTeam[index].type = 'tecnica';
    }

    if (field === 'role') {
      if (value.includes('CGPTE') || value.includes('CMATE') || value.includes('COATE') || value.includes('COACE') || value.includes('FNDE')) {
        masterTeam[index].institution = 'FNDE';
        masterTeam[index].institutionGroup = 'FNDE';
        masterTeam[index].type = 'fnde';
      }
    }

    window.saveMasterTeam(masterTeam);
    this.showToast('Cadastro da Equipe Técnica atualizado com sucesso!', 'success');
  }

  addMasterTeamMemberPrompt() {
    this.openTeamMemberEditor('master', -1);
  }

  removeMasterTeamMember(index) {
    this.openConfirmDeleteMemberModal('master', index);
  }

  /* ==========================================================================
     GERENCIAMENTO DE INTEGRANTES IN-PAGE (DIRETO NO SISTEMA, SEM POPUP)
     ========================================================================== */
  openTeamMemberInPageEditor(context = 'wizard', index = -1) {
    const card = document.getElementById(`${context}-team-editor-card`);
    if (!card) return;

    const editIndexEl = document.getElementById(`${context}-team-edit-index`);
    if (editIndexEl) editIndexEl.value = index;

    // Popular opções de Pronome
    const pronounSelect = document.getElementById(`${context}-team-pronoun-select`);
    if (pronounSelect) {
      pronounSelect.innerHTML = `
        <option value="__unselected__" disabled selected>Selecionar Pronome...</option>
        ${(window.OFFICIAL_PRONOUNS || []).map(p => `<option value="${p.value}">${p.label}</option>`).join('')}
      `;
    }

    // Popular opções de Titulação
    const titleSelect = document.getElementById(`${context}-team-title-select`);
    if (titleSelect) {
      titleSelect.innerHTML = `
        <option value="__unselected__" disabled selected>Selecionar Titulação...</option>
        ${(window.OFFICIAL_TITLES || []).map(t => `<option value="${t.value}">${t.label}</option>`).join('')}
      `;
    }

    // Popular opções de Cargo
    const roleSelect = document.getElementById(`${context}-team-role-select`);
    const roleOptionsUFG = (window.OFFICIAL_ROLES || []).filter(r => r.group === 'UFG');
    const roleOptionsFNDE = (window.OFFICIAL_ROLES || []).filter(r => r.group === 'FNDE');
    if (roleSelect) {
      roleSelect.innerHTML = `
        <option value="__unselected__" disabled selected>Selecionar Cargo / Função...</option>
        <optgroup label="Universidade Federal de Goiás - UFG">
          ${roleOptionsUFG.map(r => `<option value="${r.value}">${r.value}</option>`).join('')}
        </optgroup>
        <optgroup label="Fundo Nacional de Desenvolvimento da Educação - FNDE">
          ${roleOptionsFNDE.map(r => `<option value="${r.value}">${r.value}</option>`).join('')}
        </optgroup>
        <option value="Outro Cargo">Outro Cargo / Função Personalizada...</option>
      `;
    }

    const titleTextEl = document.getElementById(`${context}-team-editor-title-text`);
    const nameInput = document.getElementById(`${context}-team-name-input`);
    const instSelect = document.getElementById(`${context}-team-institution-select`);
    const customRoleGroup = document.getElementById(`${context}-team-custom-role-group`);
    const customRoleInput = document.getElementById(`${context}-team-custom-role-input`);

    if (index >= 0) {
      // Modo Edição
      let member = null;
      if (context === 'wizard') {
        member = this.currentTraining?.team?.[index];
      } else {
        const masterTeam = window.getMasterTeam();
        member = masterTeam[index];
      }

      if (member) {
        if (titleTextEl) titleTextEl.textContent = `Editando Integrante: ${member.name || ''}`;
        if (pronounSelect) pronounSelect.value = (member.pronoun !== undefined && member.pronoun !== null) ? member.pronoun : '__unselected__';
        if (titleSelect) titleSelect.value = (member.title !== undefined && member.title !== null) ? member.title : '__unselected__';
        if (nameInput) nameInput.value = member.name || '';
        if (instSelect) instSelect.value = member.institution || 'UFG';

        const roleMatch = (window.OFFICIAL_ROLES || []).some(r => r.value === member.role);
        if (roleSelect) {
          if (roleMatch) {
            roleSelect.value = member.role;
            if (customRoleGroup) customRoleGroup.style.display = 'none';
          } else {
            roleSelect.value = 'Outro Cargo';
            if (customRoleGroup) customRoleGroup.style.display = 'block';
            if (customRoleInput) customRoleInput.value = member.role || '';
          }
        }
      }
    } else {
      // Modo Adição - Tudo vem no estado __unselected__ para exigir escolha ativa do usuário
      if (titleTextEl) titleTextEl.textContent = `Cadastrar Novo Integrante da Equipe`;
      if (pronounSelect) pronounSelect.value = '__unselected__';
      if (titleSelect) titleSelect.value = '__unselected__';
      if (nameInput) nameInput.value = '';
      if (instSelect) instSelect.value = '';
      if (roleSelect) roleSelect.value = '__unselected__';
      if (customRoleGroup) customRoleGroup.style.display = 'none';
      if (customRoleInput) customRoleInput.value = '';
    }

    this.updateInPagePreview(context);
    card.style.display = 'block';
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (nameInput) nameInput.focus();
  }

  openTeamMemberEditor(context = 'wizard', index = -1) {
    this.openTeamMemberInPageEditor(context, index);
  }

  closeTeamMemberInPageEditor(context = 'wizard') {
    const card = document.getElementById(`${context}-team-editor-card`);
    if (card) card.style.display = 'none';
  }

  updateInPagePreview(context = 'wizard') {
    const pronoun = document.getElementById(`${context}-team-pronoun-select`)?.value || '';
    const title = document.getElementById(`${context}-team-title-select`)?.value || '';
    const name = document.getElementById(`${context}-team-name-input`)?.value || '';

    const previewEl = document.getElementById(`${context}-team-preview-text`);
    if (previewEl) {
      const full = window.formatTeamMemberFullName({ pronoun, title, name });
      previewEl.textContent = full || '(Informe o nome do integrante)';
    }
  }

  onInPageInstitutionChange(context, val) {
    const roleSelect = document.getElementById(`${context}-team-role-select`);
    if (!roleSelect) return;

    if (val === 'FNDE' && !roleSelect.value.includes('FNDE') && !roleSelect.value.includes('CGPTE') && !roleSelect.value.includes('CMATE') && !roleSelect.value.includes('COATE') && !roleSelect.value.includes('COACE')) {
      roleSelect.value = 'Coordenador-Geral da Política do Transporte Escolar – CGPTE';
    } else if (val === 'UFG' && (roleSelect.value.includes('CGPTE') || roleSelect.value.includes('CMATE') || roleSelect.value.includes('COATE') || roleSelect.value.includes('COACE'))) {
      roleSelect.value = 'Pesquisador e Equipe Técnica';
    }
  }

  onInPageRoleChange(context, val) {
    const customRoleGroup = document.getElementById(`${context}-team-custom-role-group`);
    const instSelect = document.getElementById(`${context}-team-institution-select`);

    if (val === 'Outro Cargo') {
      if (customRoleGroup) customRoleGroup.style.display = 'block';
    } else {
      if (customRoleGroup) customRoleGroup.style.display = 'none';
      if (val.includes('CGPTE') || val.includes('CMATE') || val.includes('COATE') || val.includes('COACE') || val.includes('FNDE')) {
        if (instSelect) instSelect.value = 'FNDE';
      }
    }
  }

  saveTeamMemberInPage(context = 'wizard') {
    const editIndexEl = document.getElementById(`${context}-team-edit-index`);
    const index = editIndexEl ? parseInt(editIndexEl.value) : -1;

    const pronoun = (document.getElementById(`${context}-team-pronoun-select`)?.value || '').trim();
    const title = (document.getElementById(`${context}-team-title-select`)?.value || '').trim();
    const name = (document.getElementById(`${context}-team-name-input`)?.value || '').trim();
    const institution = (document.getElementById(`${context}-team-institution-select`)?.value || '').trim();
    let role = (document.getElementById(`${context}-team-role-select`)?.value || '').trim();

    if (role === 'Outro Cargo') {
      const custom = (document.getElementById(`${context}-team-custom-role-input`)?.value || '').trim();
      role = custom || 'Colaborador Técnico';
    }

    if (!pronoun || pronoun === '__unselected__') {
      this.showToast('Por favor, selecione o Pronome de Tratamento (ou "(Nenhum pronome)").', 'warning');
      document.getElementById(`${context}-team-pronoun-select`)?.focus();
      return;
    }

    if (!title || title === '__unselected__') {
      this.showToast('Por favor, selecione a Titulação Acadêmica (ou "(Nenhuma titulação)").', 'warning');
      document.getElementById(`${context}-team-title-select`)?.focus();
      return;
    }

    if (!name) {
      this.showToast('Por favor, informe o Nome do integrante.', 'warning');
      document.getElementById(`${context}-team-name-input`)?.focus();
      return;
    }

    if (!institution || institution === '__unselected__') {
      this.showToast('Por favor, selecione a Instituição do integrante.', 'warning');
      document.getElementById(`${context}-team-institution-select`)?.focus();
      return;
    }

    if (!role || role === '__unselected__') {
      this.showToast('Por favor, selecione o Cargo / Função do integrante.', 'warning');
      document.getElementById(`${context}-team-role-select`)?.focus();
      return;
    }

    const isFnde = institution === 'FNDE' || role.includes('FNDE') || role.includes('CGPTE') || role.includes('CMATE') || role.includes('COATE') || role.includes('COACE');
    const isCoord = role.includes('Coordenador do Projeto');

    const memberData = {
      institutionGroup: isFnde ? 'FNDE' : 'UFG',
      pronoun,
      title,
      name,
      role,
      institution,
      type: isFnde ? 'fnde' : (isCoord ? 'coordenacao' : 'tecnica')
    };
    memberData.fullName = window.formatTeamMemberFullName(memberData);

    if (context === 'wizard') {
      if (!this.currentTraining) return;
      if (!this.currentTraining.team) this.currentTraining.team = [];

      if (index >= 0 && this.currentTraining.team[index]) {
        this.currentTraining.team[index] = {
          ...this.currentTraining.team[index],
          ...memberData
        };
        this.showToast(`Integrante ${memberData.fullName} atualizado com sucesso!`, 'success');
      } else {
        memberData.id = `team_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
        memberData.order = this.currentTraining.team.length;
        this.currentTraining.team.push(memberData);
        this.showToast(`${memberData.fullName} adicionado à equipe da capacitação!`, 'success');
      }

      this.renderTeamList();
      this.saveCurrentStepData();
    } else {
      // Context: master
      const masterTeam = window.getMasterTeam();
      if (index >= 0 && masterTeam[index]) {
        masterTeam[index] = {
          ...masterTeam[index],
          ...memberData
        };
        this.showToast(`Integrante ${memberData.fullName} atualizado no catálogo geral!`, 'success');
      } else {
        memberData.id = `team_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
        memberData.order = masterTeam.length;
        masterTeam.push(memberData);
        this.showToast(`${memberData.fullName} adicionado ao catálogo geral de equipe!`, 'success');
      }

      window.saveMasterTeam(masterTeam);
      this.renderMasterTeamManagement();
    }

    this.closeTeamMemberInPageEditor(context);
  }

  /* ==========================================================================
     ETAPA 3: MUNICÍPIOS & TABELA 1
     ========================================================================== */
  ensurePoloInMunicipalities() {
    if (!this.currentTraining || !this.currentTraining.polo) return;
    const poloName = (this.currentTraining.polo || '').trim();
    if (!poloName) return;
    const poloUf = this.currentTraining.uf || 'GO';
    const poloIbge = this.currentTraining.poloIbge || '';

    if (!this.currentTraining.municipalities) {
      this.currentTraining.municipalities = [];
    }

    const muns = this.currentTraining.municipalities;

    // Normalização estrita para identificar exclusivamente o polo sede
    const normPolo = window.convocacaoParser ? window.convocacaoParser.normalizeText(poloName) : poloName.toLowerCase();

    // 1. Identificar se o município polo já existe
    let poloMun = muns.find(m => {
      const normM = window.convocacaoParser ? window.convocacaoParser.normalizeText(m.name) : (m.name || '').toLowerCase();
      const matchName = normM === normPolo && (m.uf || poloUf).toUpperCase() === poloUf.toUpperCase();
      const matchIbge = poloIbge && String(m.ibgeCode) === String(poloIbge);
      return matchName || matchIbge;
    });

    if (!poloMun) {
      let finalIbge = poloIbge;
      if (!finalIbge && window.IBGE_DATA) {
        const found = window.IBGE_DATA.find(m => m.u === poloUf && (window.convocacaoParser ? window.convocacaoParser.normalizeText(m.n) === normPolo : m.n.toLowerCase() === poloName.toLowerCase()));
        if (found) finalIbge = found.c;
      }

      poloMun = {
        id: `mun_sede_${Date.now()}`,
        ibgeCode: String(finalIbge || ''),
        name: poloName,
        uf: poloUf,
        distanceKm: 0.0,
        isSummoned: true,
        isSede: true,
        inscribedCACS: 2,
        inscribedGestores: 2,
        inscribedTotal: 4,
        presentCACS: 0,
        presentGestores: 0,
        presentTotal: 0
      };
      muns.unshift(poloMun);
    } else {
      poloMun.isSede = true;
      poloMun.distanceKm = 0.0;
      if (poloIbge && !poloMun.ibgeCode) poloMun.ibgeCode = String(poloIbge);
    }

    // 2. Corrigir e recalcular qualquer outro município que não seja o polo
    muns.forEach(m => {
      const normM = window.convocacaoParser ? window.convocacaoParser.normalizeText(m.name) : (m.name || '').toLowerCase();
      const isActuallyPolo = (normM === normPolo && (m.uf || poloUf).toUpperCase() === poloUf.toUpperCase()) || (poloIbge && String(m.ibgeCode) === String(poloIbge));
      
      if (!isActuallyPolo) {
        m.isSede = false;
        if (m.distanceKm === 0.0 || m.distanceKm === 0 || m.distanceKm === undefined) {
          m.distanceKm = window.convocacaoParser.calculateDistanceToPolo(m.name, m.uf || poloUf, poloName, poloUf);
        }
      }
    });
  }

  renderMunicipalitiesStep() {
    const container = document.getElementById('wizard-municipalities-table-preview');
    if (!container || !this.currentTraining) return;

    // Sempre incluir automaticamente o município sede/polo na lista e na contagem
    this.ensurePoloInMunicipalities();

    const muns = this.currentTraining.municipalities || [];
    const poloName = this.currentTraining.polo || 'Polo';
    const poloUf = this.currentTraining.uf || 'GO';

    // Recalcular Previsão de Participantes (4 × quantidade total de municípios, incluindo a sede)
    const autoExpected = muns.length * 4;
    this.currentTraining.expectedParticipants = autoExpected;

    const countEl = document.getElementById('wiz-muns-total-count');
    if (countEl) countEl.textContent = `${muns.length} Municípios Cadastrados`;

    const expectedInput = document.getElementById('wiz-train-expected');
    if (expectedInput) {
      expectedInput.value = autoExpected || '';
    }

    const calcDesc = document.getElementById('wiz-participants-calc-desc');
    if (calcDesc) {
      calcDesc.innerHTML = `Calculado automaticamente: <strong>4 participantes × ${muns.length} municípios</strong> (incluindo o município sede/polo <em>${poloName}</em>) = <strong>${autoExpected} participantes previstos</strong>.`;
    }

    const bulkContainer = document.getElementById('mun-bulk-actions-container');
    if (bulkContainer) bulkContainer.style.display = 'none';

    if (muns.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:2.5rem 1.5rem; background:var(--bg-input); border:1px solid var(--border-color); border-radius:var(--radius-md); color:var(--text-muted);">
          <div style="display:flex; justify-content:center; margin-bottom:0.75rem; color:var(--accent-primary);">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 10v2"></path><path d="M15 10v2"></path><path d="M9 14v2"></path><path d="M15 14v2"></path></svg>
          </div>
          <h4 style="margin:0 0 0.5rem 0; color:var(--text-primary); font-weight:700;">Nenhum município cadastrado na lista da Tabela 1</h4>
          <p style="margin-bottom:1.25rem; font-size:0.88rem; color:var(--text-secondary);">Cadastre os municípios convocados da região polo para calcular distâncias e participantes automaticamente.</p>
          <button class="btn btn-primary" onclick="app.openMunicipalityInPageEditor(-1)" style="font-weight:700; display:inline-flex; align-items:center; gap:0.4rem;">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Cadastrar Primeiro Município
          </button>
        </div>
      `;
      return;
    }

    // Ordenar municípios: Município Polo/Sede SEMPRE primeiro e fixo no topo
    this.munSortField = this.munSortField || 'name';
    this.munSortOrder = this.munSortOrder || 'asc';
    const sortField = this.munSortField;
    const sortOrder = this.munSortOrder;

    const sorted = [...muns].sort((a, b) => {
      if (a.isSede && !b.isSede) return -1;
      if (!a.isSede && b.isSede) return 1;
      if (a.isSede && b.isSede) return 0;

      if (sortField === 'distance') {
        const distA = parseFloat(a.distanceKm || 0);
        const distB = parseFloat(b.distanceKm || 0);
        return sortOrder === 'asc' ? distA - distB : distB - distA;
      } else {
        const comp = (a.name || '').localeCompare(b.name || '', 'pt-BR', { sensitivity: 'base' });
        return sortOrder === 'asc' ? comp : -comp;
      }
    });

    let rowsHtml = sorted.map((m, idx) => {
      const realIndex = muns.findIndex(item => item.id === m.id || (item.ibgeCode === m.ibgeCode && item.name === m.name));
      const targetIdx = realIndex !== -1 ? realIndex : idx;

      return `
        <tr>
          <td style="text-align:center;">
            ${m.isSede 
              ? `<input type="checkbox" disabled title="A sede do polo não pode ser excluída" style="opacity:0.25; cursor:not-allowed; width:15px; height:15px;">` 
              : `<input type="checkbox" class="mun-row-checkbox" data-target-index="${targetIdx}" onchange="app.onMunicipalityCheckboxChange()" style="cursor:pointer; width:15px; height:15px;">`
            }
          </td>
          <td style="text-align:center;">
            <span class="font-mono" style="font-weight:700; color:var(--accent-blue-text); font-size:0.92rem;">${m.ibgeCode || '-'}</span>
          </td>
          <td style="text-align:left;">
            <strong style="color:var(--text-primary); font-size:0.92rem;">${m.name || ''}</strong>
          </td>
          <td style="text-align:center;">
            <span class="nav-badge badge-blue font-bold" style="font-size:0.75rem; padding:0.15rem 0.5rem;">${m.uf || poloUf}</span>
          </td>
          <td style="text-align:right;">
            <span class="font-mono" style="font-weight:700; color:${m.isSede ? 'var(--accent-amber-text)' : 'var(--accent-emerald-text)'}; font-size:0.95rem;">
              ${m.isSede ? '0,0 km' : `${parseFloat(m.distanceKm || 0).toFixed(1).replace('.', ',')} km`}
            </span>
          </td>
          <td style="text-align:center; white-space:nowrap;">
            <div style="display:inline-flex; gap:0.4rem; justify-content:center; align-items:center;">
              ${m.isSede 
                ? `<span class="btn btn-secondary btn-sm" style="opacity:0.75; cursor:default; font-size:0.75rem; padding:0.25rem 0.65rem; display:inline-flex; align-items:center; font-weight:600;" title="Município Sede / Polo Oficial">${window.icons.sede} Sede</span>`
                : `<button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.removeMunicipality(${targetIdx})" style="font-size:0.75rem; padding:0.25rem 0.55rem; display:inline-flex; align-items:center;" title="Excluir município">${window.icons.delete} Excluir</button>`
              }
            </div>
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th style="width: 44px; text-align:center;">
                <input type="checkbox" id="mun-table-select-all" onchange="app.toggleSelectAllTableMunicipalities(this.checked)" title="Selecionar todos os municípios convocados" style="cursor:pointer; width:16px; height:16px;">
              </th>
              <th style="width: 130px; text-align:center;">Código IBGE</th>
              <th class="th-sortable" onclick="app.sortMunicipalities('name')" style="text-align:left; cursor:pointer;" title="Clique para classificar por Nome (${sortField === 'name' && sortOrder === 'asc' ? 'Decrescente Z-A' : 'Crescente A-Z'})">
                <div style="display:inline-flex; align-items:center; gap:0.45rem;">
                  <span>Nome do Município</span>
                  <span class="sort-icon-badge">${this.getMunSortIcon('name')}</span>
                </div>
              </th>
              <th style="width: 70px; text-align:center;">UF</th>
              <th class="th-sortable" onclick="app.sortMunicipalities('distance')" style="width: 155px; text-align:right; cursor:pointer;" title="Clique para classificar por Distância (${sortField === 'distance' && sortOrder === 'asc' ? 'Decrescente' : 'Crescente'})">
                <div style="display:inline-flex; align-items:center; justify-content:flex-end; gap:0.45rem; width:100%;">
                  <span>Distância (km)</span>
                  <span class="sort-icon-badge">${this.getMunSortIcon('distance')}</span>
                </div>
              </th>
              <th style="width: 140px; text-align:center;">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.85rem; flex-wrap:wrap; gap:0.5rem;">
        <button class="btn btn-secondary btn-sm" onclick="app.recalculateAllDistancesToPolo()" title="Recalcular distância de todos os municípios em relação ao Polo Capacitador (${poloName})" style="display:inline-flex; align-items:center; gap:0.35rem;">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg> Recalcular Distâncias pelo Polo (${poloName})
        </button>
        <div style="font-size:0.82rem; color:var(--text-secondary);">
          Total de <strong>${muns.length}</strong> município(s) cadastrado(s) na Tabela 1 (incluindo o Polo <em>${poloName}</em>).
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     IN-PAGE EDITOR DE MUNICÍPIOS (ETAPA 3)
     ========================================================================== */
  openMunicipalityInPageEditor(editIndex = -1) {
    const card = document.getElementById('wizard-mun-editor-card');
    if (!card) {
      this.openAddMunicipalityModal('wizard');
      return;
    }

    const titleText = document.getElementById('wizard-mun-editor-title-text');
    const editIndexEl = document.getElementById('wizard-mun-edit-index');
    const ufSelect = document.getElementById('wizard-mun-uf-select');
    const distInput = document.getElementById('wizard-mun-dist-input');
    const ibgeInput = document.getElementById('wizard-mun-ibge-input');

    if (editIndexEl) editIndexEl.value = editIndex;

    const defaultUf = this.currentTraining?.uf || 'GO';

    if (editIndex === -1) {
      if (titleText) titleText.textContent = 'Cadastrar Município Convocado';
      if (ufSelect) ufSelect.value = defaultUf;
      this.onWizardMunUfChange(defaultUf);
    } else {
      if (titleText) titleText.textContent = 'Editar Município Convocado';
      const m = this.currentTraining?.municipalities?.[editIndex];
      if (m) {
        const munUf = m.uf || defaultUf;
        if (ufSelect) ufSelect.value = munUf;
        this.onWizardMunUfChange(munUf, m.name, m.ibgeCode);
        if (distInput) distInput.value = parseFloat(m.distanceKm || 0).toFixed(1);
        if (ibgeInput) ibgeInput.value = m.ibgeCode || '';
      }
    }

    card.style.display = 'block';
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  closeMunicipalityInPageEditor() {
    const card = document.getElementById('wizard-mun-editor-card');
    if (card) card.style.display = 'none';
  }

  onWizardMunUfChange(uf, selectedCity = null, selectedIbge = null) {
    const citySelect = document.getElementById('wizard-mun-city-select');
    if (!citySelect || !window.IBGE_DATA) return;

    const filtered = window.IBGE_DATA.filter(m => m.u === uf).sort((a, b) => a.n.localeCompare(b.n));

    citySelect.innerHTML = `<option value="" disabled ${!selectedCity ? 'selected' : ''}>Selecionar Município...</option>` +
      filtered.map(m => {
        const isSel = (selectedCity && m.n.toLowerCase() === selectedCity.toLowerCase()) ||
                      (selectedIbge && String(m.c) === String(selectedIbge));
        return `<option value="${m.n}" data-ibge="${m.c}" ${isSel ? 'selected' : ''}>${m.n}</option>`;
      }).join('');

    this.onWizardMunCityChange();
  }

  onWizardMunCityChange() {
    const ufSelect = document.getElementById('wizard-mun-uf-select');
    const citySelect = document.getElementById('wizard-mun-city-select');
    const ibgeInput = document.getElementById('wizard-mun-ibge-input');
    const distInput = document.getElementById('wizard-mun-dist-input');
    const previewPolo = document.getElementById('wizard-mun-preview-polo');
    const previewDist = document.getElementById('wizard-mun-preview-dist');

    if (!citySelect || !citySelect.selectedOptions[0]) return;

    const activeOption = citySelect.selectedOptions[0];
    const cityName = activeOption.value;
    const ibgeCode = activeOption.getAttribute('data-ibge') || '';
    const uf = ufSelect?.value || this.currentTraining?.uf || 'GO';

    if (ibgeInput) ibgeInput.value = ibgeCode;

    const poloName = this.currentTraining?.polo || 'Polo';
    const poloUf = this.currentTraining?.uf || uf;

    const calcDist = (cityName && poloName)
      ? window.convocacaoParser.calculateDistanceToPolo(cityName, uf, poloName, poloUf)
      : 0.0;

    if (distInput) {
      distInput.value = parseFloat(calcDist).toFixed(1);
    }

    if (previewPolo) previewPolo.textContent = `${poloName} (${poloUf})`;
    if (previewDist) previewDist.textContent = `${parseFloat(calcDist).toFixed(1).replace('.', ',')} km`;
  }

  saveMunicipalityInPage() {
    const editIndexEl = document.getElementById('wizard-mun-edit-index');
    const ufSelect = document.getElementById('wizard-mun-uf-select');
    const citySelect = document.getElementById('wizard-mun-city-select');
    const ibgeInput = document.getElementById('wizard-mun-ibge-input');
    const distInput = document.getElementById('wizard-mun-dist-input');

    const editIndex = editIndexEl ? parseInt(editIndexEl.value) : -1;
    const uf = ufSelect?.value || 'GO';
    const cityName = citySelect?.value;
    const ibgeCode = ibgeInput?.value || citySelect?.selectedOptions[0]?.getAttribute('data-ibge') || '';
    const distanceKm = parseFloat(distInput?.value) || 0.0;

    if (!cityName) {
      this.showToast('Por favor, selecione um município na lista.', 'warning');
      return;
    }

    if (!this.currentTraining) return;
    if (!this.currentTraining.municipalities) this.currentTraining.municipalities = [];

    const muns = this.currentTraining.municipalities;

    if (editIndex === -1) {
      // Verificar se já existe
      const alreadyExists = muns.some(m => String(m.ibgeCode) === String(ibgeCode) || (m.name.toLowerCase() === cityName.toLowerCase() && m.uf === uf));
      if (alreadyExists) {
        this.showToast(`O município ${cityName} (${uf}) já está cadastrado na Tabela 1.`, 'warning');
        return;
      }

      muns.push({
        id: `mun_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        ibgeCode: String(ibgeCode),
        name: cityName,
        uf: uf,
        distanceKm: distanceKm,
        isSummoned: true,
        inscribedCACS: 2,
        inscribedGestores: 2,
        inscribedTotal: 4,
        presentCACS: 0,
        presentGestores: 0,
        presentTotal: 0
      });

      this.showToast(`${cityName} (${uf}) adicionado à Tabela 1! Distância: ${distanceKm.toFixed(1).replace('.', ',')} km`, 'success');
    } else {
      if (muns[editIndex]) {
        muns[editIndex].uf = uf;
        muns[editIndex].name = cityName;
        muns[editIndex].ibgeCode = String(ibgeCode);
        muns[editIndex].distanceKm = distanceKm;
        this.showToast(`Município ${cityName} (${uf}) atualizado com sucesso!`, 'success');
      }
    }

    this.closeMunicipalityInPageEditor();
    this.renderMunicipalitiesStep();
    this.saveCurrentStepData();
  }

  updateMunicipalityField(index, field, value) {
    if (!this.currentTraining?.municipalities?.[index]) return;
    this.currentTraining.municipalities[index][field] = value;

    if (field === 'name' || field === 'uf') {
      const m = this.currentTraining.municipalities[index];
      const poloName = this.currentTraining.polo;
      const poloUf = this.currentTraining.uf || 'MT';
      if (poloName) {
        m.distanceKm = window.convocacaoParser.calculateDistanceToPolo(m.name, m.uf || poloUf, poloName, poloUf);
        this.renderMunicipalitiesStep();
      }
    }

    this.saveCurrentStepData();
  }

  removeMunicipality(index) {
    if (!this.currentTraining?.municipalities) return;
    this.currentTraining.municipalities.splice(index, 1);
    this.renderMunicipalitiesStep();
    this.saveCurrentStepData();
    this.showToast('Município removido da lista.');
  }

  /* --------------------------------------------------------------------------
     AÇÕES EM MASSA: SELEÇÃO E EXCLUSÃO DE MUNICÍPIOS
     -------------------------------------------------------------------------- */
  toggleSelectAllTableMunicipalities(isChecked) {
    const checkboxes = document.querySelectorAll('.mun-row-checkbox');
    checkboxes.forEach(cb => {
      cb.checked = isChecked;
    });
    this.onMunicipalityCheckboxChange();
  }

  onMunicipalityCheckboxChange() {
    const checkboxes = document.querySelectorAll('.mun-row-checkbox');
    const checked = Array.from(checkboxes).filter(cb => cb.checked);
    const container = document.getElementById('mun-bulk-actions-container');
    const btnText = document.getElementById('btn-delete-selected-muns-text');
    const selectAllCb = document.getElementById('mun-table-select-all');

    if (selectAllCb) {
      selectAllCb.checked = checkboxes.length > 0 && checked.length === checkboxes.length;
      selectAllCb.indeterminate = checked.length > 0 && checked.length < checkboxes.length;
    }

    if (container) {
      if (checked.length > 0) {
        container.style.display = 'flex';
        if (btnText) {
          btnText.textContent = `Excluir Selecionados (${checked.length})`;
        }
      } else {
        container.style.display = 'none';
      }
    }
  }

  confirmDeleteSelectedMunicipalities() {
    const checkboxes = document.querySelectorAll('.mun-row-checkbox:checked');
    const count = checkboxes.length;
    if (count === 0) return;

    this.openConfirmModal({
      title: 'Excluir Municípios Selecionados',
      msg: `Tem certeza que deseja excluir os ${count} municípios selecionados da lista de convocados? O município sede/polo será preservado.`,
      btnText: 'Sim, Excluir Selecionados',
      onConfirm: () => {
        this.executeDeleteSelectedMunicipalities();
      }
    });
  }

  async executeDeleteSelectedMunicipalities() {
    if (!this.currentTraining || !Array.isArray(this.currentTraining.municipalities)) return;

    const checkboxes = document.querySelectorAll('.mun-row-checkbox:checked');
    const indicesToDelete = new Set();
    checkboxes.forEach(cb => {
      const idx = parseInt(cb.getAttribute('data-target-index'), 10);
      if (!isNaN(idx)) indicesToDelete.add(idx);
    });

    if (indicesToDelete.size === 0) return;

    const deletedCount = indicesToDelete.size;
    this.currentTraining.municipalities = this.currentTraining.municipalities.filter((m, idx) => {
      if (m.isSede) return true; // Sempre preserva o município sede
      return !indicesToDelete.has(idx);
    });

    this.renderMunicipalitiesStep();
    this.saveCurrentStepData();
    if (window.db) {
      await window.db.saveTrainingFull(this.currentTraining, `Exclusão em massa de ${deletedCount} municípios convocados`);
    }
    this.showToast(`${deletedCount} município(s) excluído(s) com sucesso!`, 'success');
  }

  /* --------------------------------------------------------------------------
     ORDENAÇÃO DA TABELA DE MUNICÍPIOS (SEDE SEMPRE FIXA NO TOPO)
     -------------------------------------------------------------------------- */
  getMunSortIcon(field) {
    if (this.munSortField !== field) {
      // Ícone neutro de ordenação (linhas de classificação sutis)
      return `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.4;"><path d="M7 15l5 5 5-5"></path><path d="M7 9l5-5 5 5"></path></svg>`;
    }
    if (this.munSortOrder === 'asc') {
      // Crescente: linhas ordenadas com seta para cima
      return `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color:#f59e0b;"><line x1="3" y1="6" x2="11" y2="6"></line><line x1="3" y1="12" x2="9" y2="12"></line><line x1="3" y1="18" x2="7" y2="18"></line><polyline points="15 9 18 6 21 9"></polyline><line x1="18" y1="6" x2="18" y2="18"></line></svg>`;
    } else {
      // Decrescente: linhas ordenadas com seta para baixo
      return `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color:#f59e0b;"><line x1="3" y1="6" x2="11" y2="6"></line><line x1="3" y1="12" x2="9" y2="12"></line><line x1="3" y1="18" x2="7" y2="18"></line><polyline points="15 15 18 18 21 15"></polyline><line x1="18" y1="6" x2="18" y2="18"></line></svg>`;
    }
  }

  sortMunicipalities(field) {
    if (!this.currentTraining?.municipalities) return;
    if (this.munSortField === field) {
      this.munSortOrder = this.munSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.munSortField = field;
      this.munSortOrder = 'asc';
    }

    // Ordenar a lista na memória garantindo que a sede NUNCA saia do topo (índice 0)
    const sortField = this.munSortField;
    const sortOrder = this.munSortOrder;

    this.currentTraining.municipalities.sort((a, b) => {
      if (a.isSede && !b.isSede) return -1;
      if (!a.isSede && b.isSede) return 1;
      if (a.isSede && b.isSede) return 0;

      if (sortField === 'distance') {
        const distA = parseFloat(a.distanceKm || 0);
        const distB = parseFloat(b.distanceKm || 0);
        return sortOrder === 'asc' ? distA - distB : distB - distA;
      } else {
        const comp = (a.name || '').localeCompare(b.name || '', 'pt-BR', { sensitivity: 'base' });
        return sortOrder === 'asc' ? comp : -comp;
      }
    });

    this.renderMunicipalitiesStep();
    this.saveCurrentStepData();

    const label = field === 'name' ? 'Nome do Município' : 'Distância (km)';
    const dir = this.munSortOrder === 'asc' ? 'crescente' : 'decrescente';
    this.showToast(`Municípios ordenados por ${label} (${dir}). A sede permanece fixa no topo.`);
  }

  recalculateAllDistancesToPolo() {
    if (!this.currentTraining || !this.currentTraining.municipalities) return;
    const poloName = this.currentTraining.polo;
    const poloUf = this.currentTraining.uf || 'MT';
    if (!poloName) {
      this.showToast('Por favor, informe o Município Polo na Etapa 1 primeiro.', 'warning');
      return;
    }

    let count = 0;
    this.currentTraining.municipalities.forEach(m => {
      const dist = window.convocacaoParser.calculateDistanceToPolo(m.name, m.uf || poloUf, poloName, poloUf);
      m.distanceKm = dist;
      count++;
    });

    this.renderMunicipalitiesStep();
    this.saveCurrentStepData();
    this.showToast(`Distâncias de ${count} municípios recalculadas em relação ao polo ${poloName}!`, 'success');
  }

  addMunicipalityPrompt() {
    this.openMunicipalityInPageEditor(-1);
  }

  /* ==========================================================================
     MODAL SELETOR WEB DE MUNICÍPIOS (UF + IBGE)
     ========================================================================== */
  openAddMunicipalityModal(context = 'wizard') {
    this.addMunContext = context; // 'convocacao' ou 'wizard'

    let defaultUf = 'MT';
    if (context === 'convocacao' && this.extractedConvocacaoData) {
      defaultUf = this.extractedConvocacaoData.uf || 'MT';
    } else if (this.currentTraining) {
      defaultUf = this.currentTraining.uf || 'MT';
    }

    const ufSelect = document.getElementById('add-mun-uf-select');
    if (ufSelect) ufSelect.value = defaultUf;

    this.onAddMunUfChange(defaultUf);

    const modal = document.getElementById('modal-add-municipality');
    if (modal) modal.style.display = 'flex';
  }

  closeAddMunicipalityModal() {
    const modal = document.getElementById('modal-add-municipality');
    if (modal) modal.style.display = 'none';
  }

  onAddMunUfChange(uf) {
    const citySelect = document.getElementById('add-mun-city-select');
    if (!citySelect || !window.IBGE_DATA) return;

    const filtered = window.IBGE_DATA
      .filter(m => m.u === uf)
      .sort((a, b) => a.n.localeCompare(b.n));

    citySelect.innerHTML = filtered.map(m => `
      <option value="${m.n}" data-ibge="${m.c}">${m.n} (IBGE: ${m.c})</option>
    `).join('');

    this.onAddMunCityChange();
  }

  onAddMunCityChange() {
    const ufSelect = document.getElementById('add-mun-uf-select');
    const citySelect = document.getElementById('add-mun-city-select');
    const ibgePreview = document.getElementById('add-mun-preview-ibge');
    const distPreview = document.getElementById('add-mun-preview-dist');

    if (!citySelect || !citySelect.selectedOptions[0]) return;

    const activeOption = citySelect.selectedOptions[0];
    const cityName = activeOption.value;
    const ibgeCode = activeOption.getAttribute('data-ibge') || '';
    const uf = ufSelect?.value || 'MT';

    let poloName = 'Polo';
    let poloUf = uf;

    if (this.addMunContext === 'convocacao' && this.extractedConvocacaoData) {
      poloName = this.extractedConvocacaoData.polo || 'Polo';
      poloUf = this.extractedConvocacaoData.uf || uf;
    } else if (this.currentTraining) {
      poloName = this.currentTraining.polo || 'Polo';
      poloUf = this.currentTraining.uf || uf;
    }

    const dist = window.convocacaoParser.calculateDistanceToPolo(cityName, uf, poloName, poloUf);

    if (ibgePreview) ibgePreview.textContent = ibgeCode;
    if (distPreview) distPreview.textContent = `${parseFloat(dist).toFixed(1)} km`;
  }

  confirmAddMunicipalityFromModal() {
    const ufSelect = document.getElementById('add-mun-uf-select');
    const citySelect = document.getElementById('add-mun-city-select');
    if (!citySelect || !citySelect.selectedOptions[0]) return;

    const activeOption = citySelect.selectedOptions[0];
    const cityName = activeOption.value;
    const ibgeCode = activeOption.getAttribute('data-ibge') || '';
    const uf = ufSelect?.value || 'MT';

    let poloName = 'Polo';
    let poloUf = uf;

    if (this.addMunContext === 'convocacao' && this.extractedConvocacaoData) {
      poloName = this.extractedConvocacaoData.polo || 'Polo';
      poloUf = this.extractedConvocacaoData.uf || uf;
    } else if (this.currentTraining) {
      poloName = this.currentTraining.polo || 'Polo';
      poloUf = this.currentTraining.uf || uf;
    }

    const calcDist = window.convocacaoParser.calculateDistanceToPolo(cityName, uf, poloName, poloUf);

    if (this.addMunContext === 'convocacao') {
      if (!this.extractedConvocacaoData) return;
      if (!this.extractedConvocacaoData.allMunicipalities) this.extractedConvocacaoData.allMunicipalities = [];

      if (!this.extractedConvocacaoData.allMunicipalities.some(m => String(m.code) === String(ibgeCode))) {
        this.extractedConvocacaoData.allMunicipalities.push({
          name: cityName,
          code: parseInt(ibgeCode) || ibgeCode,
          uf: uf,
          dateGroup: 'Geral',
          distanceKm: calcDist
        });
        this.renderConvocacaoExtractedMunicipalities();
        this.showToast(`${cityName} (${uf}) adicionado à Convocação! Distância: ${calcDist} km`, 'success');
      } else {
        this.showToast(`O município ${cityName} (${uf}) já está na lista.`, 'warning');
      }
    } else {
      if (!this.currentTraining) return;
      if (!this.currentTraining.municipalities) this.currentTraining.municipalities = [];

      this.currentTraining.municipalities.push({
        id: `mun_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        ibgeCode: String(ibgeCode),
        name: cityName,
        uf,
        distanceKm: calcDist,
        isSummoned: true,
        inscribedCACS: 2,
        inscribedGestores: 2,
        inscribedTotal: 4,
        presentCACS: 0,
        presentGestores: 0,
        presentTotal: 0
      });

      this.renderMunicipalitiesStep();
      this.saveCurrentStepData();
      this.showToast(`${cityName} (${uf}) adicionado à Tabela 1! Distância: ${calcDist} km`, 'success');
    }

    this.closeAddMunicipalityModal();
  }

  /* ==========================================================================
     ETAPA 4: ESTRUTURA DO CURSO & TABELA 2 (MODELO PADRÃO & CÓPIA INDEPENDENTE)
     ========================================================================== */
  renderCourseStructureStep() {
    if (!this.currentTraining) return;

    // Normaliza módulos se existirem, sem reinjetar modelo automaticamente se tiver sido limpo
    if (Array.isArray(this.currentTraining.courseModules) && this.currentTraining.courseModules.length > 0) {
      if (window.courseStructureHelper) {
        this.currentTraining.courseModules = window.courseStructureHelper.normalize(this.currentTraining.courseModules);
      }

      // Autocorreção preventiva: se os módulos foram carregados com tópicos e horas zerados devido à falha anterior de persistência
      const isCorruptedEmpty = this.currentTraining.courseModules.every(m => {
        const gEmpty = !m.topicGestor && (!m.gestorTopics || m.gestorTopics.every(t => !t.topic || (parseFloat(t.hours) || 0) === 0));
        const cEmpty = !m.topicCACS && (!m.cacsTopics || m.cacsTopics.every(t => !t.topic || (parseFloat(t.hours) || 0) === 0));
        return gEmpty && cEmpty;
      });

      if (isCorruptedEmpty && window.courseStructureHelper) {
        const tpl = (this.currentTraining.baseTemplateId ? window.courseStructureHelper.getTemplateById(this.currentTraining.baseTemplateId) : null) || window.courseStructureHelper.getDefaultTemplate();
        if (tpl && tpl.modules && tpl.modules.length > 0) {
          this.currentTraining.courseModules = window.courseStructureHelper.makeDeepCopy(tpl.modules);
          this.currentTraining.baseTemplateName = tpl.name;
        }
      }
    } else {
      this.currentTraining.courseModules = [];
    }

    // Atualizar banner de status da estrutura
    const nameEl = document.getElementById('step4-base-template-name');
    const statusEl = document.getElementById('step4-structure-status-tag');
    const hasMods = this.currentTraining.courseModules.length > 0;
    if (nameEl) {
      nameEl.textContent = hasMods ? (this.currentTraining.baseTemplateName || 'Modelo Padrão') : 'Nenhuma selecionada';
    }
    if (statusEl) {
      if (!hasMods) {
        statusEl.style.display = 'none';
      } else if (this.currentTraining.isCustomized) {
        statusEl.style.display = 'inline-flex';
        statusEl.className = 'nav-badge badge-blue';
        statusEl.textContent = 'Personalizada para esta capacitação';
      } else {
        statusEl.style.display = 'inline-flex';
        statusEl.className = 'nav-badge badge-emerald';
        statusEl.textContent = 'Cópia independente da capacitação';
      }
    }

    const mods = this.currentTraining.courseModules || [];
    const editorContainer = document.getElementById('wizard-course-modules-editor');
    const tableContainer = document.getElementById('wizard-course-table-preview');

    // Sincronizar estado visual do editor e do botão de edição
    if (editorContainer) {
      editorContainer.style.display = this.isCourseEditorOpen ? 'block' : 'none';
    }
    const btnTextEl = document.getElementById('btn-toggle-course-editor-text');
    if (btnTextEl) {
      btnTextEl.textContent = this.isCourseEditorOpen ? 'Concluir Edição' : 'Editar Estrutura';
    }

    // 1. Renderizar Formuário de Edição de Módulos e Temáticas
    if (editorContainer) {
      if (mods.length === 0) {
        editorContainer.innerHTML = `
          <div style="text-align:center; padding:2.5rem; background:var(--bg-input); border:1px dashed var(--border-color); border-radius:var(--radius-md);">
            <p style="color:var(--text-secondary); margin-bottom:1rem;">Nenhum módulo configurado para esta capacitação.</p>
            <button class="btn btn-primary btn-sm" onclick="app.confirmRestoreDefaultCourseStructure()" style="display:inline-flex; align-items:center; gap:0.35rem;">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Carregar Modelo Padrão Oficial (4 Módulos)
            </button>
          </div>
        `;
      } else {
        const headerBar = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding:0.75rem 1rem; background:rgba(59,130,246,0.08); border:1px solid rgba(59,130,246,0.25); border-radius:var(--radius-md); flex-wrap:wrap; gap:0.5rem;">
            <span style="font-weight:700; font-size:0.88rem; color:var(--accent-blue-text); display:flex; align-items:center; gap:0.4rem;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              <span>Formulário de Edição de Módulos e Temáticas da Capacitação</span>
            </span>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="app.addNewCourseModule()" style="font-weight:600; display:inline-flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Adicionar Módulo
              </button>
              <button type="button" class="btn btn-primary btn-sm" onclick="app.toggleCourseEditor(false)" style="font-weight:700; display:inline-flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Concluir Edição
              </button>
            </div>
          </div>
        `;

        const cardsHtml = mods.map((mod, modIdx) => {
          const gTopics = mod.gestorTopics || [];
          const cTopics = mod.cacsTopics || [];

          const gTotalHours = gTopics.reduce((acc, t) => acc + (parseFloat(t.hours) || 0), 0);
          const cTotalHours = cTopics.reduce((acc, t) => acc + (parseFloat(t.hours) || 0), 0);

          return `
            <div class="course-mod-card" data-mod-id="${mod.id}">
              <!-- Cabeçalho do Card do Módulo -->
              <div class="course-mod-header">
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <span class="nav-badge badge-blue font-bold" style="font-size:0.9rem; padding:0.25rem 0.65rem;">
                    Módulo ${mod.moduleNumber || `0${modIdx + 1}`}
                  </span>
                  <div style="display:flex; align-items:center; gap:0.4rem;">
                    <label style="font-size:0.78rem; color:var(--text-muted); margin:0;">Identificador:</label>
                    <input type="text" class="form-control form-control-sm" style="width:70px; text-align:center; font-weight:700;" value="${mod.moduleNumber || `0${modIdx + 1}`}" onchange="app.updateCourseModuleNumber(${modIdx}, this.value)">
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:0.4rem;">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.moveCourseModule(${modIdx}, -1)" ${modIdx === 0 ? 'disabled' : ''} title="Mover para cima" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                  </button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.moveCourseModule(${modIdx}, 1)" ${modIdx === mods.length - 1 ? 'disabled' : ''} title="Mover para baixo" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                  </button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.duplicateCourseModule(${modIdx})" title="Duplicar Módulo com todas as temáticas" style="padding:0.2rem 0.55rem; font-weight:600; display:inline-flex; align-items:center; gap:0.25rem;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Duplicar
                  </button>
                  <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.deleteCourseModule(${modIdx})" title="Excluir Módulo" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center;">
                    ${window.icons.delete}
                  </button>
                </div>
              </div>

              <!-- Checkbox de Módulo Compartilhado -->
              <div style="margin:0.75rem 0 1rem 0; padding:0.5rem 0.75rem; background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.2); border-radius:var(--radius-md);">
                <label style="display:flex; align-items:center; gap:0.55rem; font-weight:700; font-size:0.86rem; color:var(--text-primary); cursor:pointer; margin:0;">
                  <input type="checkbox" ${mod.isShared ? 'checked' : ''} onchange="app.toggleCourseModuleShared(${modIdx}, this.checked)">
                  <span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:0.25rem;"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>Módulo compartilhado entre Gestores e CACS (mesmo conteúdo e carga horária)</span>
                </label>
              </div>

              ${mod.isShared ? `
                <!-- Bloco Único: Módulo Compartilhado -->
                <div style="background:var(--bg-input); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
                  <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem; margin-bottom:0.75rem;">
                    <strong style="font-size:0.85rem; color:var(--accent-blue-text); display:flex; align-items:center; gap:0.35rem;">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg> Temática do Módulo Compartilhado
                    </strong>
                    <span class="nav-badge font-mono font-bold" style="font-size:0.75rem; background:rgba(59,130,246,0.15); color:var(--accent-blue-text);">
                      Carga Horária: ${gTotalHours.toFixed(1).replace('.', ',')} h
                    </span>
                  </div>

                  <div style="display:flex; flex-direction:column; gap:0.5rem;">
                    ${gTopics.map((t, tIdx) => `
                      <div class="course-topic-item">
                        <input type="text" class="form-control form-control-sm" placeholder="Temática do Módulo" value="${(t.topic || '').replace(/"/g, '&quot;')}" onchange="app.updateCourseTopic(${modIdx}, 'shared', ${tIdx}, 'topic', this.value)">
                        <div style="display:flex; align-items:center; gap:0.25rem;">
                          <input type="number" step="0.5" min="0" class="form-control form-control-sm" style="text-align:center; font-weight:700;" value="${parseFloat(t.hours) || 0}" onchange="app.updateCourseTopic(${modIdx}, 'shared', ${tIdx}, 'hours', this.value)">
                          <span style="font-size:0.75rem; color:var(--text-muted);">h</span>
                        </div>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeCourseTopic(${modIdx}, 'shared', ${tIdx})" style="padding:0.2rem 0.4rem; color:var(--accent-rose-text); display:inline-flex; align-items:center;" title="Remover Temática">
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                    `).join('')}
                  </div>

                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.addCourseTopic(${modIdx}, 'shared')" style="align-self:flex-start; font-size:0.78rem; font-weight:600; margin-top:0.5rem; display:inline-flex; align-items:center; gap:0.25rem;">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Adicionar Temática
                  </button>
                </div>
              ` : `
                <!-- Grade Dupla: Módulo Específico por Público (Gestor vs CACS) -->
                <div class="course-mod-grid">
                  <!-- Coluna Gestores Municipais -->
                  <div class="course-topic-col">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;">
                      <strong style="font-size:0.85rem; color:var(--accent-blue-text); display:flex; align-items:center; gap:0.35rem;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="7" r="4"></circle><path d="M15.5 14H5a4 4 0 0 0-4 4v3h10"></path><circle cx="18" cy="18" r="2"></circle><path d="M18 14.5v1M18 20.5v1M14.5 18h1M20.5 18h1M15.5 15.5l.7.7M19.8 19.8l.7.7M15.5 20.5l.7-.7M19.8 16.2l.7-.7"></path></svg> Gestão Municipal (Gestores)
                      </strong>
                      <span class="nav-badge font-mono font-bold" style="font-size:0.75rem; background:rgba(59,130,246,0.15); color:var(--accent-blue-text);">
                        Total: ${gTotalHours.toFixed(1).replace('.', ',')} h
                      </span>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                      ${gTopics.map((t, tIdx) => `
                        <div class="course-topic-item">
                          <input type="text" class="form-control form-control-sm" placeholder="Temática para Gestores" value="${(t.topic || '').replace(/"/g, '&quot;')}" onchange="app.updateCourseTopic(${modIdx}, 'gestor', ${tIdx}, 'topic', this.value)">
                          <div style="display:flex; align-items:center; gap:0.25rem;">
                            <input type="number" step="0.5" min="0" class="form-control form-control-sm" style="text-align:center; font-weight:700;" value="${parseFloat(t.hours) || 0}" onchange="app.updateCourseTopic(${modIdx}, 'gestor', ${tIdx}, 'hours', this.value)">
                            <span style="font-size:0.75rem; color:var(--text-muted);">h</span>
                          </div>
                          <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeCourseTopic(${modIdx}, 'gestor', ${tIdx})" style="padding:0.2rem 0.4rem; color:var(--accent-rose-text); display:inline-flex; align-items:center;" title="Remover Temática">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      `).join('')}
                    </div>

                    <button type="button" class="btn btn-secondary btn-sm" onclick="app.addCourseTopic(${modIdx}, 'gestor')" style="align-self:flex-start; font-size:0.78rem; font-weight:600; margin-top:0.25rem; display:inline-flex; align-items:center; gap:0.25rem;">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Adicionar Temática Gestor
                    </button>
                  </div>

                  <!-- Coluna Conselheiros CACS-FUNDEB -->
                  <div class="course-topic-col">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;">
                      <strong style="font-size:0.85rem; color:var(--accent-emerald-text); display:flex; align-items:center; gap:0.35rem;">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Conselheiros CACS-FUNDEB
                      </strong>
                      <span class="nav-badge font-mono font-bold" style="font-size:0.75rem; background:rgba(16,185,129,0.15); color:var(--accent-emerald-text);">
                        Total: ${cTotalHours.toFixed(1).replace('.', ',')} h
                      </span>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                      ${cTopics.map((t, tIdx) => `
                        <div class="course-topic-item">
                          <input type="text" class="form-control form-control-sm" placeholder="Temática para CACS" value="${(t.topic || '').replace(/"/g, '&quot;')}" onchange="app.updateCourseTopic(${modIdx}, 'cacs', ${tIdx}, 'topic', this.value)">
                          <div style="display:flex; align-items:center; gap:0.25rem;">
                            <input type="number" step="0.5" min="0" class="form-control form-control-sm" style="text-align:center; font-weight:700;" value="${parseFloat(t.hours) || 0}" onchange="app.updateCourseTopic(${modIdx}, 'cacs', ${tIdx}, 'hours', this.value)">
                            <span style="font-size:0.75rem; color:var(--text-muted);">h</span>
                          </div>
                          <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeCourseTopic(${modIdx}, 'cacs', ${tIdx})" style="padding:0.2rem 0.4rem; color:var(--accent-rose-text); display:inline-flex; align-items:center;" title="Remover Temática">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      `).join('')}
                    </div>

                    <button type="button" class="btn btn-secondary btn-sm" onclick="app.addCourseTopic(${modIdx}, 'cacs')" style="align-self:flex-start; font-size:0.78rem; font-weight:600; margin-top:0.25rem; display:inline-flex; align-items:center; gap:0.25rem;">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Adicionar Temática CACS
                    </button>
                  </div>
                </div>
              `}
            </div>
          `;
        }).join('');

        editorContainer.innerHTML = headerBar + cardsHtml;
      }
    }

    // 2. Renderizar Visualização Oficial da Tabela 2
    if (tableContainer && window.statsEngine) {
      tableContainer.innerHTML = window.statsEngine.generateTable2Html(mods);
    }
  }

  renderCourseEditorRedirectCard(state = 'warning', errorMsg = '') {
    const cardEl = document.getElementById('wizard-course-redirect-warning-card');
    const contentEl = document.getElementById('wizard-course-redirect-warning-content');
    if (!cardEl || !contentEl) return;

    if (state === 'warning') {
      cardEl.style.background = 'rgba(245, 158, 11, 0.08)';
      cardEl.style.border = '1px solid rgba(245, 158, 11, 0.3)';
      contentEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <h4 style="margin:0; color:#fbbf24; display:flex; align-items:center; gap:0.5rem; font-size:1rem; font-weight:700;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span>Atenção: Redirecionamento para Gerenciador Geral de Estruturas</span>
          </h4>
          <button type="button" class="btn btn-secondary btn-sm" onclick="app.hideCourseEditorRedirectWarning()" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center; gap:0.25rem;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Fechar
          </button>
        </div>
        <p style="font-size:0.88rem; color:var(--text-primary); line-height:1.5; margin:0 0 1.25rem 0;">
          Você será redirecionado para a página de <strong>Configurações do Catálogo Geral de Estruturas do Curso</strong>.<br>
          <span style="color:#fbbf24; font-weight:600; display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Recomendação Importante:</span> Qualquer alteração realizada neste relatório poderá ser perdida se não for salva. Recomendamos <strong>salvar os dados atuais</strong> antes de continuar.
        </p>
        <div style="display:flex; gap:0.6rem; flex-wrap:wrap; align-items:center;">
          <button type="button" class="btn btn-primary" onclick="app.saveAndRedirectToCourseSettings()" style="font-weight:700; display:inline-flex; align-items:center; gap:0.4rem;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Salvar e Continuar
          </button>
          <button type="button" class="btn btn-secondary" onclick="app.redirectWithoutSavingToCourseSettings()" style="font-weight:600;">
            Ir sem Salvar
          </button>
          <button type="button" class="btn btn-secondary" onclick="app.hideCourseEditorRedirectWarning()" style="font-weight:600;">
            Cancelar
          </button>
        </div>
      `;
    } else if (state === 'success') {
      cardEl.style.background = 'rgba(16, 185, 129, 0.1)';
      cardEl.style.border = '1px solid rgba(16, 185, 129, 0.35)';
      contentEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <h4 style="margin:0; color:var(--accent-emerald-text); display:flex; align-items:center; gap:0.5rem; font-size:1rem; font-weight:700;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Salvamento Realizado com Sucesso!</span>
          </h4>
          <button type="button" class="btn btn-secondary btn-sm" onclick="app.hideCourseEditorRedirectWarning()" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center; gap:0.25rem;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Fechar
          </button>
        </div>
        <p style="font-size:0.88rem; color:var(--text-primary); line-height:1.5; margin:0 0 1.25rem 0;">
          Os dados deste relatório foram salvos no sistema. Clique no botão <strong>Continuar</strong> abaixo para prosseguir para o Catálogo Geral de Estruturas do Curso.
        </p>
        <div style="display:flex; gap:0.6rem; flex-wrap:wrap; align-items:center;">
          <button type="button" class="btn btn-primary" onclick="app.redirectWithoutSavingToCourseSettings()" style="font-weight:700; display:inline-flex; align-items:center; gap:0.4rem; background:var(--accent-emerald); border-color:var(--accent-emerald);">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            Continuar para Configurações
          </button>
          <button type="button" class="btn btn-secondary" onclick="app.hideCourseEditorRedirectWarning()" style="font-weight:600;">
            Permanecer no Relatório
          </button>
        </div>
      `;
    } else if (state === 'error') {
      cardEl.style.background = 'rgba(244, 63, 94, 0.1)';
      cardEl.style.border = '1px solid rgba(244, 63, 94, 0.35)';
      contentEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <h4 style="margin:0; color:var(--accent-rose-text); display:flex; align-items:center; gap:0.5rem; font-size:1rem; font-weight:700;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            <span>Erro ao Salvar Dados</span>
          </h4>
          <button type="button" class="btn btn-secondary btn-sm" onclick="app.hideCourseEditorRedirectWarning()" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center; gap:0.25rem;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Retornar
          </button>
        </div>
        <p style="font-size:0.88rem; color:var(--text-primary); line-height:1.5; margin:0 0 1.25rem 0;">
          Não foi possível salvar os dados do relatório neste momento${errorMsg ? ': ' + errorMsg : '.'}<br>
          Você pode tentar novamente ou retornar para continuar editando sem sair.
        </p>
        <div style="display:flex; gap:0.6rem; flex-wrap:wrap; align-items:center;">
          <button type="button" class="btn btn-primary" onclick="app.saveAndRedirectToCourseSettings()" style="font-weight:700; display:inline-flex; align-items:center; gap:0.4rem;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"></path><path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
            Tentar Salvar Novamente
          </button>
          <button type="button" class="btn btn-secondary" onclick="app.hideCourseEditorRedirectWarning()" style="font-weight:600;">
            Retornar ao Relatório
          </button>
        </div>
      `;
    }
  }

  showCourseEditorRedirectWarning() {
    this.renderCourseEditorRedirectCard('warning');
    const cardEl = document.getElementById('wizard-course-redirect-warning-card');
    if (cardEl) {
      cardEl.style.display = 'block';
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  hideCourseEditorRedirectWarning() {
    const cardEl = document.getElementById('wizard-course-redirect-warning-card');
    if (cardEl) {
      cardEl.style.display = 'none';
    }
  }

  saveAndRedirectToCourseSettings() {
    try {
      this.saveCurrentStepData();
      this.showToast('Dados salvos com sucesso!', 'success');
      this.renderCourseEditorRedirectCard('success');
    } catch (err) {
      console.error('Erro ao salvar dados no alerta de redirecionamento:', err);
      this.showToast('Ocorreu um erro ao salvar os dados.', 'error');
      this.renderCourseEditorRedirectCard('error', err ? err.message : '');
    }
  }

  redirectWithoutSavingToCourseSettings() {
    this.hideCourseEditorRedirectWarning();
    this.navigateTo('master-course-structure');
  }

  toggleCourseEditor(forceState) {
    if (forceState !== undefined) {
      this.isCourseEditorOpen = !!forceState;
    } else {
      this.isCourseEditorOpen = !this.isCourseEditorOpen;
    }

    const editorContainer = document.getElementById('wizard-course-modules-editor');
    const btnTextEl = document.getElementById('btn-toggle-course-editor-text');

    if (editorContainer) {
      editorContainer.style.display = this.isCourseEditorOpen ? 'block' : 'none';
      if (this.isCourseEditorOpen) {
        this.renderCourseStructureStep();
        editorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    if (btnTextEl) {
      btnTextEl.textContent = this.isCourseEditorOpen ? 'Concluir Edição' : 'Editar Estrutura';
    }
  }

  addNewCourseModule() {
    if (!this.currentTraining) return;
    this.isCourseEditorOpen = true;
    if (!this.currentTraining.courseModules) this.currentTraining.courseModules = [];
    const nextNum = this.currentTraining.courseModules.length + 1;
    const numStr = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;

    this.currentTraining.courseModules.push({
      id: `mod_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      moduleNumber: numStr,
      order: nextNum,
      gestorTopics: [
        { id: `top_g_${Date.now()}_1`, topic: 'Nova Temática Gestão Municipal', hours: 2.0 }
      ],
      cacsTopics: [
        { id: `top_c_${Date.now()}_1`, topic: 'Nova Temática Conselheiros CACS', hours: 2.0 }
      ]
    });

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
    this.showToast(`Módulo ${numStr} adicionado com sucesso!`, 'success');
  }

  duplicateCourseModule(modIdx) {
    if (!this.currentTraining || !window.courseStructureHelper) return;
    this.isCourseEditorOpen = true;
    this.currentTraining.courseModules = window.courseStructureHelper.duplicateModule(this.currentTraining.courseModules, modIdx);
    this.renderCourseStructureStep();
    this.saveCurrentStepData();
    this.showToast('Módulo duplicado com sucesso nesta capacitação!', 'success');
  }

  deleteCourseModule(modIdx) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    this.isCourseEditorOpen = true;
    const mod = this.currentTraining.courseModules[modIdx];
    const modName = mod ? `Módulo ${mod.number || modIdx + 1}` : 'este módulo';

    this.openConfirmModal({
      title: 'Remover Módulo',
      msg: `Deseja realmente remover ${modName} da capacitação?`,
      btnText: 'Sim, Remover Módulo',
      successTitle: 'Módulo Removido!',
      successMsg: 'O módulo foi removido da estrutura do curso com sucesso.',
      onConfirm: () => {
        this.currentTraining.courseModules.splice(modIdx, 1);
        if (window.courseStructureHelper) {
          this.currentTraining.courseModules = window.courseStructureHelper.autoRenumber(this.currentTraining.courseModules);
        }
        this.renderCourseStructureStep();
        this.saveCurrentStepData();
        this.showToast('Módulo removido da capacitação.', 'info');
      }
    });
  }

  moveCourseModule(modIdx, direction) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    this.isCourseEditorOpen = true;
    const targetIdx = modIdx + direction;
    const mods = this.currentTraining.courseModules;
    if (targetIdx < 0 || targetIdx >= mods.length) return;

    const temp = mods[modIdx];
    mods[modIdx] = mods[targetIdx];
    mods[targetIdx] = temp;

    if (window.courseStructureHelper) {
      this.currentTraining.courseModules = window.courseStructureHelper.autoRenumber(mods);
    } else {
      mods.forEach((m, idx) => { m.order = idx + 1; });
    }

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
  }

  updateCourseModuleNumber(modIdx, newNumber) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    if (this.currentTraining.courseModules[modIdx]) {
      this.currentTraining.courseModules[modIdx].moduleNumber = (newNumber || '').trim();
      this.renderCourseStructureStep();
      this.saveCurrentStepData();
    }
  }

  toggleCourseModuleShared(modIdx, isChecked) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    const mod = this.currentTraining.courseModules[modIdx];
    if (!mod) return;

    if (isChecked) {
      const gStr = JSON.stringify((mod.gestorTopics || []).map(t => ({ topic: t.topic, hours: t.hours })));
      const cStr = JSON.stringify((mod.cacsTopics || []).map(t => ({ topic: t.topic, hours: t.hours })));
      if (gStr !== cStr) {
        if (!confirm('Este módulo possui temáticas diferentes para Gestores e CACS.\n\nAo torná-lo compartilhado, as temáticas da Gestão Municipal serão aplicadas aos dois públicos. Deseja continuar?')) {
          this.renderCourseStructureStep();
          return;
        }
      }
      mod.isShared = true;
      mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics || []));
    } else {
      mod.isShared = false;
      if (!mod.cacsTopics || mod.cacsTopics.length === 0) {
        mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics || []));
      }
    }

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
  }

  addCourseTopic(modIdx, type) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    this.isCourseEditorOpen = true;
    const mod = this.currentTraining.courseModules[modIdx];
    if (!mod) return;

    const newTopic = {
      id: `top_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      topic: '',
      hours: 1.0
    };

    if (type === 'shared' || mod.isShared) {
      if (!mod.gestorTopics) mod.gestorTopics = [];
      mod.gestorTopics.push(newTopic);
      mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics));
    } else if (type === 'gestor') {
      if (!mod.gestorTopics) mod.gestorTopics = [];
      mod.gestorTopics.push(newTopic);
    } else {
      if (!mod.cacsTopics) mod.cacsTopics = [];
      mod.cacsTopics.push(newTopic);
    }

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
  }

  removeCourseTopic(modIdx, type, topicIdx) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    this.isCourseEditorOpen = true;
    const mod = this.currentTraining.courseModules[modIdx];
    if (!mod) return;

    if (type === 'shared' || mod.isShared) {
      if (mod.gestorTopics) {
        mod.gestorTopics.splice(topicIdx, 1);
        if (mod.gestorTopics.length === 0) {
          mod.gestorTopics.push({ id: `top_g_${Date.now()}`, topic: '', hours: 0 });
        }
        mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics));
      }
    } else if (type === 'gestor' && mod.gestorTopics) {
      mod.gestorTopics.splice(topicIdx, 1);
      if (mod.gestorTopics.length === 0) {
        mod.gestorTopics.push({ id: `top_g_${Date.now()}`, topic: '', hours: 0 });
      }
    } else if (type === 'cacs' && mod.cacsTopics) {
      mod.cacsTopics.splice(topicIdx, 1);
      if (mod.cacsTopics.length === 0) {
        mod.cacsTopics.push({ id: `top_c_${Date.now()}`, topic: '', hours: 0 });
      }
    }

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
  }

  updateCourseTopic(modIdx, type, topicIdx, field, value) {
    if (!this.currentTraining || !this.currentTraining.courseModules) return;
    const mod = this.currentTraining.courseModules[modIdx];
    if (!mod) return;

    if (type === 'shared' || mod.isShared) {
      if (mod.gestorTopics && mod.gestorTopics[topicIdx]) {
        if (field === 'hours') mod.gestorTopics[topicIdx].hours = parseFloat(value) || 0;
        else mod.gestorTopics[topicIdx].topic = value;
      }
      mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics));
    } else {
      const list = type === 'gestor' ? mod.gestorTopics : mod.cacsTopics;
      if (list && list[topicIdx]) {
        if (field === 'hours') {
          list[topicIdx].hours = parseFloat(value) || 0;
        } else {
          list[topicIdx].topic = value;
        }
      }
    }

    this.renderCourseStructureStep();
    this.saveCurrentStepData();
  }

  /* Modais de Restauração de Template & Cópia de Outra Capacitação */
  openRestoreDefaultCourseModal() {
    const modal = document.getElementById('modal-restore-course-template');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeRestoreDefaultCourseModal() {
    const modal = document.getElementById('modal-restore-course-template');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
  }

  confirmRestoreDefaultCourseStructure() {
    if (!this.currentTraining || !window.courseStructureHelper) return;

    // Deep copy do modelo padrão
    this.currentTraining.courseModules = window.courseStructureHelper.getDefaultCopy();
    this.renderCourseStructureStep();
    this.saveCurrentStepData();
    this.closeRestoreDefaultCourseModal();
    this.showToast('Modelo padrão oficial restaurado nesta capacitação!', 'success');
  }

  async openCopyCourseStructureModal() {
    if (!this.currentTraining || !window.db) return;

    const allTrainings = (await window.db.getAll('trainings')) || [];
    const otherTrainings = allTrainings.filter(t => t.id !== this.currentTraining.id);

    const select = document.getElementById('copy-course-source-select');
    const previewContainer = document.getElementById('copy-course-preview-container');

    if (!select || !previewContainer) return;

    if (otherTrainings.length === 0) {
      select.innerHTML = '<option value="">Nenhuma outra capacitação encontrada no banco</option>';
      select.disabled = true;
      previewContainer.innerHTML = '<em style="color:var(--text-muted);">Não há outras capacitações cadastradas para copiar a estrutura. Você pode utilizar o modelo padrão oficial.</em>';
    } else {
      select.disabled = false;
      select.innerHTML = otherTrainings.map(t => `
        <option value="${t.id}">${t.title || 'Capacitação sem título'} (${t.polo || 'Sem polo'}, ${t.year || '2026'})</option>
      `).join('');

      this.onCopyCourseSourceChange(otherTrainings[0].id);
    }

    const modal = document.getElementById('modal-copy-course-structure');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeCopyCourseStructureModal() {
    const modal = document.getElementById('modal-copy-course-structure');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
  }

  async onCopyCourseSourceChange(sourceTrainingId) {
    const previewContainer = document.getElementById('copy-course-preview-container');
    if (!previewContainer || !sourceTrainingId || !window.db) return;

    const sourceTraining = await window.db.get('trainings', sourceTrainingId);
    if (!sourceTraining || !sourceTraining.courseModules || sourceTraining.courseModules.length === 0) {
      previewContainer.innerHTML = '<em style="color:var(--text-muted);">Esta capacitação não possui módulos de curso cadastrados.</em>';
      return;
    }

    const normMods = window.courseStructureHelper ? window.courseStructureHelper.normalize(sourceTraining.courseModules) : sourceTraining.courseModules;
    previewContainer.innerHTML = `
      <div style="font-weight:700; color:var(--accent-blue-text); margin-bottom:0.4rem;">
        Estrutura encontrada (${normMods.length} módulos):
      </div>
      <ul style="margin:0; padding-left:1.2rem; color:var(--text-secondary);">
        ${normMods.map(m => `
          <li><strong>Módulo ${m.moduleNumber}:</strong> Gestor: ${(m.gestorTopics || []).map(t => `${t.topic} (${t.hours}h)`).join('; ')} | CACS: ${(m.cacsTopics || []).map(t => `${t.topic} (${t.hours}h)`).join('; ')}</li>
        `).join('')}
      </ul>
    `;
  }

  async confirmCopyCourseStructure() {
    const select = document.getElementById('copy-course-source-select');
    if (!select || !select.value || !window.db || !this.currentTraining) return;

    const sourceTraining = await window.db.get('trainings', select.value);
    if (!sourceTraining || !sourceTraining.courseModules || sourceTraining.courseModules.length === 0) {
      this.showToast('Capacitação de origem não possui módulos cadastrados.', 'warning');
      return;
    }

    // Deep copy independente
    const rawCopy = JSON.parse(JSON.stringify(sourceTraining.courseModules));
    this.currentTraining.courseModules = window.courseStructureHelper ? window.courseStructureHelper.normalize(rawCopy) : rawCopy;

    this.renderCourseStructureStep();
    await window.db.saveTrainingFull(this.currentTraining, `Cópia independente da estrutura do curso de "${sourceTraining.title || sourceTraining.id}"`);
    this.closeCopyCourseStructureModal();
    this.showToast(`Estrutura copiada com sucesso de "${sourceTraining.title || 'outra capacitação'}"!`, 'success');
  }

  pullFromGlobalMasterCourseStructure() {
    if (!this.currentTraining || !window.courseStructureHelper) return;
    this.currentTraining.courseModules = window.courseStructureHelper.getMasterCopy();
    this.renderCourseStructureStep();
    this.saveCurrentStepData();
    this.showToast('Estrutura do curso atualizada a partir do Catálogo Geral Mestre!', 'success');
  }

  /* ==========================================================================
     ESTRUTURAS DO CURSO (GERENCIAMENTO DE MODELOS & CATALOGO)
     ========================================================================== */
  setCourseTemplateFilter(filterType = 'all') {
    this.courseTemplateFilter = filterType;
    document.querySelectorAll('.course-tpl-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeTabBtn = document.getElementById(`course-tpl-tab-${filterType}`);
    if (activeTabBtn) activeTabBtn.classList.add('active');
    this.renderCourseTemplatesCatalog();
  }

  renderCourseTemplatesCatalog() {
    if (!window.courseStructureHelper) return;
    const catalogContainer = document.getElementById('course-templates-catalog-list');
    if (!catalogContainer) return;

    const allTemplates = window.courseStructureHelper.getTemplatesList();
    if (!this.activeTemplateId) {
      const defaultTpl = window.courseStructureHelper.getDefaultTemplate();
      this.activeTemplateId = defaultTpl ? defaultTpl.id : 'template_default_official';
    }

    const filter = this.courseTemplateFilter || 'all';
    let filtered = allTemplates;
    if (filter === 'protected') {
      filtered = allTemplates.filter(t => t.isProtected || t.isDefault);
    } else if (filter === 'custom') {
      filtered = allTemplates.filter(t => !t.isProtected && !t.isDefault);
    }

    // Atualizar badges dos botões de filtro
    const countAll = document.getElementById('course-tpl-count-all');
    const countProtected = document.getElementById('course-tpl-count-protected');
    const countCustom = document.getElementById('course-tpl-count-custom');

    if (countAll) countAll.textContent = allTemplates.length;
    if (countProtected) countProtected.textContent = allTemplates.filter(t => t.isProtected || t.isDefault).length;
    if (countCustom) countCustom.textContent = allTemplates.filter(t => !t.isProtected && !t.isDefault).length;

    if (filtered.length === 0) {
      catalogContainer.innerHTML = `
        <div style="padding:2.5rem; text-align:center; color:var(--text-secondary);">
          Nenhuma estrutura de curso encontrada nesta categoria.
        </div>
      `;
      return;
    }

    let rowsHtml = filtered.map(t => {
      const isSelected = t.id === this.activeTemplateId;
      const isDefault = t.isDefault;
      const isProtected = t.isProtected;
      const modsCount = (t.modules || []).length;

      // Calcular carga horária total
      let totalH = 0;
      (t.modules || []).forEach(m => {
        (m.gestorTopics || []).forEach(gt => { totalH += parseFloat(gt.hours) || 0; });
      });

      const rowStyle = isSelected ? 
        'background: rgba(245, 158, 11, 0.12); border-left: 4px solid #f59e0b; font-weight:600;' : 
        'cursor:pointer;';

      return `
        <tr onclick="app.selectCourseTemplateForEdit('${t.id}')" style="${rowStyle}">
          <td style="text-align:center; vertical-align:middle;">
            ${isProtected ? '<span class="nav-badge badge-blue font-bold" style="font-size:0.75rem; display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Protegido</span>' : '<span class="nav-badge font-bold" style="font-size:0.75rem; background:rgba(255,255,255,0.08); display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 1-2 2v14a2 2 0 0 1 2 2h14a2 2 0 0 1 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editável</span>'}
            ${isDefault ? '<span class="nav-badge badge-emerald font-bold" style="font-size:0.75rem; margin-left:0.25rem; display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Ativo</span>' : ''}
          </td>
          <td style="text-align:left; vertical-align:middle;">
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <span style="font-weight:700; color:var(--text-primary); font-size:0.92rem;">${t.name || 'Sem nome'}</span>
              ${!isProtected ? `
                <button type="button" class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); app.openRenameCourseTemplateModal('${t.id}')" style="padding:0.18rem 0.45rem; font-weight:600; font-size:0.75rem; display:inline-flex; align-items:center; gap:0.2rem;" title="Renomear nome e descrição desta estrutura">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5.5" width="16" height="12" rx="2.5"></rect><circle cx="6.5" cy="13" r="1.8"></circle><path d="M8.3 11.2v3.6"></path><path d="M10.3 9.2v5.6"></path><circle cx="12.3" cy="13" r="1.8"></circle><line x1="18" y1="2.5" x2="18" y2="21.5"></line><path d="M16 2.5h4"></path><path d="M16 21.5h4"></path></svg> Renomear
                </button>
              ` : ''}
              ${!isDefault ? `
                <button type="button" class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); app.confirmSetDefaultCourseTemplate('${t.id}')" style="padding:0.18rem 0.45rem; font-weight:600; font-size:0.75rem; color:var(--accent-emerald-text); display:inline-flex; align-items:center; gap:0.2rem;" title="Definir como o Modelo Padrão Ativo para novas capacitações">
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Definir como Padrão
                </button>
              ` : ''}
            </div>
          </td>
          <td style="text-align:center; vertical-align:middle; font-weight:700;">
            ${modsCount} Módulos
          </td>
          <td style="text-align:center; vertical-align:middle; font-weight:700; color:var(--accent-blue-text);">
            ${totalH.toFixed(1).replace('.', ',')} h Total
          </td>
          <td style="text-align:center; vertical-align:middle; white-space:nowrap;" onclick="event.stopPropagation();">
            <div style="display:inline-grid; grid-template-columns: repeat(3, 1fr); gap:0.35rem; align-items:center; justify-content:center; white-space:nowrap; max-width: 260px; margin: 0 auto;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="app.duplicateCourseTemplate('${t.id}')" style="padding:0.25rem 0.55rem; font-weight:600; font-size:0.78rem; display:inline-flex; align-items:center; justify-content:center; gap:0.25rem;" title="Duplicar esta estrutura para criar um modelo editável">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Duplicar
              </button>
              ${!isProtected ? `
                <button type="button" class="btn btn-secondary btn-sm" onclick="app.selectCourseTemplateForEdit('${t.id}')" style="padding:0.25rem 0.55rem; font-weight:600; font-size:0.78rem; display:inline-flex; align-items:center; justify-content:center; gap:0.25rem;" title="Editar módulos desta estrutura">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar
                </button>
              ` : `
                <button type="button" class="btn btn-secondary btn-sm" onclick="app.selectCourseTemplateForEdit('${t.id}')" style="padding:0.25rem 0.55rem; font-weight:600; font-size:0.78rem; display:inline-flex; align-items:center; justify-content:center; gap:0.25rem;" title="Visualizar estrutura e preview da tabela">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> Visualizar
                </button>
              `}
              ${(!isProtected && !isDefault) ? `
                <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.confirmDeleteCourseTemplate('${t.id}')" style="padding:0.25rem 0.55rem; font-weight:600; font-size:0.75rem; display:inline-flex; align-items:center; justify-content:center;" title="Excluir estrutura personalizada">
                  ${window.icons.delete} Excluir
                </button>
              ` : '<div></div>'}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    catalogContainer.innerHTML = `
      <div class="table-responsive-wrapper">
        <table class="report-data-table">
          <thead>
            <tr>
              <th style="width: 130px; text-align:center; vertical-align:middle;">Status</th>
              <th style="text-align:left; vertical-align:middle;">Nome da Estrutura</th>
              <th style="width: 110px; text-align:center; vertical-align:middle;">Módulos</th>
              <th style="width: 130px; text-align:center; vertical-align:middle;">Carga Horária</th>
              <th style="width: 270px; text-align:center; vertical-align:middle; white-space:nowrap;">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  selectCourseTemplateForEdit(templateId) {
    this.activeTemplateId = templateId;
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
  }

  openCreateCourseTemplateModal() {
    const modal = document.getElementById('modal-create-course-template');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeCreateCourseTemplateModal() {
    const modal = document.getElementById('modal-create-course-template');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
  }

  confirmCreateCourseTemplate() {
    const nameInput = document.getElementById('create-template-name');
    const descInput = document.getElementById('create-template-desc');
    const originRadios = document.getElementsByName('create-template-origin');
    if (!nameInput || !window.courseStructureHelper) return;

    const name = nameInput.value.trim();
    const desc = descInput ? descInput.value.trim() : '';
    let origin = 'template_default_official';
    for (const r of originRadios) {
      if (r.checked) origin = r.value;
    }

    if (!name) {
      this.showToast('Informe um nome para a estrutura.', 'warning');
      return;
    }

    const newTpl = window.courseStructureHelper.createTemplate(name, desc, origin);
    this.activeTemplateId = newTpl.id;
    this.closeCreateCourseTemplateModal();
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
    this.showToast(`Estrutura "${newTpl.name}" criada com sucesso!`, 'success');
  }

  openRenameCourseTemplateModal(templateId) {
    if (!window.courseStructureHelper) return;
    const tpl = window.courseStructureHelper.getTemplateById(templateId);
    if (!tpl) return;

    if (tpl.isProtected) {
      this.showToast('O Modelo Padrão Protegido não pode ser renomeado. Duplique-o para editar.', 'warning');
      return;
    }

    this.setVal('rename-course-tpl-id', tpl.id);
    this.setVal('rename-course-tpl-name', tpl.name || '');
    this.setVal('rename-course-tpl-desc', tpl.description || '');

    const modal = document.getElementById('modal-rename-course-template');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
      const input = document.getElementById('rename-course-tpl-name');
      if (input) setTimeout(() => input.focus(), 100);
    }
  }

  closeRenameCourseTemplateModal() {
    const modal = document.getElementById('modal-rename-course-template');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        if (!modal.classList.contains('active')) {
          modal.style.display = 'none';
        }
      }, 200);
    }
  }

  saveRenameCourseTemplate() {
    if (!window.courseStructureHelper) return;
    const templateId = this.getVal('rename-course-tpl-id');
    const name = this.getVal('rename-course-tpl-name');
    const desc = this.getVal('rename-course-tpl-desc');

    if (!templateId || !name.trim()) {
      this.showToast('Por favor, informe o nome da estrutura.', 'warning');
      return;
    }

    const updated = window.courseStructureHelper.updateTemplateDetails(templateId, name, desc);
    if (updated) {
      this.closeRenameCourseTemplateModal();
      this.renderCourseTemplatesCatalog();
      this.renderGlobalMasterCourseStructure();
      this.showToast(`Estrutura renomeada para "${updated.name}" com sucesso!`, 'success');
    }
  }

  duplicateCourseTemplate(templateId) {
    if (!window.courseStructureHelper) return;
    const newTpl = window.courseStructureHelper.duplicateTemplate(templateId);
    if (newTpl) {
      this.activeTemplateId = newTpl.id;
      this.renderCourseTemplatesCatalog();
      this.renderGlobalMasterCourseStructure();
      this.showToast(`Estrutura duplicada como "${newTpl.name}"!`, 'success');
    }
  }

  confirmSetDefaultCourseTemplate(templateId) {
    if (!window.courseStructureHelper) return;
    const tpl = window.courseStructureHelper.getTemplateById(templateId);
    if (!tpl) return;

    this.templateToSetDefaultId = templateId;

    const nameEl = document.getElementById('modal-set-default-tpl-name');
    const infoEl = document.getElementById('modal-set-default-tpl-info');

    if (nameEl) nameEl.textContent = tpl.name || 'Estrutura do Curso';
    if (infoEl) {
      let totalH = 0;
      (tpl.modules || []).forEach(m => {
        (m.gestorTopics || []).forEach(gt => { totalH += parseFloat(gt.hours) || 0; });
      });
      infoEl.textContent = `${tpl.modules ? tpl.modules.length : 0} Módulos • ${totalH.toFixed(1).replace('.', ',')} h Total`;
    }

    const modal = document.getElementById('modal-confirm-set-default-course-template');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeConfirmSetDefaultCourseTemplateModal() {
    this.templateToSetDefaultId = null;
    const modal = document.getElementById('modal-confirm-set-default-course-template');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        if (!modal.classList.contains('active')) {
          modal.style.display = 'none';
        }
      }, 200);
    }
  }

  executeSetDefaultCourseTemplateConfirmed() {
    if (!this.templateToSetDefaultId || !window.courseStructureHelper) return;
    const templateId = this.templateToSetDefaultId;
    const tpl = window.courseStructureHelper.getTemplateById(templateId);

    window.courseStructureHelper.setDefaultTemplate(templateId);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
    this.showToast(`"${tpl ? tpl.name : 'Estrutura'}" definido como Modelo Padrão Ativo!`, 'success');
    this.closeConfirmSetDefaultCourseTemplateModal();
  }

  setDefaultCourseTemplate(templateId) {
    this.confirmSetDefaultCourseTemplate(templateId);
  }

  confirmDeleteCourseTemplate(templateId) {
    if (!window.courseStructureHelper) return;
    const tpl = window.courseStructureHelper.getTemplateById(templateId);
    if (!tpl) return;
    if (tpl.isProtected) {
      this.showToast('Não é possível excluir o Modelo Padrão protegido.', 'error');
      return;
    }

    const tplName = tpl.name || 'Estrutura do Curso';

    this.openConfirmModal({
      title: 'Excluir Estrutura do Curso',
      msg: `Tem certeza que deseja excluir permanentemente a estrutura "${tplName}"?`,
      btnText: 'Sim, Excluir Estrutura',
      successTitle: 'Estrutura Excluída!',
      successMsg: `A estrutura "${tplName}" foi excluída com sucesso.`,
      onConfirm: () => {
        const ok = window.courseStructureHelper.deleteTemplate(templateId);
        if (ok) {
          this.activeTemplateId = 'template_default_official';
          this.renderCourseTemplatesCatalog();
          this.renderGlobalMasterCourseStructure();
          this.showToast(`Estrutura "${tplName}" excluída.`, 'info');
        } else {
          this.showToast('Não é possível excluir a estrutura.', 'error');
        }
      }
    });
  }

  closeConfirmDeleteCourseTemplateModal() {
    this.closeConfirmModal();
  }

  executeDeleteCourseTemplateConfirmed() {
    this.executeConfirmModalAction();
  }

  deleteCourseTemplate(templateId) {
    this.confirmDeleteCourseTemplate(templateId);
  }

  openSelectCourseTemplateModal() {
    if (!window.courseStructureHelper) return;
    const listContainer = document.getElementById('select-course-template-options-list');
    if (!listContainer) return;

    const templates = window.courseStructureHelper.getTemplatesList();
    listContainer.innerHTML = templates.map((t, idx) => `
      <label style="display:flex; align-items:flex-start; gap:0.75rem; padding:0.85rem; background:var(--bg-input); border:1px solid var(--border-color); border-radius:var(--radius-md); cursor:pointer;">
        <input type="radio" name="select-training-template-radio" value="${t.id}" ${t.isDefault || idx === 0 ? 'checked' : ''} style="margin-top:0.25rem;">
        <div style="flex:1;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.2rem;">
            <strong style="color:var(--text-primary); font-size:0.92rem; display:inline-flex; align-items:center;">${t.isProtected ? window.icons.lock : ''}${t.name}</strong>
            ${t.isDefault ? '<span class="nav-badge badge-emerald font-bold" style="font-size:0.72rem;">Modelo Padrão Ativo</span>' : ''}
          </div>
          <div style="font-size:0.82rem; color:var(--text-secondary); line-height:1.35;">${t.description || 'Estrutura com ' + (t.modules || []).length + ' módulos'}</div>
        </div>
      </label>
    `).join('');

    const modal = document.getElementById('modal-select-course-template');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeSelectCourseTemplateModal() {
    const modal = document.getElementById('modal-select-course-template');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 200);
    }
  }

  async confirmSelectCourseTemplateForTraining() {
    if (!this.currentTraining || !window.courseStructureHelper) return;
    const radios = document.getElementsByName('select-training-template-radio');
    let selectedId = null;
    for (const r of radios) {
      if (r.checked) selectedId = r.value;
    }

    if (!selectedId) return;

    const tpl = window.courseStructureHelper.getTemplateById(selectedId);
    if (!tpl) return;

    // Gerar cópia profunda independente da estrutura selecionada
    this.currentTraining.courseModules = window.courseStructureHelper.makeDeepCopy(tpl.modules);
    this.currentTraining.baseTemplateId = tpl.id;
    this.currentTraining.baseTemplateName = tpl.name;
    this.currentTraining.isCustomized = false;

    this.renderCourseStructureStep();
    if (window.db) {
      await window.db.saveTrainingFull(this.currentTraining, `Cópia independente da estrutura "${tpl.name}"`);
    }
    this.closeSelectCourseTemplateModal();
    this.showToast(`Cópia da estrutura "${tpl.name}" aplicada a esta capacitação!`, 'success');
  }

  renderGlobalMasterCourseStructure() {
    if (!window.courseStructureHelper) return;

    if (!this.activeTemplateId) {
      const defaultTpl = window.courseStructureHelper.getDefaultTemplate();
      this.activeTemplateId = defaultTpl ? defaultTpl.id : 'template_default_official';
    }

    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    const masterMods = activeTpl ? window.courseStructureHelper.normalize(activeTpl.modules || []) : [];

    const titleEl = document.getElementById('active-template-editor-title');
    const descEl = document.getElementById('active-template-editor-desc');
    const actionsEl = document.getElementById('active-template-editor-actions');
    const bannerEl = document.getElementById('active-template-protection-banner');

    if (titleEl && activeTpl) {
      titleEl.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> <span>Estrutura Selecionada: ${activeTpl.name}</span> ${activeTpl.isProtected ? '<span class="nav-badge badge-blue font-bold" style="font-size:0.75rem; margin-left:0.5rem; display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Modelo Padrão Protegido</span>' : ''}`;
    }
    if (descEl && activeTpl) {
      descEl.textContent = activeTpl.description || 'Estrutura de curso cadastrada no sistema';
    }

    if (bannerEl) {
      bannerEl.style.display = 'none';
      bannerEl.innerHTML = '';
    }

    if (actionsEl && activeTpl) {
      if (!activeTpl.isProtected) {
        actionsEl.innerHTML = `
          <button type="button" class="btn btn-secondary btn-sm" onclick="app.openRenameCourseTemplateModal('${activeTpl.id}')" style="font-weight:600; display:inline-flex; align-items:center; gap:0.35rem;" title="Renomear nome e descrição da estrutura">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5.5" width="16" height="12" rx="2.5"></rect><circle cx="6.5" cy="13" r="1.8"></circle><path d="M8.3 11.2v3.6"></path><path d="M10.3 9.2v5.6"></path><circle cx="12.3" cy="13" r="1.8"></circle><line x1="18" y1="2.5" x2="18" y2="21.5"></line><path d="M16 2.5h4"></path><path d="M16 21.5h4"></path></svg> Renomear
          </button>
          <button type="button" class="btn btn-primary btn-sm" onclick="app.toggleMasterCourseEditor()" style="font-weight:700; display:inline-flex; align-items:center; gap:0.35rem;">
            ${this.isMasterCourseEditorOpen ? '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Concluir Edição' : '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar Estrutura'}
          </button>
        `;
      } else {
        actionsEl.innerHTML = `
          <button type="button" class="btn btn-primary btn-sm" onclick="app.duplicateCourseTemplate('${activeTpl.id}')" style="font-weight:700; display:inline-flex; align-items:center; gap:0.35rem;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Duplicar Estrutura
          </button>
        `;
      }
    }

    const editorContainer = document.getElementById('global-master-course-editor');
    const tableContainer = document.getElementById('global-master-course-table-preview');

    if (editorContainer) {
      editorContainer.style.display = (this.isMasterCourseEditorOpen && activeTpl && !activeTpl.isProtected) ? 'block' : 'none';
    }

    if (editorContainer) {
      if (masterMods.length === 0) {
        editorContainer.innerHTML = `
          <div style="text-align:center; padding:2.5rem; background:var(--bg-input); border:1px dashed var(--border-color); border-radius:var(--radius-md);">
            <p style="color:var(--text-secondary); margin-bottom:1rem;">Esta estrutura está vazia.</p>
            <button class="btn btn-primary btn-sm" onclick="app.addGlobalMasterCourseModule()">+ Adicionar Primeiro Módulo</button>
          </div>
        `;
      } else {
        editorContainer.innerHTML = masterMods.map((mod, modIdx) => {
          const gTopics = mod.gestorTopics || [];
          const cTopics = mod.cacsTopics || [];

          const gTotalHours = gTopics.reduce((acc, t) => acc + (parseFloat(t.hours) || 0), 0);
          const cTotalHours = cTopics.reduce((acc, t) => acc + (parseFloat(t.hours) || 0), 0);

          return `
            <div class="course-mod-card" data-mod-id="${mod.id}">
              <!-- Cabeçalho do Card do Módulo Mestre -->
              <div class="course-mod-header">
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <span class="nav-badge badge-blue font-bold" style="font-size:0.9rem; padding:0.25rem 0.65rem;">
                    Módulo ${mod.moduleNumber || `0${modIdx + 1}`}
                  </span>
                  <div style="display:flex; align-items:center; gap:0.4rem;">
                    <label style="font-size:0.78rem; color:var(--text-muted); margin:0;">Identificador:</label>
                    <input type="text" class="form-control form-control-sm" style="width:70px; text-align:center; font-weight:700;" value="${mod.moduleNumber || `0${modIdx + 1}`}" onchange="app.updateGlobalMasterCourseModuleNumber(${modIdx}, this.value)">
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:0.4rem;">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.moveGlobalMasterCourseModule(${modIdx}, -1)" ${modIdx === 0 ? 'disabled' : ''} title="Mover para cima" style="padding:0.2rem 0.5rem;">↑</button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.moveGlobalMasterCourseModule(${modIdx}, 1)" ${modIdx === masterMods.length - 1 ? 'disabled' : ''} title="Mover para baixo" style="padding:0.2rem 0.5rem;">↓</button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.duplicateGlobalMasterCourseModule(${modIdx})" title="Duplicar Módulo com todas as temáticas" style="padding:0.2rem 0.55rem; font-weight:600; display:inline-flex; align-items:center; gap:0.25rem;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Duplicar
                  </button>
                  <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.deleteGlobalMasterCourseModule(${modIdx})" title="Excluir Módulo" style="padding:0.2rem 0.5rem; display:inline-flex; align-items:center;">
                    ${window.icons.delete}
                  </button>
                </div>
              </div>

              <!-- Checkbox de Módulo Compartilhado -->
              <div style="margin:0.75rem 0 1rem 0; padding:0.5rem 0.75rem; background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.2); border-radius:var(--radius-md);">
                <label style="display:flex; align-items:center; gap:0.55rem; font-weight:700; font-size:0.86rem; color:var(--text-primary); cursor:pointer; margin:0;">
                  <input type="checkbox" ${mod.isShared ? 'checked' : ''} onchange="app.toggleGlobalMasterCourseModuleShared(${modIdx}, this.checked)">
                  <span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:0.25rem;"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>Módulo compartilhado entre Gestores e CACS (mesmo conteúdo e carga horária)</span>
                </label>
              </div>

              ${mod.isShared ? `
                <!-- Bloco Único: Módulo Compartilhado -->
                <div style="background:var(--bg-input); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
                  <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem; margin-bottom:0.75rem;">
                    <strong style="font-size:0.85rem; color:var(--accent-blue-text); display:flex; align-items:center; gap:0.35rem;">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg> Temática do Módulo Compartilhado
                    </strong>
                    <span class="nav-badge font-mono font-bold" style="font-size:0.75rem; background:rgba(59,130,246,0.15); color:var(--accent-blue-text);">
                      Carga Horária: ${gTotalHours.toFixed(1).replace('.', ',')} h
                    </span>
                  </div>

                  <div style="display:flex; flex-direction:column; gap:0.5rem;">
                    ${gTopics.map((t, tIdx) => `
                      <div class="course-topic-item">
                        <input type="text" class="form-control form-control-sm" placeholder="Temática do Módulo" value="${(t.topic || '').replace(/"/g, '&quot;')}" onchange="app.updateGlobalMasterCourseTopic(${modIdx}, 'shared', ${tIdx}, 'topic', this.value)">
                        <div style="display:flex; align-items:center; gap:0.25rem;">
                          <input type="number" step="0.5" min="0" class="form-control form-control-sm" style="text-align:center; font-weight:700;" value="${parseFloat(t.hours) || 0}" onchange="app.updateGlobalMasterCourseTopic(${modIdx}, 'shared', ${tIdx}, 'hours', this.value)">
                          <span style="font-size:0.75rem; color:var(--text-muted);">h</span>
                        </div>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeGlobalMasterCourseTopic(${modIdx}, 'shared', ${tIdx})" style="padding:0.2rem 0.4rem; color:var(--accent-rose-text); display:inline-flex; align-items:center; justify-content:center;" title="Remover Temática">
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                    `).join('')}
                  </div>

                  <button type="button" class="btn btn-secondary btn-sm" onclick="app.addGlobalMasterCourseTopic(${modIdx}, 'shared')" style="align-self:flex-start; font-size:0.78rem; font-weight:600; margin-top:0.5rem;">
                    + Adicionar Temática
                  </button>
                </div>
              ` : `
                <!-- Grade Dupla: Módulo Específico por Público (Gestor vs CACS) -->
                <div class="course-mod-grid">
                  <!-- Coluna Gestores Municipais -->
                  <div class="course-topic-col">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;">
                      <strong style="font-size:0.85rem; color:var(--accent-blue-text); display:flex; align-items:center; gap:0.35rem;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="7" r="4"></circle><path d="M15.5 14H5a4 4 0 0 0-4 4v3h10"></path><circle cx="18" cy="18" r="2"></circle><path d="M18 14.5v1M18 20.5v1M14.5 18h1M20.5 18h1M15.5 15.5l.7.7M19.8 19.8l.7.7M15.5 20.5l.7-.7M19.8 16.2l.7-.7"></path></svg> Gestão Municipal (Gestores)
                      </strong>
                      <span class="nav-badge font-mono font-bold" style="font-size:0.75rem; background:rgba(59,130,246,0.15); color:var(--accent-blue-text);">
                        Total: ${gTotalHours.toFixed(1).replace('.', ',')} h
                      </span>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                      ${gTopics.map((t, tIdx) => `
                        <div class="course-topic-item">
                          <input type="text" class="form-control form-control-sm" placeholder="Temática para Gestores" value="${(t.topic || '').replace(/"/g, '&quot;')}" onchange="app.updateGlobalMasterCourseTopic(${modIdx}, 'gestor', ${tIdx}, 'topic', this.value)">
                          <div style="display:flex; align-items:center; gap:0.25rem;">
                            <input type="number" step="0.5" min="0" class="form-control form-control-sm" style="text-align:center; font-weight:700;" value="${parseFloat(t.hours) || 0}" onchange="app.updateGlobalMasterCourseTopic(${modIdx}, 'gestor', ${tIdx}, 'hours', this.value)">
                            <span style="font-size:0.75rem; color:var(--text-muted);">h</span>
                          </div>
                          <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeGlobalMasterCourseTopic(${modIdx}, 'gestor', ${tIdx})" style="padding:0.2rem 0.4rem; color:var(--accent-rose-text); display:inline-flex; align-items:center; justify-content:center;" title="Remover Temática">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      `).join('')}
                    </div>

                    <button type="button" class="btn btn-secondary btn-sm" onclick="app.addGlobalMasterCourseTopic(${modIdx}, 'gestor')" style="align-self:flex-start; font-size:0.78rem; font-weight:600; margin-top:0.25rem;">
                      + Adicionar Temática Gestor
                    </button>
                  </div>

                  <!-- Coluna Conselheiros CACS-FUNDEB -->
                  <div class="course-topic-col">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;">
                      <strong style="font-size:0.85rem; color:var(--accent-emerald-text); display:flex; align-items:center; gap:0.35rem;">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Conselheiros CACS-FUNDEB
                      </strong>
                      <span class="nav-badge font-mono font-bold" style="font-size:0.75rem; background:rgba(16,185,129,0.15); color:var(--accent-emerald-text);">
                        Total: ${cTotalHours.toFixed(1).replace('.', ',')} h
                      </span>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                      ${cTopics.map((t, tIdx) => `
                        <div class="course-topic-item">
                          <input type="text" class="form-control form-control-sm" placeholder="Temática para CACS" value="${(t.topic || '').replace(/"/g, '&quot;')}" onchange="app.updateGlobalMasterCourseTopic(${modIdx}, 'cacs', ${tIdx}, 'topic', this.value)">
                          <div style="display:flex; align-items:center; gap:0.25rem;">
                            <input type="number" step="0.5" min="0" class="form-control form-control-sm" style="text-align:center; font-weight:700;" value="${parseFloat(t.hours) || 0}" onchange="app.updateGlobalMasterCourseTopic(${modIdx}, 'cacs', ${tIdx}, 'hours', this.value)">
                            <span style="font-size:0.75rem; color:var(--text-muted);">h</span>
                          </div>
                          <button type="button" class="btn btn-secondary btn-sm" onclick="app.removeGlobalMasterCourseTopic(${modIdx}, 'cacs', ${tIdx})" style="padding:0.2rem 0.4rem; color:var(--accent-rose-text); display:inline-flex; align-items:center; justify-content:center;" title="Remover Temática">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      `).join('')}
                    </div>

                    <button type="button" class="btn btn-secondary btn-sm" onclick="app.addGlobalMasterCourseTopic(${modIdx}, 'cacs')" style="align-self:flex-start; font-size:0.78rem; font-weight:600; margin-top:0.25rem;">
                      + Adicionar Temática CACS
                    </button>
                  </div>
                </div>
              `}
            </div>
          `;
        }).join('');
      }
    }

    if (tableContainer && window.statsEngine) {
      tableContainer.innerHTML = window.statsEngine.generateTable2Html(masterMods);
    }
  }

  toggleMasterCourseEditor(forceState) {
    if (forceState !== undefined) {
      this.isMasterCourseEditorOpen = !!forceState;
    } else {
      this.isMasterCourseEditorOpen = !this.isMasterCourseEditorOpen;
    }
    this.renderGlobalMasterCourseStructure();
  }

  addGlobalMasterCourseModule() {
    if (!window.courseStructureHelper) return;
    this.isMasterCourseEditorOpen = true;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    const masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const nextNum = masterMods.length + 1;
    const numStr = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;

    masterMods.push({
      id: `mod_tpl_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      moduleNumber: numStr,
      order: nextNum,
      isShared: true,
      gestorTopics: [
        { id: `top_g_${Date.now()}_1`, topic: 'Nova Temática Módulo', hours: 2.0 }
      ],
      cacsTopics: [
        { id: `top_c_${Date.now()}_1`, topic: 'Nova Temática Módulo', hours: 2.0 }
      ]
    });

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
    this.showToast(`Módulo ${numStr} adicionado à estrutura "${activeTpl.name}"!`, 'success');
  }

  duplicateGlobalMasterCourseModule(modIdx) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    masterMods = window.courseStructureHelper.duplicateModule(masterMods, modIdx);

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
    this.showToast('Módulo duplicado com sucesso!', 'success');
  }

  deleteGlobalMasterCourseModule(modIdx) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const mod = masterMods[modIdx];
    const modName = mod ? `Módulo ${mod.number || modIdx + 1}` : 'este módulo';

    this.openConfirmModal({
      title: 'Remover Módulo da Matriz',
      msg: `Deseja realmente remover ${modName} da estrutura "${activeTpl.name}"?`,
      btnText: 'Sim, Remover Módulo',
      successTitle: 'Módulo Removido!',
      successMsg: 'O módulo foi removido da matriz com sucesso.',
      onConfirm: () => {
        masterMods.splice(modIdx, 1);
        masterMods = window.courseStructureHelper.autoRenumber(masterMods);
        window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
        this.renderCourseTemplatesCatalog();
        this.renderGlobalMasterCourseStructure();
        this.showToast('Módulo removido da estrutura.', 'info');
      }
    });
  }

  moveGlobalMasterCourseModule(modIdx, direction) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const targetIdx = modIdx + direction;
    if (targetIdx < 0 || targetIdx >= masterMods.length) return;

    const temp = masterMods[modIdx];
    masterMods[modIdx] = masterMods[targetIdx];
    masterMods[targetIdx] = temp;
    masterMods = window.courseStructureHelper.autoRenumber(masterMods);

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
  }

  updateGlobalMasterCourseModuleNumber(modIdx, newNumber) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    const masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    if (masterMods[modIdx]) {
      masterMods[modIdx].moduleNumber = (newNumber || '').trim();
      window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
      this.renderCourseTemplatesCatalog();
      this.renderGlobalMasterCourseStructure();
    }
  }

  toggleGlobalMasterCourseModuleShared(modIdx, isChecked) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const mod = masterMods[modIdx];
    if (!mod) return;

    if (isChecked) {
      const gStr = JSON.stringify((mod.gestorTopics || []).map(t => ({ topic: t.topic, hours: t.hours })));
      const cStr = JSON.stringify((mod.cacsTopics || []).map(t => ({ topic: t.topic, hours: t.hours })));
      if (gStr !== cStr) {
        if (!confirm('Este módulo possui temáticas diferentes para Gestores e CACS.\n\nAo torná-lo compartilhado, as temáticas da Gestão Municipal serão aplicadas aos dois públicos. Deseja continuar?')) {
          this.renderGlobalMasterCourseStructure();
          return;
        }
      }
      mod.isShared = true;
      mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics || []));
    } else {
      mod.isShared = false;
      if (!mod.cacsTopics || mod.cacsTopics.length === 0) {
        mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics || []));
      }
    }

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
  }

  addGlobalMasterCourseTopic(modIdx, type) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const mod = masterMods[modIdx];
    if (!mod) return;

    const newTopic = { id: `top_${Date.now()}`, topic: '', hours: 1.0 };

    if (type === 'shared' || mod.isShared) {
      if (!mod.gestorTopics) mod.gestorTopics = [];
      mod.gestorTopics.push(newTopic);
      mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics));
    } else if (type === 'gestor') {
      if (!mod.gestorTopics) mod.gestorTopics = [];
      mod.gestorTopics.push(newTopic);
    } else {
      if (!mod.cacsTopics) mod.cacsTopics = [];
      mod.cacsTopics.push(newTopic);
    }

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
  }

  removeGlobalMasterCourseTopic(modIdx, type, topicIdx) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const mod = masterMods[modIdx];
    if (!mod) return;

    if (type === 'shared' || mod.isShared) {
      if (mod.gestorTopics) {
        mod.gestorTopics.splice(topicIdx, 1);
        if (mod.gestorTopics.length === 0) mod.gestorTopics.push({ id: `top_g_${Date.now()}`, topic: '', hours: 0 });
        mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics));
      }
    } else if (type === 'gestor' && mod.gestorTopics) {
      mod.gestorTopics.splice(topicIdx, 1);
      if (mod.gestorTopics.length === 0) mod.gestorTopics.push({ id: `top_g_${Date.now()}`, topic: '', hours: 0 });
    } else if (type === 'cacs' && mod.cacsTopics) {
      mod.cacsTopics.splice(topicIdx, 1);
      if (mod.cacsTopics.length === 0) mod.cacsTopics.push({ id: `top_c_${Date.now()}`, topic: '', hours: 0 });
    }

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
  }

  updateGlobalMasterCourseTopic(modIdx, type, topicIdx, field, value) {
    if (!window.courseStructureHelper) return;
    const activeTpl = window.courseStructureHelper.getTemplateById(this.activeTemplateId);
    if (!activeTpl) return;

    let masterMods = window.courseStructureHelper.normalize(activeTpl.modules || []);
    const mod = masterMods[modIdx];
    if (!mod) return;

    if (type === 'shared' || mod.isShared) {
      if (mod.gestorTopics && mod.gestorTopics[topicIdx]) {
        if (field === 'hours') mod.gestorTopics[topicIdx].hours = parseFloat(value) || 0;
        else mod.gestorTopics[topicIdx].topic = value;
      }
      mod.cacsTopics = JSON.parse(JSON.stringify(mod.gestorTopics));
    } else {
      const list = type === 'gestor' ? mod.gestorTopics : mod.cacsTopics;
      if (list && list[topicIdx]) {
        if (field === 'hours') list[topicIdx].hours = parseFloat(value) || 0;
        else list[topicIdx].topic = value;
      }
    }

    window.courseStructureHelper.updateTemplateModules(activeTpl.id, masterMods);
    this.renderCourseTemplatesCatalog();
    this.renderGlobalMasterCourseStructure();
  }

  resetGlobalMasterCourseStructure() {
    if (!window.courseStructureHelper) return;
    if (confirm('Deseja restaurar o Modelo Padrão Global para a matriz oficial original do CECATE-CO (4 módulos)?')) {
      const defaultCopy = window.courseStructureHelper.getDefaultCopy();
      window.courseStructureHelper.saveMasterStructure(defaultCopy);
      this.renderGlobalMasterCourseStructure();
      this.showToast('Modelo Padrão Global restaurado com sucesso!', 'success');
    }
  }

  /* ==========================================================================
     ETAPA 6: INSCRIÇÃO & LISTA DE PRESENÇA (UPLOAD & TABELA 4)
     ========================================================================== */
  reprocessDataStep6() {
    if (!this.currentTraining) return;

    const regList = this.currentTraining.registrations || [];
    const attList = this.currentTraining.attendance || [];

    if (regList.length === 0 && attList.length === 0) {
      this.showToast('Nenhuma planilha de inscrição ou presença carregada para reprocessar.', 'warning');
      return;
    }

    this.showToast('Reprocessando e recalculando totais de inscritos e presentes...');

    // Recalcular a reconciliação entre inscritos e presentes
    this.reconcileMunicipalitiesFromRegistrationAndAttendance();

    // Re-renderizar Etapa 6
    this.renderAttendanceStep();
    this.saveCurrentStepData();

    this.showToast(`Reprocessamento concluído! (${regList.length} inscritos | ${attList.length} presentes recalculados)`, 'success');
  }

  initDragAndDropHandlers() {
    // Configurar manipuladores de arrastar e soltar (Drag & Drop) para todas as zonas de upload
    const dropzones = document.querySelectorAll('.upload-dropzone');
    dropzones.forEach(dropzone => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
        }, false);
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
          dropzone.classList.add('dragover');
          dropzone.style.borderColor = 'var(--accent-blue)';
          dropzone.style.background = 'rgba(59, 130, 246, 0.15)';
        }, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => {
          dropzone.classList.remove('dragover');
          dropzone.style.borderColor = '';
          dropzone.style.background = '';
        }, false);
      });

      dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        const input = dropzone.querySelector('input[type="file"]');

        if (input) {
          try {
            const container = new DataTransfer();
            container.items.add(file);
            input.files = container.files;

            const event = new Event('change', { bubbles: true });
            input.dispatchEvent(event);
          } catch (err) {
            console.warn('Fallback manual para leitura de arquivo via drag & drop:', err);
            // Fallback caso DataTransfer não seja suportado em browsers legados
            if (input.id === 'file-input-registration') {
              this.handleRegistrationFileUpload({ target: { files: [file] } });
            } else if (input.id === 'file-input-attendance') {
              this.handleAttendanceFileUpload({ target: { files: [file] } });
            } else if (input.id === 'file-input-evaluation') {
              this.handleEvaluationFileUpload({ target: { files: [file] } });
            }
          }
        }
      }, false);
    });
  }

  async handleRegistrationFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file || !window.excelParser) return;

    try {
      this.showToast('Lendo planilha de inscrições...');
      const { sheets, sheetNames } = await window.excelParser.readWorkbook(file);
      const firstSheet = sheets[sheetNames[0]];

      const parsed = window.excelParser.parseRegistrationRows(firstSheet, null, this.currentTraining.uf || 'MT');
      if (parsed.length === 0) {
        this.showToast('Nenhum registro de inscrição identificado na planilha.', 'warning');
        return;
      }

      this.currentTraining.registrations = parsed;

      // Reconciliar inscritos e presentes na lista de municípios
      this.reconcileMunicipalitiesFromRegistrationAndAttendance();

      this.renderAttendanceStep();
      this.saveCurrentStepData();
      this.showToast(`${parsed.length} inscrições importadas com sucesso!`, 'success');
    } catch (err) {
      console.error('Erro ao importar planilha de inscrições:', err);
      this.showToast(`Erro na importação de inscrições: ${err.message}`, 'error');
    }
  }

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
      this.reconcileMunicipalitiesFromRegistrationAndAttendance();

      this.renderAttendanceStep();
      this.saveCurrentStepData();
      this.showToast(`${parsed.length} participantes presentes importados com sucesso!`, 'success');
    } catch (err) {
      console.error('Erro ao importar lista de presença:', err);
      this.showToast(`Erro na importação: ${err.message}`, 'error');
    }
  }

  openConfirmModal({ title, msg, btnText = 'Sim, Remover', successTitle = 'Exclusão Concluída!', successMsg = 'O item foi removido com sucesso.', onConfirm }) {
    const overlay = document.getElementById('app-confirm-modal-overlay');
    const card = document.getElementById('app-confirm-modal-card');
    const titleEl = document.getElementById('app-confirm-modal-title');
    const msgEl = document.getElementById('app-confirm-modal-msg');
    const btnAction = document.getElementById('app-confirm-modal-btn-action');

    const iconContainer = document.getElementById('app-confirm-modal-icon-container');
    const iconAlert = document.getElementById('app-confirm-modal-icon-alert');
    const iconLoading = document.getElementById('app-confirm-modal-icon-loading');
    const iconSuccess = document.getElementById('app-confirm-modal-icon-success');

    const progressContainer = document.getElementById('app-confirm-modal-progress-container');
    const progressBar = document.getElementById('app-confirm-modal-progress-bar');
    const progressText = document.getElementById('app-confirm-modal-progress-text');

    const actionsInitial = document.getElementById('app-confirm-modal-actions-initial');
    const actionsSuccess = document.getElementById('app-confirm-modal-actions-success');

    // Resetar para Fase 1 (Pergunta inicial de confirmação)
    if (card) card.style.borderColor = 'rgba(244, 63, 94, 0.35)';
    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = msg;
    if (btnAction) {
      btnAction.textContent = btnText;
      btnAction.style.setProperty('color', '#ffffff', 'important');
    }

    if (iconContainer) {
      iconContainer.style.background = 'rgba(244, 63, 94, 0.15)';
      iconContainer.style.color = '#f43f5e';
    }
    if (iconAlert) iconAlert.style.display = 'flex';
    if (iconLoading) iconLoading.style.display = 'none';
    if (iconSuccess) iconSuccess.style.display = 'none';

    if (progressContainer) progressContainer.style.display = 'none';
    if (progressBar) progressBar.style.width = '0%';
    if (progressText) progressText.textContent = 'Removendo...';

    if (actionsInitial) actionsInitial.style.display = 'flex';
    if (actionsSuccess) actionsSuccess.style.display = 'none';

    this.onConfirmCallback = onConfirm;
    this.confirmSuccessTitle = successTitle;
    this.confirmSuccessMsg = successMsg;
    this.isConfirmModalProcessing = false;

    if (overlay) overlay.style.display = 'flex';
  }

  closeConfirmModal() {
    if (this.isConfirmModalProcessing) return; // Não fechar enquanto a barra de carregamento roda
    const overlay = document.getElementById('app-confirm-modal-overlay');
    if (overlay) overlay.style.display = 'none';
    this.onConfirmCallback = null;
    this.isConfirmModalProcessing = false;
  }

  executeConfirmModalAction() {
    if (this.isConfirmModalProcessing) return;
    this.isConfirmModalProcessing = true;

    const card = document.getElementById('app-confirm-modal-card');
    const titleEl = document.getElementById('app-confirm-modal-title');
    const msgEl = document.getElementById('app-confirm-modal-msg');
    const iconContainer = document.getElementById('app-confirm-modal-icon-container');
    const iconAlert = document.getElementById('app-confirm-modal-icon-alert');
    const iconLoading = document.getElementById('app-confirm-modal-icon-loading');
    const iconSuccess = document.getElementById('app-confirm-modal-icon-success');

    const progressContainer = document.getElementById('app-confirm-modal-progress-container');
    const progressBar = document.getElementById('app-confirm-modal-progress-bar');
    const progressText = document.getElementById('app-confirm-modal-progress-text');

    const actionsInitial = document.getElementById('app-confirm-modal-actions-initial');
    const actionsSuccess = document.getElementById('app-confirm-modal-actions-success');

    // FASE 2: BARRA DE CARREGAMENTO
    if (actionsInitial) actionsInitial.style.display = 'none';
    if (titleEl) titleEl.textContent = 'Removendo...';
    if (msgEl) msgEl.textContent = 'Aguarde enquanto a exclusão é processada com segurança.';

    if (card) card.style.borderColor = 'rgba(99, 102, 241, 0.35)';
    if (iconContainer) {
      iconContainer.style.background = 'rgba(99, 102, 241, 0.15)';
      iconContainer.style.color = '#6366f1';
    }
    if (iconAlert) iconAlert.style.display = 'none';
    if (iconLoading) iconLoading.style.display = 'flex';

    if (progressContainer) progressContainer.style.display = 'block';
    if (progressBar) {
      progressBar.style.width = '0%';
      setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';
      }, 50);
    }

    // Executar a exclusão efetiva dos dados
    if (typeof this.onConfirmCallback === 'function') {
      try {
        this.onConfirmCallback();
      } catch (err) {
        console.error('Erro ao executar exclusão:', err);
      }
    }

    // FASE 3: CONFIRMAÇÃO DE SUCESSO COM BOTÃO OK
    setTimeout(() => {
      this.isConfirmModalProcessing = false;

      if (progressContainer) progressContainer.style.display = 'none';

      if (card) card.style.borderColor = 'rgba(16, 185, 129, 0.35)';
      if (iconContainer) {
        iconContainer.style.background = 'rgba(16, 185, 129, 0.15)';
        iconContainer.style.color = '#10b981';
      }
      if (iconLoading) iconLoading.style.display = 'none';
      if (iconSuccess) iconSuccess.style.display = 'flex';

      if (titleEl) titleEl.textContent = this.confirmSuccessTitle || 'Exclusão Concluída!';
      if (msgEl) msgEl.textContent = this.confirmSuccessMsg || 'O item foi removido com sucesso.';

      if (actionsSuccess) {
        actionsSuccess.style.display = 'flex';
        const okBtn = document.getElementById('app-confirm-modal-btn-ok');
        if (okBtn) okBtn.focus();
      }
    }, 750);
  }

  clearStep6Data(type = 'all') {
    if (!this.currentTraining) return;

    let title = 'Remover Arquivos e Listas';
    let msg = 'Tem certeza que deseja remover todas as planilhas importadas (Inscrição e Presença) e limpar as listas de participantes e estatísticas?';
    let successTitle = 'Planilhas Removidas!';
    let successMsg = 'As planilhas e a lista de participantes foram excluídas com sucesso.';

    if (type === 'registration') {
      title = 'Remover Planilha de Inscrições';
      msg = 'Tem certeza que deseja remover a Planilha de Inscrições e limpar a lista de inscritos?';
      successTitle = 'Inscrições Removidas!';
      successMsg = 'A planilha de inscrições foi excluída com sucesso.';
    } else if (type === 'attendance') {
      title = 'Remover Planilha de Presença';
      msg = 'Tem certeza que deseja remover a Planilha de Presença e limpar a lista de presentes?';
      successTitle = 'Presença Removida!';
      successMsg = 'A planilha de presença foi excluída com sucesso.';
    }

    this.openConfirmModal({
      title,
      msg,
      btnText: 'Sim, Remover',
      successTitle,
      successMsg,
      onConfirm: () => this.executeClearStep6Data(type)
    });
  }

  executeClearStep6Data(type = 'all') {
    if (!this.currentTraining) return;

    if (type === 'all' || type === 'registration') {
      this.currentTraining.registrations = [];
      const inputReg = document.getElementById('file-input-registration');
      if (inputReg) inputReg.value = '';
    }

    if (type === 'all' || type === 'attendance') {
      this.currentTraining.attendance = [];
      const inputAtt = document.getElementById('file-input-attendance');
      if (inputAtt) inputAtt.value = '';
    }

    // Reconciliar e purgar municípios inválidos
    this.reconcileMunicipalitiesFromRegistrationAndAttendance();

    this.renderAttendanceStep();
    this.saveCurrentStepData();
    this.showToast('Arquivos e listas limpos com sucesso!', 'success');
  }

  reconcileMunicipalitiesFromRegistrationAndAttendance() {
    if (!this.currentTraining) return;
    if (!this.currentTraining.municipalities) this.currentTraining.municipalities = [];

    // Purga proativa de entradas de municípios inválidos/declarações
    this.currentTraining.municipalities = this.currentTraining.municipalities.filter(m => {
      const n = (m.name || '').toLowerCase();
      return !n.includes('declaro') && !n.includes('veracidade') && !n.includes('confirmo') && !n.includes('prestadas') && !n.includes('formulario') && !n.includes('termo') && m.name.length <= 45;
    });

    const regList = this.currentTraining.registrations || [];
    const attList = this.currentTraining.attendance || [];

    // Map de inscritos por CPF (limpo e formatado)
    const regMapByCpf = new Map();
    regList.forEach(reg => {
      if (reg.cpf) {
        const cleanCpf = reg.cpf.replace(/\D/g, '').padStart(11, '0');
        if (cleanCpf && cleanCpf.length === 11) {
          regMapByCpf.set(cleanCpf, reg);
        }
      }
    });

    // Cruzar dados da lista de presença com a planilha de inscrição pelo CPF
    attList.forEach(att => {
      if (att.cpf) {
        const cleanCpf = att.cpf.replace(/\D/g, '').padStart(11, '0');
        if (cleanCpf && cleanCpf.length === 11 && regMapByCpf.has(cleanCpf)) {
          const reg = regMapByCpf.get(cleanCpf);
          // Priorizar Nome Completo, Município que representa e Vínculo/Segmento (Gestor vs CACS) do formulário de inscrição
          if (reg.name) att.name = reg.name;
          if (reg.municipality) {
            att.municipality = reg.municipality;
            if (reg.ibgeCode) att.ibgeCode = reg.ibgeCode;
          }
          if (reg.representation) att.representation = reg.representation;
          if (reg.roleGestao) att.roleGestao = reg.roleGestao;
          if (reg.roleCACS) att.roleCACS = reg.roleCACS;
          if (window.excelParser) att.cpf = window.excelParser.formatCpf(att.cpf || reg.cpf);
          att.matchedByCpf = true;
          att.isCpfValidated = true;
        } else if (window.excelParser && att.cpf) {
          att.cpf = window.excelParser.formatCpf(att.cpf);
        }
      }
    });

    // Agrupar inscritos por município (extraído da inscrição "Município que representa:")
    const regMap = {};
    regList.forEach(reg => {
      const munName = reg.municipality || 'Não Informado';
      const munLower = munName.toLowerCase();
      // Filtrar textos de declaração
      if (munLower.includes('declaro') || munLower.includes('veracidade') || munLower.includes('confirmo') || munLower.includes('prestadas') || munLower.includes('formulario') || munLower.includes('termo') || munName.length > 45) {
        return;
      }
      if (!regMap[munName]) {
        regMap[munName] = { cacs: 0, gestores: 0, ibgeCode: reg.ibgeCode };
      }
      if (reg.representation === 'CACS-FUNDEB') regMap[munName].cacs++;
      else regMap[munName].gestores++;
    });

    // Agrupar presentes por município (após cruzamento de CPF)
    const attMap = {};
    attList.forEach(att => {
      const cleanCpf = att.cpf ? att.cpf.replace(/\D/g, '') : '';
      const isMatched = cleanCpf && cleanCpf.length === 11 && regMapByCpf.has(cleanCpf);

      // Para participantes "Apenas Presente", só contabilizar município e vínculo se tiverem sido selecionados manualmente
      const munName = isMatched ? (att.municipality || 'Não Informado') : (att.isManualMunicipality ? att.municipality : '');
      const rep = isMatched ? att.representation : (att.isManualRepresentation ? att.representation : '');

      if (!munName) return; // Não contabilizar se o município ainda não foi selecionado

      const munLower = munName.toLowerCase();
      // Filtrar textos de declaração
      if (munLower.includes('declaro') || munLower.includes('veracidade') || munLower.includes('confirmo') || munLower.includes('prestadas') || munLower.includes('formulario') || munLower.includes('termo') || munName.length > 45) {
        return;
      }
      if (!attMap[munName]) {
        attMap[munName] = { cacs: 0, gestores: 0, ibgeCode: att.ibgeCode };
      }
      if (rep === 'CACS-FUNDEB') attMap[munName].cacs++;
      else if (rep === 'Gestão municipal') attMap[munName].gestores++;
    });

    // Unir lista de TODOS os municípios (existentes na lista de convocados + mencionados nas planilhas)
    const allMunNamesMap = new Map();

    // 1. Adicionar todos os municípios pré-existentes em currentTraining.municipalities
    this.currentTraining.municipalities.forEach(m => {
      if (m.name) allMunNamesMap.set(m.name.toLowerCase(), m.name);
    });

    // 2. Adicionar municípios de regMap e attMap
    Object.keys(regMap).forEach(k => allMunNamesMap.set(k.toLowerCase(), k));
    Object.keys(attMap).forEach(k => allMunNamesMap.set(k.toLowerCase(), k));

    const hasRegistrationSheet = regList.length > 0;

    allMunNamesMap.forEach((munNameOriginal, munKey) => {
      let existing = this.currentTraining.municipalities.find(m => m.name.toLowerCase() === munKey);

      const regData = regMap[munNameOriginal] || regMap[munKey] || { cacs: 0, gestores: 0, ibgeCode: '' };
      const attData = attMap[munNameOriginal] || attMap[munKey] || { cacs: 0, gestores: 0, ibgeCode: '' };

      const inscribedCACS = hasRegistrationSheet ? regData.cacs : attData.cacs;
      const inscribedGestores = hasRegistrationSheet ? regData.gestores : attData.gestores;
      const inscribedTotal = inscribedCACS + inscribedGestores;

      const presentCACS = attData.cacs;
      const presentGestores = attData.gestores;
      const presentTotal = presentCACS + presentGestores;

      if (existing) {
        existing.inscribedCACS = inscribedCACS;
        existing.inscribedGestores = inscribedGestores;
        existing.inscribedTotal = inscribedTotal;

        existing.presentCACS = presentCACS;
        existing.presentGestores = presentGestores;
        existing.presentTotal = presentTotal;
      } else {
        this.currentTraining.municipalities.push({
          id: `mun_${Date.now()}_${munKey}`,
          ibgeCode: regData.ibgeCode || attData.ibgeCode || '',
          name: munNameOriginal,
          uf: this.currentTraining.uf || 'MT',
          distanceKm: 0,
          isSummoned: true,
          inscribedCACS,
          inscribedGestores,
          inscribedTotal,
          presentCACS,
          presentGestores,
          presentTotal
        });
      }
    });

    // Filtro final garantido de purga de municípios com rótulo inválido
    this.currentTraining.municipalities = this.currentTraining.municipalities.filter(m => {
      const n = (m.name || '').toLowerCase();
      return !n.includes('declaro') && !n.includes('veracidade') && !n.includes('confirmo') && !n.includes('prestadas') && !n.includes('formulario') && !n.includes('termo') && m.name.length <= 45;
    });
  }

  switchAttendanceSubTab(tabName) {
    const regContainer = document.getElementById('wizard-registration-table-container');
    const attContainer = document.getElementById('wizard-attendance-table-container');
    const btnReg = document.getElementById('btn-subtab-registration');
    const btnAtt = document.getElementById('btn-subtab-attendance');

    if (tabName === 'registration') {
      if (regContainer) regContainer.style.display = 'block';
      if (attContainer) attContainer.style.display = 'none';
      if (btnReg) { btnReg.classList.add('btn-primary'); btnReg.classList.remove('btn-secondary'); }
      if (btnAtt) { btnAtt.classList.add('btn-secondary'); btnAtt.classList.remove('btn-primary'); }
    } else {
      if (regContainer) regContainer.style.display = 'none';
      if (attContainer) attContainer.style.display = 'block';
      if (btnAtt) { btnAtt.classList.add('btn-primary'); btnAtt.classList.remove('btn-secondary'); }
      if (btnReg) { btnReg.classList.add('btn-secondary'); btnReg.classList.remove('btn-primary'); }
    }
  }

  getConsolidatedParticipantsList() {
    if (!this.currentTraining) return [];

    const regList = this.currentTraining.registrations || [];
    const attList = this.currentTraining.attendance || [];

    const regMapByCpf = new Map();
    regList.forEach(reg => {
      if (reg.cpf) {
        const clean = reg.cpf.replace(/\D/g, '').padStart(11, '0');
        if (clean && clean.length === 11) regMapByCpf.set(clean, reg);
      }
    });

    const consolidated = [];
    const processedRegIds = new Set();

    // 1. Processar presentes e cruzar com inscritos pelo CPF
    attList.forEach(att => {
      const cleanCpf = att.cpf ? att.cpf.replace(/\D/g, '').padStart(11, '0') : '';
      const matchedReg = cleanCpf && cleanCpf.length === 11 ? regMapByCpf.get(cleanCpf) : null;
      const formattedCpf = window.excelParser ? window.excelParser.formatCpf(att.cpf || (matchedReg ? matchedReg.cpf : '')) : (att.cpf || '');

      if (matchedReg) {
        processedRegIds.add(matchedReg.id);
        consolidated.push({
          id: att.id,
          regId: matchedReg.id,
          name: matchedReg.name || att.name,
          cpf: formattedCpf,
          municipality: matchedReg.municipality || att.municipality || '',
          ibgeCode: matchedReg.ibgeCode || att.ibgeCode || '',
          representation: matchedReg.representation || att.representation || '',
          roleGestao: matchedReg.roleGestao || att.roleGestao || '',
          roleCACS: matchedReg.roleCACS || att.roleCACS || '',
          status: 'Inscrito e Presente',
          matchedByCpf: true,
          isCpfValidated: true
        });
      } else {
        // Se não foi encontrado na inscrição, preserva o município e vínculo da própria lista de presença (ou manual se já editado)
        const mun = att.municipality || (att.isManualMunicipality ? att.municipality : '') || '';
        const rep = att.representation || (att.isManualRepresentation ? att.representation : '') || '';
        const isApValidated = !!(mun && rep && formattedCpf && formattedCpf !== '-');
        consolidated.push({
          id: att.id,
          name: att.name,
          cpf: formattedCpf,
          municipality: mun,
          ibgeCode: att.ibgeCode || '',
          representation: rep,
          roleGestao: att.roleGestao,
          roleCACS: att.roleCACS,
          status: 'Apenas Presente',
          matchedByCpf: false,
          isCpfValidated: isApValidated
        });
      }
    });

    // 2. Adicionar inscritos que não foram conciliados na lista de presença
    regList.forEach(reg => {
      if (!processedRegIds.has(reg.id)) {
        consolidated.push({
          id: reg.id,
          name: reg.name,
          cpf: reg.cpf,
          municipality: reg.municipality,
          ibgeCode: reg.ibgeCode,
          representation: reg.representation,
          roleGestao: reg.roleGestao,
          roleCACS: reg.roleCACS,
          status: 'Apenas Inscrito',
          matchedByCpf: false,
          isCpfValidated: false
        });
      }
    });

    return consolidated;
  }

  getInvitedMunicipalityOptions() {
    const list = this.currentTraining?.municipalities || [];
    const names = new Set();

    list.forEach(m => {
      if (m.name) {
        const n = m.name.trim();
        if (n && n.length <= 45 && !n.toLowerCase().includes('declaro') && !n.toLowerCase().includes('não informado')) {
          names.add(n);
        }
      }
    });

    // Se porventura a lista estiver vazia, recuar para os municípios do estado da formação
    if (names.size === 0 && window.IBGE_DATA && Array.isArray(window.IBGE_DATA)) {
      const uf = this.currentTraining?.uf || 'MT';
      window.IBGE_DATA.filter(item => item.uf === uf).forEach(item => {
        if (item.n) names.add(item.n);
      });
    }

    return Array.from(names).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }

  getAttendanceSortIcon(field) {
    if (this.attendanceSortCol !== field) {
      // Ícone neutro de ordenação (linhas de classificação sutis)
      return `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.4;"><path d="M7 15l5 5 5-5"></path><path d="M7 9l5-5 5 5"></path></svg>`;
    }
    if (this.attendanceSortDir === 'asc') {
      // Crescente: linhas ordenadas com seta para cima
      return `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color:#f59e0b;"><line x1="3" y1="6" x2="11" y2="6"></line><line x1="3" y1="12" x2="9" y2="12"></line><line x1="3" y1="18" x2="7" y2="18"></line><polyline points="15 9 18 6 21 9"></polyline><line x1="18" y1="6" x2="18" y2="18"></line></svg>`;
    } else {
      // Decrescente: linhas ordenadas com seta para baixo
      return `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color:#f59e0b;"><line x1="3" y1="6" x2="11" y2="6"></line><line x1="3" y1="12" x2="9" y2="12"></line><line x1="3" y1="18" x2="7" y2="18"></line><polyline points="15 15 18 18 21 15"></polyline><line x1="18" y1="6" x2="18" y2="18"></line></svg>`;
    }
  }

  sortAttendanceTable(colName) {
    if (this.attendanceSortCol === colName) {
      this.attendanceSortDir = this.attendanceSortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.attendanceSortCol = colName;
      this.attendanceSortDir = 'asc';
    }
    this.renderAttendanceStep();
  }

  sortParticipantsList(list = [], col = 'name', dir = 'asc') {
    const sorted = [...list].sort((a, b) => {
      // 1. Prioridade máxima: qualquer participante 'Apenas Presente' fica no topo da lista
      const isApenasPresenteA = a.status === 'Apenas Presente' ? 1 : 0;
      const isApenasPresenteB = b.status === 'Apenas Presente' ? 1 : 0;

      if (isApenasPresenteA !== isApenasPresenteB) {
        return isApenasPresenteB - isApenasPresenteA; // 'Apenas Presente' fica no topo
      }

      // 2. Se ambos forem 'Apenas Presente', priorizar no topo os que estão sem validação (sem município ou sem vínculo)
      if (isApenasPresenteA && isApenasPresenteB) {
        const isIncompleteA = (!a.municipality || !a.representation) ? 1 : 0;
        const isIncompleteB = (!b.municipality || !b.representation) ? 1 : 0;
        if (isIncompleteA !== isIncompleteB) {
          return isIncompleteB - isIncompleteA; // Sem validação fica ainda mais acima
        }
      }

      let valA = '';
      let valB = '';

      if (col === 'name') {
        valA = a.name || '';
        valB = b.name || '';
      } else if (col === 'cpf') {
        valA = a.cpf || '';
        valB = b.cpf || '';
      } else if (col === 'status') {
        valA = a.status || '';
        valB = b.status || '';
      } else if (col === 'municipality') {
        valA = a.municipality || 'zzzz';
        valB = b.municipality || 'zzzz';
      } else if (col === 'representation' || col === 'vinculo' || col === 'role') {
        valA = a.representation || '';
        valB = b.representation || '';
      }

      const cmp = valA.localeCompare(valB, 'pt-BR', { sensitivity: 'base' });
      return dir === 'desc' ? -cmp : cmp;
    });

    return sorted;
  }

  updateParticipantField(participantId, field, value) {
    if (!this.currentTraining) return;

    const val = (value || '').trim();
    let participant = (this.currentTraining.attendance || []).find(p => p.id === participantId);
    if (!participant) {
      participant = (this.currentTraining.registrations || []).find(p => p.id === participantId);
    }
    if (!participant) return;
    
    // RESTRIÇÃO: Permitir atualização apenas se não for participante conciliado na inscrição ("Apenas Presente")
    const cleanCpf = participant.cpf ? participant.cpf.replace(/\D/g, '') : '';
    const hasRegMatch = cleanCpf && cleanCpf.length === 11 && (this.currentTraining.registrations || []).some(r => r.cpf && r.cpf.replace(/\D/g, '') === cleanCpf);
    if (hasRegMatch) return;

    if (field === 'municipality') {
      participant.municipality = val;
      participant.isManualMunicipality = !!val;
      if (val && window.excelParser) {
        const normKey = window.excelParser.normalizeStr(val);
        const ibgeInfo = window.excelParser.ibgeLookup.get(normKey);
        if (ibgeInfo) participant.ibgeCode = ibgeInfo.c;
      }
    } else if (field === 'representation') {
      participant.representation = val;
      participant.isManualRepresentation = !!val;
    }

    // Se possui CPF, sincronizar no registro da outra planilha caso exista
    if (participant.cpf) {
      const cleanCpf = participant.cpf.replace(/\D/g, '');
      if (cleanCpf && cleanCpf.length === 11) {
        const regMatch = (this.currentTraining.registrations || []).find(r => r.cpf && r.cpf.replace(/\D/g, '') === cleanCpf);
        const attMatch = (this.currentTraining.attendance || []).find(a => a.cpf && a.cpf.replace(/\D/g, '') === cleanCpf);

        [regMatch, attMatch].forEach(item => {
          if (item && item !== participant) {
            if (field === 'municipality') item.municipality = val;
            if (field === 'representation') item.representation = val;
          }
        });
      }
    }

    // Recalcular totais e atualizar visualização
    this.reconcileMunicipalitiesFromRegistrationAndAttendance();
    this.renderAttendanceStep();
    this.saveCurrentStepData();
    this.showToast(`Participante "${participant.name}" atualizado com sucesso!`, 'success');
  }

  clearManualParticipantField(participantId, field) {
    if (!this.currentTraining) return;
    let participant = (this.currentTraining.attendance || []).find(p => p.id === participantId);
    if (!participant) {
      participant = (this.currentTraining.registrations || []).find(p => p.id === participantId);
    }
    if (!participant) return;

    if (field === 'municipality') {
      participant.municipality = '';
      participant.isManualMunicipality = false;
      participant.ibgeCode = null;
    } else if (field === 'representation') {
      participant.representation = '';
      participant.isManualRepresentation = false;
    }

    this.reconcileMunicipalitiesFromRegistrationAndAttendance();
    this.renderAttendanceStep();
    this.saveCurrentStepData();
  }

  renderAttendanceStep() {
    const statusBanner = document.getElementById('wizard-attendance-status-banner');
    const attContainer = document.getElementById('wizard-attendance-table-container');
    const table4Container = document.getElementById('wizard-table4-preview');
    if (!this.currentTraining) return;

    const regList = this.currentTraining.registrations || [];
    const attList = this.currentTraining.attendance || [];

    const hasReg = regList.length > 0;
    const hasAtt = attList.length > 0;

    // Controlar visibilidade das dropzones de upload (desaparecem ao fazer upload e só voltam se limpar)
    const dropzoneContainer = document.getElementById('wizard-step6-dropzones-container');
    const dropzoneReg = document.getElementById('dropzone-registration');
    const dropzoneAtt = document.getElementById('dropzone-attendance');

    if (dropzoneReg) {
      if (hasReg) {
        dropzoneReg.style.setProperty('display', 'none', 'important');
      } else {
        dropzoneReg.style.removeProperty('display');
        dropzoneReg.style.display = 'flex';
      }
    }

    if (dropzoneAtt) {
      if (hasAtt) {
        dropzoneAtt.style.setProperty('display', 'none', 'important');
      } else {
        dropzoneAtt.style.removeProperty('display');
        dropzoneAtt.style.display = 'flex';
      }
    }

    if (dropzoneContainer) {
      if (hasReg && hasAtt) {
        dropzoneContainer.style.setProperty('display', 'none', 'important');
      } else if (hasReg || hasAtt) {
        dropzoneContainer.style.removeProperty('display');
        dropzoneContainer.style.display = 'grid';
        dropzoneContainer.style.gridTemplateColumns = '1fr';
      } else {
        dropzoneContainer.style.removeProperty('display');
        dropzoneContainer.style.display = 'grid';
        dropzoneContainer.style.gridTemplateColumns = '1fr 1fr';
      }
    }

    const regCacs = regList.filter(r => r.representation === 'CACS-FUNDEB').length;
    const regGestores = regList.filter(r => r.representation !== 'CACS-FUNDEB').length;

    const attCacs = attList.filter(a => a.representation === 'CACS-FUNDEB').length;
    const attGestores = attList.filter(a => a.representation !== 'CACS-FUNDEB').length;

    // Renderizar Banner de Status das Planilhas
    if (statusBanner) {
      statusBanner.innerHTML = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
          <div style="background:rgba(59, 130, 246, 0.08); border:1px solid rgba(59, 130, 246, 0.25); padding:0.85rem 1.1rem; border-radius:var(--radius-md);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
              <strong style="color:var(--accent-blue-text); font-size:0.88rem; display:flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg> Planilha 1: Inscrições
              </strong>
              <div style="display:flex; align-items:center; gap:0.35rem;">
                <span class="nav-badge badge-blue font-bold" style="font-size:0.8rem;">${regList.length} Inscritos</span>
                ${regList.length > 0 ? `<button type="button" class="btn btn-secondary btn-sm text-accent-rose" onclick="app.clearStep6Data('registration')" style="padding:0.15rem 0.45rem; font-size:0.75rem; font-weight:700; display:inline-flex; align-items:center; gap:0.25rem;" title="Remover planilha de inscrições">${window.icons.delete} Remover</button>` : ''}
              </div>
            </div>
            <div style="font-size:0.82rem; color:var(--text-secondary); display:flex; gap:0.75rem;">
              <span>CACS-FUNDEB: <strong>${regCacs}</strong></span>
              <span>Gestão Municipal: <strong>${regGestores}</strong></span>
            </div>
          </div>

          <div style="background:rgba(16, 185, 129, 0.08); border:1px solid rgba(16, 185, 129, 0.25); padding:0.85rem 1.1rem; border-radius:var(--radius-md);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
              <strong style="color:var(--accent-emerald-text); font-size:0.88rem; display:flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Planilha 2: Presença
              </strong>
              <div style="display:flex; align-items:center; gap:0.35rem;">
                <span class="nav-badge badge-emerald font-bold" style="font-size:0.8rem;">${attList.length} Presentes</span>
                ${attList.length > 0 ? `<button type="button" class="btn btn-secondary btn-sm text-accent-rose" onclick="app.clearStep6Data('attendance')" style="padding:0.15rem 0.45rem; font-size:0.75rem; font-weight:700; display:inline-flex; align-items:center; gap:0.25rem;" title="Remover planilha de presença">${window.icons.delete} Remover</button>` : ''}
              </div>
            </div>
            <div style="font-size:0.82rem; color:var(--text-secondary); display:flex; gap:0.75rem;">
              <span>CACS-FUNDEB: <strong>${attCacs}</strong></span>
              <span>Gestão Municipal: <strong>${attGestores}</strong></span>
            </div>
          </div>
        </div>
      `;
    }

    const sortCol = this.attendanceSortCol || 'name';
    const sortDir = this.attendanceSortDir || 'asc';

    const invitedMunOptions = this.getInvitedMunicipalityOptions();
    const consolidatedList = this.getConsolidatedParticipantsList();
    const sortedList = this.sortParticipantsList(consolidatedList, sortCol, sortDir);

    // Helper de renderização de linha de participante
    const renderParticipantRow = (p) => {
      const isUnmappedMun = !p.municipality;
      const isUnmappedVinculo = !p.representation;
      const isRowIncomplete = isUnmappedMun || isUnmappedVinculo;

      // Status simplificado com siglas AP, AI, IP mantendo as cores
      let statusBadge = `<span class="nav-badge badge-emerald" style="font-size:0.75rem; font-weight:800; padding:0.15rem 0.5rem; display:inline-flex; align-items:center; gap:0.25rem;" title="Inscrito e Presente"><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>IP</span>`;
      if (p.status === 'Apenas Inscrito') {
        statusBadge = `<span class="nav-badge badge-blue" style="font-size:0.75rem; font-weight:800; padding:0.15rem 0.5rem; display:inline-flex; align-items:center; gap:0.25rem;" title="Apenas Inscrito"><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"></circle></svg>AI</span>`;
      } else if (p.status === 'Apenas Presente') {
        statusBadge = `<span class="nav-badge" style="background:rgba(245, 158, 11, 0.2); color:var(--accent-amber-text); font-size:0.75rem; font-weight:800; padding:0.15rem 0.5rem; display:inline-flex; align-items:center; gap:0.25rem;" title="Apenas Presente"><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"></circle></svg>AP</span>`;
      }

      // Município: só pede para selecionar se não foi localizado na planilha
      const munTd = isUnmappedMun ? `
        <select class="participant-table-select unmapped" style="min-width:150px;" onchange="app.updateParticipantField('${p.id}', 'municipality', this.value)">
          <option value="">-- Selecionar Município --</option>
          ${invitedMunOptions.map(m => `<option value="${m}">${m}</option>`).join('')}
        </select>
      ` : `
        <div style="display:inline-flex; align-items:center; gap:0.35rem;">
          <span style="font-weight:600; color:var(--text-primary);">${p.municipality}</span>
          ${p.isManualMunicipality ? `<button type="button" class="btn btn-sm btn-ghost text-muted" onclick="app.clearManualParticipantField('${p.id}', 'municipality')" title="Alterar município selecionado manualmente" style="padding:0 0.2rem; font-size:0.7rem; line-height:1;">${window.icons.edit}</button>` : ''}
        </div>
      `;

      // Vínculo: só pede para selecionar se não foi localizado na planilha
      const repTd = isUnmappedVinculo ? `
        <select class="participant-table-select unmapped" style="min-width:160px;" onchange="app.updateParticipantField('${p.id}', 'representation', this.value)">
          <option value="">-- Selecionar Vínculo --</option>
          <option value="Gestão municipal">Gestão municipal</option>
          <option value="CACS-FUNDEB">CACS-FUNDEB</option>
        </select>
      ` : `
        <div style="display:inline-flex; align-items:center; gap:0.35rem;">
          <span class="nav-badge ${p.representation === 'CACS-FUNDEB' ? 'badge-emerald' : 'badge-blue'}" style="font-size:0.78rem; font-weight:600; white-space:nowrap;">
            ${p.representation}
          </span>
          ${p.isManualRepresentation ? `<button type="button" class="btn btn-sm btn-ghost text-muted" onclick="app.clearManualParticipantField('${p.id}', 'representation')" title="Alterar vínculo selecionado manualmente" style="padding:0 0.2rem; font-size:0.7rem; line-height:1;">${window.icons.edit}</button>` : ''}
        </div>
      `;

      const isApWithMunAndVinculo = (p.status === 'Apenas Presente' && !!p.municipality && !!p.representation);
      const showCpfCheck = (!!p.cpf && p.cpf !== '-') && (p.isCpfValidated || isApWithMunAndVinculo);

      return `
        <tr style="${isRowIncomplete ? 'background: rgba(245, 158, 11, 0.05);' : ''}">
          <td style="vertical-align:middle;"><strong>${p.name || 'Não informado'}</strong></td>
          <td style="font-family:monospace; vertical-align:middle; white-space:nowrap;">
            ${p.cpf || '-'}
            ${showCpfCheck ? '<span class="nav-badge badge-emerald" style="font-size:0.7rem; margin-left:0.35rem; padding:0.15rem 0.3rem; display:inline-flex; align-items:center;" title="CPF validado com município e vínculo confirmados"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>' : ''}
          </td>
          <td style="vertical-align:middle; text-align:center;">${statusBadge}</td>
          <td style="vertical-align:middle;">${munTd}</td>
          <td style="vertical-align:middle;">${repTd}</td>
        </tr>
      `;
    };

    // Renderizar Tabela Única Consolidada
    if (attContainer) {
      if (consolidatedList.length === 0) {
        attContainer.innerHTML = `<p style="color:var(--text-muted); padding:1rem 0;">Nenhuma planilha importada ainda. Arraste ou selecione as planilhas acima.</p>`;
      } else {
        attContainer.innerHTML = `
          <div style="margin-bottom:0.75rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
            <span style="font-size:0.85rem; color:var(--text-secondary);">
              Exibindo <strong>${consolidatedList.length}</strong> participantes (Inscritos: <strong>${regList.length}</strong> | Presentes: <strong>${attList.length}</strong>):
            </span>
            <div style="display:flex; align-items:center; gap:0.85rem; flex-wrap:wrap; font-size:0.8rem; background:rgba(148, 163, 184, 0.08); padding:0.35rem 0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
              <span style="font-weight:700; color:var(--text-primary);">Legenda:</span>
              <span style="display:inline-flex; align-items:center; gap:0.35rem; color:var(--text-secondary);">
                <span class="nav-badge" style="background:rgba(245, 158, 11, 0.2); color:var(--accent-amber-text); font-size:0.72rem; font-weight:800; padding:0.1rem 0.4rem;">AP</span>
                <span>Apenas presente inscrito</span>
              </span>
              <span style="display:inline-flex; align-items:center; gap:0.35rem; color:var(--text-secondary);">
                <span class="nav-badge badge-blue" style="font-size:0.72rem; font-weight:800; padding:0.1rem 0.4rem;">AI</span>
                <span>Apenas inscrito</span>
              </span>
              <span style="display:inline-flex; align-items:center; gap:0.35rem; color:var(--text-secondary);">
                <span class="nav-badge badge-emerald" style="font-size:0.72rem; font-weight:800; padding:0.1rem 0.4rem;">IP</span>
                <span>Inscrito e Presente</span>
              </span>
            </div>
          </div>
          <div class="table-responsive-wrapper" style="max-height:480px; overflow-y:auto;">
            <table class="report-data-table">
              <thead>
                <tr>
                  <th class="th-sortable" onclick="app.sortAttendanceTable('name')" style="cursor:pointer; user-select:none;" title="Clique para classificar por Nome">
                    <div style="display:inline-flex; align-items:center; gap:0.45rem;">
                      <span>Nome Completo</span>
                      <span class="sort-icon-badge">${this.getAttendanceSortIcon('name')}</span>
                    </div>
                  </th>
                  <th class="th-sortable" onclick="app.sortAttendanceTable('cpf')" style="cursor:pointer; user-select:none; width:150px;" title="Clique para classificar por CPF">
                    <div style="display:inline-flex; align-items:center; gap:0.45rem;">
                      <span>CPF</span>
                      <span class="sort-icon-badge">${this.getAttendanceSortIcon('cpf')}</span>
                    </div>
                  </th>
                  <th class="th-sortable" onclick="app.sortAttendanceTable('status')" style="cursor:pointer; user-select:none; width:95px; text-align:center;" title="Clique para classificar por Status">
                    <div style="display:inline-flex; align-items:center; justify-content:center; gap:0.45rem;">
                      <span>Status</span>
                      <span class="sort-icon-badge">${this.getAttendanceSortIcon('status')}</span>
                    </div>
                  </th>
                  <th class="th-sortable" onclick="app.sortAttendanceTable('municipality')" style="cursor:pointer; user-select:none;" title="Clique para classificar por Município">
                    <div style="display:inline-flex; align-items:center; gap:0.45rem;">
                      <span>Município</span>
                      <span class="sort-icon-badge">${this.getAttendanceSortIcon('municipality')}</span>
                    </div>
                  </th>
                  <th class="th-sortable" onclick="app.sortAttendanceTable('representation')" style="cursor:pointer; user-select:none; width:180px;" title="Clique para classificar por Vínculo">
                    <div style="display:inline-flex; align-items:center; gap:0.45rem;">
                      <span>Vínculo</span>
                      <span class="sort-icon-badge">${this.getAttendanceSortIcon('representation')}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                ${sortedList.map(p => renderParticipantRow(p)).join('')}
              </tbody>
            </table>
          </div>
        `;
      }
    }

    // Renderizar Tabela 4 (Participação por Município - Presentes / Convocados)
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
      this.showToast(`${parsed.length} avaliações processadas com sucesso!`, 'success');
    } catch (err) {
      console.error('Erro ao processar avaliações:', err);
      this.showToast(`Erro na avaliação: ${err.message}`, 'error');
    }
  }

  clearEvaluationData() {
    if (!this.currentTraining) return;

    this.openConfirmModal({
      title: 'Remover Planilha de Avaliação',
      msg: 'Tem certeza que deseja remover a Planilha de Avaliação e limpar todos os dados de gráficos, médias e nuvens de palavras?',
      btnText: 'Sim, Remover',
      successTitle: 'Avaliações Removidas!',
      successMsg: 'A planilha de avaliações e todos os gráficos e médias foram excluídos com sucesso.',
      onConfirm: () => this.executeClearEvaluationData()
    });
  }

  executeClearEvaluationData() {
    if (!this.currentTraining) return;

    this.currentTraining.evaluations = [];
    const inputEval = document.getElementById('file-input-evaluation');
    if (inputEval) inputEval.value = '';

    const dropzoneEval = document.getElementById('dropzone-evaluation');
    if (dropzoneEval) {
      dropzoneEval.style.removeProperty('display');
      dropzoneEval.style.display = 'flex';
    }

    this.renderEvaluationStep();
    this.renderEvaluationCharts();
    this.renderWordClouds();
    this.saveCurrentStepData();
    this.showToast('Planilha de avaliações limpa com sucesso!', 'success');
  }

  renderEvaluationStep() {
    if (!this.currentTraining || !window.statsEngine) return;
    const evals = this.currentTraining.evaluations || [];
    const hasEvals = evals.length > 0;
    const stats = window.statsEngine.calculateEvaluationStats(evals);

    // Ocultar janela de inserção se houver planilha importada
    const dropzoneEval = document.getElementById('dropzone-evaluation');
    if (dropzoneEval) {
      if (hasEvals) {
        dropzoneEval.style.setProperty('display', 'none', 'important');
      } else {
        dropzoneEval.style.removeProperty('display');
        dropzoneEval.style.display = 'flex';
      }
    }

    const countEl = document.getElementById('wiz-eval-total-count');
    if (countEl) countEl.textContent = `${evals.length} Avaliações Registradas`;

    const meanEl = document.getElementById('wiz-eval-overall-mean');
    if (meanEl) meanEl.textContent = `${stats.overallMean} / 5.0`;

    const statusBanner = document.getElementById('wizard-evaluation-status-banner');
    if (statusBanner) {
      if (!hasEvals) {
        statusBanner.innerHTML = '';
      } else {
        const cacsCount = evals.filter(e => e.representation === 'CACS-FUNDEB').length;
        const gestCount = evals.length - cacsCount;
        statusBanner.innerHTML = `
          <div style="background:rgba(59, 130, 246, 0.08); border:1px solid rgba(59, 130, 246, 0.25); padding:0.85rem 1.1rem; border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem;">
            <div>
              <strong style="color:var(--accent-blue-text); font-size:0.88rem; display:flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Planilha de Avaliação Importada
              </strong>
              <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.2rem;">
                Total: <strong>${evals.length}</strong> respostas (CACS-FUNDEB: <strong>${cacsCount}</strong> | Gestão Municipal: <strong>${gestCount}</strong>)
              </div>
            </div>
            <button type="button" class="btn btn-secondary btn-sm text-accent-rose" onclick="app.clearEvaluationData()" style="padding:0.25rem 0.6rem; font-size:0.78rem; font-weight:700; display:inline-flex; align-items:center; gap:0.35rem;" title="Remover planilha de avaliação">
              ${window.icons.delete} Remover Planilha
            </button>
          </div>
        `;
      }
    }
  }

  renderEvaluationCharts() {
    if (!window.chartEngine || !this.currentTraining) return;
    const isDark = this.theme === 'dark';
    const evals = this.currentTraining.evaluations || [];

    // Figura 3: Participação CACS vs Gestor (calculado estritamente a partir das avaliações importadas)
    let cacsPresent = 0;
    let gestPresent = 0;

    if (evals.length > 0) {
      cacsPresent = evals.filter(e => e.representation === 'CACS-FUNDEB').length;
      gestPresent = evals.length - cacsPresent;
    }

    window.chartEngine.renderFig3Participation('chart-fig3-canvas', cacsPresent, gestPresent, isDark);

    // Figura 4: Avaliação da capacitação de todos os participantes
    const statsGen = window.statsEngine.calculateEvaluationStats(evals);
    window.chartEngine.renderEvaluationStackedBarChart('chart-fig4-canvas', statsGen.criterionDistributionPercent, 'Figura 4. Avaliação da capacitação de todos os participantes.', isDark);

    // Figura 5: Avaliação dos conselheiros CACS
    const statsCACS = window.statsEngine.calculateEvaluationStats(evals.filter(e => e.representation === 'CACS-FUNDEB'));
    window.chartEngine.renderEvaluationStackedBarChart('chart-fig5-canvas', statsCACS.criterionDistributionPercent, 'Figura 5. Avaliação da capacitação dos conselheiros CACS.', isDark);

    // Figura 6: Avaliação dos gestores municipais
    const statsGest = window.statsEngine.calculateEvaluationStats(evals.filter(e => e.representation !== 'CACS-FUNDEB'));
    window.chartEngine.renderEvaluationStackedBarChart('chart-fig6-canvas', statsGest.criterionDistributionPercent, 'Figura 6. Avaliação da capacitação dos gestores municipais.', isDark);
  }

  renderWordClouds() {
    if (!window.wordCloudEngine || !this.currentTraining) return;
    const evals = this.currentTraining.evaluations || [];
    const isDark = this.theme === 'dark';

    if (evals.length === 0) {
      const canvas7 = document.getElementById('wordcloud-fig7-canvas');
      if (canvas7) {
        const ctx7 = canvas7.getContext('2d');
        if (ctx7) {
          ctx7.clearRect(0, 0, canvas7.width, canvas7.height);
          ctx7.save();
          ctx7.textAlign = 'center';
          ctx7.textBaseline = 'middle';
          ctx7.font = '600 13px "Plus Jakarta Sans", sans-serif';
          ctx7.fillStyle = isDark ? '#64748b' : '#94a3b8';
          ctx7.fillText('Nenhuma avaliação importada no momento', canvas7.width / 2, canvas7.height / 2);
          ctx7.restore();
        }
      }
      const canvas8 = document.getElementById('wordcloud-fig8-canvas');
      if (canvas8) {
        const ctx8 = canvas8.getContext('2d');
        if (ctx8) {
          ctx8.clearRect(0, 0, canvas8.width, canvas8.height);
          ctx8.save();
          ctx8.textAlign = 'center';
          ctx8.textBaseline = 'middle';
          ctx8.font = '600 13px "Plus Jakarta Sans", sans-serif';
          ctx8.fillStyle = isDark ? '#64748b' : '#94a3b8';
          ctx8.fillText('Nenhuma avaliação importada no momento', canvas8.width / 2, canvas8.height / 2);
          ctx8.restore();
        }
      }
      return;
    }

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
     ETAPA 8: REGISTROS FOTOGRÁFICOS & DRAG AND DROP
     ========================================================================== */
  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget && event.currentTarget.classList) {
      event.currentTarget.classList.add('dragover');
    }
  }

  handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget && event.currentTarget.classList) {
      event.currentTarget.classList.remove('dragover');
    }
  }

  async handlePhotoDrop(slotId, defaultCaption, event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget && event.currentTarget.classList) {
      event.currentTarget.classList.remove('dragover');
    }

    const files = event.dataTransfer?.files;
    if (!files || files.length === 0 || !this.currentTraining) return;

    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    if (slotId) {
      // Slot específico
      const file = imageFiles[0];
      const dataUrl = await this.fileToDataUrl(file);
      if (!this.currentTraining.media) this.currentTraining.media = [];

      this.currentTraining.media = this.currentTraining.media.filter(m => m.slotId !== slotId && m.id !== slotId);
      this.currentTraining.media.push({
        id: `photo_${Date.now()}_${slotId}`,
        slotId: slotId,
        type: 'photo',
        blob: dataUrl,
        caption: defaultCaption,
        fileName: file.name
      });
      this.renderPhotosStep();
      this.saveCurrentStepData();
      this.showToast(`Imagem enviada com sucesso!`, 'success');
    } else {
      // Drop em lote no grid
      const mockEvent = { target: { files: imageFiles } };
      await this.handlePhotoUpload(mockEvent);
    }
  }

  handlePhotoDragStart(slotId, event) {
    this.draggedPhotoSlotId = slotId;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', slotId);
  }

  handlePhotoDragOverCard(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    if (event.currentTarget && event.currentTarget.style) {
      event.currentTarget.style.transition = 'transform 0.15s ease, border-color 0.15s ease';
      event.currentTarget.style.transform = 'scale(1.02)';
      event.currentTarget.style.borderColor = 'var(--accent-blue-text, #3b82f6)';
    }
  }

  handlePhotoDragLeaveCard(event) {
    if (event.currentTarget && event.currentTarget.style) {
      event.currentTarget.style.transform = '';
      event.currentTarget.style.borderColor = '';
    }
  }

  handlePhotoDropCard(targetSlotId, event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget && event.currentTarget.style) {
      event.currentTarget.style.transform = '';
      event.currentTarget.style.borderColor = '';
    }

    const sourceSlotId = this.draggedPhotoSlotId || event.dataTransfer.getData('text/plain');
    if (!sourceSlotId || sourceSlotId === targetSlotId) return;

    if (!this.currentTraining || !this.currentTraining.media) return;

    const sourcePhoto = this.currentTraining.media.find(m => m.slotId === sourceSlotId || m.id === sourceSlotId);
    const targetPhoto = this.currentTraining.media.find(m => m.slotId === targetSlotId || m.id === targetSlotId);

    if (sourcePhoto) {
      sourcePhoto.slotId = targetSlotId;
    }
    if (targetPhoto) {
      targetPhoto.slotId = sourceSlotId;
    }

    this.draggedPhotoSlotId = null;
    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast('Posição das figuras reordenada!', 'success');
  }

  getTrainingDaysCount() {
    if (!this.currentTraining) return 2;
    if (this.currentTraining.durationDays && parseInt(this.currentTraining.durationDays) > 0) {
      return parseInt(this.currentTraining.durationDays);
    }
    const start = this.currentTraining.startDate ? new Date(this.currentTraining.startDate) : null;
    const end = this.currentTraining.endDate ? new Date(this.currentTraining.endDate) : null;
    if (start && end && !isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const diffMs = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(1, Math.min(10, diffDays));
    }
    return 2;
  }

  getStandardPhotoSlots() {
    const daysCount = this.getTrainingDaysCount();

    const slots = [
      { slotId: 'fig_9', defaultTitle: 'Acomodação dos participantes.', defaultCaption: 'Figura 9. Acomodação dos participantes.' },
      { slotId: 'fig_10', defaultTitle: 'Apresentação inicial do curso.', defaultCaption: 'Figura 10. Apresentação inicial do curso.' },
      { slotId: 'fig_11', defaultTitle: 'Apresentação dos módulos teóricos.', defaultCaption: 'Figura 11. Apresentação dos módulos teóricos.' }
    ];

    for (let day = 1; day <= daysCount; day++) {
      const figNum = 11 + day;
      slots.push({
        slotId: `fig_${figNum}_day_${day}`,
        defaultTitle: `Final da capacitação do ${day}º dia.`,
        defaultCaption: `Figura ${figNum}. Final da capacitação do ${day}º dia.`
      });
    }

    return slots;
  }

  async handleSinglePhotoUpload(slotId, defaultCaption, event) {
    const file = event.target.files?.[0];
    if (!file || !this.currentTraining) return;

    if (!this.currentTraining.media) this.currentTraining.media = [];

    const dataUrl = await this.fileToDataUrl(file);

    // Remover se já existia foto neste slot
    this.currentTraining.media = this.currentTraining.media.filter(m => m.slotId !== slotId && m.id !== slotId);

    this.currentTraining.media.push({
      id: `photo_${Date.now()}_${slotId}`,
      slotId: slotId,
      type: 'photo',
      blob: dataUrl,
      caption: defaultCaption,
      fileName: file.name
    });

    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast(`Imagem enviada com sucesso!`, 'success');
  }

  async handlePhotoUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0 || !this.currentTraining) return;

    if (!this.currentTraining.media) this.currentTraining.media = [];

    const slots = this.getStandardPhotoSlots();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const dataUrl = await this.fileToDataUrl(file);

      // Encontrar slot sem foto
      const emptySlot = slots.find(s => !this.currentTraining.media.some(m => m.slotId === s.slotId));
      const targetSlotId = emptySlot ? emptySlot.slotId : `fig_extra_${Date.now()}_${i}`;
      const targetCaption = emptySlot ? emptySlot.defaultCaption : `Figura Extra ${i + 1}. Registro da capacitação.`;

      this.currentTraining.media.push({
        id: `photo_${Date.now()}_${i}`,
        slotId: targetSlotId,
        type: 'photo',
        blob: dataUrl,
        caption: targetCaption,
        fileName: file.name
      });
    }

    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast(`${files.length} fotos adicionadas à galeria!`, 'success');
  }

  confirmRemovePhoto(slotId) {
    const photo = (this.currentTraining.media || []).find(m => m.slotId === slotId || m.id === slotId);
    const slots = this.getStandardPhotoSlots();
    const slot = slots.find(s => s.slotId === slotId);
    const captionText = photo?.caption || slot?.defaultCaption || 'Fotografia';

    this.openConfirmModal({
      title: 'Remover Fotografia',
      msg: `Tem certeza que deseja remover a imagem de "${captionText}"?`,
      btnText: 'Sim, Remover Foto',
      successTitle: 'Fotografia Removida!',
      successMsg: 'A imagem foi removida da galeria com sucesso.',
      onConfirm: () => this.executeRemovePhoto(slotId)
    });
  }

  executeRemovePhoto(slotId) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.media) this.currentTraining.media = [];

    this.currentTraining.media = this.currentTraining.media.filter(m => m.slotId !== slotId && m.id !== slotId);
    this.renderPhotosStep();
    this.saveCurrentStepData();
    this.showToast('Fotografia removida com sucesso!', 'success');
  }

  updatePhotoCaption(slotId, newCaption) {
    if (!this.currentTraining) return;
    const photo = (this.currentTraining.media || []).find(m => m.slotId === slotId || m.id === slotId);
    if (photo) {
      photo.caption = newCaption;
      this.saveCurrentStepData();
    }
  }

  renderPhotosStep() {
    const container = document.getElementById('wizard-photos-grid');
    if (!container || !this.currentTraining) return;

    const slots = this.getStandardPhotoSlots();
    const photos = (this.currentTraining.media || []).filter(m => m.type === 'photo');

    let html = '';

    slots.forEach(slot => {
      let photo = photos.find(p => p.slotId === slot.slotId);

      // Fallback 1: se slotId tiver sufixo de dia
      if (!photo && slot.slotId.includes('_day_')) {
        const dayPart = slot.slotId.split('_day_')[1];
        photo = photos.find(p => p.slotId && p.slotId.endsWith(`_day_${dayPart}`));
      }

      // Fallback 2: se photo não tem slotId correspondente, tenta recuperar por caption
      if (!photo) {
        photo = photos.find(p => {
          if (!p.caption) return false;
          const cap = p.caption.toLowerCase();
          if (slot.slotId === 'fig_9' && (cap.includes('figura 9') || cap.includes('acomodação') || cap.includes('acomodacao'))) return true;
          if (slot.slotId === 'fig_10' && (cap.includes('figura 10') || cap.includes('apresentação inicial') || cap.includes('apresentacao inicial'))) return true;
          if (slot.slotId === 'fig_11' && (cap.includes('figura 11') || cap.includes('módulos teóricos') || cap.includes('modulos teoricos'))) return true;
          if (slot.slotId.includes('_day_1') && (cap.includes('1º dia') || cap.includes('1° dia') || cap.includes('1 dia') || cap.includes('figura 12'))) return true;
          if (slot.slotId.includes('_day_2') && (cap.includes('2º dia') || cap.includes('2° dia') || cap.includes('2 dia') || cap.includes('figura 13'))) return true;
          if (slot.slotId.includes('_day_3') && (cap.includes('3º dia') || cap.includes('3° dia') || cap.includes('3 dia') || cap.includes('figura 14'))) return true;
          return false;
        });
      }

      if (photo) {
        photo.slotId = slot.slotId;
        if (!photo.caption) photo.caption = slot.defaultCaption;
      }

      if (photo) {
        // Card com foto anexada (Draggable para reordenar)
        html += `
          <div class="glass-card" 
               draggable="true"
               ondragstart="app.handlePhotoDragStart('${slot.slotId}', event)"
               ondragover="app.handlePhotoDragOverCard(event)"
               ondragleave="app.handlePhotoDragLeaveCard(event)"
               ondrop="app.handlePhotoDropCard('${slot.slotId}', event)"
               style="padding:1.25rem; display:flex; flex-direction:column; gap:0.75rem; border:1px solid rgba(16, 185, 129, 0.35); cursor:grab;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong style="color:var(--accent-emerald-text, #10b981); font-size:0.88rem; display:flex; align-items:center; gap:0.35rem;">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span>${slot.defaultCaption}</span>
              </strong>
              <span class="nav-badge badge-emerald" style="font-size:0.72rem;">Anexada</span>
            </div>

            <div style="position:relative; width:100%; height:180px; border-radius:var(--radius-sm); overflow:hidden; background:var(--bg-input); border:1px solid var(--border-color);">
              <img src="${photo.blob}" alt="${photo.caption || ''}" style="width:100%; height:100%; object-fit:cover;">
            </div>

            <div style="display:flex; flex-direction:column; gap:0.35rem;">
              <label style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">Legenda da Figura:</label>
              <input type="text" class="form-control" value="${photo.caption || slot.defaultCaption}" 
                     style="font-size:0.82rem; padding:0.4rem 0.6rem;"
                     onchange="app.updatePhotoCaption('${slot.slotId}', this.value)">
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.25rem;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('file-slot-${slot.slotId}').click()" style="padding:0.3rem 0.6rem; font-size:0.78rem;">
                Trocar Foto
              </button>
              <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.confirmRemovePhoto('${slot.slotId}')" style="padding:0.3rem 0.6rem; font-size:0.78rem;">
                ${window.icons.delete} Remover Foto
              </button>
            </div>
            <input type="file" id="file-slot-${slot.slotId}" accept="image/*" style="display:none;" onchange="app.handleSinglePhotoUpload('${slot.slotId}', '${slot.defaultCaption}', event)">
          </div>
        `;
      } else {
        // Card vazio (Dropzone padronizada amarela)
        html += `
          <div class="glass-card" 
               ondragover="app.handleDragOver(event)"
               ondragleave="app.handleDragLeave(event)"
               ondrop="app.handlePhotoDrop('${slot.slotId}', '${slot.defaultCaption}', event)"
               style="padding:1.25rem; display:flex; flex-direction:column; gap:0.75rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong style="color:var(--text-primary); font-size:0.88rem;">${slot.defaultCaption}</strong>
              <span class="nav-badge" style="background:rgba(245, 158, 11, 0.15); color:#f59e0b; font-size:0.72rem;">Pendente</span>
            </div>

            <div class="upload-dropzone" 
                 onclick="const inp = document.getElementById('file-slot-${slot.slotId}'); if(inp) inp.click();" 
                 style="padding:1.75rem 1rem; border-radius:var(--radius-sm); border:2px dashed #f59e0b; cursor:pointer; background:rgba(245, 158, 11, 0.03); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; min-height:140px;">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-primary); margin-bottom:0.6rem;">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <div style="font-size:0.85rem; font-weight:600; color:var(--text-primary); margin-bottom:0.25rem;">
                Clique ou arraste a foto da ${slot.defaultTitle}
              </div>
              <div class="upload-dropzone-hint" style="font-size:0.74rem;">Formatos aceitos: JPG, PNG, WEBP</div>
              <input type="file" id="file-slot-${slot.slotId}" accept="image/*" style="display:none;" onclick="event.stopPropagation()" onchange="app.handleSinglePhotoUpload('${slot.slotId}', '${slot.defaultCaption}', event)">
            </div>
          </div>
        `;
      }
    });

    // Exibir fotos extras não pertencentes aos slots padronizados
    const extraPhotos = photos.filter(p => !slots.some(s => s.slotId === p.slotId));
    extraPhotos.forEach((photo, idx) => {
      html += `
        <div class="glass-card" 
             draggable="true"
             ondragstart="app.handlePhotoDragStart('${photo.id}', event)"
             ondragover="app.handlePhotoDragOverCard(event)"
             ondragleave="app.handlePhotoDragLeaveCard(event)"
             ondrop="app.handlePhotoDropCard('${photo.id}', event)"
             style="padding:1.25rem; display:flex; flex-direction:column; gap:0.75rem; border:1px solid rgba(59, 130, 246, 0.3); cursor:grab;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:var(--accent-blue-text); font-size:0.88rem;">Foto Extra #${idx + 1}</strong>
            <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.confirmRemovePhoto('${photo.id}')" style="padding:0.2rem 0.55rem; font-size:0.75rem; font-weight:600; display:inline-flex; align-items:center;">
              ${window.icons.delete} Remover
            </button>
          </div>

          <div style="background:var(--bg-input); border-radius:var(--radius-md); overflow:hidden; max-height:220px; display:flex; align-items:center; justify-content:center;">
            <img src="${photo.blob}" style="width:100%; max-height:220px; object-fit:cover;" alt="${photo.caption}">
          </div>

          <div class="form-group" style="margin:0;">
            <label class="form-label" style="font-size:0.78rem;">Legenda da Figura Extra:</label>
            <input type="text" class="form-control form-control-sm" value="${photo.caption || ''}" onchange="app.updatePhotoCaption('${photo.id}', this.value)">
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  removeMedia(mediaId) {
    this.executeRemovePhoto(mediaId);
  }

  /* ==========================================================================
     ETAPA 9: APÊNDICES I & II & DRAG AND DROP
     ========================================================================== */
  async handleAppendixDrop(type, event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget && event.currentTarget.classList) {
      event.currentTarget.classList.remove('dragover');
    }

    const files = event.dataTransfer?.files;
    if (!files || files.length === 0 || !this.currentTraining) return;

    const mockEvent = { target: { files: files } };
    await this.handleAppendixUpload(type, mockEvent);
  }

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
        fileSize: file.size,
        fileType: file.type,
        order: this.currentTraining.media.length
      });
    }

    this.renderAppendicesStep();
    this.saveCurrentStepData();
    this.showToast(`Documento anexado com sucesso!`, 'success');
  }

  formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  renderAppendixItem(d) {
    return `
      <div class="appendix-file-item" style="display:flex; flex-direction:column; gap:0.6rem; background:var(--bg-surface); border:1px solid var(--border-color); padding:0.75rem 0.9rem; border-radius:var(--radius-sm); margin-top:0.4rem;">
        <div style="display:inline-flex; align-items:center; gap:0.5rem; min-width:0; width:100%;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-secondary); flex-shrink:0;">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span style="font-weight:600; font-size:0.86rem; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${d.fileName}">
            ${d.fileName}
          </span>
        </div>
        <div style="display:flex; justify-content:flex-end; width:100%; border-top:1px solid var(--border-color); padding-top:0.45rem;">
          <button type="button" class="btn btn-secondary btn-sm btn-action-delete" onclick="app.confirmRemoveAppendix('${d.id}')" style="padding:0.25rem 0.65rem; font-size:0.75rem; font-weight:600; display:inline-flex; align-items:center; gap:0.3rem;" title="Remover documento">
            ${window.icons.delete} Remover
          </button>
        </div>
      </div>
    `;
  }

  confirmRemoveAppendix(docId) {
    const doc = (this.currentTraining.media || []).find(m => m.id === docId);
    const fileName = doc?.fileName || 'documento';

    this.openConfirmModal({
      title: 'Remover Documento de Apêndice',
      msg: `Tem certeza que deseja remover o documento "${fileName}"?`,
      btnText: 'Sim, Remover',
      successTitle: 'Documento Removido!',
      successMsg: `O documento "${fileName}" foi removido com sucesso.`,
      onConfirm: () => this.executeRemoveAppendix(docId)
    });
  }

  executeRemoveAppendix(docId) {
    if (!this.currentTraining) return;
    if (!this.currentTraining.media) this.currentTraining.media = [];

    this.currentTraining.media = this.currentTraining.media.filter(m => m.id !== docId);
    this.renderAppendicesStep();
    this.saveCurrentStepData();
    this.showToast('Documento removido com sucesso!', 'success');
  }

  renderAppendicesStep() {
    const fndeContainer = document.getElementById('wizard-appendix-fnde-list');
    const cecateContainer = document.getElementById('wizard-appendix-cecate-list');
    if (!this.currentTraining) return;

    const fndeDocs = (this.currentTraining.media || []).filter(m => m.type === 'doc_fnde');
    const cecateDocs = (this.currentTraining.media || []).filter(m => m.type === 'doc_cecate');

    // Ocultar janelas de inserção quando já houver documentos anexados
    const dropzoneFnde = document.getElementById('dropzone-appendix-fnde');
    if (dropzoneFnde) {
      if (fndeDocs.length > 0) {
        dropzoneFnde.style.setProperty('display', 'none', 'important');
      } else {
        dropzoneFnde.style.removeProperty('display');
        dropzoneFnde.style.display = 'flex';
      }
    }

    const dropzoneCecate = document.getElementById('dropzone-appendix-cecate');
    if (dropzoneCecate) {
      if (cecateDocs.length > 0) {
        dropzoneCecate.style.setProperty('display', 'none', 'important');
      } else {
        dropzoneCecate.style.removeProperty('display');
        dropzoneCecate.style.display = 'flex';
      }
    }

    if (fndeContainer) {
      fndeContainer.innerHTML = fndeDocs.length === 0
        ? `<p style="color:var(--text-muted); font-size:0.85rem;">Nenhuma convocação do FNDE anexada.</p>`
        : fndeDocs.map(d => this.renderAppendixItem(d)).join('');
    }

    if (cecateContainer) {
      cecateContainer.innerHTML = cecateDocs.length === 0
        ? `<p style="color:var(--text-muted); font-size:0.85rem;">Nenhuma convocação do CECATE anexada.</p>`
        : cecateDocs.map(d => this.renderAppendixItem(d)).join('');
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
          <div class="metric-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div class="metric-info">
            <h4>Taxa de Participação</h4>
            <div class="metric-value" style="color:var(--accent-secondary);">${metrics.participationRateGeneral}%</div>
            <div class="metric-trend">${metrics.totalPresent} presentes / ${metrics.totalInscribed} inscritos</div>
          </div>
        </div>

        <div class="metric-card cyan">
          <div class="metric-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="6" x2="9" y2="6.01"></line><line x1="15" y1="6" x2="15" y2="6.01"></line><line x1="9" y1="10" x2="9" y2="10.01"></line><line x1="15" y1="10" x2="15" y2="10.01"></line><line x1="9" y1="14" x2="9" y2="14.01"></line><line x1="15" y1="14" x2="15" y2="14.01"></line><line x1="9" y1="18" x2="15" y2="18"></line></svg>
          </div>
          <div class="metric-info">
            <h4>Municípios Atendidos</h4>
            <div class="metric-value">${metrics.totalPresentMunicipalities}</div>
            <div class="metric-trend">de ${metrics.totalSummonedMunicipalities} convocados</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <div class="metric-info">
            <h4>Média Geral de Avaliação</h4>
            <div class="metric-value" style="color:var(--accent-success);">${metrics.evalStatsGeneral.overallMean} / 5.0</div>
            <div class="metric-trend">${metrics.evalStatsGeneral.totalResponses} respostas computadas</div>
          </div>
        </div>
      </div>

      <div class="wizard-card">
        <h4 class="wizard-card-title" style="display:flex; align-items:center; gap:0.4rem;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-secondary);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span>Checklist de Auditoria & Validação Cruzada</span>
        </h4>
        <div style="margin-top:1rem;">
          <div class="audit-item valid">
            <div><strong>Identificação e Metadados:</strong> Polo, UF e datas devidamente informados.</div>
            <span class="nav-badge" style="background:rgba(16, 185, 129, 0.15); color:#10b981; display:inline-flex; align-items:center; gap:0.25rem;">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Validado</span>
            </span>
          </div>

          <div class="audit-item ${metrics.totalPresent > 0 ? 'valid' : 'critical'}">
            <div><strong>Lista de Presença:</strong> ${metrics.totalPresent} participantes identificados e categorizados.</div>
            <span class="nav-badge" style="${metrics.totalPresent > 0 ? 'background:rgba(16, 185, 129, 0.15); color:#10b981;' : 'background:rgba(239, 68, 68, 0.15); color:#ef4444;'} display:inline-flex; align-items:center; gap:0.25rem;">
              ${metrics.totalPresent > 0 ? '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Validado</span>' : '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg><span>Pendência Crítica</span>'}
            </span>
          </div>

          <div class="audit-item ${metrics.evalStatsGeneral.totalResponses > 0 ? 'valid' : 'warning'}">
            <div><strong>Pesquisa Avaliativa:</strong> ${metrics.evalStatsGeneral.totalResponses} respostas com médias calculadas.</div>
            <span class="nav-badge" style="${metrics.evalStatsGeneral.totalResponses > 0 ? 'background:rgba(16, 185, 129, 0.15); color:#10b981;' : 'background:rgba(245, 158, 11, 0.15); color:#f59e0b;'} display:inline-flex; align-items:center; gap:0.25rem;">
              ${metrics.evalStatsGeneral.totalResponses > 0 ? '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Validado</span>' : '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg><span>Pendência</span>'}
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

    // 1. Figuras fotográficas em ordem oficial
    const photos = (t.media || []).filter(m => m.type === 'photo');
    const slots = this.getStandardPhotoSlots();

    let photosHtml = '';
    slots.forEach(slot => {
      let p = photos.find(ph => ph.slotId === slot.slotId);
      if (!p && slot.slotId.includes('_day_')) {
        const dayPart = slot.slotId.split('_day_')[1];
        p = photos.find(ph => ph.slotId && ph.slotId.endsWith(`_day_${dayPart}`));
      }
      if (!p) {
        p = photos.find(ph => ph.caption && ph.caption.toLowerCase().includes(slot.defaultTitle.toLowerCase().slice(0, 15)));
      }

      if (p && p.blob) {
        photosHtml += `
          <div style="margin: 2rem 0; text-align: center; page-break-inside: avoid;">
            <img src="${p.blob}" alt="${p.caption || slot.defaultCaption}" style="max-width: 100%; max-height: 420px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); object-fit: contain; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <p style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-top: 0.6rem; text-align: center;">
              <em>${p.caption || slot.defaultCaption}</em>
            </p>
          </div>
        `;
      }
    });

    const extraPhotos = photos.filter(ph => !slots.some(s => s.slotId === ph.slotId));
    extraPhotos.forEach((ph, idx) => {
      if (ph.blob) {
        photosHtml += `
          <div style="margin: 2rem 0; text-align: center; page-break-inside: avoid;">
            <img src="${ph.blob}" alt="${ph.caption || 'Foto Extra'}" style="max-width: 100%; max-height: 420px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); object-fit: contain; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <p style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-top: 0.6rem; text-align: center;">
              <em>${ph.caption || `Figura Extra ${idx + 1}. Registro fotográfico complementar.`}</em>
            </p>
          </div>
        `;
      }
    });

    if (!photosHtml) {
      photosHtml = `<p style="color:var(--text-muted); font-style:italic;">Nenhum registro fotográfico anexado no momento.</p>`;
    }

    // 2. Apêndices (FNDE e CECATE)
    const fndeDocs = (t.media || []).filter(m => m.type === 'doc_fnde');
    const cecateDocs = (t.media || []).filter(m => m.type === 'doc_cecate');

    const fndeHtml = fndeDocs.length === 0
      ? `<p style="color:var(--text-muted); font-style:italic;">Nenhum documento de convocação do FNDE anexado.</p>`
      : fndeDocs.map(d => `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:0.6rem 0.9rem; background:var(--bg-input); border:1px solid var(--border-color); border-radius:var(--radius-sm); margin-bottom:0.4rem;">
          <div style="display:inline-flex; align-items:center; gap:0.5rem; min-width:0;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-secondary); flex-shrink:0;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            <span style="font-weight:600; font-size:0.86rem; color:var(--text-primary);">${d.fileName}</span>
          </div>
          ${d.blob ? `<a href="${d.blob}" download="${d.fileName}" class="btn btn-secondary btn-sm" style="padding:0.2rem 0.55rem; font-size:0.75rem; text-decoration:none; display:inline-flex; align-items:center; gap:0.3rem;">Visualizar / Baixar</a>` : ''}
        </div>
      `).join('');

    const cecateHtml = cecateDocs.length === 0
      ? `<p style="color:var(--text-muted); font-style:italic;">Nenhuma convocação ou comunicado do CECATE anexado.</p>`
      : cecateDocs.map(d => `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:0.6rem 0.9rem; background:var(--bg-input); border:1px solid var(--border-color); border-radius:var(--radius-sm); margin-bottom:0.4rem;">
          <div style="display:inline-flex; align-items:center; gap:0.5rem; min-width:0;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-secondary); flex-shrink:0;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            <span style="font-weight:600; font-size:0.86rem; color:var(--text-primary);">${d.fileName}</span>
          </div>
          ${d.blob ? `<a href="${d.blob}" download="${d.fileName}" class="btn btn-secondary btn-sm" style="padding:0.2rem 0.55rem; font-size:0.75rem; text-decoration:none; display:inline-flex; align-items:center; gap:0.3rem;">Visualizar / Baixar</a>` : ''}
        </div>
      `).join('');

    container.innerHTML = `
      <div class="report-doc-page">
        <!-- CABEÇALHO OFICIAL -->
        <div style="text-align:center; border-bottom: 2px solid #1e3a8a; padding-bottom: 1.25rem; margin-bottom: 2rem;">
          <h2 style="font-size:16pt; margin:0; font-weight:800; color:#1e293b;">UNIVERSIDADE FEDERAL DE GOIÁS - UFG</h2>
          <h3 style="font-size:13pt; margin:4px 0; color:#0284c7; font-weight:700;">CENTRO COLABORADOR DE APOIO AO TRANSPORTE ESCOLAR - CECATE CENTRO-OESTE</h3>
          <p style="font-size:10pt; color:#475569; margin:0; font-weight:600;">FUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO - FNDE</p>
        </div>

        <!-- TÍTULO DO RELATÓRIO -->
        <div style="text-align:center; margin: 2.5rem 0;">
          <h1 style="font-size:22pt; margin-bottom:0.5rem; font-weight:800; color:#0f172a;">RELATÓRIO DE ATIVIDADES Nº ${t.number || ''}</h1>
          <h2 style="font-size:16pt; color:#2563eb; margin:0; font-weight:700;">${t.title || 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR'}</h2>
          <h3 style="font-size:13pt; color:#334155; margin-top:0.5rem; font-weight:600;">${t.polo || 'Polo Regional'} - ${t.uf || 'GO'}, ${t.datesFormatted || '2026'}</h3>
        </div>

        <!-- 1. INTRODUÇÃO -->
        <h3 style="color:#1e3a8a; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2rem;">1. INTRODUÇÃO</h3>
        <p style="text-align:justify; line-height:1.6;">O presente Relatório de Atividades consubstancia os resultados alcançados durante a realização da Capacitação em Transporte Escolar nº ${t.number || ''}, executada no município polo de ${t.polo || 'Município Polo'}, Estado de ${t.uf || 'GO'}, nas datas de ${t.datesFormatted || 'datas do curso'}. A iniciativa integra as ações estratégicas pactuadas no projeto "${t.relatedProject || 'Fortalecendo e Aprimorando as Políticas Públicas de Transporte Escolar do Brasil'}", desenvolvido pela Universidade Federal de Goiás (UFG) por meio do CECATE Centro-Oeste, com financiamento do Fundo Nacional de Desenvolvimento da Educação (FNDE).</p>

        <!-- 2. DADOS BÁSICOS DO CURSO & TABELAS 1 E 2 -->
        <h3 style="color:#1e3a8a; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2rem;">2. DADOS BÁSICOS DO CURSO</h3>
        <p style="text-align:justify; line-height:1.6;">Foram convocados ${metrics.totalSummonedMunicipalities} municípios para participarem das atividades formativas no polo de ${t.polo}. A distância média percorrida pelas delegações foi de ${metrics.avgDistance} km. A relação completa dos entes federativos convocados é detalhada na Tabela 1 a seguir:</p>
        
        <p style="font-weight:600; margin-top:1.25rem;"><em>Tabela 1. Municípios convocados.</em></p>
        ${window.statsEngine.generateTable1Html(t.municipalities || [])}

        <p style="text-align:justify; line-height:1.6; margin-top:1.5rem;">A matriz curricular e a distribuição de carga horária programada para os módulos teóricos e práticos são apresentadas na Tabela 2:</p>
        <p style="font-weight:600; margin-top:1.25rem;"><em>Tabela 2. Estrutura do curso de capacitação em transporte escolar.</em></p>
        ${window.statsEngine.generateTable2Html(t.courseModules || [])}

        <!-- 3. ARTICULAÇÃO INSTITUCIONAL & TABELA 3 -->
        <h3 style="color:#1e3a8a; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2rem;">3. ARTICULAÇÃO INSTITUCIONAL</h3>
        <p style="text-align:justify; line-height:1.6;">Para assegurar a ampla participação dos municípios convocados, a equipe do CECATE-CO realizou ações contínuas de articulação e contato direto com as secretarias municipais de educação e conselhos sociais, conforme discriminado na Tabela 3:</p>

        <p style="font-weight:600; margin-top:1.25rem;"><em>Tabela 3. Articulação institucional para mobilização dos municípios.</em></p>
        ${window.statsEngine.generateTable3Html(t.municipalities || [])}

        <!-- 4. DESENVOLVIMENTO DO CURSO E PARTICIPAÇÃO & TABELA 4 & FIGURA 3 -->
        <h3 style="color:#1e3a8a; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2rem;">4. DESENVOLVIMENTO DO CURSO E PARTICIPAÇÃO</h3>
        <p style="text-align:justify; line-height:1.6;">O evento registrou ${metrics.totalInscribed} inscritos e ${metrics.totalPresent} presentes efetivos, com taxa global de comparecimento de ${metrics.participationRateGeneral}%. A discriminação detalhada da presença entre Gestores Municipais e Conselheiros CACS-FUNDEB por município é apresentada na Tabela 4:</p>

        <p style="font-weight:600; margin-top:1.25rem;"><em>Tabela 4. Participação por município (Presentes / Inscritos).</em></p>
        ${window.statsEngine.generateTable4Html(t.municipalities || [])}

        <!-- FIGURA 3 -->
        <div style="margin:2rem 0; text-align:center; page-break-inside:avoid;">
          <p style="font-weight:600; margin-bottom:0.75rem;"><em>Figura 3. Participação de Gestores e Conselheiros CACS.</em></p>
          <div style="max-width:520px; height:280px; position:relative; margin:auto;">
            <canvas id="report-preview-fig3-canvas"></canvas>
          </div>
        </div>

        <!-- 5. AVALIAÇÃO DA CAPACITAÇÃO & FIGURAS 4, 5, 6, 7 E 8 -->
        <h3 style="color:#1e3a8a; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2rem;">5. AVALIAÇÃO DA CAPACITAÇÃO</h3>
        <p style="text-align:justify; line-height:1.6;">Registrou-se ${metrics.evalStatsGeneral.totalResponses} questionários de avaliação preenchidos, com média geral de satisfação de ${metrics.evalStatsGeneral.overallMean} / 5.0. A distribuição percentual de notas atribuídas pelos participantes nos sete critérios pedagógicos e estruturais avaliados é sintetizada a seguir:</p>

        <!-- FIGURA 4 -->
        <div style="margin:2rem 0; text-align:center; page-break-inside:avoid;">
          <p style="font-weight:600; margin-bottom:0.75rem;"><em>Figura 4. Avaliação da capacitação de todos os participantes.</em></p>
          <div style="max-width:720px; height:340px; position:relative; margin:auto;">
            <canvas id="report-preview-fig4-canvas"></canvas>
          </div>
        </div>

        <!-- FIGURA 5 -->
        <div style="margin:2rem 0; text-align:center; page-break-inside:avoid;">
          <p style="font-weight:600; margin-bottom:0.75rem;"><em>Figura 5. Avaliação da capacitação dos conselheiros CACS.</em></p>
          <div style="max-width:720px; height:340px; position:relative; margin:auto;">
            <canvas id="report-preview-fig5-canvas"></canvas>
          </div>
        </div>

        <!-- FIGURA 6 -->
        <div style="margin:2rem 0; text-align:center; page-break-inside:avoid;">
          <p style="font-weight:600; margin-bottom:0.75rem;"><em>Figura 6. Avaliação da capacitação dos gestores municipais.</em></p>
          <div style="max-width:720px; height:340px; position:relative; margin:auto;">
            <canvas id="report-preview-fig6-canvas"></canvas>
          </div>
        </div>

        <!-- FIGURAS 7 E 8 (NUVENS DE PALAVRAS) -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin:2rem 0; page-break-inside:avoid;">
          <div style="text-align:center;">
            <p style="font-weight:600; font-size:0.85rem; margin-bottom:0.5rem;"><em>Figura 7. Aspectos positivos destacados.</em></p>
            <div style="background:var(--bg-input); padding:0.75rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <canvas id="report-preview-fig7-canvas" width="550" height="320" style="max-width:100%; height:auto;"></canvas>
            </div>
          </div>
          <div style="text-align:center;">
            <p style="font-weight:600; font-size:0.85rem; margin-bottom:0.5rem;"><em>Figura 8. Aspectos a serem aprimorados.</em></p>
            <div style="background:var(--bg-input); padding:0.75rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <canvas id="report-preview-fig8-canvas" width="550" height="320" style="max-width:100%; height:auto;"></canvas>
            </div>
          </div>
        </div>

        <!-- 6. REGISTROS FOTOGRÁFICOS -->
        <h3 style="color:#1e3a8a; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2.5rem;">6. REGISTROS FOTOGRÁFICOS</h3>
        <p style="text-align:justify; line-height:1.6;">A seguir são apresentados os registros fotográficos oficiais realizados durante os momentos de acolhimento, exposição temática e encerramento da capacitação:</p>
        ${photosHtml}

        <!-- 7. CONSIDERAÇÕES FINAIS -->
        <h3 style="color:#1e3a8a; border-bottom:1px solid #cbd5e1; padding-bottom:0.35rem; margin-top:2.5rem;">7. CONSIDERAÇÕES FINAIS</h3>
        <p style="text-align:justify; line-height:1.6;">A realização da Capacitação nº ${t.number} no polo de ${t.polo} cumpriu integralmente as metas e diretrizes estabelecidas pelo CECATE-CO e pelo FNDE. O estreitamento do diálogo técnico entre a gestão municipal e o controle social do CACS-FUNDEB fortalece as diretrizes de governança, segurança e eficiência no transporte escolar dos estudantes da Educação Básica.</p>

        <!-- APÊNDICE I: CONVOCAÇÕES DO FNDE -->
        <h3 style="color:#1e3a8a; border-bottom:2px solid #1e3a8a; padding-bottom:0.35rem; margin-top:3rem;">APÊNDICE I: CONVOCAÇÕES DO FNDE</h3>
        <p style="text-align:justify; line-height:1.6;">Relação dos ofícios e convocações oficiais emitidos pelo FNDE referentes a esta capacitação:</p>
        ${fndeHtml}

        <!-- APÊNDICE II: CONVOCAÇÕES DO CECATE -->
        <h3 style="color:#1e3a8a; border-bottom:2px solid #1e3a8a; padding-bottom:0.35rem; margin-top:2.5rem;">APÊNDICE II: CONVOCAÇÕES DO CECATE</h3>
        <p style="text-align:justify; line-height:1.6;">Relação dos comunicados e e-mails de convocação emitidos pela equipe técnica do CECATE-CO referentes a esta capacitação:</p>
        ${cecateHtml}
      </div>
    `;

    setTimeout(() => {
      this.renderReportPreviewCharts();
    }, 100);
  }

  renderReportPreviewCharts() {
    if (!window.chartEngine || !this.currentTraining) return;
    // O relatório é um documento impresso formal A4 de fundo branco; tema dos gráficos deve ser sempre claro
    const isDark = false;
    const evals = this.currentTraining.evaluations || [];

    // Figura 3: Participação CACS vs Gestor
    let cacsPresent = 0;
    let gestPresent = 0;
    if (evals.length > 0) {
      cacsPresent = evals.filter(e => e.representation === 'CACS-FUNDEB').length;
      gestPresent = evals.length - cacsPresent;
    } else if (this.currentTraining.municipalities) {
      this.currentTraining.municipalities.forEach(m => {
        cacsPresent += (parseInt(m.presentCACS) || 0);
        gestPresent += (parseInt(m.presentGestores) || 0);
      });
    }

    if (document.getElementById('report-preview-fig3-canvas')) {
      window.chartEngine.renderFig3Participation('report-preview-fig3-canvas', cacsPresent, gestPresent, isDark);
    }

    // Figura 4, 5, 6: Avaliação
    const statsGen = window.statsEngine.calculateEvaluationStats(evals);
    if (document.getElementById('report-preview-fig4-canvas')) {
      window.chartEngine.renderEvaluationStackedBarChart('report-preview-fig4-canvas', statsGen.criterionDistributionPercent, 'Figura 4. Avaliação da capacitação de todos os participantes.', isDark);
    }

    const statsCACS = window.statsEngine.calculateEvaluationStats(evals.filter(e => e.representation === 'CACS-FUNDEB'));
    if (document.getElementById('report-preview-fig5-canvas')) {
      window.chartEngine.renderEvaluationStackedBarChart('report-preview-fig5-canvas', statsCACS.criterionDistributionPercent, 'Figura 5. Avaliação da capacitação dos conselheiros CACS.', isDark);
    }

    const statsGest = window.statsEngine.calculateEvaluationStats(evals.filter(e => e.representation !== 'CACS-FUNDEB'));
    if (document.getElementById('report-preview-fig6-canvas')) {
      window.chartEngine.renderEvaluationStackedBarChart('report-preview-fig6-canvas', statsGest.criterionDistributionPercent, 'Figura 6. Avaliação da capacitação dos gestores municipais.', isDark);
    }

    // Figura 7 e 8: Nuvem de palavras
    if (window.wordCloudEngine) {
      const positiveTexts = evals.map(e => e.likedAspects || e.liked || '').filter(Boolean);
      const improveTexts = evals.map(e => e.improveAspects || e.improve || '').filter(Boolean);

      const canvas7 = document.getElementById('report-preview-fig7-canvas');
      if (canvas7) {
        window.wordCloudEngine.renderCloud(canvas7, positiveTexts, { 
          palette: 'positive', 
          isDark, 
          width: 550, 
          height: 320, 
          maxWords: 35 
        });
      }

      const canvas8 = document.getElementById('report-preview-fig8-canvas');
      if (canvas8) {
        window.wordCloudEngine.renderCloud(canvas8, improveTexts, { 
          palette: 'improve', 
          isDark, 
          width: 550, 
          height: 320, 
          maxWords: 35 
        });
      }
    }
  }

  async downloadDocxReport() {
    if (!this.currentTraining || !window.reportDocxGenerator) return;
    this.showToast('Preparando dados e gráficos para o documento Word (.docx)...', 'info');
    if (!this.metrics) {
      this.metrics = window.statsEngine.calculateAllMetrics(this.currentTraining);
    }

    // Renderizar gráficos prévios para garantir canvases populados
    this.renderReportPreviewCharts();

    // Capturar imagens dos gráficos e nuvens a partir dos canvases
    const imagesData = {};
    const canvasMap = [
      { key: 'fig3', id: 'report-preview-fig3-canvas' },
      { key: 'fig4', id: 'report-preview-fig4-canvas' },
      { key: 'fig5', id: 'report-preview-fig5-canvas' },
      { key: 'fig6', id: 'report-preview-fig6-canvas' },
      { key: 'fig7', id: 'report-preview-fig7-canvas' },
      { key: 'fig8', id: 'report-preview-fig8-canvas' }
    ];

    canvasMap.forEach(item => {
      const cv = document.getElementById(item.id);
      if (cv) {
        try {
          imagesData[item.key] = cv.toDataURL('image/png');
        } catch (e) {
          console.warn('Erro ao extrair imagem do canvas:', item.id, e);
        }
      }
    });

    await window.reportDocxGenerator.generateAndDownload(this.currentTraining, this.metrics, imagesData);
    this.showToast('Documento Word (.docx) baixado com sucesso!', 'success');
  }

  printReportPDF() {
    if (!this.currentTraining) {
      this.showToast('Nenhuma capacitação selecionada.', 'warning');
      return;
    }

    const t = this.currentTraining;
    this.showToast('Preparando PDF do relatório oficial...', 'info');

    // Garantir renderização dos gráficos e nuvens de palavras
    this.renderReportPreviewCharts();

    const previewEl = document.getElementById('wizard-report-preview-document');
    if (!previewEl) {
      this.showToast('Documento do relatório não encontrado.', 'error');
      return;
    }

    // Clonar para isolamento estrito da página
    const clone = previewEl.cloneNode(true);

    // Converter todos os <canvas> no clone para elementos <img> contendo PNG em alta resolução
    const origCanvases = previewEl.querySelectorAll('canvas');
    const cloneCanvases = clone.querySelectorAll('canvas');
    origCanvases.forEach((origCanvas, idx) => {
      const cloneCanvas = cloneCanvases[idx];
      if (origCanvas && cloneCanvas) {
        try {
          const imgData = origCanvas.toDataURL('image/png');
          const imgEl = document.createElement('img');
          imgEl.src = imgData;
          imgEl.style.maxWidth = '100%';
          imgEl.style.height = 'auto';
          imgEl.style.display = 'block';
          imgEl.style.margin = '0 auto';
          imgEl.style.borderRadius = '4px';
          const parent = cloneCanvas.parentNode;
          if (parent) {
            parent.replaceChild(imgEl, cloneCanvas);
            parent.style.height = 'auto';
            parent.style.maxHeight = 'none';
          }
        } catch (e) {
          console.warn('Erro ao converter canvas para img:', e);
        }
      }
    });

    // Remover fundos ou bordas escuras de formulário
    clone.querySelectorAll('[style*="var(--bg-input)"]').forEach(el => {
      el.style.background = '#ffffff';
      el.style.border = 'none';
      el.style.padding = '0';
      el.style.boxShadow = 'none';
    });

    // Iframe isolado para impressão exclusiva do relatório
    let printIframe = document.getElementById('report-pdf-print-iframe');
    if (printIframe) printIframe.remove();

    printIframe = document.createElement('iframe');
    printIframe.id = 'report-pdf-print-iframe';
    printIframe.style.position = 'fixed';
    printIframe.style.right = '0';
    printIframe.style.bottom = '0';
    printIframe.style.width = '0';
    printIframe.style.height = '0';
    printIframe.style.border = '0';
    document.body.appendChild(printIframe);

    const cleanPolo = (t.polo || 'Polo').replace(/[^a-zA-Z0-9_-]/g, '_');
    const docTitle = `Relatorio_Capacitacao_${t.number || 'Final'}_${cleanPolo}`;

    const iframeDoc = printIframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${docTitle}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 15mm 15mm 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff !important;
      color: #0f172a !important;
      font-family: 'Times New Roman', serif;
      font-size: 11pt;
      line-height: 1.6;
    }
    .report-doc-page {
      background: #ffffff !important;
      color: #0f172a !important;
      width: 100% !important;
      max-width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
      box-shadow: none !important;
      border: none !important;
    }
    h1, h2, h3, h4 {
      font-family: 'Times New Roman', serif;
      page-break-after: avoid;
      break-after: avoid;
      color: #1e3a8a;
    }
    p {
      margin: 0.75rem 0;
      text-align: justify;
      line-height: 1.6;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.25rem 0;
      font-size: 10pt;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    th, td {
      border: 1px solid #475569;
      padding: 6px 8px;
      color: #0f172a;
    }
    th {
      background-color: #f1f5f9 !important;
      font-weight: bold;
    }
    img {
      max-width: 100% !important;
      height: auto !important;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    div[style*="page-break-inside: avoid"],
    div[style*="page-break-inside:avoid"] {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    a {
      color: #1e3a8a;
      text-decoration: none;
    }
  </style>
</head>
<body>
  ${clone.innerHTML}
</body>
</html>`);
    iframeDoc.close();

    setTimeout(() => {
      try {
        printIframe.contentWindow.focus();
        printIframe.contentWindow.print();
      } catch (err) {
        console.error('Falha ao acionar impressão via iframe:', err);
        window.print();
      }
    }, 450);
  }

  async directDownloadDocx(trainingId) {
    const full = await window.db.getTrainingFull(trainingId);
    if (full && window.reportDocxGenerator && window.statsEngine) {
      const metrics = window.statsEngine.calculateAllMetrics(full);
      this.showToast('Gerando arquivo Word (.docx)...');
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

    // Regra estrita: impedir exclusão de registros do Histórico Protegido (Nº 6 a 14)
    if ((training.isHistorical || training.status === 'historico') && (parseInt(training.number) >= 6 && parseInt(training.number) <= 14)) {
      this.showToast('Registros do Histórico Protegido (Nº 6 a 14) são permanentes e não podem ser excluídos.', 'warning');
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
        <span style="display:inline-flex; align-items:center;">${window.icons.pin} Local:&nbsp;<strong>${training.locationVenue || 'Auditório Municipal'}</strong></span>
        <span style="display:inline-flex; align-items:center;">${window.icons.calendar} Datas:&nbsp;<strong>${training.datesFormatted || training.startDate || 'Data a definir'}</strong></span>
        <span style="display:inline-flex; align-items:center;">${window.icons.clock} Carga:&nbsp;<strong>${training.workload || '16h'}</strong></span>
      `;
    }

    const progressContainer = document.getElementById('modal-delete-progress-container');
    const progressBar = document.getElementById('modal-delete-progress-bar');
    const progressPercent = document.getElementById('modal-delete-progress-percent');
    const progressStatus = document.getElementById('modal-delete-progress-status');
    const confirmBtn = document.getElementById('modal-delete-confirm-btn');
    const cancelBtn = document.getElementById('modal-delete-cancel-btn');
    const closeBtn = document.getElementById('modal-delete-close-btn');

    const footerInit = document.getElementById('modal-delete-footer-initial');
    const footerSucc = document.getElementById('modal-delete-footer-success');
    if (footerInit) footerInit.style.display = 'flex';
    if (footerSucc) footerSucc.style.display = 'none';

    if (progressContainer) progressContainer.style.display = 'none';
    if (progressBar) {
      progressBar.style.width = '0%';
      progressBar.style.background = '';
    }
    if (progressPercent) {
      progressPercent.textContent = '0%';
      progressPercent.style.color = '#ef4444';
    }
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
    if (this.activeView === 'dashboard') {
      this.renderDashboard();
    } else if (this.activeView === 'trainings') {
      this.renderTrainingsList();
    }
  }

  /* ==========================================================================
     MODAL DE CONFIRMAÇÃO DE EXCLUSÃO DE INTEGRANTE
     ========================================================================== */
  openConfirmDeleteMemberModal(type, index) {
    let member = null;
    if (type === 'master') {
      const masterTeam = window.getMasterTeam();
      member = masterTeam[index];
    } else if (type === 'wizard') {
      member = this.currentTraining?.team?.[index];
    }

    if (!member) return;

    const name = window.formatTeamMemberFullName ? window.formatTeamMemberFullName(member) : (member.name || 'Integrante');
    const role = member.role || 'Equipe Técnica';

    this.openConfirmModal({
      title: 'Remover Integrante',
      msg: `Tem certeza que deseja remover "${name}" (${role}) da equipe?`,
      btnText: 'Sim, Remover',
      successTitle: 'Integrante Removido!',
      successMsg: `O integrante "${name}" foi removido com sucesso.`,
      onConfirm: () => {
        if (type === 'master') {
          const masterTeam = window.getMasterTeam();
          if (masterTeam[index]) {
            const removedName = masterTeam[index].name;
            masterTeam.splice(index, 1);
            window.saveMasterTeam(masterTeam);
            this.renderMasterTeamManagement();
            this.showToast(`Integrante ${removedName} removido do catálogo geral.`);
          }
        } else if (type === 'wizard') {
          if (this.currentTraining?.team?.[index]) {
            const removedName = this.currentTraining.team[index].name;
            this.currentTraining.team.splice(index, 1);
            this.renderTeamList();
            this.saveCurrentStepData();
            this.showToast(`Integrante ${removedName} removido da equipe.`);
          }
        }
      }
    });
  }

  closeConfirmDeleteMemberModal() {
    this.closeConfirmModal();
  }

  executeDeleteMemberConfirmed() {
    this.executeConfirmModalAction();
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
      confirmBtn.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px; margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>Excluindo...';
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

      // Fase 4: Exclusão completa no banco IndexedDB e na nuvem (Supabase)
      setProgress(95, 'Finalizando exclusão no banco e na nuvem...');
      await window.db.deleteTraining(idToDelete, true);

      // Atualizar lista em memória e re-renderizar a visualização imediatamente
      this.trainingList = (this.trainingList || []).filter(t => t.id !== idToDelete);
      if (this.currentTraining && this.currentTraining.id === idToDelete) {
        this.currentTraining = null;
      }
      if (this.activeView === 'dashboard') {
        await this.renderDashboard();
      } else if (this.activeView === 'trainings') {
        await this.renderTrainingsList();
      }

      setProgress(100, 'Capacitação excluída com sucesso!');
      if (progressBar) progressBar.style.background = 'linear-gradient(90deg, #10b981, #059669)';
      if (progressPercent) progressPercent.style.color = '#10b981';
      if (progressStatus) progressStatus.innerHTML = '<span class="status-dot" style="background:#10b981;"></span> Capacitação excluída com sucesso!';

      const footerInit = document.getElementById('modal-delete-footer-initial');
      const footerSucc = document.getElementById('modal-delete-footer-success');
      if (footerInit) footerInit.style.display = 'none';
      if (footerSucc) {
        footerSucc.style.display = 'flex';
        const okBtn = document.getElementById('modal-delete-ok-btn');
        if (okBtn) okBtn.focus();
      }
      if (closeBtn) closeBtn.disabled = false;
      this.showToast(`Capacitação Nº ${num} excluída com sucesso.`);
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
          <div style="display:flex; justify-content:center; margin-bottom:1rem; color:var(--text-muted);">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <p>Nenhuma capacitação cadastrada.</p>
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
                ? `<span class="nav-badge badge-amber">Histórico Protegido</span>`
                : (t.progressPercent === 100
                    ? `<span class="nav-badge badge-emerald" style="display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Concluída</span>`
                    : `<span class="nav-badge badge-cyan" style="display:inline-flex; align-items:center; gap:0.25rem;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Em Andamento</span>`);

              return `
                <tr>
                  <td style="text-align:center; font-weight:800; font-size:1.05rem; color:var(--accent-secondary);">${t.number}</td>
                  <td><strong>${t.polo || 'Polo Regional'}</strong></td>
                  <td><span class="nav-badge">${t.uf || 'MT'}</span></td>
                  <td style="font-size:0.85rem;">${t.datesFormatted || t.startDate || '-'}</td>
                  <td style="font-size:0.85rem;">${t.workload || '16h'}</td>
                  <td>${statusBadge}</td>
                  <td style="text-align:center; white-space:nowrap;">
                    <div style="display:inline-flex; gap:0.4rem; justify-content:center; align-items:center;">
                      <button class="btn btn-secondary btn-sm" onclick="app.openWizard('${t.id}', 1)" style="display:inline-flex; align-items:center;" title="${isHist ? 'Consultar' : 'Editar'}">
                        ${isHist ? `${window.icons.search} Consultar` : `${window.icons.edit} Editar`}
                      </button>
                      ${isHist
                        ? `<span class="nav-badge badge-amber" style="font-size:0.75rem; padding:0.25rem 0.55rem; display:inline-flex; align-items:center; gap:0.25rem;" title="Histórico protegido - exclusão desabilitada">${window.icons.lock} Protegido</span>`
                        : `<button class="btn btn-secondary btn-sm btn-action-delete" onclick="app.openConfirmDeleteModal('${t.id}')" style="display:inline-flex; align-items:center;" title="Excluir este relatório">
                            ${window.icons.delete} Excluir
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

  initGlobalSettings() {
    const org = localStorage.getItem('autoreport_setting_org') || 'Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste (CECATE-CO)';
    const funding = localStorage.getItem('autoreport_setting_funding') || 'Fundo Nacional de Desenvolvimento da Educação - FNDE';
    const proj = localStorage.getItem('autoreport_setting_proj') || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL';
    const process = localStorage.getItem('autoreport_setting_process') || '23070.012345/2026-00';

    this.setVal('setting-org-name', org);
    this.setVal('setting-funding-name', funding);
    this.setVal('setting-proj-name', proj);
    this.setVal('setting-process-name', process);

    this.lockGlobalSettingsInputs(true);
  }

  lockGlobalSettingsInputs(isLocked) {
    const fields = ['setting-org-name', 'setting-funding-name', 'setting-proj-name', 'setting-process-name'];
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.disabled = isLocked;
        el.style.background = isLocked ? 'var(--bg-input)' : 'rgba(15, 23, 42, 0.95)';
        el.style.cursor = isLocked ? 'not-allowed' : 'text';
      }
    });

    const viewActions = document.getElementById('settings-view-mode-actions');
    const editActions = document.getElementById('settings-edit-mode-actions');
    if (viewActions) viewActions.style.display = isLocked ? 'block' : 'none';
    if (editActions) editActions.style.display = isLocked ? 'none' : 'flex';
  }

  openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => { modal.style.display = 'none'; }, 200);
    }
  }

  requestEditGlobalSettings() {
    this.openModal('modal-confirm-edit-settings');
  }

  confirmEnableEditGlobalSettings() {
    this.closeModal('modal-confirm-edit-settings');
    this.lockGlobalSettingsInputs(false);
    const firstInput = document.getElementById('setting-org-name');
    if (firstInput) firstInput.focus();
    this.showToast('Edição das Configurações Globais habilitada.', 'info');
  }

  cancelEditGlobalSettings() {
    this.initGlobalSettings();
    this.showToast('Edição cancelada.', 'info');
  }

  saveGlobalSettings() {
    const org = this.getVal('setting-org-name') || 'Centro Colaborador de Apoio ao Transporte Escolar da Região Centro-Oeste (CECATE-CO)';
    const funding = this.getVal('setting-funding-name') || 'Fundo Nacional de Desenvolvimento da Educação - FNDE';
    const proj = this.getVal('setting-proj-name') || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL';
    const process = this.getVal('setting-process-name') || '23070.012345/2026-00';

    localStorage.setItem('autoreport_setting_org', org);
    localStorage.setItem('autoreport_setting_funding', funding);
    localStorage.setItem('autoreport_setting_proj', proj);
    localStorage.setItem('autoreport_setting_process', process);

    if (this.currentTraining) {
      this.currentTraining.responsibleOrg = org;
      this.currentTraining.fundingOrg = funding;
      this.currentTraining.relatedProject = proj;
      this.currentTraining.processNumber = process;
      this.populateAllWizardForms();
    }

    this.lockGlobalSettingsInputs(true);
    this.showToast('Configurações Globais salvas com sucesso!', 'success');
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

    // Sanitizar mensagem removendo emojis legados do início
    let cleanMessage = String(message || '')
      .replace(/^[\s\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2612}\u{2713}\u{2714}\u{26A0}\u{FE0F}✓⚠️⚡✨💾🔄🛡️👤📍🗑️]+/gu, '')
      .trim();
    if (!cleanMessage) cleanMessage = message;

    // Detectar automaticamente o tipo de notificação se não especificado
    if (type === 'info') {
      const msgLower = message.toLowerCase();
      if (message.includes('🗑️') || msgLower.includes('removid') || msgLower.includes('excluíd') || msgLower.includes('excluid') || msgLower.includes('deletad') || msgLower.includes('desanexad')) {
        type = 'delete';
      } else if (message.includes('⚠️') || msgLower.includes('por favor') || msgLower.includes('atenção') || msgLower.includes('preencha') || msgLower.includes('obrigatório')) {
        type = 'warning';
      } else if (message.includes('✓') || message.includes('✨') || message.includes('💾') || msgLower.includes('sucesso')) {
        type = 'success';
      } else if (msgLower.includes('erro') || msgLower.includes('falha')) {
        type = 'error';
      }
    }

    const toastIcons = {
      delete: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:8px; color:#ef4444; flex-shrink:0;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
      warning: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:8px; color:#f59e0b; flex-shrink:0;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      success: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:8px; color:#10b981; flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
      error: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:8px; color:#ef4444; flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
      info: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:8px; color:#60a5fa; flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';

    if (type === 'delete') toast.style.borderLeft = '4px solid var(--accent-danger)';
    else if (type === 'success') toast.style.borderLeft = '4px solid var(--accent-success)';
    else if (type === 'error') toast.style.borderLeft = '4px solid var(--accent-danger)';
    else if (type === 'warning') toast.style.borderLeft = '4px solid var(--accent-warning)';
    else toast.style.borderLeft = '4px solid var(--accent-secondary)';

    const iconSvg = toastIcons[type] || toastIcons.info;
    toast.innerHTML = `${iconSvg}<span style="line-height:1.4;">${cleanMessage}</span>`;
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
