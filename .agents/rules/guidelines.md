# Diretrizes para Desenvolvimento e Manutenção do Projeto

## 1. Referência visual e identidade do projeto

### 1.1 Projeto de referência
Utilize como referência visual e estrutural o projeto localizado em:
`C:\Antigravity\automatizador-preenchimento-de-planilha-fnde`

O objetivo é reproduzir o estilo visual do projeto de referência, mantendo a identidade e os padrões já estabelecidos.

### 1.2 Tema visual
A aplicação deverá:
- Manter o tema dark como padrão.
- Preservar a identidade visual já existente no projeto de referência.
- Manter padrões semelhantes de:
  - Tipografia.
  - Espaçamentos.
  - Bordas.
  - Cards.
  - Botões.
  - Campos de entrada.
  - Menus.
  - Cabeçalhos.
  - Rodapés.
  - Estados de interação.
  - Ícones.
  - Hierarquia visual.
- Evitar alterações visuais que descaracterizem o padrão do projeto de referência.

### 1.3 Logos e assets
As logos já foram disponibilizadas na pasta: `assets`
- Não criar versões alternativas das logos se os arquivos existentes puderem ser utilizados.
- Antes de adicionar novos recursos visuais, verificar se o asset correspondente já existe na pasta assets.

---

## 2. Sistema de versionamento

### 2.1 Formato
A versão deverá seguir obrigatoriamente o padrão: `v.X.Y.Z` (Exemplo: `v.1.0.0`)
O número da versão deverá estar visível no rodapé da aplicação.

### 2.2 Regra de incremento
A ordem de crescimento será: `Z → Y → X`

- **Incremento de Z:** Enquanto Z < 9, aumentar apenas Z (`v.1.0.0` → `v.1.0.1` → ... → `v.1.0.9`).
- **Incremento de Y:** Quando Z atingir 9 e uma nova alteração exigir incremento: `v.1.0.9` → `v.1.1.0` (Z retorna para 0 e Y aumenta em 1).
- **Incremento de X:** Quando Y atingir 9 e uma nova alteração exigir incremento: `v.1.9.9` → `v.2.0.0` (Y e Z retornam para 0 e X aumenta em 1).
- **Limites:**
  - Z nunca poderá ser maior que 9.
  - Y nunca poderá ser maior que 9.
  - X não possui limite superior.
  - Nunca utilizar versões como `v.1.0.10` ou `v.1.10.0`.

### 2.3 Regra de alteração da versão
Toda alteração realizada no projeto deverá resultar em uma nova versão:
1. Identificar a versão atual.
2. Determinar o próximo incremento conforme as regras acima.
3. Realizar as alterações.
4. Atualizar a versão exibida no rodapé.
5. Garantir que a versão esteja consistente nos arquivos necessários do projeto.

---

## 3. Organização das alterações

Cada comando deverá ser tratado como uma unidade de alteração.

**Antes de executar uma alteração:**
1. Verificar o estado atual do projeto.
2. Identificar a versão atual.
3. Entender quais arquivos serão afetados.
4. Definir o próximo número de versão.
5. Executar a alteração.

**Após a alteração:**
1. Verificar se a aplicação continua funcionando.
2. Conferir visualmente ou tecnicamente os componentes alterados.
3. Confirmar a versão no rodapé.
4. Verificar se não foram introduzidas alterações desnecessárias.
5. Registrar a alteração no Git.

---

## 4. Git e GitHub

### 4.1 Commit obrigatório
Ao final de cada comando que modificar arquivos do projeto, realizar obrigatoriamente um commit. Não considerar a tarefa concluída enquanto a alteração não estiver registrada no Git.

### 4.2 Conteúdo do commit
Formato recomendado no título: `v.X.Y.Z: descrição das alterações`

### 4.3 Descrição do commit
A descrição deverá informar claramente:
- Versão anterior: `v.X.Y.Z`
- Nova versão: `v.X.Y.Z`
- Alterações realizadas
- Validações realizadas

### 4.4 GitHub
Após realizar o commit local, enviar a alteração para o repositório remoto do GitHub via push (`git push origin main`).

---

## 5. Critérios de conclusão
Uma tarefa somente deverá ser considerada concluída quando:
- A alteração solicitada estiver implementada.
- O padrão visual do projeto de referência tiver sido respeitado.
- O tema dark tiver sido preservado.
- As logos existentes em `assets` tiverem sido utilizadas corretamente.
- A versão tiver sido incrementada corretamente.
- A nova versão estiver visível no rodapé.
- A aplicação tiver sido validada.
- O commit tiver sido criado com as mensagens padronizadas.
- O commit tiver sido enviado ao GitHub.

---

## 6. Regras de segurança e preservação
- Não remover funcionalidades existentes sem solicitação explícita.
- Não alterar a identidade visual sem necessidade.
- Não substituir logos existentes sem justificativa.
- Não criar arquivos duplicados desnecessariamente.
- Não alterar dependências sem necessidade.
- Não modificar configurações de infraestrutura sem verificar o impacto.
- Não considerar uma alteração concluída apenas porque o código foi modificado.
- Sempre validar o resultado após alterações relevantes.

---

## 7. Comunicação ao final de cada comando
Apresentar resumo objetivo contendo:
- **Versão:** `v.X.Y.Z`
- **Alterações:** Resumo das alterações realizadas.
- **Arquivos principais alterados:** lista de arquivos.
- **Validação:** Resultado dos testes ou verificações realizadas.
- **Git:** Commit realizado, mensagem utilizada e status do Push.
