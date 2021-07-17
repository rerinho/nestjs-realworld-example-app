import { Comment } from '@prisma/client';
import { Profile } from '~/profile/profile.interface';

interface CommentIncludeData {
  author: Profile;
}

export type CommentType = Comment & CommentIncludeData;
