/**
 * AutoReport CECATE - Banco de Dados Local (IndexedDB & State Management)
 * Versão: v.1.0.3
 */

class TrainingDB {
  constructor() {
    this.dbName = 'AutoReportCECATE_DB';
    this.dbVersion = 1;
    this.db = null;
    this.isReady = false;
    this.autoSaveTimers = {};
  }

  /**
   * Inicializa a conexão com o IndexedDB e cria os Object Stores
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // 1. Capacitações (Mestre)
        if (!db.objectStoreNames.contains('trainings')) {
          const store = db.createObjectStore('trainings', { keyPath: 'id' });
          store.createIndex('number', 'number', { unique: false });
          store.createIndex('updatedAt', 'updatedAt', { unique: false });
          store.createIndex('status', 'status', { unique: false });
        }

        // 2. Integrantes da Equipe por Capacitação
        if (!db.objectStoreNames.contains('team')) {
          const store = db.createObjectStore('team', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
        }

        // 3. Municípios por Capacitação
        if (!db.objectStoreNames.contains('municipalities')) {
          const store = db.createObjectStore('municipalities', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
          store.createIndex('ibgeCode', 'ibgeCode', { unique: false });
        }

        // 4. Módulos e Estrutura do Curso
        if (!db.objectStoreNames.contains('courseModules')) {
          const store = db.createObjectStore('courseModules', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
        }

        // 5. Momentos / Desenvolvimento do Curso
        if (!db.objectStoreNames.contains('courseMoments')) {
          const store = db.createObjectStore('courseMoments', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
        }

        // 6. Lista de Presença & Participantes
        if (!db.objectStoreNames.contains('attendance')) {
          const store = db.createObjectStore('attendance', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
          store.createIndex('cpf', 'cpf', { unique: false });
          store.createIndex('municipality', 'municipality', { unique: false });
        }

        // 7. Avaliações (Respostas de Pesquisa)
        if (!db.objectStoreNames.contains('evaluations')) {
          const store = db.createObjectStore('evaluations', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
          store.createIndex('cpf', 'cpf', { unique: false });
        }

        // 8. Registros Fotográficos e Documentos de Apêndice
        if (!db.objectStoreNames.contains('media')) {
          const store = db.createObjectStore('media', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
          store.createIndex('type', 'type', { unique: false });
        }

        // 9. Histórico de Alterações / Auditoria
        if (!db.objectStoreNames.contains('auditLog')) {
          const store = db.createObjectStore('auditLog', { keyPath: 'id' });
          store.createIndex('trainingId', 'trainingId', { unique: false });
        }

        // 10. Catálogo Global de Equipe (Reutilizável)
        if (!db.objectStoreNames.contains('globalTeamCatalog')) {
          db.createObjectStore('globalTeamCatalog', { keyPath: 'id' });
        }

        // 11. Modelos e Templates de Texto
        if (!db.objectStoreNames.contains('templates')) {
          db.createObjectStore('templates', { keyPath: 'id' });
        }
      };

      request.onsuccess = async (event) => {
        this.db = event.target.result;
        this.isReady = true;
        await this.seedInitialData();
        resolve(this);
      };

      request.onerror = (event) => {
        console.error('Erro ao abrir IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  /* ==========================================================================
     CRUD Genérico
     ========================================================================== */
  async put(storeName, item) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async get(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async getByIndex(storeName, indexName, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async clearStoreByIndex(storeName, indexName, value) {
    const items = await this.getByIndex(storeName, indexName, value);
    for (const item of items) {
      await this.delete(storeName, item.id);
    }
  }

  /* ==========================================================================
     MÉTODOS ESPECÍFICOS: CAPACITAÇÕES
     ========================================================================== */
  async getAllTrainings() {
    const trainings = await this.getAll('trainings');
    return trainings.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  }

  async getTrainingFull(trainingId) {
    const training = await this.get('trainings', trainingId);
    if (!training) return null;

    const [team, municipalities, courseModules, courseMoments, attendance, evaluations, media, auditLog] = await Promise.all([
      this.getByIndex('team', 'trainingId', trainingId),
      this.getByIndex('municipalities', 'trainingId', trainingId),
      this.getByIndex('courseModules', 'trainingId', trainingId),
      this.getByIndex('courseMoments', 'trainingId', trainingId),
      this.getByIndex('attendance', 'trainingId', trainingId),
      this.getByIndex('evaluations', 'trainingId', trainingId),
      this.getByIndex('media', 'trainingId', trainingId),
      this.getByIndex('auditLog', 'trainingId', trainingId)
    ]);

    return {
      ...training,
      team: team.sort((a, b) => (a.order || 0) - (b.order || 0)),
      municipalities: municipalities.sort((a, b) => (a.name || '').localeCompare(b.name || '')),
      courseModules: courseModules.sort((a, b) => (a.order || 0) - (b.order || 0)),
      courseMoments: courseMoments.sort((a, b) => (a.order || 0) - (b.order || 0)),
      attendance: attendance.sort((a, b) => (a.name || '').localeCompare(b.name || '')),
      evaluations,
      media: media.sort((a, b) => (a.order || 0) - (b.order || 0)),
      auditLog: auditLog.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    };
  }

  async saveTrainingFull(data, changeSummary = 'Atualização geral dos dados') {
    const trainingId = data.id || `cap_${Date.now()}`;
    const now = new Date().toISOString();

    const trainingRecord = {
      id: trainingId,
      number: data.number || 16,
      title: data.title || 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
      polo: data.polo || 'Pontes e Lacerda',
      uf: data.uf || 'MT',
      startDate: data.startDate || '2026-06-23',
      endDate: data.endDate || '2026-06-24',
      datesFormatted: data.datesFormatted || '23 e 24 de junho de 2026',
      workload: data.workload || '16 horas',
      targetAudience: data.targetAudience || 'Gestores Municipais e Conselheiros CACS-FUNDEB',
      expectedParticipants: data.expectedParticipants || 50,
      responsibleOrg: data.responsibleOrg || 'Universidade Federal de Goiás - UFG / CECATE Centro-Oeste',
      relatedProject: data.relatedProject || 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL',
      processNumber: data.processNumber || '23070.012345/2026-00',
      fundingOrg: data.fundingOrg || 'Fundo Nacional de Desenvolvimento da Educação - FNDE',
      partnerOrgs: data.partnerOrgs || 'Ministério da Educação / Prefeituras Municipais',
      locationVenue: data.locationVenue || 'Auditório Municipal',
      contactsData: data.contactsData || {
        startDate: '2026-05-10',
        methods: 'Ofícios, E-mails, Telefones e WhatsApp',
        responsible: 'Equipe de Articulação Institucional CECATE-CO',
        contactedCount: 14,
        notContactedCount: 0,
        emailsSent: 28,
        phoneCalls: 42,
        notes: 'Todos os municípios da microrregião foram contatados com antecedência.'
      },
      texts: data.texts || {
        intro: '',
        development: '',
        finalConsiderations: ''
      },
      status: data.status || 'in_progress',
      progressPercent: data.progressPercent || 0,
      createdAt: data.createdAt || now,
      updatedAt: now
    };

    // Salvar registro mestre
    await this.put('trainings', trainingRecord);

    // Salvar registros filhos se fornecidos
    if (Array.isArray(data.team)) {
      await this.clearStoreByIndex('team', 'trainingId', trainingId);
      for (const [idx, member] of data.team.entries()) {
        await this.put('team', {
          id: member.id || `team_${trainingId}_${idx}_${Date.now()}`,
          trainingId,
          name: member.name,
          institution: member.institution || 'UFG',
          role: member.role || 'Instrutor',
          type: member.type || 'tecnica',
          order: member.order !== undefined ? member.order : idx
        });
      }
    }

    if (Array.isArray(data.municipalities)) {
      await this.clearStoreByIndex('municipalities', 'trainingId', trainingId);
      for (const [idx, m] of data.municipalities.entries()) {
        await this.put('municipalities', {
          id: m.id || `mun_${trainingId}_${m.ibgeCode || idx}`,
          trainingId,
          ibgeCode: m.ibgeCode,
          name: m.name,
          uf: m.uf || data.uf,
          distanceKm: parseFloat(m.distanceKm) || 0,
          isSummoned: m.isSummoned !== false,
          inscribedCACS: parseInt(m.inscribedCACS) || 0,
          inscribedGestores: parseInt(m.inscribedGestores) || 0,
          inscribedTotal: parseInt(m.inscribedTotal) || ((parseInt(m.inscribedCACS) || 0) + (parseInt(m.inscribedGestores) || 0)),
          presentCACS: parseInt(m.presentCACS) || 0,
          presentGestores: parseInt(m.presentGestores) || 0,
          presentTotal: parseInt(m.presentTotal) || ((parseInt(m.presentCACS) || 0) + (parseInt(m.presentGestores) || 0))
        });
      }
    }

    if (Array.isArray(data.courseModules)) {
      await this.clearStoreByIndex('courseModules', 'trainingId', trainingId);
      for (const [idx, mod] of data.courseModules.entries()) {
        await this.put('courseModules', {
          id: mod.id || `mod_${trainingId}_${idx}`,
          trainingId,
          moduleNumber: mod.moduleNumber || `0${idx + 1}`,
          topicGestor: mod.topicGestor || '',
          topicCACS: mod.topicCACS || '',
          hoursGestor: parseFloat(mod.hoursGestor) || 0,
          hoursCACS: parseFloat(mod.hoursCACS) || 0,
          description: mod.description || '',
          order: mod.order !== undefined ? mod.order : idx
        });
      }
    }

    if (Array.isArray(data.courseMoments)) {
      await this.clearStoreByIndex('courseMoments', 'trainingId', trainingId);
      for (const [idx, mom] of data.courseMoments.entries()) {
        await this.put('courseMoments', {
          id: mom.id || `mom_${trainingId}_${idx}`,
          trainingId,
          title: mom.title || `Momento ${idx + 1}`,
          description: mom.description || '',
          scheduleTime: mom.scheduleTime || '',
          instructor: mom.instructor || '',
          notes: mom.notes || '',
          photoIds: mom.photoIds || [],
          order: mom.order !== undefined ? mom.order : idx
        });
      }
    }

    if (Array.isArray(data.attendance)) {
      await this.clearStoreByIndex('attendance', 'trainingId', trainingId);
      for (const [idx, att] of data.attendance.entries()) {
        await this.put('attendance', {
          id: att.id || `att_${trainingId}_${idx}`,
          trainingId,
          name: att.name || '',
          cpf: att.cpf || '',
          email: att.email || '',
          phone: att.phone || '',
          birthDate: att.birthDate || '',
          municipality: att.municipality || '',
          ibgeCode: att.ibgeCode || '',
          representation: att.representation || 'Gestão municipal',
          roleGestao: att.roleGestao || '',
          roleCACS: att.roleCACS || '',
          successCase: att.successCase || '',
          isEnrolled: att.isEnrolled !== false,
          isPresent: att.isPresent !== false,
          source: att.source || 'excel'
        });
      }
    }

    if (Array.isArray(data.evaluations)) {
      await this.clearStoreByIndex('evaluations', 'trainingId', trainingId);
      for (const [idx, ev] of data.evaluations.entries()) {
        await this.put('evaluations', {
          id: ev.id || `eval_${trainingId}_${idx}`,
          trainingId,
          timestamp: ev.timestamp || now,
          name: ev.name || '',
          cpf: ev.cpf || '',
          email: ev.email || '',
          phone: ev.phone || '',
          municipality: ev.municipality || '',
          ibgeCode: ev.ibgeCode || '',
          representation: ev.representation || 'Gestão municipal',
          ratings: ev.ratings || [5, 5, 5, 5, 5, 5, 5],
          likedAspects: ev.likedAspects || '',
          improveAspects: ev.improveAspects || '',
          institution: ev.institution || '',
          suggestions: ev.suggestions || '',
          howFound: ev.howFound || '',
          comments: ev.comments || ''
        });
      }
    }

    if (Array.isArray(data.media)) {
      await this.clearStoreByIndex('media', 'trainingId', trainingId);
      for (const [idx, med] of data.media.entries()) {
        await this.put('media', {
          id: med.id || `med_${trainingId}_${idx}`,
          trainingId,
          type: med.type || 'photo',
          blob: med.blob || med.dataUrl || '',
          caption: med.caption || `Figura ${idx + 1}`,
          order: med.order !== undefined ? med.order : idx,
          section: med.section || '6. REGISTROS FOTOGRÁFICOS',
          description: med.description || '',
          source: med.source || 'Arquivo CECATE Centro-Oeste',
          fileName: med.fileName || `foto_${idx + 1}.jpg`
        });
      }
    }

    // Registrar log de auditoria
    await this.put('auditLog', {
      id: `log_${trainingId}_${Date.now()}`,
      trainingId,
      timestamp: now,
      summary: changeSummary
    });

    return trainingId;
  }

  /**
   * Autosave com debounce
   */
  triggerAutoSave(trainingId, getDataCallback, onSavedCallback) {
    if (this.autoSaveTimers[trainingId]) {
      clearTimeout(this.autoSaveTimers[trainingId]);
    }

    const saveStatusBadge = document.getElementById('autosave-status-badge');
    if (saveStatusBadge) {
      saveStatusBadge.innerHTML = '⏳ Salvando alterações...';
      saveStatusBadge.style.color = 'var(--accent-warning)';
    }

    this.autoSaveTimers[trainingId] = setTimeout(async () => {
      try {
        const data = await getDataCallback();
        if (data) {
          await this.saveTrainingFull(data, 'Autosave automático');
          const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
          if (saveStatusBadge) {
            saveStatusBadge.innerHTML = `✓ Salvo às ${timeStr}`;
            saveStatusBadge.style.color = 'var(--accent-success)';
          }
          if (typeof onSavedCallback === 'function') onSavedCallback(data);
        }
      } catch (err) {
        console.error('Erro no autosave:', err);
        if (saveStatusBadge) {
          saveStatusBadge.innerHTML = '⚠️ Erro ao salvar';
          saveStatusBadge.style.color = 'var(--accent-danger)';
        }
      }
    }, 400);
  }

  /**
   * Duplica uma capacitação para servir de modelo para uma nova edição (Regras 63, 64 e 65)
   */
  async duplicateTraining(sourceTrainingId, options = {}) {
    const source = await this.getTrainingFull(sourceTrainingId);
    if (!source) throw new Error('Capacitação de origem não encontrada');

    const opts = {
      copyInstitutional: options.copyInstitutional !== false,
      copyModules: options.copyModules !== false,
      copyMunicipalities: options.copyMunicipalities === true, // Padrão: false para forçar municípios do polo novo
      copyTexts: options.copyTexts !== false,
      copyTeam: options.copyTeam !== false,
      copyEvaluationConfig: options.copyEvaluationConfig !== false,
      copyParticipants: false, // Regra 65: NUNCA copiar participantes individuais de capacitações anteriores
      copyEvaluations: false,  // Regra 65: NUNCA copiar avaliações individuais
      copyPhotos: false,       // Regra 65: NUNCA copiar fotos do evento anterior
      ...options
    };

    const allTrainings = await this.getAll('trainings');
    const maxNum = allTrainings.length > 0 ? Math.max(...allTrainings.map(t => parseInt(t.number) || 0)) : 16;
    const nextNumber = maxNum + 1;
    const newId = `cap_${Date.now()}`;

    const duplicatedData = {
      id: newId,
      number: nextNumber,
      title: source.title || 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
      polo: `${source.polo || 'Novo Polo'} (Baseado na Cap. ${source.number})`,
      uf: source.uf || 'MT',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      datesFormatted: 'A definir',
      workload: source.workload || '16 horas',
      targetAudience: source.targetAudience || 'Gestores Municipais e Conselheiros CACS-FUNDEB',
      expectedParticipants: source.expectedParticipants || 40,
      responsibleOrg: opts.copyInstitutional ? source.responsibleOrg : 'Universidade Federal de Goiás - UFG / CECATE Centro-Oeste',
      relatedProject: opts.copyInstitutional ? source.relatedProject : 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL',
      processNumber: opts.copyInstitutional ? source.processNumber : '23070.012345/2026-00',
      fundingOrg: opts.copyInstitutional ? source.fundingOrg : 'Fundo Nacional de Desenvolvimento da Educação - FNDE',
      partnerOrgs: opts.copyInstitutional ? source.partnerOrgs : '',
      locationVenue: 'Auditório Municipal',
      contactsData: {
        startDate: '',
        methods: source.contactsData?.methods || 'Ofícios, E-mails, Telefones e WhatsApp',
        responsible: source.contactsData?.responsible || 'Equipe de Articulação Institucional CECATE-CO',
        contactedCount: 0,
        notContactedCount: 0,
        emailsSent: 0,
        phoneCalls: 0,
        notes: ''
      },
      texts: opts.copyTexts ? { ...source.texts } : {},
      status: 'in_progress',
      isHistorical: false, // Novo registro em andamento, nunca histórico
      progressPercent: 15,
      team: opts.copyTeam && source.team ? source.team.map((t, idx) => ({ ...t, id: `team_${newId}_${idx}` })) : [],
      courseModules: opts.copyModules && source.courseModules ? source.courseModules.map((m, idx) => ({ ...m, id: `mod_${newId}_${idx}` })) : [],
      municipalities: opts.copyMunicipalities && source.municipalities ? source.municipalities.map((m, idx) => ({
        ...m,
        id: `mun_${newId}_${idx}`,
        inscribedCACS: 0, inscribedGestores: 0, inscribedTotal: 0,
        presentCACS: 0, presentGestores: 0, presentTotal: 0
      })) : [],
      attendance: [],  // Limpo
      evaluations: [], // Limpo
      media: []        // Limpo
    };

    await this.saveTrainingFull(duplicatedData, `Nova capacitação criada com base no modelo da Capacitação Nº ${source.number}`);
    return newId;
  }

  /**
   * Popula dados históricos das Capacitações Nº 6 a 15 e Capacitação Nº 16 (Regra 62 e 72)
   */
  async seedInitialData() {
    const existing = await this.getAll('trainings');
    const existingNumbers = new Set((existing || []).map(t => parseInt(t.number)));

    // 1. Inserir Capacitações Históricas de 6 a 15 a partir de window.HISTORICAL_TRAININGS
    if (window.HISTORICAL_TRAININGS && Array.isArray(window.HISTORICAL_TRAININGS)) {
      for (const hist of window.HISTORICAL_TRAININGS) {
        if (!existingNumbers.has(hist.number)) {
          console.log(`Carregando Capacitação Histórica Nº ${hist.number} (${hist.polo})...`);
          await this.saveTrainingFull({
            ...hist,
            status: 'historico',
            isHistorical: true,
            progressPercent: 100
          }, `Carga histórica da Capacitação Nº ${hist.number} (${hist.polo})`);
          existingNumbers.add(hist.number);
        }
      }
    }

    // 2. Inserir Capacitação Nº 16 (Pontes e Lacerda) se não existir
    if (!existingNumbers.has(16)) {
      console.log('Carregando Capacitação Nº 16 (Pontes e Lacerda)...');

      const defaultModules = [
        { moduleNumber: '01', topicGestor: 'Transporte Escolar no Brasil – CECATE-CO', topicCACS: 'Transporte Escolar no Brasil – CECATE-CO', hoursGestor: 1.5, hoursCACS: 1.5, description: 'Apresentação do CECATE-CO, diretrizes nacionais e papel institucional.', order: 0 },
        { moduleNumber: '02', topicGestor: 'Conhecendo os programas PNATE e Caminho da Escola', topicCACS: 'Conhecendo os programas PNATE e Caminho da Escola', hoursGestor: 1.5, hoursCACS: 1.5, description: 'Legislação aplicável, repasses financeiros e aquisição de frotas padronizadas.', order: 1 },
        { moduleNumber: '03', topicGestor: 'Gestão do Transporte Escolar e Software SETE', topicCACS: 'Fiscalização e Controle Social do Transporte Escolar', hoursGestor: 2.0, hoursCACS: 2.0, description: 'Módulo técnico prático de roteirização e fiscalização in loco.', order: 2 },
        { moduleNumber: '04', topicGestor: 'Prestação de Contas no SiGPC e Desafios Locais', topicCACS: 'Atuação do CACS-FUNDEB e Análise de Contas', hoursGestor: 3.0, hoursCACS: 3.0, description: 'Boas práticas regulatórias, prazos e resolução de problemas práticos.', order: 3 }
      ];

      const defaultTeam = [
        { name: 'Prof. Dr. Willer Luciano Carvalho', institution: 'UFG', role: 'Coordenador Geral do Projeto', type: 'coordenacao', order: 0 },
        { name: 'Eng. M.Sc. Lara Batista Ferreira de Lima', institution: 'UFG', role: 'Pesquisadora e Equipe Técnica', type: 'tecnica', order: 1 },
        { name: 'Eng. M.Sc. Matheus Henrique Morato de Moraes', institution: 'UFG', role: 'Pesquisador e Equipe Técnica', type: 'tecnica', order: 2 },
        { name: 'Prof. Dr. Marcos Paulino Roriz Junior', institution: 'UFG', role: 'Pesquisador e Equipe Técnica', type: 'tecnica', order: 3 },
        { name: 'Prof. Dr. Liosber Medina Garcia', institution: 'UFG', role: 'Pesquisador e Equipe Técnica', type: 'tecnica', order: 4 },
        { name: 'Haroldo da Silva Gomes', institution: 'FNDE', role: 'Coordenador-Geral da Política do Transporte Escolar - CGPTE', type: 'fnde', order: 5 }
      ];

      const default16CTEMunicipalities = [
        { ibgeCode: 5101258, name: 'Araputanga', uf: 'MT', distanceKm: 141.1, isSummoned: true, inscribedCACS: 0, inscribedGestores: 0, inscribedTotal: 0, presentCACS: 0, presentGestores: 0, presentTotal: 0 },
        { ibgeCode: 5102686, name: 'Campos de Júlio', uf: 'MT', distanceKm: 273.2, isSummoned: true, inscribedCACS: 0, inscribedGestores: 3, inscribedTotal: 3, presentCACS: 1, presentGestores: 3, presentTotal: 4 },
        { ibgeCode: 5103304, name: 'Comodoro', uf: 'MT', distanceKm: 197.1, isSummoned: true, inscribedCACS: 0, inscribedGestores: 2, inscribedTotal: 2, presentCACS: 0, presentGestores: 2, presentTotal: 2 },
        { ibgeCode: 5103437, name: 'Curvelândia', uf: 'MT', distanceKm: 206.5, isSummoned: true, inscribedCACS: 0, inscribedGestores: 2, inscribedTotal: 2, presentCACS: 1, presentGestores: 2, presentTotal: 3 },
        { ibgeCode: 5104104, name: 'Glória D\'Oeste', uf: 'MT', distanceKm: 104.8, isSummoned: true, inscribedCACS: 0, inscribedGestores: 0, inscribedTotal: 0, presentCACS: 0, presentGestores: 0, presentTotal: 0 },
        { ibgeCode: 5104609, name: 'Indiavaí', uf: 'MT', distanceKm: 114.2, isSummoned: true, inscribedCACS: 0, inscribedGestores: 2, inscribedTotal: 2, presentCACS: 0, presentGestores: 2, presentTotal: 2 },
        { ibgeCode: 5105002, name: 'Jauru', uf: 'MT', distanceKm: 81.3, isSummoned: true, inscribedCACS: 0, inscribedGestores: 3, inscribedTotal: 3, presentCACS: 1, presentGestores: 3, presentTotal: 4 },
        { ibgeCode: 5105259, name: 'Lambari D\'Oeste', uf: 'MT', distanceKm: 169.4, isSummoned: true, inscribedCACS: 0, inscribedGestores: 1, inscribedTotal: 1, presentCACS: 0, presentGestores: 1, presentTotal: 1 },
        { ibgeCode: 5106182, name: 'Nova Lacerda', uf: 'MT', distanceKm: 100.3, isSummoned: true, inscribedCACS: 0, inscribedGestores: 3, inscribedTotal: 3, presentCACS: 0, presentGestores: 3, presentTotal: 3 },
        { ibgeCode: 5106752, name: 'Pontes e Lacerda', uf: 'MT', distanceKm: 0.0, isSummoned: true, inscribedCACS: 0, inscribedGestores: 3, inscribedTotal: 3, presentCACS: 0, presentGestores: 2, presentTotal: 2 },
        { ibgeCode: 5106828, name: 'Porto Esperidião', uf: 'MT', distanceKm: 122.6, isSummoned: true, inscribedCACS: 0, inscribedGestores: 1, inscribedTotal: 1, presentCACS: 0, presentGestores: 1, presentTotal: 1 },
        { ibgeCode: 5107107, name: 'Reserva do Cabaçal', uf: 'MT', distanceKm: 161.7, isSummoned: true, inscribedCACS: 0, inscribedGestores: 0, inscribedTotal: 0, presentCACS: 0, presentGestores: 0, presentTotal: 0 },
        { ibgeCode: 5107776, name: 'Rio Branco', uf: 'MT', distanceKm: 182.9, isSummoned: true, inscribedCACS: 0, inscribedGestores: 2, inscribedTotal: 2, presentCACS: 0, presentGestores: 2, presentTotal: 2 },
        { ibgeCode: 5107958, name: 'Salto do Céu', uf: 'MT', distanceKm: 178.5, isSummoned: true, inscribedCACS: 0, inscribedGestores: 1, inscribedTotal: 1, presentCACS: 0, presentGestores: 1, presentTotal: 1 },
        { ibgeCode: 5108006, name: 'São José dos Quatro Marcos', uf: 'MT', distanceKm: 170.2, isSummoned: true, inscribedCACS: 0, inscribedGestores: 1, inscribedTotal: 1, presentCACS: 0, presentGestores: 0, presentTotal: 0 },
        { ibgeCode: 5108402, name: 'Vale de São Domingos', uf: 'MT', distanceKm: 46.8, isSummoned: true, inscribedCACS: 0, inscribedGestores: 3, inscribedTotal: 3, presentCACS: 0, presentGestores: 3, presentTotal: 3 },
        { ibgeCode: 5108857, name: 'Vila Bela da Santíssima Trindade', uf: 'MT', distanceKm: 76.9, isSummoned: true, inscribedCACS: 0, inscribedGestores: 2, inscribedTotal: 2, presentCACS: 0, presentGestores: 2, presentTotal: 2 }
      ];

      const sample16CTE = {
        id: 'cap_16cte_pontes_lacerda',
        number: 16,
        title: 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
        polo: 'Pontes e Lacerda',
        uf: 'MT',
        startDate: '2026-06-23',
        endDate: '2026-06-24',
        datesFormatted: '23 e 24 de junho de 2026',
        workload: '16 horas',
        targetAudience: 'Gestores Municipais e Conselheiros CACS-FUNDEB',
        expectedParticipants: 40,
        responsibleOrg: 'Universidade Federal de Goiás - UFG / CECATE Centro-Oeste',
        relatedProject: 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL',
        processNumber: '23070.012345/2026-00',
        fundingOrg: 'Fundo Nacional de Desenvolvimento da Educação - FNDE',
        partnerOrgs: 'Ministério da Educação / Prefeitura Municipal de Pontes e Lacerda',
        locationVenue: 'Auditório da Secretaria Municipal de Educação',
        status: 'completed',
        isHistorical: false,
        progressPercent: 100,
        team: defaultTeam,
        courseModules: defaultModules,
        municipalities: default16CTEMunicipalities
      };

      await this.saveTrainingFull(sample16CTE, 'Carga da Capacitação Nº 16 (Pontes e Lacerda)');
    }
  }
}

// Singleton global
window.db = new TrainingDB();
