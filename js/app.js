/**
 * AutoReport CECATE - Aplicação Principal (SPA Controller & UI Manager)
 */

class AutoReportApp {
  constructor() {
    this.currentReport = null;
    this.history = [];
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
    } catch (e) {
      console.warn("Erro ao carregar dados do localStorage:", e);
    }
  }

  saveStorage() {
    try {
      localStorage.setItem('autoreport_history', JSON.stringify(this.history));
      localStorage.setItem('autoreport_settings', JSON.stringify(this.orgSettings));
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
      studio: "Estúdio de Criação & Automação de Relatórios",
      templates: "Biblioteca de Modelos Prontos",
      history: "Arquivo & Histórico de Relatórios Gerados",
      settings: "Configurações Globais & Identidade Visual"
    };
    const titleEl = document.getElementById('page-current-title');
    if (titleEl) titleEl.innerText = titleMap[viewId] || "AutoReport CECATE";

    // Atualizações específicas por tela
    if (viewId === 'dashboard') this.renderDashboard();
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
