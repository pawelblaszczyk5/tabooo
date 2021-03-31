<script lang="ts">
	import {tick} from 'svelte';
	import {get} from 'svelte/store';
	import {settings, Theme} from '../../stores/settings';
	import Spacer from '../commons/Spacer.svelte';
	import TextInput from '../commons/TextInput.svelte';

	const themesArray: Array<Theme> = Object.values(Theme);

	const selectTheme = (newTheme: Theme) => {
		settings.setTheme(newTheme);
	};

	let nickname = get(settings).nickname;

	$: settings.setNickname(nickname);
	$: {
		tick().then(() => {
			nickname = $settings.nickname;
		});
	}
</script>

<div class="flex flex-col items-center p-4 sm:p-24">
	<p class="text-3xl font-semibold my-2 transition-colors duration-300">Settings</p>
	<p class="text-lg font-semibold mb-2 transition-colors duration-300">Select theme</p>
	<div class="flex">
		{#each themesArray as theme}
			<div
				on:click={() => {
					selectTheme(theme);
				}}
				data-taboo-theme={theme}
				class="bg-gradient-to-br from-primaryFirstTeam via-primary to-primarySecondTeam w-7 h-7 sm:w-9 sm:h-9 rounded-full mx-2 sm:mx-3 
				{$settings.theme ===
				theme
					? 'border-white'
					: 'border-darkAccentColor'}  border-2" />
		{/each}
	</div>
	<Spacer y={5}>
		<TextInput bind:value={nickname} placeholder="Enter nickname">Change your nickname</TextInput>
	</Spacer>
</div>
