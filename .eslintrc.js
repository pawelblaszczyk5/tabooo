module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'svelte3'],
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
	rules: {
		'prefer-const': [
			'error',
			{
				destructuring: 'any',
				ignoreReadBeforeAssign: false,
			},
		],
	},
	settings: {
		'svelte3/typescript': require('typescript'), // pass the TypeScript package to the Svelte plugin
		// ...
	},
};
