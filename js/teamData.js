/**
 * AutoReport CECATE - Catálogo Oficial de Equipe Participante (UFG & FNDE)
 * Versão: v.2.0.0
 */

window.OFFICIAL_TITLE_PREFIXES = [
  { value: 'Prof. Dr.', label: 'Prof. Dr. (Professor Doutor)' },
  { value: 'Prof.ª Dra.', label: 'Prof.ª Dra. (Professora Doutora)' },
  { value: 'Eng. M.Sc.', label: 'Eng. M.Sc. (Engenheiro Mestre)' },
  { value: 'Eng. Dr.', label: 'Eng. Dr. (Engenheiro Doutor)' },
  { value: 'Eng.ª M.Sc.', label: 'Eng.ª M.Sc. (Engenheira Mestre)' },
  { value: 'Eng.ª Dra.', label: 'Eng.ª Dra. (Engenheira Doutora)' },
  { value: 'Dr.', label: 'Dr. (Doutor)' },
  { value: 'Dra.', label: 'Dra. (Doutora)' },
  { value: 'M.Sc.', label: 'M.Sc. (Mestre)' },
  { value: 'Esp.', label: 'Esp. (Especialista)' },
  { value: 'Eng.', label: 'Eng. (Engenheiro/a)' },
  { value: 'Prof.', label: 'Prof. (Professor)' },
  { value: 'Prof.ª', label: 'Prof.ª (Professora)' },
  { value: 'Pesquisadora Visitante Dra.', label: 'Pesquisadora Visitante Dra.' },
  { value: 'Pesquisador Visitante', label: 'Pesquisador Visitante' },
  { value: 'Sr.', label: 'Sr. (Senhor)' },
  { value: 'Sra.', label: 'Sra. (Senhora)' },
  { value: '', label: '(Sem pronome/titulação)' }
];

window.OFFICIAL_ROLES = [
  // UFG
  { value: 'Coordenador do Projeto', group: 'UFG' },
  { value: 'Coordenador Geral do Projeto', group: 'UFG' },
  { value: 'Equipe Técnica', group: 'UFG' },
  { value: 'Pesquisador e Equipe Técnica', group: 'UFG' },
  { value: 'Pesquisadora e Equipe Técnica', group: 'UFG' },
  { value: 'Pesquisador(a) Visitante', group: 'UFG' },
  { value: 'Instrutor Técnico', group: 'UFG' },
  { value: 'Instrutora Técnica', group: 'UFG' },
  { value: 'Apoio Administrativo', group: 'UFG' },
  // FNDE
  { value: 'Coordenador-Geral da Política do Transporte Escolar – CGPTE', group: 'FNDE' },
  { value: 'Coordenadora de Monitoramento, Avaliação e Apoio à Gestão do Transporte Escolar – CMATE', group: 'FNDE' },
  { value: 'Coordenador de Monitoramento, Avaliação e Apoio à Gestão do Transporte Escolar – CMATE', group: 'FNDE' },
  { value: 'Coordenadora de Apoio ao Transporte Escolar – COATE', group: 'FNDE' },
  { value: 'Coordenador de Apoio ao Transporte Escolar – COATE', group: 'FNDE' },
  { value: 'Coordenadora de Apoio ao Caminho da Escola – COACE', group: 'FNDE' },
  { value: 'Coordenador de Apoio ao Caminho da Escola – COACE', group: 'FNDE' },
  { value: 'Representante Técnico FNDE', group: 'FNDE' },
  { value: 'Técnico(a) FNDE', group: 'FNDE' },
  { value: 'Outro Cargo', group: 'Geral' }
];

window.DEFAULT_OFFICIAL_TEAM = [
  // 1. UNIVERSIDADE FEDERAL DE GOIÁS - UFG: Coordenador do Projeto
  {
    id: 'team_ufg_coord',
    institutionGroup: 'UFG',
    titlePrefix: 'Prof. Dr.',
    name: 'Willer Luciano Carvalho',
    fullName: 'Prof. Dr. Willer Luciano Carvalho',
    role: 'Coordenador do Projeto',
    institution: 'UFG',
    type: 'coordenacao',
    order: 0
  },
  // 2. UNIVERSIDADE FEDERAL DE GOIÁS - UFG: Equipe Técnica
  {
    id: 'team_ufg_1',
    institutionGroup: 'UFG',
    titlePrefix: 'Eng. M.Sc.',
    name: 'Lara Batista Ferreira de Lima',
    fullName: 'Eng. M.Sc. Lara Batista Ferreira de Lima',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 1
  },
  {
    id: 'team_ufg_2',
    institutionGroup: 'UFG',
    titlePrefix: 'Eng. Dr.',
    name: 'Matheus Henrique Morato de Moraes',
    fullName: 'Eng. Dr. Matheus Henrique Morato de Moraes',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 2
  },
  {
    id: 'team_ufg_3',
    institutionGroup: 'UFG',
    titlePrefix: 'Prof. Dr.',
    name: 'Liosber Medina Garcia',
    fullName: 'Prof. Dr. Liosber Medina Garcia',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 3
  },
  {
    id: 'team_ufg_4',
    institutionGroup: 'UFG',
    titlePrefix: 'Prof. Dr.',
    name: 'Marcos Paulino Roriz Junior',
    fullName: 'Prof. Dr. Marcos Paulino Roriz Junior',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 4
  },
  {
    id: 'team_ufg_5',
    institutionGroup: 'UFG',
    titlePrefix: 'Prof. Dr.',
    name: 'Robinson Andrés Giraldo Zuluaga',
    fullName: 'Prof. Dr. Robinson Andrés Giraldo Zuluaga',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 5
  },
  {
    id: 'team_ufg_6',
    institutionGroup: 'UFG',
    titlePrefix: 'Prof. Dr.',
    name: 'Ronny Marcelo Aliaga Medrano',
    fullName: 'Prof. Dr. Ronny Marcelo Aliaga Medrano',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 6
  },
  {
    id: 'team_ufg_7',
    institutionGroup: 'UFG',
    titlePrefix: 'Pesquisadora Visitante Dra.',
    name: 'Yaeko Yamashita',
    fullName: 'Pesquisadora Visitante Dra. Yaeko Yamashita',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 7
  },
  {
    id: 'team_ufg_8',
    institutionGroup: 'UFG',
    titlePrefix: 'Pesquisador Visitante',
    name: 'José Maria Rodrigues de Souza',
    fullName: 'Pesquisador Visitante José Maria Rodrigues de Souza',
    role: 'Equipe Técnica',
    institution: 'UFG',
    type: 'tecnica',
    order: 8
  },
  // 3. FUNDO NACIONAL DE DESENVOLVIMENTO DA EDUCAÇÃO – FNDE
  {
    id: 'team_fnde_1',
    institutionGroup: 'FNDE',
    titlePrefix: '',
    name: 'Haroldo da Silva Gomes',
    fullName: 'Haroldo da Silva Gomes',
    role: 'Coordenador-Geral da Política do Transporte Escolar – CGPTE',
    institution: 'FNDE',
    type: 'fnde',
    order: 9
  },
  {
    id: 'team_fnde_2',
    institutionGroup: 'FNDE',
    titlePrefix: '',
    name: 'Daniela Oshiro Yanaze',
    fullName: 'Daniela Oshiro Yanaze',
    role: 'Coordenadora de Monitoramento, Avaliação e Apoio à Gestão do Transporte Escolar – CMATE',
    institution: 'FNDE',
    type: 'fnde',
    order: 10
  },
  {
    id: 'team_fnde_3',
    institutionGroup: 'FNDE',
    titlePrefix: '',
    name: 'Neuza Helena Portugal dos Santos',
    fullName: 'Neuza Helena Portugal dos Santos',
    role: 'Coordenadora de Apoio ao Transporte Escolar – COATE',
    institution: 'FNDE',
    type: 'fnde',
    order: 11
  },
  {
    id: 'team_fnde_4',
    institutionGroup: 'FNDE',
    titlePrefix: '',
    name: 'Maria Angelica Floriano Pedrosa',
    fullName: 'Maria Angelica Floriano Pedrosa',
    role: 'Coordenadora de Apoio ao Caminho da Escola – COACE',
    institution: 'FNDE',
    type: 'fnde',
    order: 12
  }
];
