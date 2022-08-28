import { handlerPath } from '@libs/handler-resolver';
import { authorizer, corsSettings } from '@libs/lambda-events';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'register',
        cors: corsSettings,
        authorizer,
      },
    },
  ],
};
