# Task Management API

[![Build Status](https://github.com/Letytorquato82/Mentoria-Julio-de-Lima/actions/workflows/ci.yml/badge.svg)](https://github.com/Letytorquato82/Mentoria-Julio-de-Lima/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Letytorquato82/Mentoria-Julio-de-Lima)
[![GraphiQL](https://img.shields.io/badge/GraphiQL-enabled-brightgreen.svg)](http://localhost:3000/graphiql)

> API REST e GraphQL desenvolvida para o gerenciamento de tarefas de sprint, com forte foco em **automação de testes**, **validação de contratos** e **qualidade de software**.

---

## 🚀 Sobre o Projeto

Esta aplicação demonstra o ciclo completo de operações **CRUD** para o acompanhamento de demandas e entregas de sprint. O projeto destaca-se pela implementação de testes automatizados, validação rigorosa de payloads com JSON Schema e suporte a consultas modernas via GraphQL.

---

## 🛠️ Tecnologias Utilizadas

* **Runtime:** Node.js (v18+)
* **Framework:** Express
* **Validação:** Ajv (JSON Schema)
* **Testes Automatizados:** Jest + Supertest
* **Testes de API / CI:** Newman + Postman
* **Interface / API Alternativa:** GraphQL & GraphiQL

---

## ⚙️ Funcionalidades

* CRUD completo de tarefas.
* Gestão de estados: `pending`, `in-progress`, `done`.
* Validação de esquemas de dados em JSON.
* Endpoints RESTful e suporte a GraphQL.
* Persistência local leve baseada em arquivo (`data/tasks.json`).
* Pipeline de Integração Contínua (CI) configurado com GitHub Actions.

---

## 📦 Instalação e Execução Local

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Letytorquato82/Mentoria-Julio-de-Lima.git](https://github.com/Letytorquato82/Mentoria-Julio-de-Lima.git)
   cd Mentoria-Julio-de-Lima
2. Instale dependências:
   ```bash
   npm install
   ```
3. Inicie a API:
   ```bash
   npm start
   ```
4. Acesse a API localmente em:
   ```text
   http://localhost:3000
   ```

## Comandos principais
- `npm install` — instala dependências
- `npm start` — inicia a API
- `npm test` — executa os testes automatizados
- `npm run postman` — executa a coleção Postman via Newman
- `npm run audit:fix` — tenta corrigir vulnerabilidades de dependências

## Estrutura da API
### Endpoints
- `GET /api/tasks`
  - Retorna a lista de tarefas
- `POST /api/tasks`
  - Cria uma nova tarefa
- `GET /api/tasks/:id`
  - Retorna uma tarefa por ID
- `PUT /api/tasks/:id`
  - Atualiza os dados de uma tarefa
- `PATCH /api/tasks/:id/status`
  - Atualiza apenas o status da tarefa
- `DELETE /api/tasks/:id`
  - Remove uma tarefa

### Exemplos de requisições cURL
Use `BASE_URL=http://localhost:3000` para executar os exemplos abaixo.

#### Listar tarefas
```bash
curl -X GET "$BASE_URL/api/tasks" -H "Accept: application/json"
```

#### Criar tarefa
```bash
curl -X POST "$BASE_URL/api/tasks" \
  -H "Content-Type: application/json" \
  -d '{"title":"Implementar endpoint de tarefa","description":"Criar API REST para gestão de entregas","status":"pending"}'
```

#### Consultar tarefa por ID
```bash
curl -X GET "$BASE_URL/api/tasks/{id}" -H "Accept: application/json"
```

#### Atualizar tarefa completa
```bash
curl -X PUT "$BASE_URL/api/tasks/{id}" \
  -H "Content-Type: application/json" \
  -d '{"title":"Tarefa atualizada","description":"Descrição atualizada","status":"in-progress"}'
```

#### Atualizar status da tarefa
```bash
curl -X PATCH "$BASE_URL/api/tasks/{id}/status" \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'
```

#### Deletar tarefa
```bash
curl -X DELETE "$BASE_URL/api/tasks/{id}"
```

### Modelo de tarefa
O contrato de `Task` está em `contracts/task.schema.json`.

Exemplo de payload para criação:
```json
{
  "title": "Implementar endpoint de tarefa",
  "description": "Criar API REST para gestão de entregas",
  "status": "pending"
}
```

Campos importantes:
- `title` (string, obrigatório)
- `description` (string, opcional)
- `status` (enum: `pending`, `in-progress`, `done`)

## Testes
### Testes automatizados
Use:
```bash
npm test
```

### Coleção Postman
A coleção está em `postman/TaskManagement.postman_collection.json`.
O ambiente de teste está em `postman/TaskManagement.postman_environment.json`.

Configurar `baseUrl` para:
```text
http://localhost:3000
```

### Fluxo de validação recomendado
1. `POST /api/tasks` para criar uma tarefa
2. `GET /api/tasks/:id` para consultar a tarefa
3. `PATCH /api/tasks/:id/status` para marcar como `done`
4. `DELETE /api/tasks/:id` para remover a tarefa

## GraphQL
Este projeto também inclui um endpoint GraphQL disponível em:
```text
http://localhost:3000/graphql
```

Uma interface de exploração GraphiQL também está disponível em:
```text
http://localhost:3000/graphiql
```

### Consultas de exemplo
#### Obter todas as tarefas
```graphql
query {
  tasks {
    id
    title
    description
    status
    createdAt
    updatedAt
  }
}
```

#### Obter tarefa por ID
```graphql
query {
  task(id: "1") {
    id
    title
    status
  }
}
```

### Mutations de exemplo
#### Criar tarefa
```graphql
mutation {
  createTask(input: { title: "Nova tarefa", description: "Descrição", status: "pending" }) {
    id
    title
    status
  }
}
```

#### Atualizar tarefa
```graphql
mutation {
  updateTask(id: "1", input: { title: "Tarefa atualizada", description: "Descrição atualizada", status: "in-progress" }) {
    id
    title
    status
  }
}
```

#### Atualizar status
```graphql
mutation {
  updateTaskStatus(id: "1", status: "done") {
    id
    status
  }
}
```

#### Deletar tarefa
```graphql
mutation {
  deleteTask(id: "1")
}
```

## CI/CD
O projeto inclui uma workflow do GitHub Actions em `.github/workflows/ci.yml` para:
- instalar dependências
- executar testes unitários
- executar a coleção Newman
- executar `npm audit --production` em modo de relatório

## Tabela de decisão
A tabela de decisão de regras de negócio está disponível em `DECISION_TABLE.md`.

## Observações importantes
- O armazenamento atual é em arquivo local (`data/tasks.json`) e serve como persistência simples para desenvolvimento.
- Docker não é obrigatório para este projeto.
- Se você não puder instalar Docker, use apenas Node.js e os comandos acima.

## Contato
Para dúvidas sobre o projeto, abra uma issue no repositório ou entre em contato pelo GitHub.
