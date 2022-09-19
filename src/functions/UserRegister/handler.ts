import { middyfy } from '@libs/lambda';
import { PostConfirmationTriggerEvent } from 'aws-lambda';
import { Album } from 'src/model/Album';
import Dynamo from '../../services/DynamoDB';

const UserRegister = async (event: PostConfirmationTriggerEvent) => {
  try {
    const data: Album = {
      UserId: event.request.userAttributes['sub'],
      AlbumOwner: event.request.userAttributes['name'],
      UserEmail: event.request.userAttributes['email'],
      AlbumPhotos: [],
    };

    await Dynamo.write({
      data: data,
      tableName: process.env.AlbumTable,
    });
  } catch (e) {
    console.log('User Register Failed: ', e.message);
  }
  // return original event to cognito
  return event;
};

export const main = middyfy(UserRegister);
