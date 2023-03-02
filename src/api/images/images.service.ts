import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateFileNameUtil } from 'src/misc/utils/generate-file-name.util';
import { generateS3FullPathUtil } from 'src/misc/utils/generate-s3-full-path.util';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { ImagesEntity } from './entities/images.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImagesEntity)
    private ImagesRepository: Repository<ImagesEntity>,
    @Inject(S3Service) private S3Service: S3Service,
  ) {}

  async uploadCardImage(
    buffer: Buffer,
    mimeType: string,
    fileName: string,
  ): Promise<ImagesEntity> {
    try {
      const key = generateFileNameUtil(fileName);

      await this.S3Service.uploadObject(buffer, key, mimeType);

      const fullPath = generateS3FullPathUtil(key);

      const newImage = this.ImagesRepository.create({
        key: key,
        link: fullPath,
        mimeType: mimeType,
      });

      return await this.ImagesRepository.save(newImage);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.HttpStatus && HttpStatus.CONFLICT,
      );
    }
  }

  async deleteCardImage(key: string) {
    try {
      return await this.S3Service.deleteObject(key);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.HttpStatus && HttpStatus.CONFLICT,
      );
    }
  }
}
