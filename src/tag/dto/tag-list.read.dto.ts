import { Tag } from '@prisma/client';

export class TagListReadDTO {
  readonly tags: string[];

  constructor(tags: Tag[]) {
    this.tags = tags.map((tag) => tag.name);
  }
}
