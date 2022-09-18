import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Album, AlbumPhoto } from 'src/model/Album';
import Dynamo from 'src/services/DynamoDB';
import { s3Client } from 'src/services/S3Client';
import schema from './schema';
import { v4 as uuidv4 } from 'uuid';

const albumUpload: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async event => {
  try {
    const userId = event.body.UserId;

    const photo: AlbumPhoto = {
      PhotoId: uuidv4(),
      PhotoName: event.body.PhotoName,
      PhotoType: event.body.PhotoType,
    };

    await Dynamo.appendList<AlbumPhoto>({
      tableName: process.env.AlbumTable,
      pkKey: 'UserId',
      pkValue: userId,
      listKey: 'AlbumPhotos',
      listItem: photo,
    });

    const command = new PutObjectCommand({
      Bucket: process.env.AlbumBucket,
      Key: `${userId}/${photo.PhotoId}/${photo.PhotoName}`,
    });

    photo.PhotoSignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return formatJSONResponse({ body: photo });
  } catch (e) {
    return formatJSONResponse({ body: { message: e.message }, statusCode: 400 });
  }
};

export const main = middyfy(albumUpload);
