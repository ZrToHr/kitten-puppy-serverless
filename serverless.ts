import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import UserRegister from '@functions/UserRegister';
import AlbumTable from 'resources/dynamodb-tables';
import CognitoResources from './resources/cognito-userpool';
import AssetS3bucket from './resources/asset-s3bucket';

const serverlessConfiguration: AWS = {
  service: 'kitten-puppy-serverless',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  resources: {
    Resources: {
      ...AlbumTable,
      ...CognitoResources,
      ...AssetS3bucket,
    },
  },
  // import the function via paths
  functions: { hello, UserRegister },
  package: { individually: true },
  custom: {
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
