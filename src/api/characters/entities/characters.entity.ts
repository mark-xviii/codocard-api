import { CardsEntity } from 'src/api/cards/entities/cards.entity';
import { ImagesEntity } from 'src/api/images/entities/images.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('characters')
export class CharactersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ImagesEntity, (image) => image.cards)
  @JoinColumn({ name: 'imageId' })
  image: ImagesEntity;

  @OneToMany(() => CardsEntity, (card) => card.character)
  cards: CardsEntity[];
}
