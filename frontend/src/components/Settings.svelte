<script lang="ts">
	enum Theme {
		DEFAULT = 'default',
		CANDY = 'candy',
		DARK = 'dark',
		ELEGANT = 'elegant',
		TONED = 'toned',
	}

	let currentTheme: Theme = Theme.DEFAULT;
	const themesArray: Array<Theme> = Object.values(Theme);

	const selectTheme = (newTheme: Theme) => {
		document.body.classList.remove('theme--' + currentTheme);
		currentTheme = newTheme;
		document.body.classList.add('theme--' + currentTheme);
	};
</script>

<div class="flex flex-col items-center p-24">
	<p class="text-4xl font-semibold my-2 transition-colors ease-linear duration-300">Settings</p>
	<p class="text-2xl font-semibold mb-2 transition-colors ease-linear duration-300">Select theme</p>
	<div class="flex">
		{#each themesArray as theme}
			<div
				on:click={() => {
					selectTheme(theme);
				}}
				class="theme--{theme} bg-primary w-8 h-8 rounded-full mx-3 {currentTheme === theme
					? 'border-white'
					: 'border-darkAccentColor'}  border-2 border-opacity-40" />
		{/each}
	</div>
</div>
