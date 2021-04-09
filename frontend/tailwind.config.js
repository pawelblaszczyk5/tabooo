module.exports = {
	purge: {
		enabled: !process.env.ROLLUP_WATCH,
		content: ['./public/index.html', './src/**/*.svelte'],
		options: {
			defaultExtractor: (content) => [
				...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
				...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
			],
			safelist: [
				'my-0',
				'my-1',
				'my-2',
				'my-3',
				'my-4',
				'my-5',
				'my-6',
				'mx-0',
				'mx-1',
				'mx-2',
				'mx-3',
				'mx-4',
				'mx-5',
				'mx-6',
				'transform',
				'transition-transform',
				'p-4',
				'z-10',
				'border',
				'border-gray-200',
				'border-opacity-40',
				'md:border-0',
				'md:non-glass',
				'glass-primary',
				'hover:translate-x-0',
				'absolute',
				'md:rounded-none',
				'md:translate-x-0',
				'left-0',
				'right-0',
				'-translate-x-full',
				'translate-x-full',
				'rounded-r-md',
				'rounded-l-md',
				'-right-5',
				'-left-5',
				'duration-500',
				'top-16',
				'max-h-screen-margin',
				'md:max-h-unset',
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
		extend: {
			inset: ['hover'],
		},
	},
	plugins: [],
};
