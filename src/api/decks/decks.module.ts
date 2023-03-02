import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecksEntity } from './entities/decks.entity';
import { SubdecksEntity } from './entities/subdeck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DecksEntity, SubdecksEntity])],
  providers: [DecksService],
  controllers: [DecksController],
})
export class DecksModule {}
