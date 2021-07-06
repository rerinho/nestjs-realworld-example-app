import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCreateDTO, UserUpdateDTO } from './dto';
import { PrismaService } from '~/shared/prisma.service';
import { User } from '@prisma/client';

interface FindOptions {
  id?: number;
  email?: string;
  username?: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserCreateDTO): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(userId: number, data: UserUpdateDTO = null): Promise<User> {
    const user = await this.findBy({ id: userId });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  async findBy(findOptions: FindOptions): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        ...findOptions,
      },
    });

    return user;
  }
}
