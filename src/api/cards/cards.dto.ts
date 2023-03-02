import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { transformToNumberUtil } from 'src/misc/utils/transform-to-number.util';
import { CardTypes } from './cards-types.enum';

export class GetCardsDto {
  @Transform(({ value }) => transformToNumberUtil(value))
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(1024)
  limit: number;

  @Transform(({ value }) => transformToNumberUtil(value))
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  offset: number;
}

export class CreateCardDto {
  @IsNotEmpty()
  @IsEnum(CardTypes)
  type: CardTypes;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @Transform(({ value }) => transformToNumberUtil(value))
  @IsNumber()
  negativeOutcomeId: number;

  @IsOptional()
  @Transform(({ value }) => transformToNumberUtil(value))
  @IsNumber()
  positiveOutcomeId: number;

  imageFile: Express.Multer.File;
}
