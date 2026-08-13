const request = require('supertest');
const app = require('../src/index');

describe('Smoke test da API', () => {
  it('deve responder ao health check e realizar o ciclo básico de vida da tarefa', async () => {
    const health = await request(app).get('/api/health').expect(200);
    expect(health.body.status).toBe('ok');

    const created = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Smoke test: tarefa de validação',
        description: 'Cenário de smoke com criação, consulta, atualização e exclusão',
        status: 'pending',
      })
      .expect(201);

    expect(created.body.id).toBeDefined();
    expect(created.body.title).toBe('Smoke test: tarefa de validação');
    expect(created.body.status).toBe('pending');

    const listed = await request(app).get('/api/tasks').expect(200);
    expect(Array.isArray(listed.body)).toBe(true);
    expect(listed.body.some((task) => task.id === created.body.id)).toBe(true);

    const updated = await request(app)
      .patch(`/api/tasks/${created.body.id}/status`)
      .send({ status: 'done' })
      .expect(200);

    expect(updated.body.status).toBe('done');

    await request(app).delete(`/api/tasks/${created.body.id}`).expect(204);
  });
});

describe('Testes exploratórios de validação', () => {
  it('deve rejeitar task com status inválido', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Status inválido',
        description: 'Teste de exploração',
        status: 'invalid-status',
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
  });

  it('deve rejeitar task sem título', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        description: 'Tarefa sem título',
        status: 'pending',
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
  });

  it('deve retornar 404 para tarefa inexistente', async () => {
    const response = await request(app).get('/api/tasks/999999').expect(404);
    expect(response.body.error).toBe('Task not found');
  });
});
