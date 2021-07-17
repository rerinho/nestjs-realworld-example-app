import { IsNotEmpty, IsString } from 'class-validator';

export class CommentCreateDTO {
  @IsNotEmpty()
  @IsString()
  body: string;
}
