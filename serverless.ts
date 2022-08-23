import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import UserRegister from '@functions/UserRegister';
import AlbumTable from 'resources/dynamodb-tables';
import CognitoResources from './resources/cognito-userpool';
import AssetBuckets from './resources/asset-buckets';

const serverlessConfiguration: AWS = {
  service: 'kitten-puppy-serverless',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-southeast-2',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'dynamodb:*',
        Resource: ['arn:aws:dynamodb:${self:provider.region}:*:table/${self:custom.tables.AlbumTable}'],
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      AlbumTable: '${self:custom.tables.AlbumTable}',
    },
  },
  resources: {
    Resources: {
      ...AlbumTable,
      ...CognitoResources,
      ...AssetBuckets,
    },
  },
  // import the function via paths
  functions: { hello, UserRegister },
  package: { individually: true },
  custom: {
    tables: {
      AlbumTable: 'AlbumTable',
    },
    assetBuckets: {
      AlbumBucket: 'AlbumBucket',
    },
    authPoolName: 'AlbumAuthPool',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
