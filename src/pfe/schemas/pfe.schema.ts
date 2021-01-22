import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export enum StatusOfPfe {
  DRAFT,
  IN_PROGRESS,
  DONE,
  ARCHIVED,
}

export type PfeDocument = Pfe & Document;

@Schema()
export class Pfe {
  @Prop({ required: false })
  title: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  student: MongooseSchema.Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  supervisor: MongooseSchema.Types.ObjectId;
  fileUrl: string;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'PfeSession',
    required: true,
  })
  session: MongooseSchema.Types.ObjectId;
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Tag',
    default: [],
  })
  tags: [MongooseSchema.Types.ObjectId];
  @Prop({ required: true, default: StatusOfPfe.DRAFT })
  status: StatusOfPfe;
}

export const PfeSchema = SchemaFactory.createForClass(Pfe);
