import { ForbiddenException } from '@nestjs/common';

export class CommentUnauthorizedException extends ForbiddenException {
  constructor() {
    super('You do not have permission to modify this comment.');
  }
}
