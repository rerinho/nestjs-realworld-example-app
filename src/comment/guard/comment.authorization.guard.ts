import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ArticleService } from '~/article/article.service';
import { CommentService } from '../comment.service';
import { CommentUnauthorizedException } from '../exception';
@Injectable()
export class CommentAuthorizationGuard implements CanActivate {
  constructor(
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const {
      params: { slug, id },
      user,
    } = request;

    if (slug && id) {
      const comment = await this.commentService.findById(id);
      const article = await this.articleService.findBySlug(slug);

      const isArticleOwner = article?.authorId === user.id;
      const isCommentOwner = comment?.authorId === user.id;

      if (!isArticleOwner && !isCommentOwner) {
        throw new CommentUnauthorizedException();
      }
    }

    return true;
  }
}
