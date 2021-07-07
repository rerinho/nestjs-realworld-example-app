import { Injectable } from '@nestjs/common';
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

  findAll(query) {
    return `This actions lists articles`;
  }

  update(slug: string, articleUpdateDTO: ArticleUpdateDTO) {
    return `This action updates a article`;
  }

  remove(slug: string) {
    return `This action removes a article`;
  }
}
