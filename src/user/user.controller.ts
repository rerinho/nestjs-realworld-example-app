import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDTO, UserReadDTO } from './dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/users')
  async create(@Body('user') userData: UserCreateDTO) {
    const user = await this.userService.create(userData);
    return new UserReadDTO(user);
  }
}
