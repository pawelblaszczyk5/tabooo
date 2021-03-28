<script lang="ts">
	import {createEventDispatcher} from 'svelte';
	import {fly} from 'svelte/transition';
	import {Language} from '../../model/language';
	import type {LobbyData} from '../../model/lobbyData';
	import axios from 'axios';
	import {push} from 'svelte-spa-router';

	const dispatch = createEventDispatcher();

	const createLobby = (event: CustomEvent<LobbyData>) => {
		const lobbyData: LobbyData = {
			language: Language.ENGLISH,
			password: 'test',
		};
		axios
			.post<string>('/api/lobby', lobbyData)
			.then(({data}) => {
				push(`/lobby/${data}`);
			})
			.catch((err) => console.log(err));
	};
</script>

<div on:outroend={() => dispatch('outroFinished')} transition:fly={{x: -500, duration: 1000}} class="flex flex-col items-center">
	<p>LobbyCreator works!</p>
</div>
