import { PostConfirmationTriggerEvent } from 'aws-lambda';
import { randomUUID } from 'crypto';

import { formatJSONResponse } from '@libs/api-gateway';
import Dynamo from '../../services/DynamoDB';

const UserRegister = async (event: PostConfirmationTriggerEvent) => {
  console.log('Posted Confirmation triggered: ', event.request.userAttributes);
  try {
    const data = {
      UserId: randomUUID(),
      AlbumOwner: event.request.userAttributes['name'],
    };

    await Dynamo.write({
      data: data,
      tableName: process.env.singleTable,
    });

    console.log('User Register Succeeded');
  } catch (e) {
    console.log('User Register Failed: ', e.message);
  }
  return formatJSONResponse({ event });
};

export const main = UserRegister;
