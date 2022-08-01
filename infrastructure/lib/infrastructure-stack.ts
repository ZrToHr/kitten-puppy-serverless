import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppAuth } from './core/auth';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // kitten-puppy userpool
    const auth = new AppAuth(this, 'auth');

    // kitten-puppy album table
    const albumTable = new dynamodb.Table(this, 'AlbumTable', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'AlbumID',
        type: dynamodb.AttributeType.STRING,
      },
    });

    new CfnOutput(this, 'userPoolId', {
      value: auth.userPool.userPoolId,
    });

    new CfnOutput(this, 'userPoolArn', {
      value: auth.userPool.userPoolArn,
    });

    new CfnOutput(this, 'albumTableName', {
      value: albumTable.tableName,
    });

    new CfnOutput(this, 'albumTableArn', {
      value: albumTable.tableArn,
    });
  }
}
