import { ProfileReadDTO } from '~/profile/dto';

export class ArticleReadDTO {
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly tagList?: string[];
  readonly slug: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author: ProfileReadDTO;

  constructor(article) {
    this.slug = article.slug;
    this.title = article.title;
    this.description = article.description;
    this.body = article.body;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;
    this.author = article.author
      ? new ProfileReadDTO(article.author)
      : undefined;
  }
}
