<script lang="ts">
	import axios, {AxiosResponse} from 'axios';

	import {createEventDispatcher} from 'svelte';
	import {fly} from 'svelte/transition';
	import type {LobbyData} from '../../model/lobbyData';
	import {link} from 'svelte-spa-router';
	import {Language} from '../../model/language';

	const dispatch = createEventDispatcher();
	const lobbies: Promise<AxiosResponse<Array<LobbyData>>> = axios.get<Array<LobbyData>>('/api/lobby');
</script>

<div on:outroend={() => dispatch('outroFinished')} transition:fly={{x: -500, duration: 1000}} class="flex flex-col items-center">
	{#await lobbies}
		<p>Loading...</p>
	{:then { data }}
		{#each data as lobby}
			<a href="/lobby/{lobby.id}" use:link
				>Name: {lobby.name}, secured: {lobby.secured ? 'Yes' : 'No'}, language: {lobby.language === Language.POLISH
					? 'Polish'
					: 'English'}</a>
		{:else}
			<p>No lobbies, go create one</p>
		{/each}
	{:catch}
		<p>Error while loading</p>
	{/await}
</div>
