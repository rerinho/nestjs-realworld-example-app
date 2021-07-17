import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '~/auth/guard';
import { ArticleAuthorizationGuard } from './guard';
import { User } from '~/user/decorators/user.decorator';
import { ArticleService } from './article.service';
import {
  ArticleCreateDTO,
  ArticleReadDTO,
  ArticleUpdateDTO,
  ArticleParamsDTO,
  ArticleListReadDTO,
  ArticleListQueryDTO,
  ArticleFeedQueryDTO,
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
  async findAll(@Query() articleListQueryDTO: ArticleListQueryDTO) {
    const articles = await this.articleService.findAll(articleListQueryDTO);

    return new ArticleListReadDTO(articles);
  }

  @UseGuards(JwtAuthGuard)
  @Get('feed')
  async feed(
    @User('id') userId: number,
    @Query() articleFeedQueryDTO: ArticleFeedQueryDTO,
  ) {
    const articles = await this.articleService.feed(
      userId,
      articleFeedQueryDTO,
    );

    return new ArticleListReadDTO(articles);
  }

  @Get(':slug')
  async findOne(@Param() { slug }: ArticleParamsDTO) {
    const article = await this.articleService.findBySlug(slug);

    return new ArticleReadDTO(article);
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
    await this.articleService.remove(slug);

    return { message: 'Article deleted.' };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':slug/favorite')
  async favorite(
    @Param() { slug }: ArticleParamsDTO,
    @User('id') userId: number,
  ) {
    const article = await this.articleService.favorite(slug, userId);

    return new ArticleReadDTO(article);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':slug/favorite')
  async unfavorite(
    @Param() { slug }: ArticleParamsDTO,
    @User('id') userId: number,
  ) {
    const article = await this.articleService.unfavorite(slug, userId);

    return new ArticleReadDTO(article);
  }
}
