<script lang="ts">
	import type {LobbyData} from '../../model/lobbyData';

	import axios from 'axios';
	import {link} from 'svelte-spa-router';
	import {Language} from '../../model/language';

	const lobbies = axios.get<Array<LobbyData>>('/api/lobby');
</script>

<div class="flex flex-col items-center">
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
