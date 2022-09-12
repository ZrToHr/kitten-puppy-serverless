import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Album } from 'src/model/Album';
import Dynamo from 'src/services/DynamoDB';
import schema from './schema';

const albumRetrieve: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  try {
    const album = await Dynamo.get<Album>({
      tableName: process.env.AlbumTable,
      pkKey: 'UserId',
      pkValue: event.body.UserId,
    });
    album.AlbumPhotos.map(photo => {
      console.log(photo);
    });
    return formatJSONResponse({ body: album });
  } catch (e) {
    return formatJSONResponse({ body: { message: e.message }, statusCode: 400 });
  }
};

export const main = middyfy(albumRetrieve);
