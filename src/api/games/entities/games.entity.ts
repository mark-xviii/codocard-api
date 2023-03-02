import { DecksEntity } from 'src/api/decks/entities/decks.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity('games')
export class GamesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.games)
  @JoinColumn({ name: 'userId' })
  user: UsersEntity;

  @Column({ type: 'int', default: 0, nullable: true })
  a: number;

  @Column({ type: 'int', default: 0, nullable: true })
  b: number;

  @Column({ type: 'int', default: 0, nullable: true })
  c: number;

  @Column({ type: 'int', default: 0, nullable: true })
  d: number;

  @Column({ type: 'int', default: 0, nullable: true })
  turn: number;

  @OneToOne(() => DecksEntity, (deck) => deck.game)
  deck: DecksEntity;

  @Column({ type: 'boolean', default: false, nullable: false })
  isFinished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  finishedAt: Date;
}
