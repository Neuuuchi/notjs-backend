import { IsNotEmpty } from 'class-validator';

export class FilterSessionPfeDto {

  @IsNotEmpty()
  readonly session: string;
}
