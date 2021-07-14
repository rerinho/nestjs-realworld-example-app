import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';
import { ArticleAuthorizationGuard } from './guard/article-authorization.guard';
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
  async findAll() {
    const articles = await this.articleService.findAll();

    return articles.map((article) => new ArticleReadDTO(article));
  }

  @Get(':slug')
  async findOne(@Param() { slug }: ArticleParamsDTO) {
    const article = await this.articleService.findBySlug(slug);

    return article ? new ArticleReadDTO(article) : {};
  }

  @UseGuards(ArticleAuthorizationGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':slug')
  async update(
    @Param() { slug }: ArticleParamsDTO,
    @User('id') userId: number,
    @Body('article') articleUpdateDTO: ArticleUpdateDTO,
  ) {
    const article = await this.articleService.update(
      slug,
      userId,
      articleUpdateDTO,
    );

    return new ArticleReadDTO(article);
  }

  @UseGuards(ArticleAuthorizationGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  async remove(@Param() { slug }: ArticleParamsDTO) {
    return this.articleService.remove(slug);
  }
}
