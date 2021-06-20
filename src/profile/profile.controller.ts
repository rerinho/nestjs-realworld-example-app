import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from '~/user/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { ProfileParamsDTO, ProfileReadDTO } from './dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':username/follow')
  async follow(
    @User('id') userId: number,
    @Param() profileParamsDTO: ProfileParamsDTO,
  ) {
    const profile = await this.profileService.follow(userId, profileParamsDTO);

    return new ProfileReadDTO(profile);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username/follow')
  async unfollow(
    @User('id') userId: number,
    @Param() profileParamsDTO: ProfileParamsDTO,
  ) {
    const profile = await this.profileService.unfollow(
      userId,
      profileParamsDTO,
    );

    return new ProfileReadDTO(profile);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async find(
    @User('id') userId: number,
    @Param() profileParamsDTO: ProfileParamsDTO,
  ) {
    const profile = await this.profileService.findProfile(
      userId,
      profileParamsDTO,
    );

    return new ProfileReadDTO(profile);
  }
}
