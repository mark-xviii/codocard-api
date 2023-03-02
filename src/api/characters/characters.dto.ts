import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  IsString,
  IsOptional,
} from 'class-validator';
import { transformToNumberUtil } from 'src/misc/utils/transform-to-number.util';

export class GetCharactersDto {
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

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  imageFile: Express.Multer.File;
}
