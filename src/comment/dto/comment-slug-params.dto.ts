import { IsNotEmpty, IsString } from 'class-validator';

export class CommentSlugParamsDTO {
  @IsNotEmpty()
  @IsString()
  slug: string;
}
