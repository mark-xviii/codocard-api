import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from '../s3/s3.module';
import { ImagesEntity } from './entities/images.entity';
import { ImagesService } from './images.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesEntity]), S3Module],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
