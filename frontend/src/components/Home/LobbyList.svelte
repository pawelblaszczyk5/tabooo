<script lang="ts">
	import axios, {AxiosResponse} from 'axios';

	import {createEventDispatcher} from 'svelte';
	import {fly} from 'svelte/transition';
	import type {LobbyData} from '../../model/lobbyData';
	import {link} from 'svelte-spa-router';

	const dispatch = createEventDispatcher();
	const lobbies: Promise<AxiosResponse<Array<LobbyData>>> = axios.get<Array<LobbyData>>('/api/lobby');
</script>

<div on:outroend={() => dispatch('outroFinished')} transition:fly={{x: -500, duration: 1000}} class="flex flex-col items-center">
	{#await lobbies}
		<p>Loading...</p>
	{:then { data }}
		{#each data as lobby}
			<a href="/lobby/{lobby.id}" use:link>{lobby.name}, {lobby.secured}, {lobby.language}</a>
		{/each}
	{:catch}
		<p>Error while loading</p>
	{/await}
</div>
