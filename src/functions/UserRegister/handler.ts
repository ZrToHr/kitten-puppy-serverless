import { randomUUID } from 'crypto';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import Dynamo from '../../services/DynamoDB';
import { middyfy } from '@libs/lambda';
import schema from '@functions/UserRegister/schema';

const UserRegister: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  try {
    const data = {
      UserId: randomUUID(),
      AlbumOwner: event.body.name,
    };

    await Dynamo.write({
      data: data,
      tableName: process.env.singleTable,
    });

    console.log('User Register Succeeded');
  } catch (e) {
    console.log('User Register Failed: ', e.message);
  }
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(UserRegister);
