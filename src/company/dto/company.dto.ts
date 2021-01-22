import { IsEmail, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly country: string;
  @IsNotEmpty()
  readonly adress: string;
  readonly phone: string;
}
