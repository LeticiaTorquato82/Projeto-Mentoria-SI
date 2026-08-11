# Mentoria-Julio-de-Lima
Projeto de Portifólio pessoal Mentoria 2.0 em teste de Software

## API de Acompanhamento de Entregas
Esta API REST foi criada para gerenciar o ciclo de vida de tarefas em uma sprint, incluindo criação, consulta, atualização e exclusão.

### Endpoints
- `GET /api/tasks` — lista todas as tarefas
- `POST /api/tasks` — cria nova tarefa
- `GET /api/tasks/:id` — consulta tarefa por ID
- `PUT /api/tasks/:id` — atualiza tarefa completa
- `PATCH /api/tasks/:id/status` — atualiza somente o status
- `DELETE /api/tasks/:id` — remove tarefa

### Contrato JSON Schema
O contrato de `Task` está disponível em `contracts/task.schema.json`.

### Como executar
1. Instalar dependências:
   ```bash
   npm install
   ```
2. Iniciar a API:
   ```bash
   npm start
   ```
3. Rodar testes automatizados:
   ```bash
   npm test
   ```
4. Executar coleção Postman com Newman:
   ```bash
   npm run postman
   ```

### Docker
Construir a imagem Docker:
```bash
npm run docker:build
```
Rodar o container localmente:
```bash
npm run docker:run
```
Rodar em detached mode:
```bash
docker run -d --rm -p 3000:3000 mentoria-julio-de-lima
```
Executar testes no container:
```bash
npm run docker:test
```

### Coleção Postman
A coleção Postman está em `postman/TaskManagement.postman_collection.json`.
Use o ambiente `postman/TaskManagement.postman_environment.json` para apontar para `http://localhost:3000`.

### Fluxo de teste recomendado
1. Executar `POST /api/tasks` para criar uma tarefa
2. Executar `GET /api/tasks/:id` para consultar a tarefa criada
3. Executar `PATCH /api/tasks/:id/status` para marcar como `done`
4. Executar `DELETE /api/tasks/:id` para excluir a tarefa

### Notes
- O JSON Schema valida o corpo da tarefa e garante que `title`, `status`, `createdAt` e `updatedAt` estejam no formato esperado.
- O status aceito para tarefas é: `pending`, `in-progress`, `done`.
