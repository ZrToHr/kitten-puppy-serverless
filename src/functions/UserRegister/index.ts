import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      cognitoUserPool: {
        pool: 'CognitoUserPool',
        trigger: 'PostConfirmation' as const,
        existing: true,
        forceDeploy: false,
      },
    },
  ],
};
