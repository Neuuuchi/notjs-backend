import { IsDate, IsNotEmpty } from 'class-validator';

export class CreatePfeSessionDto {
  @IsNotEmpty()
  readonly name: string;
  @IsDate()
  readonly start: Date;
}
