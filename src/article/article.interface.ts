import { Article, Tag } from '@prisma/client';
import { Profile } from '~/profile/profile.interface';

interface ArticleIncludeData {
  author: Profile;
  tagList?: Tag[];
}

export type ArticleType = Article & ArticleIncludeData;
