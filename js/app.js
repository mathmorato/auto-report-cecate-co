/**
 * AutoReport CECATE - Aplicação Principal (SPA Controller & UI Manager)
 */

class AutoReportApp {
  constructor() {
    this.currentReport = null;
    this.history = [];
    this.trainings = [];
    this.activeTrainingId = null;
    this.activeView = 'dashboard';
    this.currentTone = 'executive';
    this.zoomLevel = 100;
    this.orgSettings = {
      defaultOrgName: "CECATE Soluções Tecnológicas",
      defaultDepartment: "Governança & Inovação",
      defaultSigner: "Coordenação Geral",
      theme: "dark"
    };

    this.init();
  }

  init() {
    this.loadStorage();
    this.applyTheme();
    this.bindEvents();
    this.renderDashboard();
    this.renderTrainings();
    this.renderTemplates();
    this.renderHistory();
    this.loadDefaultTemplate('audit_compliance');
  }

  /* ==========================================================================
     Storage & Settings
     ========================================================================== */
  loadStorage() {
    try {
      const savedHistory = localStorage.getItem('autoreport_history');
      if (savedHistory) this.history = JSON.parse(savedHistory);

      const savedSettings = localStorage.getItem('autoreport_settings');
      if (savedSettings) this.orgSettings = { ...this.orgSettings, ...JSON.parse(savedSettings) };

      const savedTrainings = localStorage.getItem('autoreport_trainings');
      if (savedTrainings) {
        this.trainings = JSON.parse(savedTrainings);
      } else {
        // Dados de demonstração padrão do CECATE
        this.trainings = [
          {
            id: "train_101",
            code: "CAP-2026-001",
            title: "Formação Especializada em Automação de Relatórios com IA",
            category: "Tecnologia & Automação",
            instructor: "Prof. Dr. Marcos Souza",
            target: "Analistas e Especialistas de Processos CECATE",
            startDate: "2026-08-10",
            endDate: "2026-08-28",
            schedule: "08:30 às 17:30 (Sextas e Sábados)",
            location: "Auditório Central CECATE & Lab 04",
            modality: "Presencial",
            status: "Concluída",
            hours: 40,
            vacancies: 25,
            enrolled: 25,
            graduated: 24,
            syllabus: "Módulo 1: Arquitetura de Relatórios Inteligentes\nMódulo 2: Engenharia de Prompts e Diagnósticos Técnicos\nMódulo 3: Parametrização Modular e KPIs Dinâmicos\nMódulo 4: Workshop Prático e Homologação de Modelos",
            notes: "Todos os concluintes receberam certificado digital e acesso prioritário aos modelos oficiais CECATE."
          },
          {
            id: "train_102",
            code: "CAP-2026-002",
            title: "Auditoria de Processos e Conformidade Regulatória",
            category: "Qualidade & Auditoria",
            instructor: "Dra. Renata Calheiros",
            target: "Auditores Internos e Líderes de Qualidade",
            startDate: "2026-08-20",
            endDate: "2026-09-10",
            schedule: "19:00 às 22:00 (Terças e Quintas)",
            location: "Sala 204 - Bloco B / Microsoft Teams",
            modality: "Híbrido",
            status: "Em Andamento",
            hours: 32,
            vacancies: 30,
            enrolled: 28,
            graduated: 0,
            syllabus: "Módulo 1: Diretrizes de Conformidade e Gestão de Riscos\nMódulo 2: Mapeamento de Não-Conformidades Críticas\nMódulo 3: Planos de Ação e Evidências Documentais\nMódulo 4: Simulação de Auditoria de Campo",
            notes: "Material de apoio disponível no portal acadêmico. Avaliação final agendada para 10/09."
          },
          {
            id: "train_103",
            code: "CAP-2026-003",
            title: "Segurança Operacional, NR-10 e Gestão de Riscos Industriais",
            category: "Segurança & Governança",
            instructor: "Eng. Carlos Alberto Ribeiro",
            target: "Técnicos de Campo e Inspetores de Manutenção",
            startDate: "2026-09-15",
            endDate: "2026-09-25",
            schedule: "08:00 às 12:00 (Matutino)",
            location: "Centro de Treinamento Técnico CECATE",
            modality: "Presencial",
            status: "Planejada",
            hours: 20,
            vacancies: 20,
            enrolled: 16,
            graduated: 0,
            syllabus: "Módulo 1: Conceitos Fundamentais e Normas Regulamentadoras\nMódulo 2: Procedimentos de Bloqueio e Etiquetagem (LOTO)\nMódulo 3: Análise Preliminar de Risco (APR) e EPIs\nMódulo 4: Prática em Painéis Energizados",
            notes: "Exige uso obrigatório de botas de segurança e capacete nas aulas práticas."
          },
          {
            id: "train_104",
            code: "CAP-2026-004",
            title: "Governança de Dados, Dashboards & KPIs Técnicos",
            category: "Gestão & Liderança",
            instructor: "Mariana Vasconcelos",
            target: "Gestores de Squads e Coordenadores de Projeto",
            startDate: "2026-07-05",
            endDate: "2026-07-20",
            schedule: "14:00 às 18:00 (Online Ao Vivo)",
            location: "Google Meet / Sala Virtual CECATE",
            modality: "Online",
            status: "Concluída",
            hours: 16,
            vacancies: 40,
            enrolled: 40,
            graduated: 38,
            syllabus: "Módulo 1: Métricas de Eficiência, SLA e Produtividade\nMódulo 2: Construção de Indicadores Automatizados\nMódulo 3: Comunicação Executiva e Apresentação de Resultados",
            notes: "Taxa de aprovação de 95%. Feedback excelente dos participantes (NPS 9.8)."
          }
        ];
        this.saveStorage();
      }
    } catch (e) {
      console.warn("Erro ao carregar dados do localStorage:", e);
    }
  }

  saveStorage() {
    try {
      localStorage.setItem('autoreport_history', JSON.stringify(this.history));
      localStorage.setItem('autoreport_settings', JSON.stringify(this.orgSettings));
      localStorage.setItem('autoreport_trainings', JSON.stringify(this.trainings));
    } catch (e) {
      console.warn("Erro ao salvar dados no localStorage:", e);
    }
  }

  applyTheme() {
    if (this.orgSettings.theme === 'light') {
      document.body.classList.add('light-theme');
      const themeBtn = document.getElementById('theme-toggle-btn');
      if (themeBtn) themeBtn.innerHTML = '☀️ Modo Claro';
    } else {
      document.body.classList.remove('light-theme');
      const themeBtn = document.getElementById('theme-toggle-btn');
      if (themeBtn) themeBtn.innerHTML = '🌙 Modo Escuro';
    }
  }

  toggleTheme() {
    this.orgSettings.theme = this.orgSettings.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
    this.saveStorage();
    this.showToast(`Tema alterado para ${this.orgSettings.theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}`);
  }

  /* ==========================================================================
     Navigation & Views
     ========================================================================== */
  navigateTo(viewId) {
    this.activeView = viewId;

    // Atualizar itens do menu
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Atualizar seções de conteúdo
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSection = document.getElementById(`view-${viewId}`);
    if (targetSection) targetSection.classList.add('active');

    // Atualizar título da barra superior
    const titleMap = {
      dashboard: "Painel de Controle & Visão Geral",
      trainings: "Gestão & Cadastro de Capacitações CECATE",
      studio: "Estúdio de Criação & Automação de Relatórios",
      templates: "Biblioteca de Modelos Prontos",
      history: "Arquivo & Histórico de Relatórios Gerados",
      settings: "Configurações Globais & Identidade Visual"
    };
    const titleEl = document.getElementById('page-current-title');
    if (titleEl) titleEl.innerText = titleMap[viewId] || "AutoReport CECATE";

    // Atualizações específicas por tela
    if (viewId === 'dashboard') this.renderDashboard();
    if (viewId === 'trainings') this.renderTrainings();
    if (viewId === 'history') this.renderHistory();
    if (viewId === 'studio') this.updateLivePreview();
  }

  /* ==========================================================================
     Template Loading & Initialization
     ========================================================================== */
  loadDefaultTemplate(templateId) {
    const tpl = REPORT_TEMPLATES.find(t => t.id === templateId) || REPORT_TEMPLATES[0];
    this.currentReport = JSON.parse(JSON.stringify(tpl));
    
    // Aplicar configurações institucionais se disponíveis
    if (this.orgSettings.defaultOrgName) {
      this.currentReport.defaultMeta.orgName = this.orgSettings.defaultOrgName;
    }
    
    this.currentReport.meta = { ...this.currentReport.defaultMeta };
    this.populateEditorForm();
    this.renderModularBlocksEditor();
    this.updateLivePreview();
  }

  /* ==========================================================================
     Editor UI Population & Binding
     ========================================================================== */
  populateEditorForm() {
    if (!this.currentReport || !this.currentReport.meta) return;

    const meta = this.currentReport.meta;
    this.setInputValue('meta-orgName', meta.orgName);
    this.setInputValue('meta-reportTitle', meta.reportTitle);
    this.setInputValue('meta-responsible', meta.responsible);
    this.setInputValue('meta-department', meta.department);
    this.setInputValue('meta-date', meta.date);
    this.setInputValue('meta-referenceCode', meta.referenceCode);
    this.setInputValue('meta-period', meta.period || "Ciclo Vigente 2026");

    this.renderKpiForm();
  }

  setInputValue(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
  }

  syncMetaFromForm() {
    if (!this.currentReport) return;
    this.currentReport.meta = {
      orgName: document.getElementById('meta-orgName')?.value || '',
      reportTitle: document.getElementById('meta-reportTitle')?.value || '',
      responsible: document.getElementById('meta-responsible')?.value || '',
      department: document.getElementById('meta-department')?.value || '',
      date: document.getElementById('meta-date')?.value || '',
      referenceCode: document.getElementById('meta-referenceCode')?.value || '',
      period: document.getElementById('meta-period')?.value || ''
    };
    this.updateLivePreview();
  }

  renderKpiForm() {
    const container = document.getElementById('kpi-inputs-container');
    if (!container || !this.currentReport) return;

    const kpis = this.currentReport.defaultKpis || [];
    container.innerHTML = kpis.map((kpi, idx) => `
      <div class="kpi-input-row" style="display:grid; grid-template-columns: 1.5fr 1fr auto; gap: 0.5rem; margin-bottom: 0.6rem; align-items:center;">
        <input type="text" class="form-control form-control-sm" value="${kpi.label}" placeholder="Indicador" oninput="app.updateKpiItem(${idx}, 'label', this.value)">
        <input type="text" class="form-control form-control-sm" value="${kpi.value}" placeholder="Valor" oninput="app.updateKpiItem(${idx}, 'value', this.value)">
        <button class="btn btn-danger btn-sm" onclick="app.removeKpiItem(${idx})" title="Remover">✕</button>
      </div>
    `).join('');
  }

  updateKpiItem(index, field, value) {
    if (this.currentReport && this.currentReport.defaultKpis[index]) {
      this.currentReport.defaultKpis[index][field] = value;
      // Atualizar também o bloco de KPIs caso exista
      const kpiBlock = this.currentReport.blocks.find(b => b.type === 'kpi_metrics');
      if (kpiBlock && kpiBlock.kpis && kpiBlock.kpis[index]) {
        kpiBlock.kpis[index][field] = value;
      }
      this.updateLivePreview();
    }
  }

  addKpiItem() {
    if (!this.currentReport) return;
    if (!this.currentReport.defaultKpis) this.currentReport.defaultKpis = [];
    this.currentReport.defaultKpis.push({ label: "Novo Indicador", value: "100%", change: "Meta atingida" });
    
    const kpiBlock = this.currentReport.blocks.find(b => b.type === 'kpi_metrics');
    if (kpiBlock) {
      if (!kpiBlock.kpis) kpiBlock.kpis = [];
      kpiBlock.kpis.push({ label: "Novo Indicador", value: "100%", change: "Meta atingida" });
    }

    this.renderKpiForm();
    this.updateLivePreview();
    this.showToast("Indicador adicionado!");
  }

  removeKpiItem(index) {
    if (!this.currentReport || !this.currentReport.defaultKpis) return;
    this.currentReport.defaultKpis.splice(index, 1);
    const kpiBlock = this.currentReport.blocks.find(b => b.type === 'kpi_metrics');
    if (kpiBlock && kpiBlock.kpis) kpiBlock.kpis.splice(index, 1);
    this.renderKpiForm();
    this.updateLivePreview();
  }

  /* ==========================================================================
     Modular Blocks Management
     ========================================================================== */
  renderModularBlocksEditor() {
    const listEl = document.getElementById('modular-blocks-container');
    if (!listEl || !this.currentReport) return;

    listEl.innerHTML = this.currentReport.blocks.map((block, idx) => {
      return `
        <div class="block-item" data-block-id="${block.id}">
          <div class="block-header">
            <div class="block-title-group">
              <span class="drag-handle">☰</span>
              <strong style="font-size:0.95rem; color:var(--text-primary);">${block.title}</strong>
              <span class="badge badge-primary">${block.type}</span>
            </div>
            <div class="block-actions">
              <button class="btn btn-secondary btn-sm" onclick="app.moveBlock(${idx}, -1)" ${idx === 0 ? 'disabled' : ''} title="Mover para cima">↑</button>
              <button class="btn btn-secondary btn-sm" onclick="app.moveBlock(${idx}, 1)" ${idx === this.currentReport.blocks.length - 1 ? 'disabled' : ''} title="Mover para baixo">↓</button>
              <button class="btn btn-danger btn-sm" onclick="app.removeBlock(${idx})" title="Excluir bloco">✕</button>
            </div>
          </div>
          <div class="block-body-content">
            ${this.renderBlockEditorBody(block, idx)}
          </div>
        </div>
      `;
    }).join('');
  }

  renderBlockEditorBody(block, idx) {
    if (block.type === 'executive_summary' || block.type === 'ai_diagnostic') {
      return `
        <div class="form-group" style="margin-bottom: 0.5rem;">
          <textarea class="form-control" rows="4" oninput="app.updateBlockContent(${idx}, this.value)">${block.content || ''}</textarea>
        </div>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:0.4rem;">
          <button class="btn btn-secondary btn-sm" onclick="app.aiEnhanceBlock(${idx}, 'expand')">✨ Expandir</button>
          <button class="btn btn-secondary btn-sm" onclick="app.aiEnhanceBlock(${idx}, 'summarize')">✂️ Resumir</button>
          <button class="btn btn-secondary btn-sm" onclick="app.aiEnhanceBlock(${idx}, 'formalize')">👔 Formalizar</button>
          <button class="btn btn-secondary btn-sm" onclick="app.aiRegenerateBlock(${idx})">⚡ Gerar Parecer c/ IA</button>
        </div>
      `;
    } else if (block.type === 'recommendations') {
      return `
        <div style="display:flex; flex-direction:column; gap:0.4rem;">
          ${(block.items || []).map((item, itemIdx) => `
            <div style="display:flex; gap:0.4rem; align-items:center;">
              <span style="color:var(--accent-primary); font-weight:bold;">•</span>
              <input type="text" class="form-control form-control-sm" value="${item}" oninput="app.updateRecommendationItem(${idx}, ${itemIdx}, this.value)">
              <button class="btn btn-danger btn-sm" onclick="app.removeRecommendationItem(${idx}, ${itemIdx})">✕</button>
            </div>
          `).join('')}
          <button class="btn btn-secondary btn-sm" style="margin-top:0.4rem; align-self:flex-start;" onclick="app.addRecommendationItem(${idx})">+ Adicionar Recomendação</button>
        </div>
      `;
    } else if (block.type === 'data_table') {
      return `
        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.4rem;">
          Tabela com ${(block.headers || []).length} colunas e ${(block.rows || []).length} linhas de dados.
        </div>
        <button class="btn btn-secondary btn-sm" onclick="app.editTableModal(${idx})">✏️ Editar Dados da Tabela</button>
      `;
    } else if (block.type === 'kpi_metrics') {
      return `
        <div style="font-size:0.85rem; color:var(--text-secondary);">
          Exibindo ${(block.kpis || []).length} indicadores no grid do documento. (Gerenciado na aba de Indicadores)
        </div>
      `;
    } else if (block.type === 'signatures') {
      return `
        <div style="font-size:0.85rem; color:var(--text-muted);">
          Contém ${(block.signers || []).length} campos de assinatura e homologação formal.
        </div>
      `;
    }
    return `<div style="font-size:0.85rem; color:var(--text-muted);">Bloco modular padrão.</div>`;
  }

  updateBlockContent(idx, content) {
    if (this.currentReport && this.currentReport.blocks[idx]) {
      this.currentReport.blocks[idx].content = content;
      this.updateLivePreview();
    }
  }

  updateRecommendationItem(blockIdx, itemIdx, value) {
    if (this.currentReport?.blocks[blockIdx]?.items) {
      this.currentReport.blocks[blockIdx].items[itemIdx] = value;
      this.updateLivePreview();
    }
  }

  addRecommendationItem(blockIdx) {
    if (this.currentReport?.blocks[blockIdx]) {
      if (!this.currentReport.blocks[blockIdx].items) this.currentReport.blocks[blockIdx].items = [];
      this.currentReport.blocks[blockIdx].items.push("Nova diretriz recomendada para cumprimento.");
      this.renderModularBlocksEditor();
      this.updateLivePreview();
    }
  }

  removeRecommendationItem(blockIdx, itemIdx) {
    if (this.currentReport?.blocks[blockIdx]?.items) {
      this.currentReport.blocks[blockIdx].items.splice(itemIdx, 1);
      this.renderModularBlocksEditor();
      this.updateLivePreview();
    }
  }

  editTableModal(idx) {
    if (!this.currentReport?.blocks[idx]) return;
    this.activeTableBlockIdx = idx;
    this.renderTableEditorModal();
    this.openModal('modal-edit-table');
  }

  renderTableEditorModal() {
    const container = document.getElementById('table-editor-container');
    if (!container || this.activeTableBlockIdx === undefined) return;
    const block = this.currentReport.blocks[this.activeTableBlockIdx];
    if (!block || !block.headers || !block.rows) return;

    let html = `
      <table class="data-table" style="background:var(--bg-input); border-radius:6px; margin-bottom:1rem;">
        <thead>
          <tr>
            ${block.headers.map((h, hIdx) => `
              <th><input type="text" class="form-control form-control-sm" value="${h}" onchange="app.currentReport.blocks[app.activeTableBlockIdx].headers[${hIdx}]=this.value"></th>
            `).join('')}
            <th style="width:50px;">Ação</th>
          </tr>
        </thead>
        <tbody>
          ${block.rows.map((row, rIdx) => `
            <tr>
              ${row.map((cell, cIdx) => `
                <td><input type="text" class="form-control form-control-sm" value="${cell}" onchange="app.currentReport.blocks[app.activeTableBlockIdx].rows[${rIdx}][${cIdx}]=this.value"></td>
              `).join('')}
              <td><button class="btn btn-danger btn-sm" onclick="app.removeTableRowModal(${rIdx})">✕</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    container.innerHTML = html;
  }

  addTableRowModal() {
    if (this.activeTableBlockIdx === undefined || !this.currentReport?.blocks[this.activeTableBlockIdx]) return;
    const block = this.currentReport.blocks[this.activeTableBlockIdx];
    const newRow = block.headers.map(() => "Novo dado");
    block.rows.push(newRow);
    this.renderTableEditorModal();
  }

  removeTableRowModal(rIdx) {
    if (this.activeTableBlockIdx === undefined || !this.currentReport?.blocks[this.activeTableBlockIdx]) return;
    this.currentReport.blocks[this.activeTableBlockIdx].rows.splice(rIdx, 1);
    this.renderTableEditorModal();
  }

  saveTableModalData() {
    this.closeModal('modal-edit-table');
    this.renderModularBlocksEditor();
    this.updateLivePreview();
    this.showToast("Tabela atualizada com sucesso!", 'success');
  }

  moveBlock(idx, direction) {
    if (!this.currentReport || !this.currentReport.blocks) return;
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= this.currentReport.blocks.length) return;

    const temp = this.currentReport.blocks[idx];
    this.currentReport.blocks[idx] = this.currentReport.blocks[targetIdx];
    this.currentReport.blocks[targetIdx] = temp;

    this.renderModularBlocksEditor();
    this.updateLivePreview();
  }

  removeBlock(idx) {
    if (!this.currentReport || !this.currentReport.blocks) return;
    if (confirm("Deseja realmente remover este bloco do relatório?")) {
      this.currentReport.blocks.splice(idx, 1);
      this.renderModularBlocksEditor();
      this.updateLivePreview();
      this.showToast("Bloco removido!");
    }
  }

  openAddBlockModal() {
    const listEl = document.getElementById('available-block-types-list');
    if (listEl) {
      listEl.innerHTML = AVAILABLE_BLOCK_TYPES.map(bt => `
        <div class="block-type-card glass-card" style="padding:1rem; cursor:pointer; display:flex; align-items:center; gap:1rem; margin-bottom:0.75rem;" onclick="app.addModularBlock('${bt.type}')">
          <div style="font-size:1.8rem;">${bt.icon}</div>
          <div>
            <h4 style="font-size:1rem; margin-bottom:0.2rem;">${bt.name}</h4>
            <p style="font-size:0.8rem; color:var(--text-secondary);">${bt.desc}</p>
          </div>
        </div>
      `).join('');
    }
    this.openModal('modal-add-block');
  }

  addModularBlock(type) {
    if (!this.currentReport) return;
    const blockMeta = AVAILABLE_BLOCK_TYPES.find(b => b.type === type);
    const newId = `b_custom_${Date.now()}`;

    let newBlock = {
      id: newId,
      type: type,
      title: `${this.currentReport.blocks.length + 1}. ${blockMeta ? blockMeta.name : 'Novo Bloco'}`
    };

    if (type === 'executive_summary' || type === 'ai_diagnostic') {
      newBlock.content = "Insira o conteúdo deste bloco ou utilize o assistente de IA para redigir automaticamente.";
    } else if (type === 'recommendations') {
      newBlock.items = ["Ação prioritária 1", "Ação prioritária 2"];
    } else if (type === 'data_table') {
      newBlock.headers = ["Item", "Descrição", "Responsável", "Status"];
      newBlock.rows = [
        ["01", "Verificação Inicial", "Equipe Técnica", "Concluído"],
        ["02", "Validação de Processo", "Coordenação", "Em Andamento"]
      ];
    } else if (type === 'kpi_metrics') {
      newBlock.kpis = [
        { label: "Métrica Primária", value: "98.5%", change: "+1.2%" },
        { label: "Meta Cumprida", value: "Sim", change: "100%" }
      ];
    } else if (type === 'signatures') {
      newBlock.signers = [
        { name: "{responsavel}", role: "Responsável Técnico" },
        { name: "Superintendência", role: "Homologação" }
      ];
    }

    this.currentReport.blocks.push(newBlock);
    this.closeModal('modal-add-block');
    this.renderModularBlocksEditor();
    this.updateLivePreview();
    this.showToast(`Bloco "${newBlock.title}" adicionado com sucesso!`, 'success');
  }

  /* ==========================================================================
     AI Writing & Automated Generation
     ========================================================================== */
  setTone(tone) {
    this.currentTone = tone;
    document.querySelectorAll('.btn-tone').forEach(btn => {
      if (btn.getAttribute('data-tone') === tone) {
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-secondary');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
      }
    });
    this.showToast(`Tom de redação ajustado para: ${tone.toUpperCase()}`);
  }

  aiEnhanceBlock(idx, action) {
    if (!this.currentReport?.blocks[idx]) return;
    const block = this.currentReport.blocks[idx];
    const enhanced = reportEngine.enhanceText(block.content, action, this.currentTone);
    block.content = enhanced;
    this.renderModularBlocksEditor();
    this.updateLivePreview();
    this.showToast(`Texto aprimorado (${action})!`, 'success');
  }

  aiRegenerateBlock(idx) {
    if (!this.currentReport?.blocks[idx]) return;
    const meta = this.currentReport.meta || {};
    const kpis = this.currentReport.defaultKpis || [];
    const generated = reportEngine.generateAutomatedDiagnostic(meta, kpis, this.currentTone);
    this.currentReport.blocks[idx].content = generated;
    this.renderModularBlocksEditor();
    this.updateLivePreview();
    this.showToast("Diagnóstico e parecer gerados com IA!", 'success');
  }

  triggerFullAutomation() {
    if (!this.currentReport) return;
    this.syncMetaFromForm();
    const meta = this.currentReport.meta;
    const kpis = this.currentReport.defaultKpis || [];

    // Percorrer blocos e automatizar diagnósticos e sumários
    this.currentReport.blocks.forEach(block => {
      if (block.type === 'ai_diagnostic') {
        block.content = reportEngine.generateAutomatedDiagnostic(meta, kpis, this.currentTone);
      } else if (block.type === 'executive_summary') {
        block.content = `O presente documento consolida a análise executiva das operações da **{empresa}** referente ao **{periodo}**, sob responsabilidade de **{responsavel}** (${meta.department}). As evidências atestam desempenho consistente e conformidade com as diretrizes organizacionais.`;
      }
    });

    this.renderModularBlocksEditor();
    this.updateLivePreview();
    this.showToast("Relatório 100% automatizado e reescrito com sucesso!", 'success');
  }

  /* ==========================================================================
     Live Preview & Document Rendering
     ========================================================================== */
  updateLivePreview() {
    const previewContainer = document.getElementById('a4-preview-content');
    if (!previewContainer || !this.currentReport) return;

    const meta = this.currentReport.meta || {};
    const blocks = this.currentReport.blocks || [];

    let docHtml = `
      <header class="report-doc-header">
        <div>
          <div class="doc-org-title">${reportEngine.interpolate(meta.orgName, meta)}</div>
          <div class="doc-report-title">${reportEngine.interpolate(meta.reportTitle, meta)}</div>
        </div>
        <div class="doc-meta-box">
          <div><strong>Emissão:</strong> ${meta.date || new Date().toLocaleDateString('pt-BR')}</div>
          <div><strong>Ref:</strong> ${meta.referenceCode || 'DOC-01'}</div>
          <div><strong>Depto:</strong> ${meta.department || 'Geral'}</div>
        </div>
      </header>
    `;

    blocks.forEach(block => {
      docHtml += `<section class="report-section-block">`;
      docHtml += `<h3 class="report-section-title">${reportEngine.interpolate(block.title, meta)}</h3>`;

      if (block.type === 'executive_summary' || block.type === 'ai_diagnostic') {
        const textInterp = reportEngine.interpolate(block.content || '', meta);
        docHtml += `<div class="report-section-content">${reportEngine.renderMarkdownToHtml(textInterp)}</div>`;
      } else if (block.type === 'kpi_metrics') {
        const kpis = block.kpis || this.currentReport.defaultKpis || [];
        docHtml += `<div class="report-kpi-grid">`;
        kpis.forEach(k => {
          docHtml += `
            <div class="report-kpi-box">
              <div class="report-kpi-label">${k.label}</div>
              <div class="report-kpi-val">${k.value}</div>
              <div style="font-size:0.75rem; color:#10b981; font-weight:600;">${k.change || ''}</div>
            </div>
          `;
        });
        docHtml += `</div>`;
      } else if (block.type === 'data_table' && block.headers && block.rows) {
        docHtml += `<table class="report-table"><thead><tr>`;
        block.headers.forEach(h => docHtml += `<th>${h}</th>`);
        docHtml += `</tr></thead><tbody>`;
        block.rows.forEach(r => {
          docHtml += `<tr>`;
          r.forEach(cell => docHtml += `<td>${cell}</td>`);
          docHtml += `</tr>`;
        });
        docHtml += `</tbody></table>`;
      } else if (block.type === 'recommendations' && block.items) {
        docHtml += `<ul style="padding-left: 1.25rem; color: #334155; font-size: 0.92rem; line-height: 1.7;">`;
        block.items.forEach(it => {
          docHtml += `<li>${reportEngine.interpolate(it, meta)}</li>`;
        });
        docHtml += `</ul>`;
      } else if (block.type === 'signatures' && block.signers) {
        docHtml += `<div class="report-signatures">`;
        block.signers.forEach(s => {
          docHtml += `
            <div>
              <div class="signature-line">${reportEngine.interpolate(s.name, meta)}</div>
              <div class="signature-role">${s.role}</div>
            </div>
          `;
        });
        docHtml += `</div>`;
      }

      docHtml += `</section>`;
    });

    docHtml += `
      <footer class="report-doc-footer">
        <span>AutoReport CECATE • Sistema de Automação de Relatórios</span>
        <span>Página 1 de 1</span>
      </footer>
    `;

    previewContainer.innerHTML = docHtml;
  }

  /* ==========================================================================
     Export Handlers
     ========================================================================== */
  printReport() {
    window.print();
  }

  downloadMarkdown() {
    if (!this.currentReport) return;
    this.syncMetaFromForm();
    const md = reportEngine.exportToMarkdown(this.currentReport);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(this.currentReport.meta.referenceCode || 'relatorio').toLowerCase()}_autoreport.md`;
    link.click();
    URL.revokeObjectURL(url);
    this.showToast("Relatório Markdown baixado com sucesso!", 'success');
  }

  downloadHTML() {
    if (!this.currentReport) return;
    this.syncMetaFromForm();
    const previewContent = document.getElementById('a4-preview-content')?.innerHTML || '';
    const fullHtml = reportEngine.exportToHTML(this.currentReport, previewContent);
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(this.currentReport.meta.referenceCode || 'relatorio').toLowerCase()}_documento.html`;
    link.click();
    URL.revokeObjectURL(url);
    this.showToast("Documento HTML independente baixado com sucesso!", 'success');
  }

  saveReportToHistory() {
    if (!this.currentReport) return;
    this.syncMetaFromForm();

    const reportRecord = {
      id: `rep_${Date.now()}`,
      savedAt: new Date().toISOString(),
      meta: { ...this.currentReport.meta },
      category: this.currentReport.category || "Geral",
      reportData: JSON.parse(JSON.stringify(this.currentReport))
    };

    this.history.unshift(reportRecord);
    this.saveStorage();
    this.renderHistory();
    this.renderDashboard();
    this.showToast("Relatório salvo no histórico com sucesso!", 'success');
  }

  /* ==========================================================================
     Dashboard & History Rendering
     ========================================================================== */
  renderDashboard() {
    const totalReports = this.history.length;
    const countEl = document.getElementById('dash-total-reports');
    if (countEl) countEl.innerText = totalReports;

    const recentListEl = document.getElementById('dash-recent-reports-body');
    if (!recentListEl) return;

    if (this.history.length === 0) {
      recentListEl.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding: 2rem; color:var(--text-muted);">
            Nenhum relatório salvo no histórico ainda. Crie seu primeiro relatório no <strong>Estúdio de Criação</strong>!
          </td>
        </tr>
      `;
      return;
    }

    recentListEl.innerHTML = this.history.slice(0, 5).map(item => `
      <tr>
        <td><strong>${item.meta.referenceCode || 'REF-N/A'}</strong></td>
        <td>${item.meta.reportTitle || 'Sem título'}</td>
        <td><span class="badge badge-primary">${item.category || 'Geral'}</span></td>
        <td>${new Date(item.savedAt).toLocaleDateString('pt-BR')}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="app.loadReportFromHistory('${item.id}')">Abrir no Estúdio</button>
        </td>
      </tr>
    `).join('');
  }

  renderTemplates() {
    const gridEl = document.getElementById('templates-grid-container');
    if (!gridEl) return;

    gridEl.innerHTML = REPORT_TEMPLATES.map(tpl => `
      <div class="template-card">
        <div>
          <div class="template-icon-header">${tpl.icon}</div>
          <div class="template-title">${tpl.title}</div>
          <div class="template-desc">${tpl.description}</div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:1rem;">
          <span class="badge badge-cyan">${tpl.category}</span>
          <button class="btn btn-primary btn-sm" onclick="app.useTemplate('${tpl.id}')">Usar Modelo →</button>
        </div>
      </div>
    `).join('');
  }

  useTemplate(templateId) {
    this.loadDefaultTemplate(templateId);
    this.navigateTo('studio');
    this.showToast("Modelo carregado no Estúdio de Criação!");
  }

  renderHistory() {
    const listContainer = document.getElementById('history-table-body');
    if (!listContainer) return;

    if (this.history.length === 0) {
      listContainer.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding: 2rem; color:var(--text-muted);">
            Nenhum relatório arquivado no momento.
          </td>
        </tr>
      `;
      return;
    }

    listContainer.innerHTML = this.history.map(item => `
      <tr>
        <td><strong>${item.meta.referenceCode || 'REF-00'}</strong></td>
        <td>${item.meta.reportTitle}</td>
        <td>${item.meta.responsible || 'N/A'}</td>
        <td><span class="badge badge-success">${item.category}</span></td>
        <td>${new Date(item.savedAt).toLocaleString('pt-BR')}</td>
        <td style="display:flex; gap:0.4rem;">
          <button class="btn btn-secondary btn-sm" onclick="app.loadReportFromHistory('${item.id}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="app.deleteHistoryItem('${item.id}')">Excluir</button>
        </td>
      </tr>
    `).join('');
  }

  loadReportFromHistory(historyId) {
    const found = this.history.find(h => h.id === historyId);
    if (!found) return;

    this.currentReport = JSON.parse(JSON.stringify(found.reportData));
    this.populateEditorForm();
    this.renderModularBlocksEditor();
    this.updateLivePreview();
    this.navigateTo('studio');
    this.showToast(`Relatório "${this.currentReport.meta.reportTitle}" carregado com sucesso!`);
  }

  deleteHistoryItem(historyId) {
    if (confirm("Tem certeza que deseja excluir este relatório do histórico?")) {
      this.history = this.history.filter(h => h.id !== historyId);
      this.saveStorage();
      this.renderHistory();
      this.renderDashboard();
      this.showToast("Relatório excluído do histórico.");
    }
  }

  /* ==========================================================================
     Capacitações & Treinamentos Management
     ========================================================================== */
  renderTrainings() {
    // Calcular Métricas
    const totalTrainings = this.trainings.length;
    const completedTrainings = this.trainings.filter(t => t.status === 'Concluída').length;
    const activeTrainings = this.trainings.filter(t => t.status === 'Em Andamento' || t.status === 'Planejada').length;
    
    // Alunos formados ou concluintes
    const totalGraduated = this.trainings.reduce((sum, t) => sum + (parseInt(t.graduated) || (t.status === 'Concluída' ? parseInt(t.enrolled || 0) : 0)), 0);
    const totalHours = this.trainings.reduce((sum, t) => sum + (parseInt(t.hours) || 0), 0);

    const totalEl = document.getElementById('train-total-count');
    const compEl = document.getElementById('train-completed-count');
    const actEl = document.getElementById('train-active-count');
    const studEl = document.getElementById('train-students-count');
    const hourEl = document.getElementById('train-total-hours');
    const badgeEl = document.getElementById('train-count-badge');

    if (totalEl) totalEl.innerText = totalTrainings;
    if (compEl) compEl.innerText = completedTrainings;
    if (actEl) actEl.innerText = activeTrainings;
    if (studEl) studEl.innerText = `${totalGraduated} alunos`;
    if (hourEl) hourEl.innerText = `${totalHours}h`;
    if (badgeEl) badgeEl.innerText = `${totalTrainings} registros`;

    this.filterTrainings();
  }

  filterTrainings() {
    const tableBody = document.getElementById('trainings-table-body');
    if (!tableBody) return;

    const query = (document.getElementById('train-search-query')?.value || '').toLowerCase().trim();
    const statusFilter = document.getElementById('train-filter-status')?.value || 'all';
    const modalityFilter = document.getElementById('train-filter-modality')?.value || 'all';

    let filtered = this.trainings.filter(t => {
      // Filtro de Texto
      const matchesText = !query || 
        (t.code && t.code.toLowerCase().includes(query)) ||
        (t.title && t.title.toLowerCase().includes(query)) ||
        (t.instructor && t.instructor.toLowerCase().includes(query)) ||
        (t.location && t.location.toLowerCase().includes(query)) ||
        (t.category && t.category.toLowerCase().includes(query));

      // Filtro de Status
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;

      // Filtro de Modalidade
      const matchesModality = modalityFilter === 'all' || t.modality === modalityFilter;

      return matchesText && matchesStatus && matchesModality;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center; padding: 2.5rem 1rem; color:var(--text-muted);">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
            <p>Nenhuma capacitação encontrada com os filtros selecionados.</p>
            <button class="btn btn-secondary btn-sm" style="margin-top: 0.75rem;" onclick="document.getElementById('train-search-query').value=''; document.getElementById('train-filter-status').value='all'; document.getElementById('train-filter-modality').value='all'; app.filterTrainings();">Limpar Filtros</button>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(t => {
      // Status Badge class
      let statusBadgeClass = 'badge-status-planejada';
      if (t.status === 'Concluída') statusBadgeClass = 'badge-status-concluida';
      else if (t.status === 'Em Andamento') statusBadgeClass = 'badge-status-andamento';
      else if (t.status === 'Cancelada') statusBadgeClass = 'badge-status-cancelada';

      // Format Date
      let dateDisplay = t.startDate ? new Date(t.startDate + 'T00:00:00').toLocaleDateString('pt-BR') : 'A definir';
      if (t.endDate && t.endDate !== t.startDate) {
        dateDisplay += ` até ${new Date(t.endDate + 'T00:00:00').toLocaleDateString('pt-BR')}`;
      }

      // Format Attendees
      let attendeesDisplay = `${t.enrolled || 0} / ${t.vacancies || '-'}`;
      if (t.status === 'Concluída' && t.graduated !== undefined) {
        attendeesDisplay += ` (${t.graduated} formados)`;
      }

      return `
        <tr>
          <td><span class="badge badge-primary" style="font-family:monospace; font-size:0.8rem;">${this.escapeHtml(t.code || 'CAP-00')}</span></td>
          <td>
            <strong style="color:var(--text-primary); cursor:pointer;" onclick="app.viewTrainingDetails('${t.id}')">${this.escapeHtml(t.title)}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">${this.escapeHtml(t.category || 'Geral')} • ${this.escapeHtml(t.target || 'Público Geral')}</div>
          </td>
          <td style="font-size:0.85rem; white-space:nowrap;">${dateDisplay}</td>
          <td>
            <div style="font-size:0.85rem;">${this.escapeHtml(t.location || 'CECATE')}</div>
            <span class="badge badge-modality" style="font-size:0.7rem; margin-top:2px;">${this.escapeHtml(t.modality || 'Presencial')}</span>
          </td>
          <td style="font-size:0.85rem; font-weight:500;">${this.escapeHtml(t.instructor || 'N/A')}</td>
          <td><span class="badge badge-cyan">${t.hours || 0}h</span></td>
          <td style="font-size:0.85rem;">${attendeesDisplay}</td>
          <td><span class="badge ${statusBadgeClass}">${this.escapeHtml(t.status || 'Planejada')}</span></td>
          <td style="text-align:right;">
            <div style="display:inline-flex; gap:0.35rem;">
              <button class="btn btn-secondary btn-sm" onclick="app.viewTrainingDetails('${t.id}')" title="Visualizar Ficha Técnica">👁️</button>
              <button class="btn btn-secondary btn-sm" onclick="app.generateTrainingReport('${t.id}')" title="Gerar Relatório Técnico no Estúdio">⚡ Relatório</button>
              <button class="btn btn-secondary btn-sm" onclick="app.openEditTrainingModal('${t.id}')" title="Editar Capacitação">✏️</button>
              <button class="btn btn-danger btn-sm" onclick="app.deleteTraining('${t.id}')" title="Excluir">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  generateRandomTrainingCode() {
    const year = new Date().getFullYear();
    const count = this.trainings.length + 1;
    const nextCode = `CAP-${year}-${String(count).padStart(3, '0')}`;
    const codeInput = document.getElementById('train-code');
    if (codeInput) codeInput.value = nextCode;
  }

  openNewTrainingModal() {
    const form = document.getElementById('form-training-record');
    if (form) form.reset();

    const titleEl = document.getElementById('modal-training-form-title');
    if (titleEl) titleEl.innerHTML = "🎓 Nova Capacitação CECATE";

    document.getElementById('train-id').value = '';
    this.generateRandomTrainingCode();

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('train-start-date').value = today;
    document.getElementById('train-status').value = 'Planejada';
    document.getElementById('train-modality').value = 'Presencial';
    document.getElementById('train-vacancies').value = '30';
    document.getElementById('train-enrolled').value = '0';
    document.getElementById('train-graduated').value = '0';

    this.openModal('modal-training-form');
  }

  openEditTrainingModal(id) {
    const t = this.trainings.find(item => item.id === id);
    if (!t) return;

    this.closeModal('modal-training-details');

    const titleEl = document.getElementById('modal-training-form-title');
    if (titleEl) titleEl.innerHTML = `✏️ Editar Capacitação • ${t.code}`;

    document.getElementById('train-id').value = t.id;
    document.getElementById('train-code').value = t.code || '';
    document.getElementById('train-category').value = t.category || 'Tecnologia & Automação';
    document.getElementById('train-title').value = t.title || '';
    document.getElementById('train-instructor').value = t.instructor || '';
    document.getElementById('train-target').value = t.target || '';
    document.getElementById('train-start-date').value = t.startDate || '';
    document.getElementById('train-end-date').value = t.endDate || '';
    document.getElementById('train-schedule').value = t.schedule || '';
    document.getElementById('train-location').value = t.location || '';
    document.getElementById('train-modality').value = t.modality || 'Presencial';
    document.getElementById('train-status').value = t.status || 'Planejada';
    document.getElementById('train-hours').value = t.hours || '';
    document.getElementById('train-vacancies').value = t.vacancies || '';
    document.getElementById('train-enrolled').value = t.enrolled || 0;
    document.getElementById('train-graduated').value = t.graduated || 0;
    document.getElementById('train-syllabus').value = t.syllabus || '';
    document.getElementById('train-notes').value = t.notes || '';

    this.openModal('modal-training-form');
  }

  saveTrainingFromModal(e) {
    if (e) e.preventDefault();

    const id = document.getElementById('train-id').value;
    const code = document.getElementById('train-code').value.trim();
    const title = document.getElementById('train-title').value.trim();
    const category = document.getElementById('train-category').value;
    const instructor = document.getElementById('train-instructor').value.trim();
    const target = document.getElementById('train-target').value.trim();
    const startDate = document.getElementById('train-start-date').value;
    const endDate = document.getElementById('train-end-date').value;
    const schedule = document.getElementById('train-schedule').value.trim();
    const location = document.getElementById('train-location').value.trim();
    const modality = document.getElementById('train-modality').value;
    const status = document.getElementById('train-status').value;
    const hours = parseInt(document.getElementById('train-hours').value) || 0;
    const vacancies = parseInt(document.getElementById('train-vacancies').value) || 0;
    const enrolled = parseInt(document.getElementById('train-enrolled').value) || 0;
    const graduated = parseInt(document.getElementById('train-graduated').value) || 0;
    const syllabus = document.getElementById('train-syllabus').value.trim();
    const notes = document.getElementById('train-notes').value.trim();

    if (!code || !title || !instructor || !location || !startDate) {
      this.showToast("Por favor, preencha todos os campos obrigatórios (*).", "warning");
      return;
    }

    if (id) {
      // Edição
      const idx = this.trainings.findIndex(item => item.id === id);
      if (idx !== -1) {
        this.trainings[idx] = {
          ...this.trainings[idx],
          code, title, category, instructor, target, startDate, endDate, schedule,
          location, modality, status, hours, vacancies, enrolled, graduated, syllabus, notes,
          updatedAt: new Date().toISOString()
        };
        this.showToast(`Capacitação ${code} atualizada com sucesso!`, 'success');
      }
    } else {
      // Nova
      const newTraining = {
        id: `train_${Date.now()}`,
        code, title, category, instructor, target, startDate, endDate, schedule,
        location, modality, status, hours, vacancies, enrolled, graduated, syllabus, notes,
        createdAt: new Date().toISOString()
      };
      this.trainings.unshift(newTraining);
      this.showToast(`Nova capacitação ${code} cadastrada com sucesso!`, 'success');
    }

    this.saveStorage();
    this.renderTrainings();
    this.closeModal('modal-training-form');
  }

  deleteTraining(id) {
    const t = this.trainings.find(item => item.id === id);
    if (!t) return;

    if (confirm(`Deseja realmente excluir a capacitação "${t.code} - ${t.title}"?`)) {
      this.trainings = this.trainings.filter(item => item.id !== id);
      this.saveStorage();
      this.renderTrainings();
      this.showToast(`Capacitação ${t.code} excluída.`);
    }
  }

  viewTrainingDetails(id) {
    const t = this.trainings.find(item => item.id === id);
    if (!t) return;

    this.activeTrainingId = id;
    const container = document.getElementById('training-details-content');
    if (!container) return;

    let statusBadgeClass = 'badge-status-planejada';
    if (t.status === 'Concluída') statusBadgeClass = 'badge-status-concluida';
    else if (t.status === 'Em Andamento') statusBadgeClass = 'badge-status-andamento';
    else if (t.status === 'Cancelada') statusBadgeClass = 'badge-status-cancelada';

    let dateDisplay = t.startDate ? new Date(t.startDate + 'T00:00:00').toLocaleDateString('pt-BR') : 'A definir';
    if (t.endDate && t.endDate !== t.startDate) {
      dateDisplay += ` até ${new Date(t.endDate + 'T00:00:00').toLocaleDateString('pt-BR')}`;
    }

    const completionRate = (t.enrolled > 0 && t.graduated) 
      ? Math.min(100, Math.round((t.graduated / t.enrolled) * 100)) + '%' 
      : (t.status === 'Concluída' ? '100%' : 'Em andamento');

    container.innerHTML = `
      <div class="training-detail-header">
        <div>
          <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.5rem;">
            <span class="badge badge-primary" style="font-family:monospace; font-size:0.9rem;">${this.escapeHtml(t.code)}</span>
            <span class="badge badge-cyan">${this.escapeHtml(t.category || 'Geral')}</span>
            <span class="badge badge-modality">${this.escapeHtml(t.modality || 'Presencial')}</span>
            <span class="badge ${statusBadgeClass}">${this.escapeHtml(t.status)}</span>
          </div>
          <h2 style="font-size:1.35rem; color:var(--text-primary); margin:0;">${this.escapeHtml(t.title)}</h2>
        </div>
      </div>

      <div class="training-detail-grid">
        <div class="training-detail-card">
          <div class="training-detail-card-label">Instrutor / Facilitador</div>
          <div class="training-detail-card-value">${this.escapeHtml(t.instructor || 'N/A')}</div>
        </div>

        <div class="training-detail-card">
          <div class="training-detail-card-label">Local / Plataforma</div>
          <div class="training-detail-card-value">${this.escapeHtml(t.location || 'CECATE')}</div>
        </div>

        <div class="training-detail-card">
          <div class="training-detail-card-label">Período / Datas</div>
          <div class="training-detail-card-value" style="font-size:0.95rem;">${dateDisplay}</div>
        </div>

        <div class="training-detail-card">
          <div class="training-detail-card-label">Carga Horária</div>
          <div class="training-detail-card-value" style="color:var(--accent-secondary);">${t.hours || 0} Horas</div>
        </div>

        <div class="training-detail-card">
          <div class="training-detail-card-label">Inscritos / Vagas</div>
          <div class="training-detail-card-value">${t.enrolled || 0} / ${t.vacancies || '-'}</div>
        </div>

        <div class="training-detail-card">
          <div class="training-detail-card-label">Concluintes / Taxa</div>
          <div class="training-detail-card-value" style="color:var(--accent-success);">${t.graduated || 0} (${completionRate})</div>
        </div>
      </div>

      ${t.schedule ? `
        <div style="margin-bottom:1rem; font-size:0.9rem;">
          <strong style="color:var(--text-primary);">🕒 Horário / Turno:</strong> <span style="color:var(--text-secondary);">${this.escapeHtml(t.schedule)}</span>
        </div>
      ` : ''}

      ${t.target ? `
        <div style="margin-bottom:1rem; font-size:0.9rem;">
          <strong style="color:var(--text-primary);">👥 Público-Alvo:</strong> <span style="color:var(--text-secondary);">${this.escapeHtml(t.target)}</span>
        </div>
      ` : ''}

      ${t.syllabus ? `
        <div>
          <label class="form-label" style="font-weight:700; color:var(--text-primary); margin-bottom:0.4rem;">📖 Conteúdo Programático & Ementa:</label>
          <div class="training-ementa-box" style="white-space: pre-line;">${this.escapeHtml(t.syllabus)}</div>
        </div>
      ` : ''}

      ${t.notes ? `
        <div style="margin-top:1rem;">
          <label class="form-label" style="font-weight:700; color:var(--text-primary); margin-bottom:0.4rem;">📌 Observações & Requisitos:</label>
          <div class="training-ementa-box" style="background:rgba(255,255,255,0.02); font-size:0.875rem; white-space: pre-line;">${this.escapeHtml(t.notes)}</div>
        </div>
      ` : ''}
    `;

    // Atualizar botões de ação do rodapé
    const editBtn = document.getElementById('btn-edit-from-details');
    const reportBtn = document.getElementById('btn-report-from-details');
    if (editBtn) editBtn.onclick = () => this.openEditTrainingModal(id);
    if (reportBtn) reportBtn.onclick = () => this.generateTrainingReport(id);

    this.openModal('modal-training-details');
  }

  /**
   * Integração com o Estúdio: Cria um relatório técnico completo com base na capacitação selecionada
   */
  generateTrainingReport(id) {
    const t = this.trainings.find(item => item.id === id);
    if (!t) return;

    this.closeModal('modal-training-details');

    const templateBase = REPORT_TEMPLATES.find(tpl => tpl.id === 'training_capacity') || REPORT_TEMPLATES[0];
    const customReport = JSON.parse(JSON.stringify(templateBase));

    // Configurar Metadados com base na capacitação
    customReport.meta = {
      orgName: this.orgSettings.defaultOrgName || "CECATE Soluções Tecnológicas",
      reportTitle: `Relatório Técnico de Capacitação: ${t.title}`,
      responsible: t.instructor || this.orgSettings.defaultSigner || "Coordenação Geral",
      department: t.target || this.orgSettings.defaultDepartment || "Desenvolvimento de Talentos",
      date: t.endDate || t.startDate || new Date().toISOString().split('T')[0],
      referenceCode: t.code || "CAP-2026",
      period: t.startDate ? `${t.startDate} a ${t.endDate || t.startDate}` : "Ciclo Vigente"
    };

    // Calcular KPIs
    const completionRate = (t.enrolled > 0 && t.graduated) 
      ? Math.min(100, Math.round((t.graduated / t.enrolled) * 100)) + '%' 
      : '100%';

    customReport.defaultKpis = [
      { label: "Taxa de Conclusão", value: completionRate, status: "success" },
      { label: "Alunos Capacitados", value: `${t.graduated || t.enrolled || 0} alunos`, status: "success" },
      { label: "Carga Horária", value: `${t.hours || 0} horas`, status: "success" },
      { label: "Modalidade / Local", value: `${t.modality || 'Presencial'}`, status: "success" }
    ];

    // Ajustar blocos com informações personalizadas
    customReport.blocks.forEach(b => {
      if (b.type === 'executive_summary') {
        b.content = `O presente relatório técnico atesta a realização da capacitação **${t.title}** (${t.code}), executada no período de **${t.startDate || 'N/A'}** a **${t.endDate || t.startDate || 'N/A'}** no local **${t.location}** (${t.modality}). A facilitação foi conduzida por **${t.instructor}** para o público de **${t.target || 'Técnicos e Analistas'}**, totalizando **${t.hours} horas** de atividades teóricas e laboratoriais.`;
      } else if (b.type === 'kpi_metrics') {
        b.kpis = [
          { label: "Taxa de Conclusão", value: completionRate, change: "Meta atingida" },
          { label: "Total de Concluintes", value: `${t.graduated || t.enrolled || 0}`, change: `De ${t.enrolled || t.vacancies || 0} inscritos` },
          { label: "Carga Horária", value: `${t.hours}h`, change: "100% ministrada" },
          { label: "Status da Turma", value: `${t.status}`, change: t.category }
        ];
      } else if (b.type === 'data_table' && t.syllabus) {
        // Tentar extrair módulos da ementa se houver
        const lines = t.syllabus.split('\n').filter(l => l.trim().length > 0);
        if (lines.length > 0) {
          b.rows = lines.map((line, i) => [`Módulo 0${i+1}`, line.replace(/^Módulo \d+:? ?/i, ''), `${Math.round((t.hours || 40) / lines.length)}h`, "100%", "Concluído"]);
        }
      }
    });

    this.currentReport = customReport;
    this.populateEditorForm();
    this.renderModularBlocksEditor();
    this.updateLivePreview();
    this.navigateTo('studio');
    this.showToast(`Relatório para "${t.code} - ${t.title}" gerado com sucesso no Estúdio!`, 'success');
  }

  exportTrainingsCSV() {
    if (this.trainings.length === 0) {
      this.showToast("Nenhuma capacitação para exportar.", "warning");
      return;
    }

    const headers = ["Código", "Título", "Categoria", "Instrutor", "Público-Alvo", "Data Início", "Data Fim", "Local", "Modalidade", "Status", "Carga Horária (h)", "Vagas", "Inscritos", "Concluintes"];
    
    const rows = this.trainings.map(t => [
      `"${t.code || ''}"`,
      `"${(t.title || '').replace(/"/g, '""')}"`,
      `"${t.category || ''}"`,
      `"${(t.instructor || '').replace(/"/g, '""')}"`,
      `"${(t.target || '').replace(/"/g, '""')}"`,
      `"${t.startDate || ''}"`,
      `"${t.endDate || ''}"`,
      `"${(t.location || '').replace(/"/g, '""')}"`,
      `"${t.modality || ''}"`,
      `"${t.status || ''}"`,
      t.hours || 0,
      t.vacancies || 0,
      t.enrolled || 0,
      t.graduated || 0
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `cecate_capacitacoes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    this.showToast("Planilha CSV exportada com sucesso!", "success");
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     UI Modals & Toasts
     ========================================================================== */
  openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('open');
  }

  closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('open');
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  /* ==========================================================================
     Global Event Bindings
     ========================================================================== */
  bindEvents() {
    // Navigation items click
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        if (view) this.navigateTo(view);
      });
    });

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Modal Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-backdrop');
        if (modal) modal.classList.remove('open');
      });
    });

    // Settings save form
    const settingsForm = document.getElementById('global-settings-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.orgSettings.defaultOrgName = document.getElementById('setting-org-name')?.value || '';
        this.orgSettings.defaultDepartment = document.getElementById('setting-dept-name')?.value || '';
        this.orgSettings.defaultSigner = document.getElementById('setting-signer-name')?.value || '';
        this.saveStorage();
        this.showToast("Configurações institucionais salvas com sucesso!", 'success');
      });
    }
  }
}

// Inicializar a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AutoReportApp();
});
