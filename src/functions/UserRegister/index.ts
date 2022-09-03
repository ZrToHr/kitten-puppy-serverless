import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    // {
    //   http: {
    //     method: 'post',
    //     path: 'register',
    //     cors: corsSettings,
    //     authorizer,
    //   },
    // },
    {
      cognitoUserPool: {
        pool: '${self:custom.authPoolName}',
        trigger: 'PostConfirmation' as const,
        existing: true,
        forceDeploy: false,
      },
    },
  ],
};
