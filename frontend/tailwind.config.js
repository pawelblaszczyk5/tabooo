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
				primaryAccentHover: 'var(--primaryAccentHover)',
				primaryAccentFocus: 'var(--primaryAccentFocus)',
				secondaryAccentHover: 'var(--secondaryAccentHover)',
				secondaryAccentFocus: 'var(--secondaryAccentFocus)',
				secondaryAccent: 'var(--secondaryAccent)',
				primaryFirstTeam: 'var(--primaryFirstTeam)',
				primarySecondTeam: 'var(--primarySecondTeam)',
				primaryFontColor: 'var(--primaryFontColor)',
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
