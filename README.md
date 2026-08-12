# Mentoria em Sistemas de Informacao

![CI](https://img.shields.io/badge/CI-failing-red?style=for-the-badge&logo=githubactions)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![GraphiQL](https://img.shields.io/badge/GraphiQL-enabled-brightgreen?style=for-the-badge)

API para gestao de tarefas de sprint desenvolvida com Node.js e Express, com foco em automacao de testes, validacao de contratos e integracao continua. O projeto tem como objetivo demonstrar aplicacao de boas praticas em desenvolvimento backend, documentacao de APIs e qualidade de software.

## 🚀 Objetivo

Este projeto foi desenvolvido para demonstrar conhecimentos em desenvolvimento e qualidade de software, contemplando:

- Construcao de APIs RESTful
- Modelagem de contratos JSON Schema
- Automacao de testes de API
- Integracao continua com GitHub Actions
- Documentacao de servicos com Swagger
- Suporte a GraphQL

## 🏗️ Arquitetura

```text
src/
├── controllers/
├── routes/
├── services/
├── schemas/
├── graphql/
├── data/
├── utils/
├── middlewares/
├── config/
└── tests/

✨ Funcionalidades
Cadastro, consulta, atualizacao e exclusao de tarefas
Gestao de sprint e status das atividades
Validacao de payload com JSON Schema
Documentacao interativa com Swagger
Testes automatizados para API
Pipeline CI/CD
Suporte a consultas GraphQL
🛠️ Tecnologias
Node.js
Express
JSON Schema
Swagger
GraphQL
Jest
Supertest
GitHub Actions
📦 Instalacao
git clone https://github.com/SEU_USUARIO/Mentoria-em-Sistemas-de-Informacao.git
cd Mentoria-em-Sistemas-de-Informacao
npm install
cp .env.example .env
npm run dev


