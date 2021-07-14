import { IsInt, IsOptional, IsString } from 'class-validator';

export class ArticleListQueryDTO {
  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  favorited?: string;

  @IsOptional()
  @IsInt()
  limit?: string;

  @IsOptional()
  @IsInt()
  offset?: string;
}
