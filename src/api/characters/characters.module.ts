import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecksModule } from '../decks/decks.module';
import { CharactersEntity } from './entities/characters.entity';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CharactersEntity]),
    DecksModule,
    ImagesModule,
  ],
  providers: [CharactersService],
  controllers: [CharactersController],
})
export class CharactersModule {}
