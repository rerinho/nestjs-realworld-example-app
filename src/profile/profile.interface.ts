import { User } from '.prisma/client';

interface ProfileData {
  following?: boolean;
}

export type Profile = User & ProfileData;
