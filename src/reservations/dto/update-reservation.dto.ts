import { IsDate, IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateReservationDto {

    @IsPositive()   
    readonly duration: number;

    @IsDate()
    readonly date: Date;
   
    readonly subject: string;
}
