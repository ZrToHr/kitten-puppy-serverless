import { PostConfirmationTriggerEvent } from 'aws-lambda';
import { documentClient } from '../../services/DynamoDB';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb/dist-types/commands/PutItemCommand';
import { marshall } from '@aws-sdk/util-dynamodb';
import { randomUUID } from 'crypto';
import { formatJSONResponse } from '@libs/api-gateway';

const UserRegister = async (event: PostConfirmationTriggerEvent) => {
  console.log('Posted Confirmation triggered: ', event.request.userAttributes);
  try {
    const params: PutItemCommandInput = {
      TableName: 'TABLE_NAME',
      Item: marshall({
        id: randomUUID(),
        AlbumOwner: event.request.userAttributes['name'],
      }),
    };

    const response = await documentClient.send(new PutItemCommand(params));
    console.log('User Register Succeeded: ', response);
  } catch (e) {
    console.log('User Register Failed: ', e.message);
  }

  return formatJSONResponse({ event });
};

export const main = UserRegister;
