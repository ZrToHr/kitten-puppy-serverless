import { handlerPath } from '@libs/handler-resolver';
import { corsSettings } from '@libs/lambda-events';
import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'retrieve',
        cors: corsSettings,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
