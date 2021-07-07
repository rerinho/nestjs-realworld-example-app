import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { User } from '~/user/decorators/user.decorator';
import { ArticleService } from './article.service';
import {
  ArticleCreateDTO,
  ArticleReadDTO,
  ArticleUpdateDTO,
  ArticleParamsDTO,
} from './dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @User('id') userId: number,
    @Body('article') articleCreateDTO: ArticleCreateDTO,
  ) {
    const article = await this.articleService.create(articleCreateDTO, userId);
    return new ArticleReadDTO(article);
  }

  @Get()
  findAll(@Query() query) {
    return this.articleService.findAll(query);
  }

  @Get(':slug')
  async findOne(@Param() articleParamsDTO: ArticleParamsDTO) {
    const { slug } = articleParamsDTO;
    const article = await this.articleService.findBySlug(articleParamsDTO.slug);
    return new ArticleReadDTO(article);
  }

  @Put(':slug')
  async update(
    @Param() articleParamsDTO: ArticleParamsDTO,
    @Body() articleUpdateDTO: ArticleUpdateDTO,
  ) {
    const { slug } = articleParamsDTO;
    const article = await this.articleService.update(slug, articleUpdateDTO);
    return new ArticleReadDTO(article);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.articleService.remove(slug);
  }
}
