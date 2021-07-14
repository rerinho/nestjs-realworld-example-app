import { PartialType, PickType } from '@nestjs/mapped-types';
import { ArticleListQueryDTO } from './article-list-query.dto';

export class ArticleFeedQueryDTO extends PartialType(
  PickType(ArticleListQueryDTO, ['limit', 'offset'] as const),
) {}
