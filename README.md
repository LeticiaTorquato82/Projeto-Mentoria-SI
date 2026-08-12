markdown_content = """# Task Management API

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
* Persistência local leve baseada em ficheiro (`data/tasks.json`).
* Pipeline de Integração Contínua (CI) configurado com GitHub Actions.

---

## 📦 Instalação e Execução Local

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Letytorquato82/Mentoria-Julio-de-Lima.git](https://github.com/Letytorquato82/Mentoria-Julio-de-Lima.git)
   cd Mentoria-Julio-de-Lima
