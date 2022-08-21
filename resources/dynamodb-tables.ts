import type { AWS } from '@serverless/typescript';

const AlbumTable: AWS['resources']['Resources'] = {
  configurationsTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: 'subject to change',
      BillingMode: 'PAY_PER_REQUEST',
      KeySchema: [
        {
          AttributeName: 'UserId',
          KeyType: 'HASH',
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'UserId',
          AttributeType: 'S',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  },
};

export default AlbumTable;
