const request = require('supertest');
const Ajv = require('ajv').default;
const addFormats = require('ajv-formats');
const app = require('../src/index');
const taskSchema = require('../src/validation/taskSchema');

const ajv = new Ajv({ allErrors: true, removeAdditional: 'all' });
addFormats(ajv);
const validateSchema = ajv.compile(taskSchema);

describe('API de Tarefas - CRUD', () => {
  let task;

  it('deve criar uma tarefa', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Implementar endpoint de tarefa',
        description: 'Criar API REST para gestão de entregas',
        status: 'pending',
      })
      .expect(201);

    expect(response.body.id).toBeDefined();
    expect(response.body.title).toBe('Implementar endpoint de tarefa');
    expect(response.body.status).toBe('pending');
    expect(validateSchema(response.body)).toBe(true);

    task = response.body;
  });

  it('deve consultar a tarefa existente', async () => {
    const response = await request(app).get(`/api/tasks/${task.id}`).expect(200);
    expect(response.body.id).toBe(task.id);
    expect(response.body.title).toBe(task.title);
    expect(validateSchema(response.body)).toBe(true);
  });

  it('deve atualizar o status para concluído', async () => {
    const response = await request(app)
      .patch(`/api/tasks/${task.id}/status`)
      .send({ status: 'done' })
      .expect(200);

    expect(response.body.status).toBe('done');
    expect(validateSchema(response.body)).toBe(true);
  });

  it('deve deletar a tarefa', async () => {
    await request(app).delete(`/api/tasks/${task.id}`).expect(204);
    await request(app).get(`/api/tasks/${task.id}`).expect(404);
  });
});
