import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  readonly name: string;
}
