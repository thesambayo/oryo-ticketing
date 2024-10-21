// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
		ignores: [
			"dist",
			"node_modules",
			".vscode",
			".idea",
			".angular",
			".sass-cache",
			".DS_Store",
			"Thumbs.db",
			"npm-debug.log",
			".settings",
	
		],
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
			// @ts-ignore
      ...tseslint.configs.recommended,
			// @ts-ignore
      ...tseslint.configs.stylistic,
			// @ts-ignore
      ...angular.configs.tsRecommended,
			// @ts-ignore
			eslintPluginPrettierRecommended
			// "plugin:prettier/recommended"
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: ["oryo", "hlm"],
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: ["oryo", "hlm"],
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
			eslintPluginPrettierRecommended
    ],
    rules: {
			"prettier/prettier": [
        "error",
        {
          "parser": "angular"
        },
      ]
		},
  }
);
