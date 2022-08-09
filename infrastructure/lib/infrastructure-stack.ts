import { CfnOutput, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppAuth } from './core/auth';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Bucket, BucketEncryption, HttpMethods } from 'aws-cdk-lib/aws-s3';

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

    // kitten-puppy album S3 bucket
    const albumBucket = new Bucket(this, 'kp-album', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      versioned: false,
      publicReadAccess: false,
      encryption: BucketEncryption.S3_MANAGED,
      cors: [
        {
          allowedMethods: [
            HttpMethods.DELETE,
            HttpMethods.HEAD,
            HttpMethods.GET,
            HttpMethods.PUT,
            HttpMethods.POST,
          ],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
        },
      ],
      lifecycleRules: [
        {
          abortIncompleteMultipartUploadAfter: Duration.days(1),
          expiration: Duration.days(365),
        },
      ],
    });

    // kitten-puppy executing lambda role
    const executingRole = new Role(this, 'kpExecutingRoleArn', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    });

    executingRole.addToPolicy(
      new PolicyStatement({
        actions: ['dynamodb:*'],
        resources: [albumTable.tableArn],
      }),
    );

    executingRole.addToPolicy(
      new PolicyStatement({
        actions: ['s3:*'],
        resources: [albumBucket.bucketArn],
      }),
    );

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

    new CfnOutput(this, 'kpExecutingRoleArn', {
      value: executingRole.roleArn,
    });
  }
}
