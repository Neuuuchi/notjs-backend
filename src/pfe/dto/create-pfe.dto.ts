import { IsEmail, IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePfeDto {
  @IsNotEmpty()
  readonly student: string;
  @IsNotEmpty()
  readonly session: string;
}
