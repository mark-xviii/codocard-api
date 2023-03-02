import { Module } from '@nestjs/common';
import { SequencesController } from './sequences.controller';
import { SequencesService } from './sequences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequencesEntity } from './entities/sequences.entity';
import { SubsequencesEntity } from './entities/subsequences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SequencesEntity, SubsequencesEntity])],
  controllers: [SequencesController],
  providers: [SequencesService],
})
export class SequencesModule {}
