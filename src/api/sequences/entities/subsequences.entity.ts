import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SequencesEntity } from './sequences.entity';
import { CardsEntity } from '../../cards/entities/cards.entity';

@Entity('subsequences')
export class SubsequencesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => CardsEntity, (card) => card.subsequences)
  card: CardsEntity;

  @ManyToOne(() => SequencesEntity, (sequence) => sequence.subsequences)
  @JoinColumn({ name: 'sequenceId' })
  sequence: SequencesEntity;
}
