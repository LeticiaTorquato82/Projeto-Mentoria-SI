module.exports = {
  $id: 'https://example.com/schemas/task.schema.json',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 3,
    },
    description: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: ['pending', 'in-progress', 'done'],
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
    id: {
      type: 'string',
    },
  },
  required: ['title'],
  additionalProperties: false,
};
