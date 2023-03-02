/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OutcomesEntity } from '../../outcomes/entities/outcomes.entity';
import { SubsequencesEntity } from '../../sequences/entities/subsequences.entity';
import { CardTypes } from '../cards-types.enum';
import { CharactersEntity } from 'src/api/characters/entities/characters.entity';
import { SubdecksEntity } from 'src/api/decks/entities/subdeck.entity';
import { ImagesEntity } from 'src/api/images/entities/images.entity';

@Entity('cards')
export class CardsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  text: string;

  @Column({ type: 'enum', enum: CardTypes, default: CardTypes.COMMON })
  type: CardTypes;

  @OneToMany(() => OutcomesEntity, (outcome) => outcome.card)
  outcomes: OutcomesEntity[];

  @OneToOne(() => OutcomesEntity, (outcome) => outcome.card)
  @JoinColumn({ name: 'positiveOutcomeId' })
  positiveOutcome: OutcomesEntity;

  @OneToOne(() => OutcomesEntity, (outcome) => outcome.card)
  @JoinColumn({ name: 'negativeOutcomeId' })
  negativeOutcome: OutcomesEntity;

  @OneToMany(() => SubsequencesEntity, (subsequence) => subsequence.card)
  subsequences: SubsequencesEntity[];

  @OneToMany(() => SubdecksEntity, (subdeck) => subdeck.card)
  subdecks: SubdecksEntity;

  @ManyToOne(() => CharactersEntity, (character) => character.cards)
  @JoinColumn({ name: 'characterId' })
  character: CharactersEntity;
}
