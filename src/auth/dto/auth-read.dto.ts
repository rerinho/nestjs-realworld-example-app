import { UserReadData } from '~/user/dto';
import { Auth } from '../auth.interface';

type AuthReadData = UserReadData & {
  readonly token: string;
};

export class AuthReadDTO {
  readonly user: AuthReadData;

  constructor(auth: Auth) {
    this.user = {
      email: auth.email,
      token: auth.token,
      username: auth.username,
      bio: auth.bio,
      image: auth.image,
    };
  }
}
