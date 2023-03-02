import { CardsEntity } from 'src/api/cards/entities/cards.entity';
import { CharactersEntity } from 'src/api/characters/entities/characters.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('images')
export class ImagesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  link: string;

  @Column()
  key: string;

  @Column()
  mimeType: string;

  @OneToMany(() => CharactersEntity, (character) => character.image, {
    onDelete: 'CASCADE',
  })
  cards: CardsEntity[];
}
