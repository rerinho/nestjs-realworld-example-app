import { ForbiddenException } from '@nestjs/common';

export class ArticleUnauthorizedException extends ForbiddenException {
  constructor() {
    super('You do not have permission to access this article.');
  }
}
