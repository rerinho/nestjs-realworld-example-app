import hash from '@shared/utils/hash/hash.bcrypt';

export default {
  model: 'User',
  beforeHooks: [
    {
      action: 'update',
      execute: (params) => {
        const password = params.args['data'].password;
        if (password) {
          params.args['data'].password = hash.generate(password);
        }
      },
    },
    {
      action: 'create',
      execute: (params) => {
        const password = params.args['data'].password;
        params.args['data'].password = hash.generate(password);
      },
    },
  ],
  afterHooks: [],
};
