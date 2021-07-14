import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '~/shared/prisma.service';
import { ArticleCreateDTO, ArticleUpdateDTO } from './dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ArticleCreateDTO, userId: number) {
    const articleData = {
      ...data,
      author: {
        connect: {
          id: userId,
        },
      },
      tagList: {
        connectOrCreate: this._getTagList(data.tagList),
      },
    };

    return this.prisma.article.create({
      data: articleData,
      include: {
        author: true,
      },
    });
  }

  private _getTagList(tagList: string[]) {
    return tagList.map((tag) => {
      return {
        create: {
          name: tag,
        },
        where: {
          name: tag,
        },
      };
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.article.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
      },
    });
  }

  async findAll() {
    return this.prisma.article.findMany({
      include: {
        author: true,
      },
    });
  }

  async update(
    slug: string,
    userId: number,
    articleUpdateDTO: ArticleUpdateDTO,
  ) {
    const article = await this.prisma.article.findFirst({
      where: {
        slug,
        author: {
          id: userId,
        },
      },
    });

    if (!article) {
      throw new NotFoundException('Artigo não encontrado');
    }

    return this.prisma.article.update({
      where: {
        slug,
      },
      data: articleUpdateDTO,
      include: {
        author: true,
      },
    });
  }

  async remove(slug: string) {
    return this.prisma.article.delete({
      where: {
        slug,
      },
    });
  }
}
