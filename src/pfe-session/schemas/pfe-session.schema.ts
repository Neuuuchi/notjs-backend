import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PfeSessionDocument = PfeSession & Document;

@Schema()
export class PfeSession {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  start: Date;
}

export const PfeSessionSchema = SchemaFactory.createForClass(PfeSession);
