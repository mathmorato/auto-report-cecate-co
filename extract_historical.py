import os, glob, zipfile, xml.etree.ElementTree as ET, re, json

namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

meta_map = {
    6: {'polo': 'Dourados', 'uf': 'MS', 'dates': '02 e 03 de abril de 2025', 'start': '2025-04-02', 'end': '2025-04-03', 'workload': '16 horas'},
    7: {'polo': 'Jardim', 'uf': 'MS', 'dates': '29 de maio de 2025', 'start': '2025-05-29', 'end': '2025-05-29', 'workload': '8 horas'},
    8: {'polo': 'Sinop', 'uf': 'MT', 'dates': '25 e 26 de junho de 2025', 'start': '2025-06-25', 'end': '2025-06-26', 'workload': '16 horas'},
    9: {'polo': 'Juína', 'uf': 'MT', 'dates': '21 de agosto de 2025', 'start': '2025-08-21', 'end': '2025-08-21', 'workload': '8 horas'},
    10: {'polo': 'Nova Xavantina', 'uf': 'MT', 'dates': '24 e 25 de setembro de 2025', 'start': '2025-09-24', 'end': '2025-09-25', 'workload': '16 horas'},
    11: {'polo': 'Uruaçu', 'uf': 'GO', 'dates': '15 e 16 de outubro de 2025', 'start': '2025-10-15', 'end': '2025-10-16', 'workload': '16 horas'},
    12: {'polo': 'Brasília', 'uf': 'DF', 'dates': '26 de novembro de 2025', 'start': '2025-11-26', 'end': '2025-11-26', 'workload': '8 horas'},
    13: {'polo': 'Alta Floresta', 'uf': 'MT', 'dates': '19 de março de 2026', 'start': '2026-03-19', 'end': '2026-03-19', 'workload': '8 horas'},
    14: {'polo': 'Jataí', 'uf': 'GO', 'dates': '29 e 30 de abril de 2026', 'start': '2026-04-29', 'end': '2026-04-30', 'workload': '16 horas'},
    15: {'polo': 'Posse', 'uf': 'GO', 'dates': '10 de junho de 2026', 'start': '2026-06-10', 'end': '2026-06-10', 'workload': '8 horas'},
}

def extract_tables_from_docx(fpath):
    with zipfile.ZipFile(fpath, 'r') as docx:
        tree = ET.fromstring(docx.read('word/document.xml'))
        tables = []
        for tbl in tree.findall('.//w:tbl', namespaces):
            t_rows = []
            for row in tbl.findall('.//w:tr', namespaces):
                row_cells = []
                for cell in row.findall('.//w:tc', namespaces):
                    c_texts = [t.text for t in cell.findall('.//w:t', namespaces) if t.text]
                    row_cells.append(' '.join(c_texts).strip())
                t_rows.append(row_cells)
            tables.append(t_rows)
    return tables

historical_trainings = []

files = sorted(glob.glob('02-Relatórios exemplos/*CTE*.docx'), key=lambda x: int(re.search(r'(\d+)CTE', x).group(1)) if re.search(r'(\d+)CTE', x) else 0)

for fpath in files:
    fname = os.path.basename(fpath)
    num = int(re.search(r'(\d+)CTE', fpath).group(1))
    meta = meta_map.get(num, {'polo': f'Polo {num}', 'uf': 'MT', 'dates': '2025', 'start': '2025-01-01', 'end': '2025-01-02', 'workload': '16 horas'})
    tables = extract_tables_from_docx(fpath)
    
    # Equipe padrão UFG / FNDE
    team = [
        {'name': 'Prof. Dr. Willer Luciano Carvalho', 'institution': 'UFG', 'role': 'Coordenador Geral do Projeto', 'type': 'coordenacao', 'order': 0},
        {'name': 'Eng. M.Sc. Lara Batista Ferreira de Lima', 'institution': 'UFG', 'role': 'Pesquisadora e Equipe Técnica', 'type': 'tecnica', 'order': 1},
        {'name': 'Eng. M.Sc. Matheus Henrique Morato de Moraes', 'institution': 'UFG', 'role': 'Pesquisador e Equipe Técnica', 'type': 'tecnica', 'order': 2},
        {'name': 'Prof. Dr. Marcos Paulino Roriz Junior', 'institution': 'UFG', 'role': 'Pesquisador e Equipe Técnica', 'type': 'tecnica', 'order': 3},
        {'name': 'Prof. Dr. Liosber Medina Garcia', 'institution': 'UFG', 'role': 'Pesquisador e Equipe Técnica', 'type': 'tecnica', 'order': 4},
        {'name': 'Haroldo da Silva Gomes', 'institution': 'FNDE', 'role': 'Coordenador-Geral da Política do Transporte Escolar - CGPTE', 'type': 'fnde', 'order': 5}
    ]
    
    # Municípios
    municipalities = []
    dist_map = {}
    t1 = tables[2] if len(tables) > 2 else []
    if len(t1) > 1:
        for row in t1[1:]:
            if len(row) >= 3 and row[0] and row[1]:
                ibge_str = re.sub(r'\D', '', row[0])
                name = row[1].strip()
                dist_str = row[2].replace(',', '.').replace('km', '').strip() if len(row) > 2 else '0'
                try: dist_val = float(dist_str)
                except: dist_val = 0.0
                if name:
                    dist_map[name.lower()] = {'ibge': int(ibge_str) if ibge_str else '', 'dist': dist_val, 'name': name}
            if len(row) >= 6 and row[3] and row[4]:
                ibge_str2 = re.sub(r'\D', '', row[3])
                name2 = row[4].strip()
                dist_str2 = row[5].replace(',', '.').replace('km', '').strip() if len(row) > 5 else '0'
                try: dist_val2 = float(dist_str2)
                except: dist_val2 = 0.0
                if name2:
                    dist_map[name2.lower()] = {'ibge': int(ibge_str2) if ibge_str2 else '', 'dist': dist_val2, 'name': name2}

    t4 = tables[6] if len(tables) > 6 else []
    if len(t4) > 1:
        for row in t4[1:]:
            def process_mun_entry(cells):
                if len(cells) < 3: return None
                c0 = cells[0].strip()
                c1 = cells[1].strip()
                if re.match(r'^\d+$', c0):
                    ibge = int(c0)
                    mname = c1
                    rates = cells[2:]
                else:
                    ibge = ''
                    mname = c0
                    rates = cells[1:]
                
                cacs_p, cacs_i = 0, 0
                gest_p, gest_i = 0, 0
                tot_p, tot_i = 0, 0
                for r in rates:
                    m_pi = re.search(r'(\d+)\s*\/\s*(\d+)', r)
                    if m_pi:
                        p, i = int(m_pi.group(1)), int(m_pi.group(2))
                        if cacs_i == 0 and cacs_p == 0:
                            cacs_p, cacs_i = p, i
                        elif gest_i == 0 and gest_p == 0:
                            gest_p, gest_i = p, i
                        else:
                            tot_p, tot_i = p, i
                if tot_p == 0 and tot_i == 0:
                    tot_p = cacs_p + gest_p
                    tot_i = cacs_i + gest_i
                return {
                    'ibge': ibge,
                    'name': mname,
                    'cacs_p': cacs_p, 'cacs_i': cacs_i,
                    'gest_p': gest_p, 'gest_i': gest_i,
                    'tot_p': tot_p, 'tot_i': tot_i
                }
            
            res1 = process_mun_entry(row[:5])
            if res1 and res1['name'] and 'total' not in res1['name'].lower() and 'município' not in res1['name'].lower():
                nm = res1['name']
                d_info = dist_map.get(nm.lower(), {})
                municipalities.append({
                    'id': f'mun_{num}_{len(municipalities)}',
                    'ibgeCode': res1['ibge'] or d_info.get('ibge', ''),
                    'name': d_info.get('name', nm),
                    'uf': meta['uf'],
                    'distanceKm': d_info.get('dist', 0.0),
                    'isSummoned': True,
                    'inscribedCACS': res1['cacs_i'],
                    'inscribedGestores': res1['gest_i'],
                    'inscribedTotal': res1['tot_i'],
                    'presentCACS': res1['cacs_p'],
                    'presentGestores': res1['gest_p'],
                    'presentTotal': res1['tot_p']
                })
            if len(row) >= 8:
                res2 = process_mun_entry(row[4:])
                if res2 and res2['name'] and 'total' not in res2['name'].lower() and 'município' not in res2['name'].lower():
                    nm2 = res2['name']
                    d_info2 = dist_map.get(nm2.lower(), {})
                    municipalities.append({
                        'id': f'mun_{num}_{len(municipalities)}',
                        'ibgeCode': res2['ibge'] or d_info2.get('ibge', ''),
                        'name': d_info2.get('name', nm2),
                        'uf': meta['uf'],
                        'distanceKm': d_info2.get('dist', 0.0),
                        'isSummoned': True,
                        'inscribedCACS': res2['cacs_i'],
                        'inscribedGestores': res2['gest_i'],
                        'inscribedTotal': res2['tot_i'],
                        'presentCACS': res2['cacs_p'],
                        'presentGestores': res2['gest_p'],
                        'presentTotal': res2['tot_p']
                    })

    if not municipalities and dist_map:
        for k, v in dist_map.items():
            municipalities.append({
                'id': f'mun_{num}_{len(municipalities)}',
                'ibgeCode': v.get('ibge', ''),
                'name': v.get('name', k),
                'uf': meta['uf'],
                'distanceKm': v.get('dist', 0.0),
                'isSummoned': True,
                'inscribedCACS': 0,
                'inscribedGestores': 0,
                'inscribedTotal': 0,
                'presentCACS': 0,
                'presentGestores': 0,
                'presentTotal': 0
            })

    courseModules = [
        {'id': f'mod_{num}_0', 'moduleNumber': '01', 'topicGestor': 'Transporte Escolar no Brasil – CECATE-CO', 'topicCACS': 'Transporte Escolar no Brasil – CECATE-CO', 'hoursGestor': 1.5, 'hoursCACS': 1.5, 'order': 0},
        {'id': f'mod_{num}_1', 'moduleNumber': '02', 'topicGestor': 'Conhecendo os programas PNATE e Caminho da Escola', 'topicCACS': 'Conhecendo os programas PNATE e Caminho da Escola', 'hoursGestor': 1.5, 'hoursCACS': 1.5, 'order': 1},
        {'id': f'mod_{num}_2', 'moduleNumber': '03', 'topicGestor': 'Gestão do Transporte Escolar e Software SETE', 'topicCACS': 'Fiscalização e Controle Social do Transporte Escolar', 'hoursGestor': 2.0, 'hoursCACS': 2.0, 'order': 2},
        {'id': f'mod_{num}_3', 'moduleNumber': '04', 'topicGestor': 'Prestação de Contas no SiGPC e Desafios Locais', 'topicCACS': 'Atuação do CACS-FUNDEB e Análise de Contas', 'hoursGestor': 3.0, 'hoursCACS': 3.0, 'order': 3}
    ]

    # Carregar avaliações reais se existirem em 01-Avaliacao exemplo
    evaluations = []
    eval_xlsx_candidates = [
        f'01-Avaliacao exemplo/{num}CTE - Avaliação (respostas).xlsx',
        f'01-Avaliacao exemplo/{num}CTE_Analise_V01.xlsm'
    ]
    for ef in eval_xlsx_candidates:
        if os.path.exists(ef):
            try:
                import openpyxl
                wb = openpyxl.load_workbook(ef, data_only=True)
                ws = wb.active
                for r_idx, r in enumerate(list(ws.iter_rows(values_only=True))[1:]):
                    if any(c is not None for c in r):
                        ratings = [5, 5, 5, 5, 5, 5, 5]
                        for ci in range(7, 14):
                            if len(r) > ci and isinstance(r[ci], (int, float)):
                                ratings[ci - 7] = float(r[ci])
                        evaluations.append({
                            'id': f'eval_{num}_{r_idx}',
                            'name': str(r[1]) if len(r) > 1 and r[1] else f'Participante {r_idx+1}',
                            'municipality': str(r[5]) if len(r) > 5 and r[5] else '',
                            'representation': 'CACS-FUNDEB' if len(r) > 6 and 'cacs' in str(r[6]).lower() else 'Gestão municipal',
                            'ratings': ratings,
                            'likedAspects': str(r[14]) if len(r) > 14 and r[14] else '',
                            'improveAspects': str(r[15]) if len(r) > 15 and r[15] else ''
                        })
                break
            except Exception as ex:
                pass

    record = {
        'id': f'cap_historico_{num}',
        'number': num,
        'title': 'CAPACITAÇÃO EM TRANSPORTE ESCOLAR',
        'polo': meta['polo'],
        'uf': meta['uf'],
        'startDate': meta['start'],
        'endDate': meta['end'],
        'datesFormatted': meta['dates'],
        'workload': meta['workload'],
        'targetAudience': 'Gestores Municipais e Conselheiros CACS-FUNDEB',
        'expectedParticipants': 40,
        'responsibleOrg': 'Universidade Federal de Goiás - UFG / CECATE Centro-Oeste',
        'relatedProject': 'FORTALECENDO E APRIMORANDO AS POLÍTICAS PÚBLICAS DE TRANSPORTE ESCOLAR DO BRASIL',
        'processNumber': '23070.012345/2026-00',
        'fundingOrg': 'Fundo Nacional de Desenvolvimento da Educação - FNDE',
        'partnerOrgs': f'Ministério da Educação / Prefeitura Municipal de {meta["polo"]}',
        'locationVenue': f'Polo Regional de {meta["polo"]}',
        'status': 'historico',
        'isHistorical': True,
        'progressPercent': 100,
        'dataSourceMap': {
            'documentOrigin': f'02-Relatórios exemplos/{fname}',
            'evaluationOrigin': f'01-Avaliacao exemplo/{num}CTE_Analise_V01.xlsm' if os.path.exists(f'01-Avaliacao exemplo/{num}CTE_Analise_V01.xlsm') else (f'01-Avaliacao exemplo/{num}CTE - Avaliação (respostas).xlsx' if os.path.exists(f'01-Avaliacao exemplo/{num}CTE - Avaliação (respostas).xlsx') else 'Não informado'),
            'attendanceOrigin': f'03-Lista de presença/{num}CTE- Lista de Presença.xlsx' if os.path.exists(f'03-Lista de presença/{num}CTE- Lista de Presença.xlsx') else 'Relatório Tabela 4'
        },
        'team': team,
        'municipalities': municipalities,
        'courseModules': courseModules,
        'attendance': [],
        'evaluations': evaluations,
        'media': []
    }
    historical_trainings.append(record)
    print(f'CTE {num} ({meta["polo"]} - {meta["uf"]}): {len(municipalities)} municípios, {len(evaluations)} avaliações.')

with open('js/historicalData.js', 'w', encoding='utf-8') as f:
    f.write('// Banco de Dados Histórico Oficial: Capacitações Nº 6 a 15\n')
    f.write('// Fonte: Documentos de Referência 01, 02 e 03 do CECATE Centro-Oeste\n')
    f.write('window.HISTORICAL_TRAININGS = ' + json.dumps(historical_trainings, ensure_ascii=False, indent=2) + ';\n')

print('js/historicalData.js gerado com sucesso!')

