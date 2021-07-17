import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/shared/prisma.service';
import {
  ArticleCreateDTO,
  ArticleFeedQueryDTO,
  ArticleListQueryDTO,
  ArticleUpdateDTO,
} from './dto';
import { ArticleNotFoundException } from './exception';

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;
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
        tagList: true,
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

  async findBySlug(slug: string, includeFavoritedBy = false) {
    const article = await this.prisma.article.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
        tagList: true,
        favoritedBy: includeFavoritedBy,
      },
    });

    if (!article) {
      throw new ArticleNotFoundException();
    }

    return article;
  }

  async findAll(articleListQueryDTO: ArticleListQueryDTO) {
    const { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } =
      articleListQueryDTO;

    const where = this._buildFindAllWhere(articleListQueryDTO);

    return this.prisma.article.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: Number(limit),
      skip: Number(offset),
      include: {
        author: true,
        tagList: true,
      },
    });
  }

  private _buildFindAllWhere({ author, tag, favorited }: ArticleListQueryDTO) {
    const queries = [];

    if (author) {
      queries.push({
        author: {
          username: {
            equals: author,
          },
        },
      });
    }

    if (tag) {
      queries.push({
        tagList: {
          some: {
            name: {
              equals: tag,
            },
          },
        },
      });
    }

    if (favorited) {
      queries.push({
        favoritedBy: {
          some: {
            username: {
              equals: favorited,
            },
          },
        },
      });
    }

    return {
      AND: queries,
    };
  }

  async feed(
    userId: number,
    { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET }: ArticleFeedQueryDTO,
  ) {
    return this.prisma.article.findMany({
      where: {
        author: {
          followers: {
            some: {
              id: userId,
            },
          },
        },
      },
      take: Number(limit),
      skip: Number(offset),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
        tagList: true,
      },
    });
  }

  async update(
    slug: string,
    userId: number,
    articleUpdateDTO: ArticleUpdateDTO = null,
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
      throw new ArticleNotFoundException();
    }

    return this.prisma.article.update({
      where: {
        slug,
      },
      data: articleUpdateDTO,
      include: {
        author: true,
        tagList: true,
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

  async favorite(slug: string, userId: number) {
    const article = await this.findBySlug(slug, true);

    const hasFavorited = article.favoritedBy.some((user) => user.id === userId);

    if (hasFavorited) {
      return article;
    }

    return this.prisma.article.update({
      where: {
        slug,
      },
      data: {
        favoritedBy: {
          connect: {
            id: userId,
          },
        },
        favoritesCount: ++article.favoritesCount,
      },
      include: {
        author: true,
        tagList: true,
      },
    });
  }

  async unfavorite(slug: string, userId: number) {
    const article = await this.findBySlug(slug, true);

    const hasFavorited = article.favoritedBy.some((user) => user.id === userId);

    if (!hasFavorited) {
      return article;
    }

    return this.prisma.article.update({
      where: {
        slug,
      },
      data: {
        favoritedBy: {
          disconnect: {
            id: userId,
          },
        },
        favoritesCount: --article.favoritesCount,
      },
      include: {
        author: true,
        tagList: true,
      },
    });
  }
}
