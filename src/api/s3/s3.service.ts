import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { MimeTypesEnum } from '../../misc/enums/mime-types.enum';

@Injectable()
export class S3Service {
  private region = process.env.S3_REGION;
  private bucketName = process.env.S3_BUCKET_NAME;
  private accessKeyId = process.env.S3_ACCESS_KEY_ID;
  private secretAccessKey = process.env.S3_SECRET_KEY;
  private endpoint = process.env.S3_ENDPOINT;

  // keep those deprecated
  private S3Client = new S3Client({
    region: this.region,
    credentials: {
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    },
    endpoint: this.endpoint,
    forcePathStyle: true,
  });

  constructor() {}

  async getObject(key: string) {
    try {
      return await this.S3Client.send(
        new GetObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  async uploadObject(buffer: Buffer, key: string, mimeType: string) {
    try {
      return await this.S3Client.send(
        new PutObjectCommand({
          ContentType: mimeType,
          ContentLength: buffer.length,
          Bucket: this.bucketName,
          Body: buffer,
          Key: key,
        }),
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteObject(key: string) {
    try {
      return await this.S3Client.send(
        new DeleteObjectCommand({ Bucket: this.bucketName, Key: key }),
      );
    } catch (error) {
      console.error(error.message);
    }
  }
}
