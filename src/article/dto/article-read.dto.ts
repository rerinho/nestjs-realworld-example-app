import { ProfileReadData, ProfileReadDTO } from '~/profile/dto';
import { TagListReadDTO } from '~/tag/dto/tag-list.read.dto';
import { ArticleType } from '../article.interface';

export interface ArticleReadData {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly tagList: string[];
  readonly slug: string;
  readonly favoritesCount: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author?: ProfileReadData;
}

export class ArticleReadDTO {
  readonly article: ArticleReadData;

  constructor(article: ArticleType) {
    this.article = {
      slug: article.slug,
      title: article.title,
      description: article.description,
      body: article.body,
      favoritesCount: article.favoritesCount,
      tagList: article.tagList ? new TagListReadDTO(article.tagList).tags : [],
      author: article.author
        ? new ProfileReadDTO(article.author).profile
        : undefined,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };
  }
}
