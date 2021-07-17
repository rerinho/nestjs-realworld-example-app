import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { ArticleService } from '~/article/article.service';
import { PrismaService } from '~/shared/prisma.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, ArticleService, PrismaService],
})
export class CommentModule {}
