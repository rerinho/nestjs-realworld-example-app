import { Injectable, BadRequestException } from '@nestjs/common';
import { UserCreateDTO, UserUpdateDTO } from './dto';
import { PrismaService } from '@shared/prisma.service';
import { User } from '@prisma/client';
import { Bcrypt } from '@shared/utils/hash';

interface FindOptions {
  id?: number;
  email?: string;
  username?: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: Bcrypt,
  ) {}

  async create(data: UserCreateDTO): Promise<User> {
    const user = await this.findByEmailOrUsername(data.email, data.username);

    if (user) {
      throw new BadRequestException(
        'Já existe um usuário com o email ou username informado.',
      );
    }

    // TODO: Criar hook para gerar a hash de senha
    data.password = this.hash.generate(data.password);

    return this.prisma.user.create({
      data,
    });
  }

  async update(id: number, data: UserUpdateDTO): Promise<User> {
    const user = await this.findByEmailOrUsername(data.email, data.username);

    if (user && user.id != id) {
      throw new BadRequestException(
        'Já existe um usuário com o email ou username informado.',
      );
    }
    // TODO: Criar hook para atualizar o updatedAt
    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async findByEmailOrUsername(email: string, username: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    return user;
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
