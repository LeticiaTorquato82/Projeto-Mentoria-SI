# Tabela de Decisão de Regras de Negócio

Esta tabela descreve as principais regras de decisão para a API de tarefas e o fluxo de estados.

## Criação de tarefa

| Condição | Entrada | Validação | Resultado esperado |
|---|---|---|---|
| Título e descrição válidos, status omitido | `POST /api/tasks` com `{ title, description }` | `title` obrigatório, `description` opcional | Cria tarefa com `status: pending` e retorna `201` |
| Título e status válidos | `POST /api/tasks` com `{ title, description, status: "in-progress" }` | `status` deve ser `pending`, `in-progress` ou `done` | Cria tarefa com status indicado e retorna `201` |
| Status inválido | `POST /api/tasks` com `status: "invalid"` | Erro de validação de status | Retorna `400` com lista de erros |
| Campo obrigatório ausente | `POST /api/tasks` sem `title` | `title` obrigatório | Retorna `400` com erro de validação |

## Consulta de tarefa

| Condição | Entrada | Validação | Resultado esperado |
|---|---|---|---|
| Tarefa existe | `GET /api/tasks/:id` | Verifica existência por `id` | Retorna `200` com tarefa |
| Tarefa não existe | `GET /api/tasks/:id` | Verifica existência por `id` | Retorna `404` |

## Atualização completa de tarefa

| Condição | Entrada | Validação | Resultado esperado |
|---|---|---|---|
| Dados válidos e tarefa existe | `PUT /api/tasks/:id` com payload completo | Valida todo payload e status | Atualiza tarefa e retorna `200` |
| Tarefa não existe | `PUT /api/tasks/:id` | Verifica existência por `id` | Retorna `404` |
| Payload inválido | `PUT /api/tasks/:id` com `status: "invalid"` | Validação do schema falha | Retorna `400` |

## Atualização de status

| Condição | Entrada | Validação | Resultado esperado |
|---|---|---|---|
| Status válido e tarefa existe | `PATCH /api/tasks/:id/status` com `{ status: "done" }` | `status` deve ser `pending`, `in-progress` ou `done` | Atualiza status e retorna `200` |
| Status inválido | `PATCH /api/tasks/:id/status` com `{ status: "invalid" }` | Erro de validação de status | Retorna `400` |
| Tarefa não existe | `PATCH /api/tasks/:id/status` | Verifica existência por `id` | Retorna `404` |

## Exclusão de tarefa

| Condição | Entrada | Validação | Resultado esperado |
|---|---|---|---|
| Tarefa existe | `DELETE /api/tasks/:id` | Verifica existência por `id` | Remove a tarefa e retorna `204` |
| Tarefa não existe | `DELETE /api/tasks/:id` | Verifica existência por `id` | Retorna `404` |

## GraphQL

| Condição | Operação | Resultado esperado |
|---|---|---|
| Consultar todas as tarefas | `query { tasks { id title status } }` | Retorna lista de tarefas |
| Criar tarefa | `mutation { createTask(input: { title: "Tarefa" }) { id title status } }` | Retorna tarefa criada |
| Atualizar tarefa | `mutation { updateTask(id: "1", input: { title: "Atualizada", status: "done" }) { id title status } }` | Retorna tarefa atualizada |
| Atualizar status | `mutation { updateTaskStatus(id: "1", status: "done") { id status } }` | Retorna tarefa atualizada |
| Deletar tarefa | `mutation { deleteTask(id: "1") }` | Retorna `true` se removida |
