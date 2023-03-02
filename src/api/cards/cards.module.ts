import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsEntity } from './entities/cards.entity';
import { S3Module } from '../s3/s3.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([CardsEntity]), ImagesModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
