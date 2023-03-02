import { DecksEntity } from './decks.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardsEntity } from 'src/api/cards/entities/cards.entity';

@Entity('subdecks')
export class SubdecksEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  order: number;

  @ManyToOne(() => DecksEntity, (deck) => deck.subdecks)
  @JoinColumn({ name: 'deckId' })
  deck: DecksEntity;

  @ManyToOne(() => CardsEntity, (card) => card.subdecks)
  @JoinColumn({ name: 'cardId' })
  card: CardsEntity;
}
