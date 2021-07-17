import { Injectable } from '@nestjs/common';
import { UserCreateDTO, UserUpdateDTO } from './dto';
import { PrismaService } from '~/shared/prisma.service';
import { User } from '@prisma/client';
import { UserNotFoundException } from './exception';

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
      throw new UserNotFoundException();
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
