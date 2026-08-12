# 📡 GraphQL

## Visão geral

O projeto também expõe um endpoint GraphQL para consultas e mutações alternativas à API REST.

## Endpoint

```text
http://localhost:3000/graphql
```

## Interface de exploração

```text
http://localhost:3000/graphiql
```

## Consulta exemplo

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

## Mutation exemplo

```graphql
mutation {
  createTask(input: { title: "Nova tarefa", description: "Descrição", status: "pending" }) {
    id
    title
    status
  }
}
```

## Benefícios

- consultas flexíveis
- retorno sob demanda
- boa experiência para API exploratória
- complementaridade com o modelo REST
