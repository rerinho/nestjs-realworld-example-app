import slugify from 'slugify';

type SlugifyOptions = {
  replacement?: string; // replace spaces with replacement character, defaults to `-`
  remove?: RegExp; // remove characters that match regex, defaults to `undefined`
  lower?: boolean; // convert to lower case, defaults to `false`
  strict?: boolean; // strip special characters except replacement, defaults to `false`
  locale?: string; // language code of the locale to use
};

export class Slug {
  static slugify(value: string, options?: SlugifyOptions): string {
    return slugify(value, options);
  }
}
