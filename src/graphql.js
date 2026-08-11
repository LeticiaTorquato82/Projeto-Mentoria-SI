const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');
const tasks = require('./tasks');

const schema = buildSchema(`
  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTaskInput {
    title: String!
    description: String
    status: String
  }

  input UpdateTaskInput {
    title: String!
    description: String
    status: String!
  }

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    updateTaskStatus(id: ID!, status: String!): Task!
    deleteTask(id: ID!): Boolean!
  }
`);

const rootValue = {
  tasks: tasks.getAllTasks,
  task: ({ id }) => tasks.getTask(id),
  createTask: ({ input }) => tasks.createTask(input),
  updateTask: ({ id, input }) => tasks.updateTask(id, input),
  updateTaskStatus: ({ id, status }) => tasks.updateTaskStatus(id, status),
  deleteTask: ({ id }) => tasks.deleteTask(id),
};

module.exports = createHandler({
  schema,
  rootValue,
});
