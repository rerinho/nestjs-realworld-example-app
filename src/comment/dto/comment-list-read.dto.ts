import { CommentType } from '../comment.interface';
import { CommentReadData, CommentReadDTO } from './';

export class CommentListReadDTO {
  readonly comments: CommentReadData[];

  constructor(comments: CommentType[]) {
    this.comments = comments.map(
      (comment) => new CommentReadDTO(comment).comment,
    );
  }
}
