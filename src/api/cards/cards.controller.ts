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
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataUnitsEnum } from 'src/misc/enums/data-units.enum';
import { CreateCardDto, GetCardsDto } from './cards.dto';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(@Inject(CardsService) private CardsService: CardsService) {}

  @Get('/')
  getCards(@Query() query: GetCardsDto) {
    return this.CardsService.getCards(query);
  }

  @Get('/:cardId')
  getCard(@Param('cardId') cardId: number) {
    return this.CardsService.getCard(cardId);
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('imageFile'))
  createCard(
    @Body() body: CreateCardDto,
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
    return this.CardsService.createCard(body, imageFile);
  }

  @Put('/:cardId')
  updateCard(@Param('cardId') cardId: number) {
    return this.CardsService.updateCard(cardId);
  }

  @Delete('/:cardId')
  deleteCard(@Param('cardId') cardId: number) {
    return this.CardsService.deleteCard(cardId);
  }
}
