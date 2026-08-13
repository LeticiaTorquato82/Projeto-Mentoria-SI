#  Task Management API

[![Build Status](https://github.com/Letytorquato82/Mentoria-Julio-de-Lima/actions/workflows/ci.yml/badge.svg)](https://github.com/Letytorquato82/Mentoria-Julio-de-Lima/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Letytorquato82/Mentoria-Julio-de-Lima)
[![GraphiQL](https://img.shields.io/badge/GraphiQL-enabled-brightgreen.svg)](http://localhost:3000/graphiql)

> API REST e GraphQL para gestão de tarefas de sprint, com foco em automação de testes, validação de contratos e garantia de qualidade.

---

##  Objetivo do Projeto

Este projeto foi desenvolvido para demonstrar, de ponta a ponta, a construção de uma API de gestão de tarefas (task management) aplicada a um contexto de sprint ágil, com ênfase em **qualidade de software** e **automação de testes** — competências centrais para atuação em QA/SDET e desenvolvimento backend.

Os objetivos específicos são:

- Implementar um **CRUD completo** de tarefas, cobrindo os fluxos de criação, consulta, atualização (total e parcial) e exclusão.
- Expor a mesma base de dados por **dois paradigmas de API** — REST e GraphQL — permitindo comparar abordagens de consulta e integração.
- Validar contratos de entrada com **JSON Schema (Ajv)**, garantindo que dados inconsistentes sejam rejeitados antes de chegar à camada de negócio.
- Cobrir os fluxos críticos com **testes automatizados** (Jest + Supertest) e com uma **coleção Postman/Newman** executável via linha de comando.
- Automatizar a verificação de qualidade em **pipeline de CI/CD** (GitHub Actions), incluindo testes, validação da coleção Postman e auditoria de dependências.
- Manter uma arquitetura em camadas simples de entender, testar e evoluir para uma persistência real (banco de dados) no futuro.

Em resumo: o projeto simula, em pequena escala, o ciclo de vida de uma feature de API dentro de um time ágil — da modelagem de dados à entrega com testes e pipeline automatizados.

---

##  Arquitetura do Projeto

A aplicação segue uma arquitetura em camadas, onde REST e GraphQL compartilham a mesma lógica de negócio (`Services`), evitando duplicação de regras:

```mermaid
flowchart TD
    A[Cliente / Postman / Frontend] --> B[Express API REST]
    A --> C[GraphQL API]
    B --> D[Controllers]
    C --> D
    D --> E[Services]
    E --> F[Data Layer / File Storage]
    E --> G[Validation Layer]
    G --> H[JSON Schema / Ajv]
    E --> I[Business Rules]
```

### Detalhamento das camadas

- **Cliente (Postman / Frontend / curl)** — qualquer consumidor da API, seja para testes manuais, automação ou uma aplicação frontend.
- **Express API REST** — camada de rotas HTTP tradicionais (`/api/tasks`), responsável por expor o CRUD via verbos HTTP.
- **GraphQL API** — camada alternativa de acesso aos mesmos dados, via queries e mutations em um único endpoint (`/graphql`).
- **Controllers** — recebem a requisição (REST ou GraphQL), delegam para os Services e formatam a resposta (status HTTP, corpo JSON ou payload GraphQL).
- **Validation Layer (Ajv / JSON Schema)** — valida o formato e os tipos dos dados de entrada antes que cheguem à lógica de negócio, rejeitando payloads inválidos com mensagens de erro claras.
- **Services** — concentram as regras de negócio (ex.: transições de status permitidas, obrigatoriedade de campos) e a orquestração de leitura/escrita.
- **Data Layer / File Storage** — persistência local em arquivo, usada para manter o projeto simples e sem dependências externas de banco de dados. É o ponto de substituição caso o projeto evolua para um banco real (ex.: PostgreSQL, MongoDB).

### Mapa mental do projeto

```mermaid
mindmap
  root((Task Management API))
    Core
      REST API
      GraphQL API
      Express Server

    Tasks
      Create
      Read
      Update
      Delete
      Status Flow
        pending
        in-progress
        done

    Quality
      JSON Schema Validation
      Error Handling
      Automated Tests
      Postman Collection
      CI/CD Pipeline

    Testing
      Jest
      Supertest
      Newman
      GitHub Actions

    Stack
      Node.js
      Express
      Ajv
      GraphQL
      File Storage

    Delivery
      Local Run
      API Docs
      GitHub Repo
      Continuous Integration
```

---

##  Stack Tecnológica

| Tecnologia | Função no projeto |
|---|---|
| **Node.js 18+** | Runtime da aplicação |
| **Express** | Framework para a API REST |
| **GraphQL** | Camada alternativa de consulta/mutação sobre os mesmos dados |
| **Ajv** | Validação de payloads via JSON Schema |
| **Jest + Supertest** | Testes automatizados de unidade e integração |
| **Newman + Postman** | Execução da coleção de testes de API via linha de comando |
| **GitHub Actions** | Pipeline de integração contínua (CI/CD) |

---

## ⚙️ Funcionalidades

### CRUD completo de tarefas
Criação, leitura (individual e em lista), atualização (total e parcial de status) e exclusão de tarefas, disponíveis tanto via REST quanto via GraphQL.

### Controle de status (workflow da tarefa)
Cada tarefa segue um fluxo de status que reflete o andamento do trabalho em sprint:

```
pending  →  in-progress  →  done
```

- `pending` — tarefa criada, ainda não iniciada.
- `in-progress` — tarefa em execução.
- `done` — tarefa concluída.

O endpoint `PATCH /api/tasks/:id/status` existe justamente para permitir a atualização desse campo de forma isolada, sem precisar reenviar o objeto completo da tarefa.

### Validação de entrada (JSON Schema / Ajv)
Todo payload recebido nos endpoints de criação e atualização é validado contra um schema antes de ser processado. Isso garante que:
- campos obrigatórios estejam presentes;
- os tipos de dados estejam corretos (ex.: `title` como string);
- o campo `status`, quando enviado, pertença ao conjunto de valores permitidos (`pending`, `in-progress`, `done`).

Payloads inválidos são rejeitados com uma resposta de erro descritiva, evitando que dados inconsistentes cheguem à camada de negócio ou de persistência.

### Endpoints RESTful
API HTTP convencional, com rotas e verbos alinhados às boas práticas REST (ver seção [Endpoints REST](#-endpoints-rest)).

### Suporte a consultas GraphQL
Endpoint único (`/graphql`) que permite consultar e modificar tarefas com queries e mutations, útil para clientes que precisam buscar apenas os campos necessários ou combinar múltiplas operações em uma única requisição.

### Persistência local em arquivo
Os dados são armazenados em arquivo local, o que mantém o projeto autocontido (sem dependência de banco externo) e facilita a execução em qualquer ambiente apenas com Node.js instalado.

### Integração contínua (CI/CD)
Pipeline no GitHub Actions que executa automaticamente, a cada mudança no repositório: instalação de dependências, testes automatizados, validação da coleção Postman e auditoria de vulnerabilidades — ver seção [CI/CD](#-cicd).

---

## 📥 Instalação

### 1) Clone o repositório
```bash
git clone https://github.com/Letytorquato82/Mentoria-Julio-de-Lima.git
cd Mentoria-Julio-de-Lima
```

### 2) Instale as dependências
```bash
npm install
```

### 3) Inicie a aplicação
```bash
npm start
```

### 4) Acesse a API
```text
http://localhost:3000
```

---

## 🧾 Comandos Úteis

| Comando | O que faz |
|---|---|
| `npm install` | Instala as dependências do projeto |
| `npm start` | Inicia a API (REST + GraphQL) |
| `npm test` | Executa a suíte de testes automatizados |
| `npm run postman` | Executa a coleção Postman via Newman |
| `npm run audit:fix` | Tenta corrigir automaticamente vulnerabilidades de dependências |

---

## 🌐 Endpoints REST

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/tasks` | Lista todas as tarefas |
| `POST` | `/api/tasks` | Cria uma nova tarefa |
| `GET` | `/api/tasks/:id` | Busca uma tarefa por ID |
| `PUT` | `/api/tasks/:id` | Atualiza uma tarefa completa |
| `PATCH` | `/api/tasks/:id/status` | Atualiza apenas o status da tarefa |
| `DELETE` | `/api/tasks/:id` | Remove uma tarefa |

---

## 📨 Exemplos de Requisição

### Listar tarefas
```bash
curl -X GET "http://localhost:3000/api/tasks"
```

### Criar tarefa
```bash
curl -X POST "http://localhost:3000/api/tasks" \
  -H "Content-Type: application/json" \
  -d '{"title":"Implementar endpoint de tarefa","description":"Criar API REST para gestão de entregas","status":"pending"}'
```

### Buscar tarefa por ID
```bash
curl -X GET "http://localhost:3000/api/tasks/1"
```

### Atualizar tarefa (completa)
```bash
curl -X PUT "http://localhost:3000/api/tasks/1" \
  -H "Content-Type: application/json" \
  -d '{"title":"Tarefa atualizada","description":"Descrição atualizada","status":"in-progress"}'
```

### Atualizar apenas o status
```bash
curl -X PATCH "http://localhost:3000/api/tasks/1/status" \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'
```

### Deletar tarefa
```bash
curl -X DELETE "http://localhost:3000/api/tasks/1"
```

---

##  Modelo de Dados

```json
{
  "title": "Implementar endpoint de tarefa",
  "description": "Criar API REST para gestão de entregas",
  "status": "pending"
}
```

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `title` | string | ✅ sim | Título da tarefa |
| `description` | string | ❌ não | Detalhamento opcional da tarefa |
| `status` | enum | ❌ não (default `pending`) | Um dos valores: `pending`, `in-progress`, `done` |

---

##  Testes

O projeto conta com duas frentes de testes, que se complementam:

### Testes automatizados (Jest + Supertest)
Cobrem os endpoints REST e a lógica de negócio, validando status codes, formato de resposta e regras de validação.

```bash
npm test
```

### Coleção Postman (Newman)
Além dos testes automatizados em código, há uma coleção Postman com os principais fluxos da API, executável via CLI através do Newman — útil para validação de contrato e para rodar os mesmos testes fora do código-fonte (ex.: no pipeline de CI).

Arquivos:
- `postman/TaskManagement.postman_collection.json`
- `postman/TaskManagement.postman_environment.json`

```bash
npm run postman
```

---

##  Casos de Teste (Gherkin/BDD)

Os principais fluxos da API são documentados em formato Gherkin, permitindo especificar o comportamento esperado em linguagem legível para todos os stakeholders (devs, QAs, Product Owners).

### Feature: Gerenciar Tarefas - REST API

```gherkin
Feature: Task Management REST API
  Como usuário da API
  Quero gerenciar tarefas (criar, listar, buscar, atualizar e deletar)
  Para organizar e acompanhar o progresso de trabalhos em sprint

  Background:
    Given a aplicação está rodando em "http://localhost:3000"
    And o endpoint "/api/tasks" está disponível

  # ===== CREATE TASK =====
  Scenario: Criar uma tarefa com sucesso
    When faço uma requisição POST para "/api/tasks" com o corpo:
      """json
      {
        "title": "Implementar autenticação",
        "description": "Adicionar JWT à API",
        "status": "pending"
      }
      """
    Then o status da resposta deve ser 201
    And a resposta deve conter um "id"
    And o campo "title" deve ser "Implementar autenticação"
    And o campo "status" deve ser "pending"

  Scenario: Criar tarefa sem título retorna erro 400
    When faço uma requisição POST para "/api/tasks" com o corpo:
      """json
      {
        "description": "Descrição sem título"
      }
      """
    Then o status da resposta deve ser 400
    And a resposta deve conter mensagem de erro indicando que "title" é obrigatório

  Scenario: Criar tarefa com status inválido retorna erro 400
    When faço uma requisição POST para "/api/tasks" com o corpo:
      """json
      {
        "title": "Tarefa teste",
        "status": "invalid_status"
      }
      """
    Then o status da resposta deve ser 400
    And a resposta deve conter mensagem de erro sobre "status" inválido

  Scenario: Criar tarefa com description opcionalmente vazia
    When faço uma requisição POST para "/api/tasks" com o corpo:
      """json
      {
        "title": "Tarefa simples"
      }
      """
    Then o status da resposta deve ser 201
    And o campo "description" deve ser vazio ou nulo

  # ===== READ TASKS =====
  Scenario: Listar todas as tarefas com sucesso
    Given que existem 3 tarefas cadastradas
    When faço uma requisição GET para "/api/tasks"
    Then o status da resposta deve ser 200
    And a resposta deve ser um array
    And o array deve conter 3 itens

  Scenario: Listar tarefas quando não há nenhuma
    Given não há tarefas cadastradas
    When faço uma requisição GET para "/api/tasks"
    Then o status da resposta deve ser 200
    And a resposta deve ser um array vazio

  Scenario: Buscar uma tarefa específica por ID
    Given que existe uma tarefa com ID "1" e título "Tarefa teste"
    When faço uma requisição GET para "/api/tasks/1"
    Then o status da resposta deve ser 200
    And o campo "id" deve ser "1"
    And o campo "title" deve ser "Tarefa teste"

  Scenario: Buscar tarefa com ID inexistente retorna 404
    When faço uma requisição GET para "/api/tasks/9999"
    Then o status da resposta deve ser 404
    And a resposta deve conter mensagem indicando que a tarefa não foi encontrada

  # ===== UPDATE TASK (PUT - completa) =====
  Scenario: Atualizar tarefa completa com sucesso
    Given que existe uma tarefa com ID "1"
    When faço uma requisição PUT para "/api/tasks/1" com o corpo:
      """json
      {
        "title": "Tarefa atualizada",
        "description": "Nova descrição",
        "status": "in-progress"
      }
      """
    Then o status da resposta deve ser 200
    And o campo "title" deve ser "Tarefa atualizada"
    And o campo "status" deve ser "in-progress"

  Scenario: Atualizar tarefa sem título retorna erro 400
    Given que existe uma tarefa com ID "1"
    When faço uma requisição PUT para "/api/tasks/1" com o corpo:
      """json
      {
        "description": "Descrição sem título"
      }
      """
    Then o status da resposta deve ser 400
    And a resposta deve conter mensagem de erro

  Scenario: Atualizar tarefa inexistente retorna 404
    When faço uma requisição PUT para "/api/tasks/9999" com o corpo:
      """json
      {
        "title": "Título qualquer",
        "status": "pending"
      }
      """
    Then o status da resposta deve ser 404

  # ===== UPDATE STATUS (PATCH - parcial) =====
  Scenario: Atualizar apenas status da tarefa com sucesso
    Given que existe uma tarefa com ID "1" com status "pending"
    When faço uma requisição PATCH para "/api/tasks/1/status" com o corpo:
      """json
      {
        "status": "in-progress"
      }
      """
    Then o status da resposta deve ser 200
    And o campo "status" deve ser "in-progress"
    And os outros campos da tarefa devem permanecer inalterados

  Scenario: Atualizar para status inválido retorna erro 400
    Given que existe uma tarefa com ID "1"
    When faço uma requisição PATCH para "/api/tasks/1/status" com o corpo:
      """json
      {
        "status": "invalid"
      }
      """
    Then o status da resposta deve ser 400

  Scenario: Workflow de status válido: pending → in-progress → done
    Given que existe uma tarefa com ID "1" com status "pending"
    When faço uma requisição PATCH para "/api/tasks/1/status" com status "in-progress"
    Then o status da resposta deve ser 200
    And o campo "status" deve ser "in-progress"
    
    When faço uma requisição PATCH para "/api/tasks/1/status" com status "done"
    Then o status da resposta deve ser 200
    And o campo "status" deve ser "done"

  # ===== DELETE TASK =====
  Scenario: Deletar uma tarefa com sucesso
    Given que existe uma tarefa com ID "1"
    When faço uma requisição DELETE para "/api/tasks/1"
    Then o status da resposta deve ser 204

  Scenario: Deletar tarefa inexistente retorna 404
    When faço uma requisição DELETE para "/api/tasks/9999"
    Then o status da resposta deve ser 404

  Scenario: Tarefa deletada não pode ser recuperada
    Given que existe uma tarefa com ID "1"
    When faço uma requisição DELETE para "/api/tasks/1"
    And faço uma requisição GET para "/api/tasks/1"
    Then o status da resposta deve ser 404

  # ===== VALIDATION =====
  Scenario Outline: Validar tipos de dados na criação
    When faço uma requisição POST para "/api/tasks" com o corpo:
      """json
      {
        "title": <title>,
        "description": <description>,
        "status": <status>
      }
      """
    Then o status da resposta deve ser <expectedStatus>

    Examples:
      | title           | description    | status       | expectedStatus |
      | "Tarefa 1"      | "Desc"         | "pending"    | 201            |
      | "Tarefa 2"      | null           | "pending"    | 201            |
      | null            | "Desc"         | "pending"    | 400            |
      | 123             | "Desc"         | "pending"    | 400            |
      | "Tarefa 3"      | "Desc"         | "unknown"    | 400            |
```

### Feature: Gerenciar Tarefas - GraphQL API

```gherkin
Feature: Task Management GraphQL API
  Como desenvolvedor frontend
  Quero consultar e modificar tarefas via GraphQL
  Para obter apenas os campos necessários em uma única requisição

  Background:
    Given a aplicação está rodando em "http://localhost:3000"
    And o endpoint GraphQL "/graphql" está disponível

  Scenario: Consultar todas as tarefas via GraphQL
    When faço uma requisição GraphQL com a query:
      """graphql
      query {
        tasks {
          id
          title
          description
          status
        }
      }
      """
    Then o status da resposta deve ser 200
    And a resposta deve conter um array de tarefas
    And cada tarefa deve ter "id", "title" e "status"

  Scenario: Criar tarefa via GraphQL mutation
    When faço uma requisição GraphQL com a mutation:
      """graphql
      mutation {
        createTask(input: {
          title: "Nova tarefa GraphQL",
          description: "Teste de mutation",
          status: "pending"
        }) {
          id
          title
          status
        }
      }
      """
    Then o status da resposta deve ser 200
    And o campo "data.createTask.title" deve ser "Nova tarefa GraphQL"
    And o campo "data.createTask.id" deve estar presente

  Scenario: Atualizar tarefa via GraphQL mutation
    Given que existe uma tarefa com ID "1" via GraphQL
    When faço uma requisição GraphQL com a mutation:
      """graphql
      mutation {
        updateTask(id: "1", input: {
          title: "Tarefa atualizada via GraphQL",
          status: "in-progress"
        }) {
          id
          title
          status
        }
      }
      """
    Then o status da resposta deve ser 200
    And o campo "data.updateTask.status" deve ser "in-progress"

  Scenario: Deletar tarefa via GraphQL mutation
    Given que existe uma tarefa com ID "1" via GraphQL
    When faço uma requisição GraphQL com a mutation:
      """graphql
      mutation {
        deleteTask(id: "1") {
          success
          message
        }
      }
      """
    Then o status da resposta deve ser 200
    And o campo "data.deleteTask.success" deve ser true

  Scenario: Consultar apenas campos específicos via GraphQL
    Given que existem tarefas cadastradas
    When faço uma requisição GraphQL com a query:
      """graphql
      query {
        tasks {
          id
          title
        }
      }
      """
    Then o status da resposta deve ser 200
    And cada tarefa deve conter apenas "id" e "title" (sem "description" ou "status")

  Scenario: GraphQL retorna erro para query inválida
    When faço uma requisição GraphQL com a query:
      """graphql
      query {
        tasks {
          invalidField
        }
      }
      """
    Then o status da resposta deve ser 400
    And a resposta deve conter mensagem de erro indicando campo inválido
```

### Feature: Validação de Dados (JSON Schema)

```gherkin
Feature: Validação de Entrada (JSON Schema / Ajv)
  Como sistema
  Quero validar todos os dados de entrada
  Para garantir que apenas dados válidos cheguem à lógica de negócio

  Scenario: Payload com campos obrigatórios presentes é válido
    When valido o payload:
      """json
      {
        "title": "Tarefa completa",
        "description": "Descrição aqui",
        "status": "pending"
      }
      """
    Then a validação deve passar

  Scenario: Payload sem campo obrigatório "title" falha
    When valido o payload:
      """json
      {
        "description": "Sem título",
        "status": "pending"
      }
      """
    Then a validação deve falhar
    And a mensagem deve indicar que "title" é obrigatório

  Scenario: Campo "title" deve ser string
    When valido o payload:
      """json
      {
        "title": 123,
        "status": "pending"
      }
      """
    Then a validação deve falhar
    And a mensagem deve indicar que "title" deve ser string

  Scenario: Campo "status" só aceita valores permitidos
    When valido o payload com "status" = "pending"
    Then a validação deve passar
    
    When valido o payload com "status" = "in-progress"
    Then a validação deve passar
    
    When valido o payload com "status" = "done"
    Then a validação deve passar
    
    When valido o payload com "status" = "rejected"
    Then a validação deve falhar

  Scenario: Campo "description" é opcional
    When valido o payload:
      """json
      {
        "title": "Tarefa sem descrição"
      }
      """
    Then a validação deve passar

  Scenario: Payload com campos extras é rejeitado (strict mode)
    When valido o payload:
      """json
      {
        "title": "Tarefa",
        "status": "pending",
        "extraField": "não deve estar aqui"
      }
      """
    Then a validação deve falhar
    And a mensagem deve indicar campo desconhecido
```

Esses casos de teste (Gherkin) podem ser automatizados com ferramentas como **Cucumber.js** ou **CodeceptJS**, permitindo executar os mesmos cenários descritos acima de forma programática integrada ao pipeline de CI/CD.

---

##  GraphQL

O projeto também oferece suporte a GraphQL como alternativa (não substituta) à API REST, compartilhando a mesma base de dados e regras de negócio.

- Endpoint: `http://localhost:3000/graphql`
- Interface interativa (GraphiQL): `http://localhost:3000/graphiql`

### Consulta de exemplo
```graphql
query {
  tasks {
    id
    title
    description
    status
  }
}
```

### Mutation de exemplo
```graphql
mutation {
  createTask(input: { title: "Nova tarefa", description: "Descrição", status: "pending" }) {
    id
    title
    status
  }
}
```

---

##  CI/CD

O projeto inclui um pipeline automatizado em GitHub Actions, disparado a cada alteração no repositório, responsável por:

1. Instalação das dependências do projeto.
2. Execução da suíte de testes automatizados (Jest + Supertest).
3. Validação da coleção Postman via Newman.
4. Auditoria de vulnerabilidades nas dependências.

Isso garante que nenhuma alteração seja incorporada ao repositório sem antes passar pelas mesmas verificações de qualidade usadas localmente.

Arquivo de configuração: `.github/workflows/ci.yml`

---

## 📝 Observações

- A persistência atual é local, em arquivo — adequada para fins de demonstração e testes, mas não recomendada para produção.
- O objetivo principal do projeto é demonstrar arquitetura, qualidade e testes em API, não substituir uma solução de gestão de tarefas real.
- A estrutura foi organizada para facilitar o entendimento e permitir evolução futura, como a troca da camada de persistência por um banco de dados real.

---

## 📬 Contato

Para dúvidas, sugestões ou melhorias, abra uma issue no repositório ou entre em contato pelo GitHub.
