import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { Multer } from 'multer';
import { DataUnitsEnum } from 'src/misc/enums/data-units.enum';
import { CreateCharacterDto, GetCharactersDto } from './characters.dto';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(
    @Inject(CharactersService) private CharactersService: CharactersService,
  ) {}

  @Get('/')
  getCharacters(@Query() query: GetCharactersDto) {}

  @Get('/:characterId')
  getCharacter(@Param('characterId') characterId: number) {}

  @Post('/')
  createCharacter(
    @Body() body: CreateCharacterDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 4 * DataUnitsEnum.MB }),
          new FileTypeValidator({
            fileType: /^(image\/jpeg|image\/png|image\/webp|image\/gif)$/,
          }),
        ],
      }),
    )
    imageFile: Express.Multer.File,
  ) {
    return this.CharactersService.createCharacter(body, imageFile);
  }

  @Put('/:characterId')
  updateCharacter(@Param('characterId') characterId: number) {}

  @Delete('/:characterId')
  deleteCharacter(@Param('characterId') characterId: number) {}
}
