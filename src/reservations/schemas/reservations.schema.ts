import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Pfe } from '../../pfe/schemas/pfe.schema';
import * as mongoose from  'mongoose';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';


export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {

  @IsNotEmpty()
  @Prop({ required : true })
  duration: number;

  @IsNotEmpty()
  @Prop({ required : true })
  date: Date;

  @IsNotEmpty()
  @Prop({ required:true, type: mongoose.Schema.Types.ObjectId, ref: 'Pfe' })
  subject: Pfe;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);