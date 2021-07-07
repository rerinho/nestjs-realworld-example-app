import { ProfileReadDTO } from '~/profile/dto';

export class ArticleReadDTO {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  author: ProfileReadDTO;

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
