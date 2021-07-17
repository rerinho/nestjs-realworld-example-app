import { Profile } from '../profile.interface';

export interface ProfileReadData {
  readonly username: string;
  readonly bio: string;
  readonly image: string;
  readonly following: boolean;
}
export class ProfileReadDTO {
  readonly profile: ProfileReadData;

  constructor(profile: Profile) {
    this.profile = {
      username: profile.username,
      bio: profile.bio,
      image: profile.image,
      following: profile.following,
    };
  }
}
