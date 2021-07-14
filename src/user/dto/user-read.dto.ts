import { User } from '@prisma/client';

interface UserReadData {
  readonly email: string;
  readonly username: string;
  readonly bio: string;
  readonly image: string;
}
export class UserReadDTO {
  readonly user: UserReadData;

  constructor(user: User) {
    this.user = {
      email: user.email,
      username: user.username,
      bio: user.bio,
      image: user.image,
    };
  }
}
