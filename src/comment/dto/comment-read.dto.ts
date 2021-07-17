import { ProfileReadData, ProfileReadDTO } from '~/profile/dto';
import { CommentType } from '../comment.interface';

export interface CommentReadData {
  readonly id: number;
  readonly body: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author?: ProfileReadData;
}
export class CommentReadDTO {
  readonly comment: CommentReadData;

  constructor(comment: CommentType) {
    this.comment = {
      id: comment.id,
      body: comment.body,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      author: comment.author
        ? new ProfileReadDTO(comment.author).profile
        : undefined,
    };
  }
}
