module.exports = {
	purge: {
		enabled: !process.env.ROLLUP_WATCH,
		content: ['./public/index.html', './src/**/*.svelte'],
		options: {
			defaultExtractor: (content) => [
				...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
				...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
			],
			safelist: ['my-0', 'my-1', 'my-2', 'my-3', 'my-4', 'my-5', 'my-6', 'mx-0', 'mx-1', 'mx-2', 'mx-3', 'mx-4', 'mx-5', 'mx-6'],
			keyframes: true,
		},
	},
	darkMode: false,
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				primaryAccent: 'var(--primaryAccent)',
				primaryAccentHover: 'var(--primaryAccentHover)',
				primaryAccentFocus: 'var(--primaryAccentFocus)',
				secondaryAccentHover: 'var(--secondaryAccentHover)',
				secondaryAccentFocus: 'var(--secondaryAccentFocus)',
				secondaryAccent: 'var(--secondaryAccent)',
				primaryFirstTeam: 'var(--primaryFirstTeam)',
				primarySecondTeam: 'var(--primarySecondTeam)',
				primaryFontColor: 'var(--primaryFontColor)',
				primaryFontColorOpacity: 'var(--primaryFontColorOpacity)',
				secondaryFontColor: 'var(--secondaryFontColor)',
				darkAccentColor: 'var(--darkAccentColor)',
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
