import { Profile } from '../profile.interface';

export class ProfileReadDTO {
  readonly username: string;
  readonly bio: string;
  readonly image: string;
  readonly following: boolean;

  constructor(profile: Profile) {
    this.username = profile.username;
    this.bio = profile.bio;
    this.image = profile.image;
    this.following = profile.following;
  }
}
