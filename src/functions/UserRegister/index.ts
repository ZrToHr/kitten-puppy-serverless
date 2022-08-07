import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      cognitoUserPool: {
        pool: '${cf:InfrastructureStack.userPoolArn}',
        trigger: 'PostConfirmation' as const,
        existing: true,
        forceDeploy: false,
      },
    },
  ],
};
