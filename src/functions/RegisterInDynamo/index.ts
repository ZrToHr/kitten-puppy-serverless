import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      cognitoUserPool: {
        pool: 'pool arn',
        trigger: 'PostConfirmation' as const,
        existing: true,
        forceDeploy: false,
      },
    },
  ],
};
