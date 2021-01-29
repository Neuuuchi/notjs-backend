import { IsDate } from 'class-validator';

export class DateDto {

    @IsDate()
    readonly before: Date;
    @IsDate()
    readonly after: Date;
   
}
