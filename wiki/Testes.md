# 🧪 Testes

## Estrutura de testes

O projeto utiliza uma suíte simples, porém efetiva, para validar a API.

### Ferramentas

- Jest
- Supertest
- Newman
- k6

## Execução

```bash
npm test
```

## Tipos de validação

### Testes unitários
Validação básica da API e regras de negócio.

### Testes de API
Validação dos endpoints e retorno esperado.

### Testes de contrato
Validação de payloads por schema.

### Testes de integração/coleção
Execução de Postman via Newman.

## Relatórios

Os relatórios são gerados em `reports/` e podem ser utilizados para evidência de qualidade e apresentação.

## Objetivo

Garantir que o projeto mantenha comportamento consistente mesmo após alterações.
