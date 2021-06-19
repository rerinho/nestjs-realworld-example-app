import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Bcrypt } from '~/shared/utils/hash';
import { UserService } from '~/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
    private readonly hash: Bcrypt,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findBy({ email });

    if (user && this.checkPassword(user, password)) {
      return user;
    }

    return null;
  }

  checkPassword(user: User, password: string): boolean {
    return this.hash.compare(password, user.password);
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
