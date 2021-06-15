import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '@shared/prisma.service';
import { Bcrypt } from '@shared/utils/hash';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, Bcrypt],
  exports: [UserService],
})
export class UserModule {}
