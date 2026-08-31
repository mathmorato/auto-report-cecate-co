/**
 * AutoReport CECATE - Modelos e Templates Modulares Padrão
 */

const REPORT_TEMPLATES = [
  {
    id: "audit_compliance",
    title: "Auditoria & Conformidade CECATE",
    category: "Auditoria",
    icon: "🛡️",
    badge: "Oficial",
    description: "Avaliação rigorosa de conformidade regulatória, mapeamento de não-conformidades, riscos e plano de ação corretivo.",
    defaultMeta: {
      orgName: "CECATE Soluções Tecnológicas",
      reportTitle: "Relatório de Auditoria e Conformidade de Processos",
      responsible: "Dr. Carlos Eduardo Mendonça",
      department: "Gerência de Governança e Risco",
      date: new Date().toISOString().split('T')[0],
      referenceCode: "AUD-2026-089"
    },
    defaultKpis: [
      { label: "Índice de Conformidade", value: "94.2%", status: "success" },
      { label: "Itens Auditados", value: "148", status: "neutral" },
      { label: "Apontamentos Críticos", value: "2", status: "warning" }
    ],
    blocks: [
      {
        id: "b_exec_summary",
        type: "executive_summary",
        title: "1. Sumário Executivo",
        content: "O presente relatório consolida os resultados da auditoria de conformidade realizada no âmbito dos processos operacionais e tecnológicos da **{empresa}**. O objetivo principal consistiu em validar a aderência às normas internas e diretrizes regulatórias vigentes durante o ciclo **{periodo}**."
      },
      {
        id: "b_kpis",
        type: "kpi_metrics",
        title: "2. Indicadores Chave de Avaliação",
        kpis: [
          { label: "Índice de Conformidade", value: "94.2%", change: "+2.4%" },
          { label: "Itens Auditados", value: "148", change: "100% escopo" },
          { label: "Não Conformidades", value: "2", change: "-4 vs ciclo ant." }
        ]
      },
      {
        id: "b_diagnostic",
        type: "ai_diagnostic",
        title: "3. Diagnóstico e Parecer Técnico Automatizado",
        content: "Com base nas evidências coletadas pelo time de {departamento}, constatou-se que a infraestrutura e os fluxos críticos operam em patamar de alta segurança. Os 2 apontamentos registrados foram classificados como de severidade média/baixa, com mitigação imediata recomendada nos protocolos de retenção de logs."
      },
      {
        id: "b_findings_table",
        type: "data_table",
        title: "4. Mapeamento de Itens e Não-Conformidades",
        headers: ["ID", "Processo / Requisito", "Status", "Risco", "Prazo de Resolução"],
        rows: [
          ["NC-01", "Controle de Acessos Privilegiados", "Em Adequação", "Médio", "15 dias"],
          ["NC-02", "Validação de Backup Quizenal", "Corrigido", "Baixo", "Concluído"],
          ["NC-03", "Revisão de Políticas de Terceiros", "Em Adequação", "Baixo", "30 dias"]
        ]
      },
      {
        id: "b_recommendations",
        type: "recommendations",
        title: "5. Recomendações e Próximos Passos",
        items: [
          "Implementar rotina automatizada de revogação de acessos temporários.",
          "Realizar treinamento de conscientização sobre segurança da informação no início do próximo trimestre.",
          "Formalizar a matriz de responsabilidades junto aos líderes de cada squad."
        ]
      },
      {
        id: "b_signatures",
        type: "signatures",
        title: "6. Validação e Assinaturas",
        signers: [
          { name: "{responsavel}", role: "Auditor Líder" },
          { name: "Diretoria de Operações", role: "Aprovador Institucional" }
        ]
      }
    ]
  },
  {
    id: "monthly_performance",
    title: "Performance & Métricas Mensais",
    category: "Operacional",
    icon: "📈",
    badge: "Popular",
    description: "Análise quantitativa de desempenho, metas alcançadas, faturamento, eficiência e gargalos operacionais.",
    defaultMeta: {
      orgName: "CECATE Analytics",
      reportTitle: "Relatório Mensal de Performance Operacional",
      responsible: "Mariana Vasconcelos",
      department: "Operações e Inteligência de Negócios",
      date: new Date().toISOString().split('T')[0],
      referenceCode: "PERF-2026-M08"
    },
    defaultKpis: [
      { label: "SLA Global", value: "99.4%", status: "success" },
      { label: "Volume de Entregas", value: "1.420", status: "success" },
      { label: "NPS / Satisfação", value: "88", status: "success" }
    ],
    blocks: [
      {
        id: "b_exec_summary",
        type: "executive_summary",
        title: "1. Visão Geral do Período",
        content: "Durante o período de **{periodo}**, a unidade **{departamento}** demonstrou estabilidade de alto rendimento, ultrapassando as metas de eficiência operacional estipuladas para a **{empresa}**."
      },
      {
        id: "b_kpis",
        type: "kpi_metrics",
        title: "2. Principais Indicadores de Desempenho",
        kpis: [
          { label: "SLA Médio de Resolução", value: "99.4%", change: "+0.8%" },
          { label: "Demandas Concluídas", value: "1.420", change: "+14.2%" },
          { label: "Índice de Retrabalho", value: "1.2%", change: "-0.5%" }
        ]
      },
      {
        id: "b_diagnostic",
        type: "ai_diagnostic",
        title: "3. Análise Crítica e Diagnóstico de Produtividade",
        content: "A automação de fluxos repetitivos implementada no ciclo anterior reduziu o tempo médio de ciclo em 18%. Identificou-se uma ligeira sobrecarga na equipe de suporte nível 2 nos horários de pico, compensada pelo bom desempenho do autoatendimento."
      },
      {
        id: "b_findings_table",
        type: "data_table",
        title: "4. Detalhamento por Linha de Serviço",
        headers: ["Serviço / Projeto", "Meta", "Realizado", "Desvio", "Status"],
        rows: [
          ["Processamento de Dados Lote", "1.000 un.", "1.150 un.", "+15%", "Superada"],
          ["Atendimento a Incidentes P1", "< 30 min", "18 min", "-40%", "Excelente"],
          ["Disponibilidade de Plataforma", "99.0%", "99.85%", "+0.85%", "Excelente"]
        ]
      },
      {
        id: "b_recommendations",
        type: "recommendations",
        title: "5. Iniciativas para o Próximo Ciclo",
        items: [
          "Expandir os gatilhos automáticos de alerta precoce de volumetria.",
          "Homologar a nova versão dos dashboards analíticos para o corpo diretivo.",
          "Otimizar as consultas SQL no banco de relatórios para acelerar a geração em lote."
        ]
      },
      {
        id: "b_signatures",
        type: "signatures",
        title: "6. Homologação",
        signers: [
          { name: "{responsavel}", role: "Gestor de Operações" },
          { name: "Superintendência Executiva", role: "Diretoria" }
        ]
      }
    ]
  },
  {
    id: "incident_rca",
    title: "Incidente Técnico & Causa Raiz (RCA)",
    category: "Engenharia",
    icon: "⚠️",
    badge: "Técnico",
    description: "Documentação pós-incidente (Post-Mortem), linha do tempo cronológica, causa raiz e plano de prevenção definitiva.",
    defaultMeta: {
      orgName: "CECATE Cloud Engineering",
      reportTitle: "Relatório de Análise de Causa Raiz (RCA)",
      responsible: "Eng. Rafael Toledo",
      department: "Engenharia de Confiabilidade (SRE)",
      date: new Date().toISOString().split('T')[0],
      referenceCode: "INC-2026-4412"
    },
    defaultKpis: [
      { label: "Tempo de Indisponibilidade (MTTR)", value: "24 min", status: "warning" },
      { label: "Severidade", value: "Sev-1", status: "danger" },
      { label: "Usuários Afetados", value: "3.2%", status: "neutral" }
    ],
    blocks: [
      {
        id: "b_exec_summary",
        type: "executive_summary",
        title: "1. Resumo do Incidente",
        content: "Em **{data}**, foi detectada instabilidade no cluster principal de banco de dados durante a execução de rotinas programadas na **{empresa}**. O restabelecimento completo ocorreu em 24 minutos após a atuação da equipe de resposta sob liderança de **{responsavel}**."
      },
      {
        id: "b_diagnostic",
        type: "ai_diagnostic",
        title: "2. Análise da Causa Raiz (Os 5 Porquês)",
        content: "A causa primária foi atribuída a um deadlock transacional decorrente de migração de schema concorrente. O balanceador de carga manteve as conexões presas, provocando esgotamento do pool de threads. Mecanismos de failover automatizado foram acionados com sucesso."
      },
      {
        id: "b_findings_table",
        type: "data_table",
        title: "3. Linha do Tempo dos Eventos (Timeline)",
        headers: ["Horário", "Evento / Detecção", "Ação Tomada", "Responsável"],
        rows: [
          ["14:02", "Alarme de latência disparado pelo Prometheus", "Notificação aos plantonistas", "Bot Alertas"],
          ["14:08", "Identificação de saturação de conexões", "Bloqueio preventivo do tráfego não crítico", "Rafael Toledo"],
          ["14:19", "Reinicialização controlada das instâncias réplica", "Drenagem do pool de conexões", "Time SRE"],
          ["14:26", "Retomada integral dos serviços e normalização", "Validação de integridade", "Rafael Toledo"]
        ]
      },
      {
        id: "b_recommendations",
        type: "recommendations",
        title: "4. Ações Preventivas e Mitigações Permanentes",
        items: [
          "Inserir trava rígida de bloqueio para execuções DDL durante janelas de pico.",
          "Reduzir o timeout padrão de conexões ociosas de 60s para 15s.",
          "Ampliar os testes de carga automatizados na esteira de CI/CD."
        ]
      },
      {
        id: "b_signatures",
        type: "signatures",
        title: "5. Aprovação Técnica",
        signers: [
          { name: "{responsavel}", role: "Engenheiro SRE Responsável" },
          { name: "Tech Lead & Arquiteto", role: "Coordenação de Infraestrutura" }
        ]
      }
    ]
  },
  {
    id: "executive_status",
    title: "Status Executivo de Projeto",
    category: "Gestão",
    icon: "📊",
    badge: "Estratégico",
    description: "Visão consolidada para diretores e patrocinadores: cronograma, entregas, orçamento e riscos mapeados.",
    defaultMeta: {
      orgName: "CECATE Inovação & Projetos",
      reportTitle: "Status Report Executivo do Projeto Estratégico",
      responsible: "Juliana Andrade, PMP",
      department: "PMO Corporativo",
      date: new Date().toISOString().split('T')[0],
      referenceCode: "PMO-2026-Q3"
    },
    defaultKpis: [
      { label: "Progresso Geral", value: "78%", status: "success" },
      { label: "Consumo Orçamentário", value: "71%", status: "success" },
      { label: "Índice de Desempenho (SPI)", value: "1.04", status: "success" }
    ],
    blocks: [
      {
        id: "b_exec_summary",
        type: "executive_summary",
        title: "1. Resumo Executivo",
        content: "O projeto sob coordenação do **{departamento}** na **{empresa}** mantém ritmo acelerado e saudável no ciclo **{periodo}**, com 78% do cronograma físico realizado e aderência financeira positiva."
      },
      {
        id: "b_kpis",
        type: "kpi_metrics",
        title: "2. Saúde do Projeto",
        kpis: [
          { label: "Aderência a Prazos (SPI)", value: "1.04", change: "+0.02 no mês" },
          { label: "Eficiência de Custo (CPI)", value: "1.08", change: "Dentro do teto" },
          { label: "Marcos Concluídos", value: "18 / 22", change: "81.8%" }
        ]
      },
      {
        id: "b_diagnostic",
        type: "ai_diagnostic",
        title: "3. Parecer da Liderança e Gestão de Riscos",
        content: "Os principais entregáveis da Fase 3 foram homologados sem ressalvas técnicas. O risco moderado identificado no fornecimento de componentes em nuvem foi mitigado com a contratação de redundância multi-região antecipada."
      },
      {
        id: "b_findings_table",
        type: "data_table",
        title: "4. Status dos Próximos Marcos (Milestones)",
        headers: ["Marco / Entregável", "Responsável", "Data Prevista", "Status"],
        rows: [
          ["Lançamento da Versão Beta 2.0", "Engenharia de Software", "15/09/2026", "No Prazo"],
          ["Treinamento dos Usuários Chave", "Gestão de Mudança", "22/09/2026", "Planejado"],
          ["Go-Live em Produção", "Diretoria e PMO", "30/09/2026", "No Prazo"]
        ]
      },
      {
        id: "b_recommendations",
        type: "recommendations",
        title: "5. Decisões Solicitadas ao Comitê",
        items: [
          "Aprovação do aditivo de expansão de capacidade de storage para o Q4.",
          "Definição da data oficial da cerimônia de encerramento da Fase 3."
        ]
      },
      {
        id: "b_signatures",
        type: "signatures",
        title: "6. Homologação do Comitê",
        signers: [
          { name: "{responsavel}", role: "Gerente de Projeto (PMO)" },
          { name: "Sponsor Executivo", role: "Comitê Diretor" }
        ]
      }
    ]
  },
  {
    id: "training_capacity",
    title: "Capacitação & Treinamento CECATE",
    category: "Capacitação",
    icon: "🎓",
    badge: "Oficial",
    description: "Relatório consolidado de execução de curso ou capacitação técnica: ementa, frequência, taxa de conclusão e avaliação.",
    defaultMeta: {
      orgName: "CECATE Academia & Treinamentos",
      reportTitle: "Relatório de Conclusão e Avaliação de Capacitação Técnica",
      responsible: "Prof. Dr. Marcos Souza",
      department: "Desenvolvimento de Talentos & Capacitação",
      date: new Date().toISOString().split('T')[0],
      referenceCode: "CAP-2026-001"
    },
    defaultKpis: [
      { label: "Taxa de Conclusão", value: "95.8%", status: "success" },
      { label: "Total de Capacitados", value: "24 alunos", status: "success" },
      { label: "Carga Horária Cumprida", value: "40 horas", status: "success" },
      { label: "Satisfação (NPS)", value: "9.6 / 10", status: "success" }
    ],
    blocks: [
      {
        id: "b_exec_summary",
        type: "executive_summary",
        title: "1. Sumário Executivo da Capacitação",
        content: "O presente relatório técnico atesta a realização da capacitação **{titulo}** promovida pela **{empresa}** no período de **{periodo}**, sob a facilitação e coordenação de **{responsavel}** ({departamento}). O curso teve como propósito nivelar competências técnicas e alinhar padrões metodológicos operacionais."
      },
      {
        id: "b_kpis",
        type: "kpi_metrics",
        title: "2. Indicadores de Desempenho do Treinamento",
        kpis: [
          { label: "Taxa de Conclusão", value: "95.8%", change: "Meta: >90%" },
          { label: "Participantes Concluintes", value: "24", change: "De 25 inscritos" },
          { label: "Carga Horária Total", value: "40h", change: "100% ministrado" },
          { label: "Índice de Satisfação", value: "9.6 / 10", change: "+0.4 vs média" }
        ]
      },
      {
        id: "b_diagnostic",
        type: "ai_diagnostic",
        title: "3. Parecer Pedagógico e Avaliação de Aprendizado",
        content: "A turma demonstrou engajamento exemplar durante as atividades práticas e workshops interativos. As métricas de absorção conceitual e testes de fixação superaram os benchmarks institucionais, habilitando os participantes a aplicarem as diretrizes de automação e boas práticas em seus respectivos departamentos."
      },
      {
        id: "b_findings_table",
        type: "data_table",
        title: "4. Módulos Ministrados e Controle de Frequência",
        headers: ["Módulo", "Conteúdo Abordado", "Carga Horária", "Frequência Média", "Status"],
        rows: [
          ["Módulo 01", "Fundamentos, Normas e Arquitetura de Processos", "08h", "100%", "Concluído"],
          ["Módulo 02", "Práticas de Automação de Documentos & Relatórios", "12h", "96%", "Concluído"],
          ["Módulo 03", "Análise de Indicadores e Governança Operacional", "10h", "96%", "Concluído"],
          ["Módulo 04", "Laboratório Prático e Apresentação de Projetos", "10h", "100%", "Concluído"]
        ]
      },
      {
        id: "b_recommendations",
        type: "recommendations",
        title: "5. Recomendações e Próximos Passos",
        items: [
          "Disponibilizar o repositório de materiais complementares e gravações aos alunos no portal CECATE.",
          "Aplicar pesquisa de eficácia do treinamento (Follow-up de 60 dias) para mensurar impacto prático no dia a dia.",
          "Emitir certificados digitais autenticados para os 24 participantes concluintes."
        ]
      },
      {
        id: "b_signatures",
        type: "signatures",
        title: "6. Homologação e Emissão de Certificação",
        signers: [
          { name: "{responsavel}", role: "Instrutor / Especialista Responsável" },
          { name: "Coordenação de Capacitação CECATE", role: "Superintendência Educacional" }
        ]
      }
    ]
  }
];

// Tipos de blocos modulares que podem ser adicionados dinamicamente
const AVAILABLE_BLOCK_TYPES = [
  { type: "executive_summary", name: "Sumário Executivo", icon: "📝", desc: "Texto introdutório com escopo e resumo dos pontos centrais" },
  { type: "kpi_metrics", name: "Grid de Indicadores (KPIs)", icon: "📊", desc: "Painel com 3 a 4 cartões numéricos e tendências" },
  { type: "ai_diagnostic", name: "Diagnóstico e Parecer Técnico", icon: "⚡", desc: "Análise profunda com parágrafos gerados e refinados" },
  { type: "data_table", name: "Tabela de Dados e Evidências", icon: "📋", desc: "Estrutura tabular com colunas e linhas editáveis" },
  { type: "recommendations", name: "Recomendações e Próximos Passos", icon: "🎯", desc: "Lista de itens acionáveis e diretrizes futuras" },
  { type: "signatures", name: "Bloco de Assinaturas e Validação", icon: "✍️", desc: "Linhas para validação de autoridade e homologação" }
];
