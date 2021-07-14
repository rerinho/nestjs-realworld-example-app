import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { ArticleService } from '../article.service';
@Injectable()
export class ArticleAuthorizationGuard implements CanActivate {
  constructor(private readonly articleService: ArticleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const {
      params: { slug },
      user,
    } = request;

    if (slug) {
      const article = await this.articleService.findBySlug(slug);

      if (article && article?.authorId !== user.id) {
        throw new ForbiddenException(
          'Você não tem permissão para acessar esse artigo.',
        );
      }
    }

    return true;
  }
}
