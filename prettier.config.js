/** @type {import('prettier').Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
};
