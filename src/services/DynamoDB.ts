import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const AlbumTableName = '${cf:InfrastructureStack.albumTableName}';
export const documentClient = new DynamoDBClient({
  region: 'ap-southeast-2',
});
