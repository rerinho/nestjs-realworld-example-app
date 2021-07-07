import { IsNotEmpty, IsString } from 'class-validator';

export class ArticleParamsDTO {
  @IsNotEmpty()
  @IsString()
  slug: string;
}
