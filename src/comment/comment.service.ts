import { Injectable } from '@nestjs/common';
import { ArticleService } from '~/article/article.service';
import { PrismaService } from '~/shared/prisma.service';
import { CommentCreateDTO } from './dto';
import { CommentNotFoundException } from './exception';

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly articleService: ArticleService,
  ) {}

  async create(userId: number, slug: string, { body }: CommentCreateDTO) {
    const article = await this.articleService.findBySlug(slug);

    return this.prisma.comment.create({
      data: {
        article: {
          connect: {
            id: article.id,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
        body,
      },
      include: {
        author: true,
      },
    });
  }

  async remove(id: number, slug: string) {
    // Throws error internally if article is not found
    await this.articleService.findBySlug(slug);

    const comment = await this.findById(id);

    if (!comment) {
      throw new CommentNotFoundException();
    }

    return this.prisma.comment.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async findAll(slug: string) {
    // Throws error internally if article is not found
    const article = await this.articleService.findBySlug(slug);

    return this.prisma.comment.findMany({
      where: {
        article: {
          id: article.id,
        },
      },
      include: {
        author: true,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.comment.findUnique({
      where: {
        id: Number(id),
      },
    });
  }
}
