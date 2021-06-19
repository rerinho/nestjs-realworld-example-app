import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { buildHookMiddleware } from '../../prisma/middlewares/hooks.middleware';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    this.$use(buildHookMiddleware(this));
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
