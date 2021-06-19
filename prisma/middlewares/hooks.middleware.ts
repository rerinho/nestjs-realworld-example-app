import { PrismaService } from '~/shared/prisma.service';
import hooksConfig from '../hooks';

async function executeHooks(
  hookType: string,
  modelHookConfig: any,
  params: any,
  prismaService: PrismaService,
) {
  const { action } = params;

  if (modelHookConfig && modelHookConfig[hookType].length) {
    const hook = modelHookConfig[hookType].find(
      (hookConfig) => hookConfig.action === action,
    );

    if (hook) {
      await hook.execute(params, prismaService);
    }
  }
}

async function hooksMiddleware(params, next, prismaService: PrismaService) {
  const { model } = params;
  const modelHookConfig = hooksConfig[model];

  await executeHooks('beforeHooks', modelHookConfig, params, prismaService);

  const result = await next(params);

  await executeHooks('afterHooks', modelHookConfig, params, prismaService);

  return result;
}

export function buildHookMiddleware(prismaService: PrismaService) {
  return (params, next) => hooksMiddleware(params, next, prismaService);
}
