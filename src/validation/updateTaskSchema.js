module.exports = {
  $id: 'https://example.com/schemas/update-task.schema.json',
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
  },
  required: ['title', 'status'],
  additionalProperties: false,
};
