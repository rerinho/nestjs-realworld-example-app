import { Slug } from '~/shared/utils/slug/slug.slugify';

export default {
  model: 'Article',
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

async function beforeUpdate(params) {
  const { title } = params.args.data;

  if (title) {
    params.args.data.slug = slugify(title);
  }
}

async function beforeCreate(params) {
  const { title } = params.args.data;

  params.args.data.slug = slugify(title);
}

function slugify(value) {
  const slug = Slug.slugify(value, { lower: true });

  return `${slug}-${new Date().valueOf()}`;
}
