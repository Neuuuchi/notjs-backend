import { PfeSessionService } from './pfe-session.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CreatePfeSessionDto } from './dto/create-pfe-session.dto';
import { PfeSession } from './schemas/pfe-session.schema';
@Controller('pfe-session')
export class PfeSessionController {
  constructor(private readonly pfeSessionService: PfeSessionService) {}

  @Post('')
  async register(
    @Body() createPfeSessionDto: CreatePfeSessionDto,
  ): Promise<PfeSession> {
    const result = await this.pfeSessionService.create(createPfeSessionDto);
    return result;
  }

  @Get('')
  async getAll(): Promise<PfeSession[]> {
    const result = await this.pfeSessionService.getAll();
    return result;
  }
}
