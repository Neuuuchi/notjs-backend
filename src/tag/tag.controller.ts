import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './schemas/tag.schema';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('')
  async register(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    const result = await this.tagService.create(createTagDto);
    return result;
  }

  @Get('')
  async getAll(): Promise<Tag[]> {
    const result = await this.tagService.getAll();
    return result;
  }
}
