import modelsHooks from './models_hooks';

function generateHookConfig() {
  const config = {};

  modelsHooks.forEach((hookConfig) => {
    const { model, ...hooks } = hookConfig;
    config[model] = hooks;
  });

  return config;
}

const config = generateHookConfig();

export default config;
