import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag, TagDocument } from './schemas/tag.schema';
import mongoose, { Model, Mongoose, Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name)
    private readonly TagModel: Model<TagDocument>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const pfeSessionCreated = new this.TagModel(createTagDto);
    return pfeSessionCreated.save();
  }

  async getAll(): Promise<Tag[]> {
    return this.TagModel.find().exec();
  }

  async findById(id: MongooseSchema.Types.ObjectId): Promise<Tag> {
    const result = this.TagModel.findById(id).exec();
    return result;
  }

  
}
