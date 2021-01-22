import { PfeSession, PfeSessionDocument } from './schemas/pfe-session.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePfeSessionDto } from './dto/create-pfe-session.dto';
@Injectable()
export class PfeSessionService {
  constructor(
    @InjectModel(PfeSession.name)
    private readonly pfeSessionModel: Model<PfeSessionDocument>,
  ) {}

  async create(createPfeSessionDto: CreatePfeSessionDto): Promise<PfeSession> {
    const pfeSessionCreated = new this.pfeSessionModel(createPfeSessionDto);
    return pfeSessionCreated.save();
  }

  async getAll(): Promise<PfeSession[]> {
    return this.pfeSessionModel.find().exec();
  }

  async find(id: string): Promise<PfeSession> {
    return this.pfeSessionModel.findById(id).exec();
  }
}
