import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '~/auth/guard';
import { User } from '~/user/decorators/user.decorator';
import { CommentService } from './comment.service';
import {
  CommentSlugParamsDTO,
  CommentReadDTO,
  CommentCreateDTO,
  CommentDeleteParamsDTO,
  CommentListReadDTO,
} from './dto';
import { CommentAuthorizationGuard } from './guard';

@Controller('articles/:slug/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param() { slug }: CommentSlugParamsDTO,
    @Body('comment') commentCreateDTO: CommentCreateDTO,
    @User('id') userId: number,
  ) {
    const comment = await this.commentService.create(
      userId,
      slug,
      commentCreateDTO,
    );

    return new CommentReadDTO(comment);
  }

  @UseGuards(CommentAuthorizationGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param() { id, slug }: CommentDeleteParamsDTO) {
    await this.commentService.remove(id, slug);

    return { message: 'Comment deleted.' };
  }

  @Get()
  async findAll(@Param() { slug }: CommentSlugParamsDTO) {
    const comments = await this.commentService.findAll(slug);

    return new CommentListReadDTO(comments);
  }
}
