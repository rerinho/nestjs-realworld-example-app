import { User } from '@prisma/client';

export class AuthReadDTO {
  readonly email: string;
  readonly token: string;
  readonly username: string;
  readonly bio: string;
  readonly image: string;

  constructor(user: User, token: string) {
    this.email = user.email;
    this.token = token;
    this.username = user.username;
    this.bio = user.bio;
    this.image = user.image;
  }
}
