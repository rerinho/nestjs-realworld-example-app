import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { CommentSlugParamsDTO } from './';

export class CommentDeleteParamsDTO extends PickType(CommentSlugParamsDTO, [
  'slug',
] as const) {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
