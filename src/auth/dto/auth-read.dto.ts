import { Auth } from '../auth.interface';

interface AuthReadData {
  readonly email: string;
  readonly username: string;
  readonly bio: string;
  readonly image: string;
  readonly token: string;
}

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
