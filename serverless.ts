import type { AWS } from '@serverless/typescript';
import UserRegister from '@functions/UserRegister';
import AlbumTable from 'resources/dynamodb-tables';
import CognitoResources from './resources/cognito-userpool';
import AssetBuckets from './resources/asset-buckets';
import AlbumUpload from '@functions/AlbumUpload';
import AlbumRetrieve from '@functions/AlbumRetrieve';

const serverlessConfiguration: AWS = {
  service: 'kitten-puppy-serverless',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-iam-roles-per-function'],
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
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: ['arn:aws:s3:::${self:custom.assetBuckets.AlbumBucket}/*'],
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
      AlbumBucket: '${self:custom.assetBuckets.AlbumBucket}',
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
  functions: { UserRegister, AlbumRetrieve, AlbumUpload },
  package: { individually: true },
  custom: {
    tables: {
      AlbumTable: 'kp-album-table',
    },
    assetBuckets: {
      AlbumBucket: 'kp-album-bucket',
    },
    authPoolName: 'kp-album-auth-pool',
    authPoolClientName: 'kp-album-auth-pool-client',
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
