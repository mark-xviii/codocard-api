import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { CreateCharacterDto, GetCharactersDto } from './characters.dto';
import { CharactersEntity } from './entities/characters.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(CharactersEntity)
    private CharactersRepository: Repository<CharactersEntity>,
    @Inject(ImagesService)
    private ImagesService: ImagesService,
  ) {}

  async getCharacter() {
    try {
    } catch (error) {
      throw new HttpException(
        error.message,
        error.HttpStatus && HttpStatus.CONFLICT,
      );
    }
  }

  async getCharacters({ limit, offset }: GetCharactersDto) {
    try {
    } catch (error) {
      throw new HttpException(
        error.message,
        error.HttpStatus && HttpStatus.CONFLICT,
      );
    }
  }

  async createCharacter(
    { name }: CreateCharacterDto,
    imageFile: Express.Multer.File,
  ) {
    try {
      console.log(imageFile);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.HttpStatus && HttpStatus.CONFLICT,
      );
    }
  }

  async updateCharacter() {
    try {
    } catch (error) {
      throw new HttpException(
        error.message,
        error.HttpStatus && HttpStatus.CONFLICT,
      );
    }
  }

  async deleteCharacter() {
    try {
    } catch (error) {
      throw new HttpException(
        error.message,
        error.HttpStatus && HttpStatus.CONFLICT,
      );
    }
  }
}
