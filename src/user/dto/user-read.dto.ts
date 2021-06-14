import { User } from '@prisma/client';

export class UserReadDTO {
  readonly email: string;
  readonly username: string;
  readonly bio: string;
  readonly image: string;

  constructor(user: User) {
    this.email = user.email;
    this.username = user.username;
    this.bio = user.bio;
    this.image = user.image;
  }
}
