
// typedoc-plugin-mdn-links
// typedoc-plugin-replace-text
/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  plugin: [
    'typedoc-plugin-extras',
    'typedoc-plugin-mdn-links',
    'typedoc-plugin-replace-text',
  ],
  basePath: './src',
  customCss: './assets/docs.css',
  entryPoints: ["src/index.ts"],
  excludeInternal: true,
  favicon: 'assets/favicon.svg',
  footerLastModified: true,
  includeVersion: true,
  intentionallyNotExported: [
    'SpreadTwo',
  ],
  navigationLinks: {
    "GitHub": "https://github.com/samuelneff/utikity",
    "npm": "https://www.npmjs.com/package/utikity",
  },
  searchInComments: true,
  searchInDocuments: true,
  sort: 'alphabetical',
  sourceLinkExternal: true,
  validation: {
    notDocumented: false, // Turn on when ready
  },

  replaceText: {
    replacements: [
      {
        pattern: /\[([^\]]+)\]\(([^)]+)\)/,
        replace: '<a href="$2" target="_blank">$1</a>'
      },
      {
        pattern: /\[npm!([\w-]+)\]/,
        replace: '<a href="https://www.npmjs.com/package/$1" target="_blank">$1</a>'
      }
    ]
  }
};
