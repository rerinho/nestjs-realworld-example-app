import { hashSync, compareSync } from 'bcrypt';
import { IHash } from './hash.interface';

const SALT_ROUNDS = 9;

export class Bcrypt implements IHash {
  generate(data: string) {
    return hashSync(data, SALT_ROUNDS);
  }

  compare(data: string, encrypted: string) {
    return compareSync(data, encrypted);
  }
}
