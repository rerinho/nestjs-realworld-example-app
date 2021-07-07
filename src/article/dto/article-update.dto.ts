import { PartialType } from '@nestjs/mapped-types';
import { ArticleCreateDTO } from './';

export class ArticleUpdateDTO extends PartialType(ArticleCreateDTO) {}
