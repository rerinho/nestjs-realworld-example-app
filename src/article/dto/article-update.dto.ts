import { PartialType, OmitType } from '@nestjs/mapped-types';
import { ArticleCreateDTO } from './';

export class ArticleUpdateDTO extends PartialType(
  OmitType(ArticleCreateDTO, ['tagList'] as const),
) {}
