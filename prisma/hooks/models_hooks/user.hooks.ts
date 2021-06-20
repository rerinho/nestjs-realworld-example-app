import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '~/shared/prisma.service';
import hash from '@shared/utils/hash/hash.bcrypt';

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
    await checkBeforeUpdateAttributeAvailability(
      'email',
      params.args,
      prismaService,
    );
  }

  if (username) {
    await checkBeforeUpdateAttributeAvailability(
      'username',
      params.args,
      prismaService,
    );
  }

  if (password) {
    params.args.data.password = generateHash(password);
  }
}

async function beforeCreate(params, prismaService: PrismaService) {
  const { password } = params.args.data;

  await Promise.all([
    checkBeforeCreateAttributeAvailability(
      'username',
      params.args,
      prismaService,
    ),
    checkBeforeCreateAttributeAvailability('email', params.args, prismaService),
  ]);

  params.args.data.password = hash.generate(password);
}

function generateHash(password) {
  return hash.generate(password);
}

async function checkBeforeCreateAttributeAvailability(
  attributeName,
  queryArgs,
  prismaService: PrismaService,
) {
  const value = queryArgs.data[attributeName];

  const user = await getUserByAttribute(attributeName, value, prismaService);

  if (user) {
    throw new BadRequestException(
      `O ${attributeName} informado não está disponível.`,
    );
  }
}

async function checkBeforeUpdateAttributeAvailability(
  attributeName,
  queryArgs,
  prismaService: PrismaService,
) {
  const value = queryArgs.data[attributeName];
  const { where } = queryArgs;

  const [user, targetUser] = await Promise.all([
    getUserByAttribute(attributeName, value, prismaService),
    prismaService.user.findFirst({
      where,
    }),
  ]);

  if (user && user.id !== targetUser.id) {
    throw new BadRequestException(
      `O ${attributeName} informado não está disponível.`,
    );
  }
}

async function getUserByAttribute(
  attributeName,
  value,
  prismaService: PrismaService,
) {
  return prismaService.user.findFirst({
    where: {
      [attributeName]: value,
    },
  });
}
