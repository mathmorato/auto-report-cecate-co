/**
 * AutoReport CECATE - Modelo Padrão Oficial e Estrutura do Curso
 * Versão: v.1.9.2
 */

window.DEFAULT_COURSE_STRUCTURE = [
  {
    id: "mod_default_01",
    moduleNumber: "01",
    order: 1,
    gestorTopics: [
      { id: "top_g_01", topic: "Transporte Escolar no Brasil, CECATE-CO", hours: 1.5 }
    ],
    cacsTopics: [
      { id: "top_c_01", topic: "Transporte Escolar no Brasil, CECATE-CO", hours: 1.5 }
    ]
  },
  {
    id: "mod_default_02",
    moduleNumber: "02",
    order: 2,
    gestorTopics: [
      { id: "top_g_02", topic: "Conhecendo os programas PNATE e Caminho da Escola", hours: 1.5 }
    ],
    cacsTopics: [
      { id: "top_c_02", topic: "Conhecendo os programas PNATE e Caminho da Escola", hours: 1.5 }
    ]
  },
  {
    id: "mod_default_03",
    moduleNumber: "03",
    order: 3,
    gestorTopics: [
      { id: "top_g_03", topic: "Planejamento e Regulação do Transporte Escolar", hours: 2.0 }
    ],
    cacsTopics: [
      { id: "top_c_03", topic: "Planejamento e Regulação do Transporte Escolar", hours: 2.0 }
    ]
  },
  {
    id: "mod_default_04",
    moduleNumber: "04",
    order: 4,
    gestorTopics: [
      { id: "top_g_04_1", topic: "Software Eletrônico de Gestão do Transporte Escolar, SETE", hours: 3.0 }
    ],
    cacsTopics: [
      { id: "top_c_04_1", topic: "Competências do Conselho de Acompanhamento e Controle Social", hours: 2.0 },
      { id: "top_c_04_2", topic: "Software Eletrônico de Gestão do Transporte Escolar, SETE", hours: 1.0 }
    ]
  }
];

window.courseStructureHelper = {
  /**
   * Retorna uma cópia profunda (deep copy) independente do modelo padrão oficial
   */
  getDefaultCopy() {
    return JSON.parse(JSON.stringify(window.DEFAULT_COURSE_STRUCTURE)).map((mod, idx) => ({
      ...mod,
      id: `mod_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 4)}`,
      gestorTopics: (mod.gestorTopics || []).map((t, ti) => ({
        ...t,
        id: `top_g_${Date.now()}_${idx}_${ti}_${Math.random().toString(36).substr(2, 4)}`
      })),
      cacsTopics: (mod.cacsTopics || []).map((t, ti) => ({
        ...t,
        id: `top_c_${Date.now()}_${idx}_${ti}_${Math.random().toString(36).substr(2, 4)}`
      }))
    }));
  },

  /**
   * Normaliza a lista de módulos garantindo compatibilidade com formatos legados e o novo padrão hierárquico
   */
  normalize(modules = []) {
    if (!Array.isArray(modules) || modules.length === 0) {
      return this.getDefaultCopy();
    }

    return modules.map((m, idx) => {
      let gTopics = [];
      let cTopics = [];

      if (Array.isArray(m.gestorTopics) && m.gestorTopics.length > 0) {
        gTopics = m.gestorTopics.map((gt, gti) => ({
          id: gt.id || `top_g_${Date.now()}_${idx}_${gti}`,
          topic: gt.topic || '',
          hours: parseFloat(gt.hours) || 0
        }));
      } else if (m.topicGestor) {
        gTopics = [{
          id: `top_g_${Date.now()}_${idx}_0`,
          topic: m.topicGestor,
          hours: parseFloat(m.hoursGestor) || 0
        }];
      } else {
        gTopics = [{
          id: `top_g_${Date.now()}_${idx}_0`,
          topic: '',
          hours: 0
        }];
      }

      if (Array.isArray(m.cacsTopics) && m.cacsTopics.length > 0) {
        cTopics = m.cacsTopics.map((ct, cti) => ({
          id: ct.id || `top_c_${Date.now()}_${idx}_${cti}`,
          topic: ct.topic || '',
          hours: parseFloat(ct.hours) || 0
        }));
      } else if (m.topicCACS) {
        cTopics = [{
          id: `top_c_${Date.now()}_${idx}_0`,
          topic: m.topicCACS,
          hours: parseFloat(m.hoursCACS) || 0
        }];
      } else {
        cTopics = [{
          id: `top_c_${Date.now()}_${idx}_0`,
          topic: '',
          hours: 0
        }];
      }

      return {
        id: m.id || `mod_${Date.now()}_${idx}`,
        moduleNumber: m.moduleNumber || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`),
        order: m.order !== undefined ? m.order : idx + 1,
        gestorTopics: gTopics,
        cacsTopics: cTopics
      };
    });
  },

  /**
   * Calcula os totais de carga horária para Gestores e CACS
   */
  calculateTotals(modules = []) {
    const norm = this.normalize(modules);
    let totalGestor = 0;
    let totalCACS = 0;

    norm.forEach(m => {
      (m.gestorTopics || []).forEach(t => {
        totalGestor += parseFloat(t.hours) || 0;
      });
      (m.cacsTopics || []).forEach(t => {
        totalCACS += parseFloat(t.hours) || 0;
      });
    });

    return { totalGestor, totalCACS };
  }
};
