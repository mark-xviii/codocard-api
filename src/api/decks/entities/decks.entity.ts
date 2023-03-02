import { GamesEntity } from 'src/api/games/entities/games.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubdecksEntity } from './subdeck.entity';

@Entity('decks')
export class DecksEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => GamesEntity, (game) => game.deck)
  @JoinColumn({ name: 'gameId' })
  game: GamesEntity;

  @OneToMany(() => SubdecksEntity, (subdeck) => subdeck.deck)
  subdecks: SubdecksEntity[];
}
