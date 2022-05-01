import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppAuth } from './core/auth';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const auth = new AppAuth(this, 'auth');

    new CfnOutput(this, 'userPoolId', {
      value: auth.userPool.userPoolId,
    });

    new CfnOutput(this, 'userPoolArn', {
      value: auth.userPool.userPoolArn,
    });
  }
}
