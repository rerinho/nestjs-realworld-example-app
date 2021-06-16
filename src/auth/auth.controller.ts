import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthReadDTO } from './dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('users/login')
  async login(@Request() req) {
    const token = await this.authService.login(req.user);

    return new AuthReadDTO(req.user, token);
  }
}
