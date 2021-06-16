import { Body, Controller, Post, Put, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
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
  async update(@Body('user') userData: UserUpdateDTO) {
    const user = await this.userService.update(1, userData);
    return new UserReadDTO(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async find() {
    const user = await this.userService.findBy({ id: 1 });
    return new UserReadDTO(user);
  }
}
