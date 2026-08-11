const express = require('express');
const Ajv = require('ajv').default;
const addFormats = require('ajv-formats');
const createTaskSchema = require('./validation/createTaskSchema');
const updateTaskSchema = require('./validation/updateTaskSchema');
const { loadTasksSync, saveTasks } = require('./db');

const router = express.Router();
const ajv = new Ajv({ allErrors: true, removeAdditional: 'all' });
addFormats(ajv);
const validateCreate = ajv.compile(createTaskSchema);
const validateUpdate = ajv.compile(updateTaskSchema);

const tasks = new Map(loadTasksSync().map((task) => [task.id, task]));
let nextId = tasks.size > 0 ? Math.max(...Array.from(tasks.keys(), (key) => Number(key))) + 1 : 1;

function persistTasks() {
  return saveTasks(Array.from(tasks.values()));
}

function createTask(data) {
  const task = {
    id: String(nextId++),
    title: data.title,
    description: data.description || '',
    status: data.status || 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.set(task.id, task);
  persistTasks();
  return task;
}

function getTask(id) {
  return tasks.get(id);
}

function getAllTasks() {
  return Array.from(tasks.values());
}

router.get('/', (req, res) => {
  res.json(getAllTasks());
});

router.post('/', (req, res) => {
  const valid = validateCreate(req.body);
  if (!valid) {
    return res.status(400).json({ errors: validateCreate.errors });
  }

  const task = createTask(req.body);
  return res.status(201).json(task);
});

router.get('/:id', (req, res) => {
  const task = getTask(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

router.put('/:id', (req, res) => {
  const existing = getTask(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const payload = {
    ...existing,
    ...req.body,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };

  const valid = validateUpdate(payload);
  if (!valid) {
    return res.status(400).json({ errors: validateUpdate.errors });
  }

  tasks.set(existing.id, payload);
  persistTasks();
  res.json(payload);
});

router.patch('/:id/status', (req, res) => {
  const existing = getTask(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { status } = req.body;
  if (typeof status !== 'string') {
    return res.status(400).json({ error: 'Status é obrigatório' });
  }

  const allowedStatuses = ['pending', 'in-progress', 'done'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: `Status inválido. Valores aceitos: ${allowedStatuses.join(', ')}` });
  }

  const updated = {
    ...existing,
    status,
    updatedAt: new Date().toISOString(),
  };

  tasks.set(existing.id, updated);
  res.json(updated);
});

function updateTask(id, data) {
  const existing = getTask(id);
  if (!existing) {
    return null;
  }

  const payload = {
    ...existing,
    ...data,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };

  const valid = validateUpdate(payload);
  if (!valid) {
    throw new Error('Payload inválido para atualização de tarefa');
  }

  tasks.set(existing.id, payload);
  persistTasks();
  return payload;
}

function updateTaskStatus(id, status) {
  const existing = getTask(id);
  if (!existing) {
    return null;
  }

  const allowedStatuses = ['pending', 'in-progress', 'done'];
  if (!allowedStatuses.includes(status)) {
    throw new Error(`Status inválido. Valores aceitos: ${allowedStatuses.join(', ')}`);
  }

  const updated = {
    ...existing,
    status,
    updatedAt: new Date().toISOString(),
  };

  tasks.set(existing.id, updated);
  persistTasks();
  return updated;
}

function deleteTask(id) {
  const deleted = tasks.delete(id);
  if (deleted) {
    persistTasks();
  }
  return deleted;
}

router.delete('/:id', (req, res) => {
  if (!deleteTask(req.params.id)) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(204).send();
});

module.exports = {
  router,
  createTask,
  getTask,
  getAllTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
