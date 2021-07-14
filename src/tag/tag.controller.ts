import { Controller, Get } from '@nestjs/common';
import { TagListReadDTO } from './dto/tag-list.read.dto';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll() {
    const tags = await this.tagService.findAll();

    return new TagListReadDTO(tags);
  }
}
