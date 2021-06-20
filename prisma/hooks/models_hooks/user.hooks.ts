import { BadRequestException } from '@nestjs/common';
import hash from '@shared/utils/hash/hash.bcrypt';
import { PrismaService } from '~/shared/prisma.service';

export default {
  model: 'User',
  beforeHooks: [
    {
      action: 'update',
      execute: beforeUpdate,
    },
    {
      action: 'create',
      execute: beforeCreate,
    },
  ],
  afterHooks: [],
};

async function beforeUpdate(params, prismaService: PrismaService) {
  const { password, email, username } = params.args.data;

  if (email) {
    await checkAttributeAvailability('email', params.args, prismaService);
  }

  if (username) {
    await checkAttributeAvailability('username', params.args, prismaService);
  }

  if (password) {
    params.args.data.password = hashPassword(password);
  }
}

async function beforeCreate(params, prismaService: PrismaService) {
  const { password } = params.args.data;

  await Promise.all([
    checkAttributeAvailability('username', params.args, prismaService),
    checkAttributeAvailability('email', params.args, prismaService),
  ]);

  params.args.data.password = hash.generate(password);
}

function hashPassword(password) {
  return hash.generate(password);
}

async function checkAttributeAvailability(
  attributeName,
  queryArgs,
  prismaService: PrismaService,
) {
  const value = queryArgs.data[attributeName];
  const { where } = queryArgs;

  const [user, targetUser] = await Promise.all([
    prismaService.user.findFirst({
      where: {
        [attributeName]: value,
      },
    }),
    prismaService.user.findUnique({
      where,
    }),
  ]);

  if (user && user.id !== targetUser.id) {
    throw new BadRequestException(
      `O ${attributeName} informado não está disponível.`,
    );
  }
}
