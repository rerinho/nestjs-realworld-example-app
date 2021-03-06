import { Body, Controller, Post, Put, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';
import { User } from './decorators/user.decorator';
import { UserCreateDTO, UserReadDTO, UserUpdateDTO } from './dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/users')
  async create(@Body('user') userData: UserCreateDTO) {
    const user = await this.userService.create(userData);

    return new UserReadDTO(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/user')
  async update(
    @User('id') userId: number,
    @Body('user') userData: UserUpdateDTO,
  ) {
    const user = await this.userService.update(userId, userData);

    return new UserReadDTO(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async findOne(@User('id') userId: number) {
    const user = await this.userService.findBy({ id: userId });

    return new UserReadDTO(user);
  }
}
