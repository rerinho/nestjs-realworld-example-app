import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/shared/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.tag.findMany();
  }
}
