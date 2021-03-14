module.exports = {
	purge: {
		enabled: !process.env.ROLLUP_WATCH,
		content: ['./public/index.html', './src/**/*.svelte'],
		options: {
			defaultExtractor: (content) => [
				...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
				...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
			],
			keyframes: true,
		},
	},
	darkMode: false,
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				primaryAccent: 'var(--primaryAccent)',
				secondaryAccent: 'var(--secondaryAccent)',
				primaryFirstTeam: 'var(--primaryFirstTeam)',
				primarySecondTeam: 'var(--primarySecondTeam)',
				primaryFontColor: 'var(--primaryFontColor)',
			},
			fontFamily: {
				main: 'Overpass, sans-serif',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
