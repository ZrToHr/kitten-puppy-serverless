import { handlerPath } from '@libs/handler-resolver';
import { corsSettings, authorizer } from '@libs/lambda-events';
import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'retrieve',
        cors: corsSettings,
        authorizer,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
