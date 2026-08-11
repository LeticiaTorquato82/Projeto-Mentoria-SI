const fs = require('fs');
const path = require('path');

const dataDir = path.resolve(__dirname, '../data');
const dataFile = path.resolve(dataDir, 'tasks.json');

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadTasksSync() {
  if (!fs.existsSync(dataFile)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Erro ao carregar dados de tarefas:', error);
    return [];
  }
}

async function saveTasks(tasks) {
  ensureDataDir();
  await fs.promises.writeFile(dataFile, JSON.stringify(tasks, null, 2), 'utf8');
}

module.exports = {
  loadTasksSync,
  saveTasks,
  dataFile,
};
