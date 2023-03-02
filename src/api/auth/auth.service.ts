import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hashStringUtil } from '../../misc/utils/hash-string.util';
import { UsersEntity } from '../users/entities/users.entity';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private JwtService: JwtService,
  ) {}

  async registerUser({
    login,
    password,
  }: RegisterUserDto): Promise<UsersEntity | undefined> {
    if (!login) {
      throw new HttpException('login undefined', HttpStatus.CONFLICT);
    }

    if (!password) {
      throw new HttpException('password undefined', HttpStatus.CONFLICT);
    }

    return await this.UsersService.createUser(login, password);
  }

  async loginUser({ login, password }: LoginUserDto) {
    if (!login) {
      throw new HttpException('login undefined', HttpStatus.CONFLICT);
    }

    if (!password) {
      throw new HttpException('password undefined', HttpStatus.CONFLICT);
    }

    const userToLogin = await this.UsersService.loginUser(login, password);

    if (userToLogin) {
      const payload = { login: userToLogin.login, id: userToLogin.id };

      return {
        accessToken: this.JwtService.sign(payload),
      };
    } else {
      throw new HttpException('No such user', HttpStatus.FORBIDDEN);
    }
  }

  async validateUser(login: string, password: string): Promise<any> {
    if (!login) {
      throw new HttpException('login undefined', HttpStatus.CONFLICT);
    }

    if (!password) {
      throw new HttpException('password undefined', HttpStatus.CONFLICT);
    }

    const passwordHash = hashStringUtil(password);
    const user = await this.UsersService.findOne(login);
    if (passwordHash === user.passwordHash) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
}
