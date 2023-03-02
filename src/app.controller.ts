import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './api/auth/guards/jwt.guard';
import { ExtractJwtContext } from './api/auth/decorators/jwt.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/henlo')
  getHenlo(@ExtractJwtContext() jwtContext: any): string {
    console.log(jwtContext);
    return this.appService.getHello();
  }
}
