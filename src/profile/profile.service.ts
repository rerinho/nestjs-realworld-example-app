import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '~/shared/prisma.service';
import { ProfileParamsDTO } from './dto';
import { Profile } from './profile.interface';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async follow(
    userId: number,
    profileParamsDTO: ProfileParamsDTO,
  ): Promise<Profile> {
    const { username } = profileParamsDTO;

    const profile = await this._findByUsername(username);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: {
          connect: {
            id: profile.id,
          },
        },
      },
    });

    return {
      ...profile,
      following: true,
    };
  }

  async find(
    userId: number,
    profileParamsDTO: ProfileParamsDTO,
  ): Promise<Profile> {
    const { username } = profileParamsDTO;
    const profile = await this._findByUsername(username);

    const isFollowing = await this.prisma.user.findFirst({
      where: {
        id: userId,
        following: {
          some: {
            id: profile.id,
          },
        },
      },
    });

    return {
      ...profile,
      following: Boolean(isFollowing),
    };
  }

  async unfollow(
    userId: number,
    profileParamsDTO: ProfileParamsDTO,
  ): Promise<Profile> {
    const { username } = profileParamsDTO;

    const profile = await this._findByUsername(username);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: {
          disconnect: {
            id: profile.id,
          },
        },
      },
    });

    return {
      ...profile,
      following: false,
    };
  }

  private async _findByUsername(username: string) {
    const profile = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!profile) {
      throw new NotFoundException('Perfil não encontrado.');
    }

    return profile;
  }
}
