import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ArticleCreateDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsArray()
  @IsString({
    each: true,
  })
  @IsOptional()
  tagList?: string[];
}
