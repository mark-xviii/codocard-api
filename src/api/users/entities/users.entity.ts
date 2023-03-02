import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GamesEntity } from '../../games/entities/games.entity';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true, nullable: false })
  login: string;

  @Column({ nullable: false })
  passwordHash: string;

  // player properties

  @Column({ nullable: true })
  organizationTitle: string;

  @OneToMany(() => GamesEntity, (game) => game.user)
  games: GamesEntity[];

  @OneToOne(() => GamesEntity, (game) => game.user)
  currentGame: GamesEntity;
}
