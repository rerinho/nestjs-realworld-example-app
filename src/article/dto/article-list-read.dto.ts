import { ArticleType } from '../article.interface';
import { ArticleReadData, ArticleReadDTO } from './article-read.dto';

export class ArticleListReadDTO {
  readonly articles: ArticleReadData[];
  readonly articlesCount: number;

  constructor(articles: ArticleType[]) {
    this.articles = articles.map(
      (article) => new ArticleReadDTO(article).article,
    );
    this.articlesCount = articles.length;
  }
}
