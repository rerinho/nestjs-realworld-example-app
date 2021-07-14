import { Article } from '@prisma/client';
import { Profile } from '~/profile/profile.interface';

interface AuthorData {
  author: Profile;
}

export type ArticleType = Article & AuthorData;
