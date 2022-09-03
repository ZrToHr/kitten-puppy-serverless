import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PostConfirmationTriggerEvent } from 'aws-lambda';

const UserRegister = async (event: PostConfirmationTriggerEvent) => {
  console.log('Posted Confirmation triggered: ', event.request.userAttributes);
  // try {
  //   const data = {
  //     UserId: randomUUID(),
  //     AlbumOwner: event.body.name,
  //   };
  //
  //   await Dynamo.write({
  //     data: data,
  //     tableName: process.env.singleTable,
  //   });
  //
  //   console.log('User Register Succeeded');
  // } catch (e) {
  //   console.log('User Register Failed: ', e.message);
  // }
  return formatJSONResponse({ event });
};

export const main = middyfy(UserRegister);
