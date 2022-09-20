import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Album } from 'src/model/Album';
import Dynamo from 'src/services/DynamoDB';
import { s3Client } from 'src/services/S3Client';
import schema from './schema';

const albumRetrieve: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  try {
    const userId = event.body.UserId;
    const album = await Dynamo.get<Album>({
      tableName: process.env.AlbumTable,
      pkKey: 'UserId',
      pkValue: userId,
    });

    for (const [index, photo] of album.AlbumPhotos.entries()) {
      const command = new GetObjectCommand({
        Bucket: process.env.AlbumBucket,
        Key: `${userId}/${photo.PhotoId}/${photo.PhotoName}`,
      });
      album.AlbumPhotos[index].PhotoSignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    }
    console.log('retrieve response: ', album);

    return formatJSONResponse({ body: album });
  } catch (e) {
    console.log(e.message);
    return formatJSONResponse({ body: { message: e.message }, statusCode: 400 });
  }
};

export const main = middyfy(albumRetrieve);
