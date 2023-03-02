import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { CreateCardDto, GetCardsDto } from './cards.dto';
import { CardsEntity } from './entities/cards.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardsEntity)
    private CardsRepository: Repository<CardsEntity>,
    @Inject(ImagesService)
    private ImagesService: ImagesService,
  ) {}

  async getCards({ limit, offset }: GetCardsDto) {
    return this.CardsRepository.find({ skip: offset, take: limit });
  }

  async getCard(cardId: number) {
    return this.CardsRepository.findOne({ where: { id: cardId } });
  }

  async createCard(
    { type, negativeOutcomeId, positiveOutcomeId, text }: CreateCardDto,
    imageFile: Express.Multer.File,
  ) {
    try {
      const { buffer, mimetype } = imageFile;

      const newImage = await this.ImagesService.uploadCardImage(
        buffer,
        mimetype,
        imageFile.originalname,
      );

      const newCard = this.CardsRepository.create({
        character: { image: newImage },
        text: text,
        type: type,
        negativeOutcome: negativeOutcomeId && { id: negativeOutcomeId },
        positiveOutcome: positiveOutcomeId && { id: positiveOutcomeId },
      });

      await this.CardsRepository.save(newCard);

      return await this.CardsRepository.findOne({
        where: { id: newCard.id },
        relations: {
          character: { image: true },
          negativeOutcome: true,
          positiveOutcome: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async deleteCard(cardId: number) {
    try {
      const cardToDelete = await this.CardsRepository.findOne({
        where: { id: cardId },
        relations: { character: { image: true } },
      });

      await this.ImagesService.deleteCardImage(
        cardToDelete.character.image.key,
      );

      return await this.CardsRepository.delete(cardId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async updateCard(cardId: number) {}
}
