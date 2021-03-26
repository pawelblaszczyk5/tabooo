module.exports = {
	purge: {
		enabled: !process.env.ROLLUP_WATCH,
		content: ['./public/index.html', './src/**/*.svelte'],
		options: {
			defaultExtractor: (content) => [
				...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
				...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
			],
			safelist: ['py-0', 'py-1', 'py-2', 'py-3', 'py-4', 'py-5', 'py-6', 'px-0', 'px-1', 'px-2', 'px-3', 'px-4', 'px-5', 'px-6'],
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
