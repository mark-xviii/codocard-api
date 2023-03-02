import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post('/register')
  registerUser(@Body() body: RegisterUserDto) {
    return this.AuthService.registerUser(body);
  }

  @Post('/login')
  loginUser(@Body() body: LoginUserDto) {
    return this.AuthService.loginUser(body);
  }
}
