import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePfeDto } from './dto/create-pfe.dto';
import { Pfe, PfeDocument } from './schemas/pfe.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose, Schema as MongooseSchema } from 'mongoose';
import { PfeSessionService } from 'src/pfe-session/pfe-session.service';
import { UsersService } from 'src/users/users.service';
import { ObjectID } from 'bson';
import { TagService } from 'src/tag/tag.service';
import { Tag } from 'src/tag/schemas/tag.schema';
import { query } from 'express';

@Injectable()
export class PfeService {
  constructor(
    @InjectModel(Pfe.name) private readonly pfeModel: Model<PfeDocument>,
    private readonly pfeSessionService: PfeSessionService,
    private readonly userService: UsersService,
    private readonly tagService: TagService,
  ) {}

  async create(createPfeDto: CreatePfeDto): Promise<Pfe> {
    const pfeCreated = new this.pfeModel(createPfeDto);

    const session = await this.pfeSessionService.find(createPfeDto.session);
    if (!session) throw new NotFoundException('session not found');

    const student = await this.userService.find(createPfeDto.student);
    if (!student) throw new NotFoundException('Student not found');

    return await pfeCreated.save();
  }

  async getAll(): Promise<Pfe[]> {
    return this.pfeModel.find().exec();
  }

  async getPfe(pfeId: any): Promise<Pfe> {
    return this.pfeModel.findById(pfeId);
  }

  async updatePfe(pfeId: any, body: any): Promise<Pfe> {
    const pfe = await this.pfeModel.findById(pfeId);

    pfe.title = body.title ? body.title : pfe.title;
    pfe.fileUrl = body.fileUrl ? body.fileUrl : pfe.fileUrl;
    pfe.session = body.session ? body.session : pfe.session;
    pfe.status = body.status ? body.status : pfe.status;
    pfe.supervisor = body.supervisor ? body.supervisor : pfe.supervisor;

    await pfe.save();

    if (pfe) return pfe;
    throw new NotFoundException('pfe not found');
  }
  async addTag(
    pfeId: MongooseSchema.Types.ObjectId,
    tagId: MongooseSchema.Types.ObjectId,
  ): Promise<Pfe> {
    const pfe = await this.pfeModel.findById(pfeId);
    if (!pfe) throw new NotFoundException('PFE not found');

    const tag = await this.tagService.findById(tagId);
    if (!tag) throw new NotFoundException('Tag not found');
    pfe.tags.push(tagId);
    await pfe.save();
    if (pfe) return pfe;
  }

  async search(
    tags: MongooseSchema.Types.ObjectId[]
  ): Promise<any>{
    // let tags = []
    // for (let tagName of tagNames ){
    //   const tag = this.tagService.findIdByName(tagName);
    //   tags.push(tag);
    // }
    
    return this.pfeModel.find({
      "tags": {
        $in: tags
      }
    }).exec()

  }


}
