
// typedoc-plugin-mdn-links
// typedoc-plugin-replace-text
/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  plugin: [
    'typedoc-plugin-mdn-links',
    'typedoc-plugin-replace-text',
  ],
  entryPoints: ["src/index.ts"],
  replaceText: {
    replacements: [
      {
        pattern: /\[([^\]]+)\]\(([^)]+)\)/,
        replace: '<a href="$2" target="_blank">$1</a>'
      }
    ]
  }
};
