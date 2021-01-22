import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum StatusOfPfe {
  DRAFT,
  IN_PROGRESS,
  DONE,
  ARCHIVED,
}

export type FiliereDocument = Filiere & Document;

@Schema()
export class Filiere {
  @Prop({ required: true })
  title: string;
}

export const FiliereSchema = SchemaFactory.createForClass(Filiere);
