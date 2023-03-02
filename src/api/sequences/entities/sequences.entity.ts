import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubsequencesEntity } from './subsequences.entity';

@Entity('sequences')
export class SequencesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, default: 0, type: 'int' })
  cardsCount: number;

  @OneToMany(() => SubsequencesEntity, (subsequence) => subsequence.sequence)
  subsequences: SubsequencesEntity[];
}
