import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { stringify } from 'qs';
import { CreatePfeDto } from './dto/create-pfe.dto';
import { FilterSessionPfeDto } from './dto/FilterSessionPfeDto';
import { PfeService } from './pfe.service';
import { Pfe } from './schemas/pfe.schema';
import mongoose, { Model, Mongoose, Schema as MongooseSchema } from 'mongoose';

@Controller('pfe')
export class PfeController {
  constructor(private readonly pfeService: PfeService) {}

  // Create
  @Post('')
  async register(@Body() createPfeDto: CreatePfeDto): Promise<Pfe> {
    const result = await this.pfeService.create(createPfeDto);
    return result;
  }

  @Get('')
  async getAll(): Promise<Pfe[]> {
    const result = await this.pfeService.getAll();
    return result;
  }
  @Get('session')
  async getPfeBySession(@Body() filterSessionDto: FilterSessionPfeDto): Promise<Pfe[]> {
    const result = await this.pfeService.getpfesBySession(filterSessionDto);
    return result;
  }
  @Get('search')
  async searchPfeByTag(@Body() body): Promise<any> {
    if(body.tags)
      return this.pfeService.search(body.tags);
    else
      return "Bad request."
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Pfe> {
    return this.pfeService.getPfe(id);
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() body): Promise<Pfe> {
    body.supervisor = null;
    body.status = null;
    body.season = null;
    return this.pfeService.updatePfe(id, body);
  }

  @Put(':pid/supervisor/:sid')
  async assignSupervisor(
    @Param('pid') pid: string,
    @Param('sid') sid: string,
  ): Promise<Pfe> {
    return this.pfeService.updatePfe(pid, { supervisor: sid });
  }

  @Put(':pid/status/:status')
  async updateStatus(
    @Param('pid') pid: string,
    @Param('status') status: string,
  ): Promise<Pfe> {
    return this.pfeService.updatePfe(pid, { status: status });
  }

  @Put(':id/tag/:tag')
  async addTag(
    @Param('id') pfe: MongooseSchema.Types.ObjectId,
    @Param('tag') tag: MongooseSchema.Types.ObjectId,
  ): Promise<Pfe> {
    const result = await this.pfeService.addTag(pfe, tag);
    return result;
  }


}
