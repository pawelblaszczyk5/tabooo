<script lang="ts">
	import {settingsStore, Theme} from '../../stores/settings';

	const themesArray: Array<Theme> = Object.values(Theme);

	const selectTheme = (newTheme: Theme) => {
		settingsStore.setTheme(newTheme);
	};
</script>

<div class="flex flex-col items-center p-4 sm:p-24">
	<p class="text-4xl font-semibold my-2 transition-colors duration-300">Settings</p>
	<p class="text-2xl font-semibold mb-2 transition-colors duration-300">Select theme</p>
	<div class="flex">
		{#each themesArray as theme}
			<div
				on:click={() => {
					selectTheme(theme);
				}}
				data-taboo-theme={theme}
				class="bg-gradient-to-br from-primaryFirstTeam via-primary to-primarySecondTeam w-7 h-7 sm:w-9 sm:h-9 rounded-full mx-2 sm:mx-3 
				{$settingsStore.theme ===
				theme
					? 'border-white'
					: 'border-darkAccentColor'}  border-2" />
		{/each}
	</div>
</div>
