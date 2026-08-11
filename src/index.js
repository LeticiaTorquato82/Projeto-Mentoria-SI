const express = require('express');
const tasksRouter = require('./tasks');

const app = express();
app.use(express.json());
app.use('/api/tasks', tasksRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 API rodando em http://localhost:${port}`);
  });
}

module.exports = app;
