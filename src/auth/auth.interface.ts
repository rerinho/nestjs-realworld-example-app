import { User } from '.prisma/client';

export interface AuthData {
  token: string;
}

export type Auth = User & AuthData;
