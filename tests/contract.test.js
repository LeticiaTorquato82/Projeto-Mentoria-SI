const request = require('supertest');
const Ajv = require('ajv').default;
const addFormats = require('ajv-formats');
const app = require('../src/index');
const taskSchema = require('../contracts/task.schema.json');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(taskSchema);

describe('Contrato JSON Schema da API de Tarefas', () => {
  it('valida o corpo de resposta ao criar uma tarefa', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Validar contrato JSON Schema',
        description: 'Teste de contrato de resposta',
        status: 'pending',
      })
      .expect(201);

    const valid = validate(response.body);
    if (!valid) {
      console.error(validate.errors);
    }

    expect(valid).toBe(true);
  });

  it('valida o array de tarefas retornado pelo endpoint GET /api/tasks', async () => {
    const response = await request(app).get('/api/tasks').expect(200);
    expect(Array.isArray(response.body)).toBe(true);

    response.body.forEach((task) => {
      const valid = validate(task);
      if (!valid) {
        console.error(validate.errors);
      }
      expect(valid).toBe(true);
    });
  });
});
