export class RegisterUserDto {
  login: string;
  password: string;
}

export class LoginUserDto extends RegisterUserDto {}
