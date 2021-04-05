<script lang="ts">
	import type {LobbyData} from '../../model/lobbyData';

	import axios from 'axios';
	import TransitionedRoute from '../commons/TransitionedRoute.svelte';
	import Lobby from './Lobby.svelte';

	const lobbies = axios.get<Array<LobbyData>>('/api/lobby');
</script>

<TransitionedRoute>
	<div class="flex flex-col items-center w-full">
		{#await lobbies}
			<p class="text-center">Loading lobbies...</p>
		{:then { data }}
			<div class="grid grid-cols-8 sm:grid-cols-10 max-w-3xl w-full sm:w-9/12 gap-y-2 gap-x-1 items-center">
				{#if data.length}
					<p class="col-span-4 text-center font-semibold">Lobby name</p>
					<p class="col-span-2 text-center font-semibold">Security</p>
					<p class="col-span-2 text-center font-semibold">Language</p>
					<div class="hidden sm:block col-span-2" />
				{/if}
				{#each data as lobby}
					<Lobby {lobby} />
				{:else}
					<p class="col-span-full text-center">No lobbies, go create one</p>
				{/each}
			</div>
		{:catch}
			<p class="text-center">Error while loading lobbies, please try again later</p>
		{/await}
	</div>
</TransitionedRoute>
