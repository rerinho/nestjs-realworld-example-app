import { ProfileReadDTO } from '~/profile/dto';
import { ArticleType } from '../article.interface';

export interface ArticleReadData {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly tagList?: string[];
  readonly slug: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author: ProfileReadDTO;
}

export class ArticleReadDTO {
  readonly article: ArticleReadData;

  constructor(article: ArticleType) {
    this.article = {
      slug: article.slug,
      title: article.title,
      description: article.description,
      body: article.body,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      author: article.author ? new ProfileReadDTO(article.author) : undefined,
    };
  }
}
