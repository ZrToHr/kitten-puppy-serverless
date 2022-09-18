export default {
  type: 'object',
  properties: {
    UserId: { type: 'string' },
    PhotoName: { type: 'string' },
    PhotoType: { type: 'string' },
  },
  required: ['UserId', 'PhotoName', 'PhotoType'],
} as const;
