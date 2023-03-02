import { Module } from '@nestjs/common';
import { OutcomesController } from './outcomes.controller';
import { OutcomesService } from './outcomes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutcomesEntity } from './entities/outcomes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OutcomesEntity])],
  controllers: [OutcomesController],
  providers: [OutcomesService],
})
export class OutcomesModule {}
