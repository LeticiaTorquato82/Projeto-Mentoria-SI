Task Management API
API REST e GraphQL desenvolvida para o gerenciamento de tarefas de sprint, com forte foco em automação de testes, validação de contratos e qualidade de software.

🚀 Sobre o Projeto
Esta aplicação demonstra o ciclo completo de operações CRUD para o acompanhamento de demandas e entregas de sprint. O projeto destaca-se pela implementação de testes automatizados, validação rigorosa de payloads com JSON Schema e suporte a consultas modernas via GraphQL.

🛠️ Tecnologias Utilizadas
Runtime: Node.js (v18+)

Framework: Express

Validação: Ajv (JSON Schema)

Testes Automatizados: Jest + Supertest

Testes de API / CI: Newman + Postman

Interface / API Alternativa: GraphQL & GraphiQL

⚙️ Funcionalidades
CRUD completo de tarefas.

Gestão de estados: pending, in-progress, done.

Validação de esquemas de dados em JSON.

Endpoints RESTful e suporte a GraphQL.

Persistência local leve baseada em arquivo (data/tasks.json).

Pipeline de Integração Contínua (CI) configurado com GitHub Actions.

📦 Instalação e Execução Local
Clone o repositório:

Bash
git clone https://github.com/Letytorquato82/Mentoria-Julio-de-Lima.git
cd Mentoria-Julio-de-Lima
Instale as dependências:

Bash
npm install
Inicie a aplicação:

Bash
npm start
A API ficará disponível em http://localhost:3000.

🧪 Comandos Principais
Comando	Descrição
npm start	Inicia o servidor da API
npm test	Executa a suíte de testes unitários/integração (Jest)
npm run postman	Executa a coleção de testes do Postman via Newman
npm run audit:fix	Verifica e corrige vulnerabilidades nas dependências
🔌 Documentação da API (REST)
Endpoints Principais
GET /api/tasks — Lista todas as tarefas.

POST /api/tasks — Cria uma nova tarefa.

GET /api/tasks/:id — Obtém uma tarefa específica pelo ID.

PUT /api/tasks/:id — Atualiza todos os dados de uma tarefa.

PATCH /api/tasks/:id/status — Atualiza apenas o estado de uma tarefa.

DELETE /api/tasks/:id — Remove uma tarefa.

Exemplo de Requisição (cURL)
Bash
curl -X POST "http://localhost:3000/api/tasks" \
  -H "Content-Type: application/json" \
  -d '{"title":"Implementar funcionalidade","description":"Criar API REST para gestão de entregas","status":"pending"}'
🌐 Endpoints GraphQL
Podes explorar e testar as queries e mutations diretamente no browser através da interface interativa:

GraphiQL Interface: http://localhost:3000/graphiql

Endpoint GraphQL: http://localhost:3000/graphql

Exemplo de Query (GraphQL)
GraphQL
query {
  tasks {
    id
    title
    status
    createdAt
  }
}
🤖 CI/CD e Qualidade
O projeto inclui um workflow automatizado no GitHub Actions (.github/workflows/ci.yml) responsável por:

Instalação limpa de dependências.

Execução de testes automatizados.

Execução de coleções Newman.

Auditoria de segurança de pacotes.

A documentação detalhada das regras de negócio e tabela de decisão encontra-se no ficheiro DECISION_TABLE.md.

📬 Contato
Se tiveres alguma dúvida sobre a implementação, podes abrir uma issue no repositório ou contactar-me através do GitHub.

