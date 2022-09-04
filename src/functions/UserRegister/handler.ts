import { middyfy } from '@libs/lambda';
import { PostConfirmationTriggerEvent } from 'aws-lambda';
import Dynamo from '../../services/DynamoDB';

const UserRegister = async (event: PostConfirmationTriggerEvent) => {
  try {
    const data = {
      UserId: event.request.userAttributes['sub'],
      AlbumOwner: event.request.userAttributes['name'],
      UserEmail: event.request.userAttributes['email'],
    };

    await Dynamo.write({
      data: data,
      tableName: process.env.singleTable,
    });

    console.log('User Register Succeeded with: ', data);
  } catch (e) {
    console.log('User Register Failed: ', e.message);
  }
  // return to cognito with {} object as it's a contract requested by cognito.
  return {};
};

export const main = middyfy(UserRegister);
