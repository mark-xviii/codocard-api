import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { hashStringUtil } from '../../misc/utils/hash-string.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private UsersRepository: Repository<UsersEntity>,
  ) {}
  async findOne(login: string): Promise<UsersEntity | undefined> {
    return await this.UsersRepository.findOne({ where: { login } });
  }

  async createUser(
    login: string,
    password: string,
  ): Promise<UsersEntity | undefined> {
    const candidate = await this.UsersRepository.findOne({
      where: { login, passwordHash: hashStringUtil(password) },
    });

    if (candidate) {
      throw new HttpException('user already exists', HttpStatus.CONFLICT);
    }

    const newUser = this.UsersRepository.create({
      login,
      passwordHash: hashStringUtil(password),
    });

    return await this.UsersRepository.save(newUser);
  }

  async loginUser(
    login: string,
    password: string,
  ): Promise<UsersEntity | undefined> {
    return await this.UsersRepository.findOne({
      where: {
        login,
        passwordHash: hashStringUtil(password),
      },
    });
  }
}
