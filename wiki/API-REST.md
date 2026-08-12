# 🌐 API REST

## Visão geral

A API REST disponibiliza operações para gestão de tarefas.

## Endpoints principais

### Listar tarefas
```http
GET /api/tasks
```

### Criar tarefa
```http
POST /api/tasks
```

### Buscar por ID
```http
GET /api/tasks/:id
```

### Atualizar tarefa
```http
PUT /api/tasks/:id
```

### Atualizar status
```http
PATCH /api/tasks/:id/status
```

### Excluir tarefa
```http
DELETE /api/tasks/:id
```

## Exemplo de payload

```json
{
  "title": "Implementar endpoint de tarefa",
  "description": "Criar API REST para gestão de entregas",
  "status": "pending"
}
```

## Status esperados

- `200` — sucesso em consulta/atualização
- `201` — tarefa criada com sucesso
- `204` — exclusão realizada
- `400` — payload inválido
- `404` — recurso não encontrado

## Exemplo de chamada com curl

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Nova tarefa","description":"Teste","status":"pending"}'
```
