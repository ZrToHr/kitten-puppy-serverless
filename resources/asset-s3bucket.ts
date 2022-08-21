import type { AWS } from '@serverless/typescript';

const AssetS3bucket: AWS['resources']['Resources'] = {
  AssetS3Bucket: {
    Type: 'AWS::S3::Bucket',
    Properties: {
      BucketName: 'kitten-puppy-album-storage',
      AccessControl: 'BucketOwnerFullControl',
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
            AllowedOrigins: ['*'],
            ExposedHeaders: ['x-amz-server-side-encryption', 'x-amz-request-id', 'x-amz-id-2', 'ETag'],
          },
        ],
      },
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    },
  },
};

export default AssetS3bucket;
