import { IsDate, IsNotEmpty, IsPositive } from 'class-validator';


export class CreateReservationDto {
    @IsNotEmpty()
    @IsPositive()   
    readonly duration: number;

    @IsNotEmpty()
    @IsDate()
    readonly date: Date;
   
    @IsNotEmpty()
    readonly subject: string;
}
