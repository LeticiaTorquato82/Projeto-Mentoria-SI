# Mentoria em Sistemas de Informacao

![CI](https://img.shields.io/badge/CI-failing-red?style=for-the-badge&logo=githubactions)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![GraphiQL](https://img.shields.io/badge/GraphiQL-enabled-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

API para gestao de tarefas de sprint desenvolvida com Node.js e Express, com foco em automacao de testes, validacao de contratos e integracao continua. O projeto tem como objetivo demonstrar boas praticas em desenvolvimento backend, documentacao de APIs e qualidade de software.

## 🚀 Objetivo

Este projeto foi desenvolvido para demonstrar conhecimentos em desenvolvimento e qualidade de software, contemplando:

- Construcao de APIs RESTful
- Modelagem de contratos JSON Schema
- Automacao de testes de API
- Integracao continua com GitHub Actions
- Documentacao de servicos com Swagger
- Suporte a GraphQL

## 🧩 Visao Geral

O sistema permite o gerenciamento de tarefas de sprint, incluindo cadastro, consulta, atualizacao e exclusao de registros. A aplicacao foi estruturada para incentivar boas praticas de arquitetura, manutencao e validacao de regras de negocio.

A proposta do projeto tambem inclui:

- separacao por responsabilidades
- uso de validacao de entrada
- documentacao de endpoints
- automatizacao de testes
- suporte a consulta via GraphQL
- pipeline de integracao continua

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
├── app.js
├── server.js
└── tests/
