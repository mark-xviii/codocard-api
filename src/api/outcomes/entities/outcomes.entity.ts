/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardsEntity } from '../../cards/entities/cards.entity';
import { JoinColumn } from 'typeorm';

@Entity('outcomes')
export class OutcomesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'boolean', nullable: false })
  choice: boolean;

  @Column({ type: 'int', default: 0, nullable: false })
  a: number;

  @Column({ type: 'int', default: 0, nullable: false })
  b: number;

  @Column({ type: 'int', default: 0, nullable: false })
  c: number;

  @Column({ type: 'int', default: 0, nullable: false })
  d: number;

  @OneToOne(() => CardsEntity, (card) => card.outcomes)
  @JoinColumn({ name: 'cardId' })
  card: CardsEntity;

  @OneToOne(() => CardsEntity, (card) => card.id)
  @JoinColumn({ name: 'nextCardId' })
  nextCard: CardsEntity;
}
