const express = require('express');
const tasks = require('./tasks');
const graphqlMiddleware = require('./graphql');

const app = express();
app.use(express.json());
app.use('/api/tasks', tasks.router);
app.use('/graphql', graphqlMiddleware);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/graphiql', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GraphiQL</title>
    <link rel="stylesheet" href="https://unpkg.com/graphiql@1.4.7/graphiql.min.css" />
  </head>
  <body style="margin: 0; height: 100vh;">
    <div id="graphiql" style="height: 100vh;"></div>
    <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/graphiql@1.4.7/graphiql.min.js"></script>
    <script>
      const graphQLFetcher = (graphQLParams) =>
        fetch('/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(graphQLParams),
        }).then((response) => response.json());

      ReactDOM.render(
        React.createElement(GraphiQL, { fetcher: graphQLFetcher }),
        document.getElementById('graphiql')
      );
    </script>
  </body>
</html>`);
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
