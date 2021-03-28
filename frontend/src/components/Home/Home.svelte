<script lang="ts">
	import type {LobbyData} from '../../model/lobbyData';
	import {Language} from '../../model/language';
	import Button, {ButtonType} from '../commons/Button.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import Intro from './Intro.svelte';
	import axios from 'axios';
	import {push} from 'svelte-spa-router';
	import {HomeStep} from '../../model/homeStep';
	import LobbyCreator from './LobbyCreator.svelte';
	import LobbyList from './LobbyList.svelte';

	let homeStep: HomeStep = HomeStep.INTRO;

	const createLobby = () => {
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

<div class="flex-col items-center" style="display: {homeStep === HomeStep.INTRO ? 'flex' : 'none'}">
	<Intro />
	<Spacer y={3}>
		<Button on:click={() => (homeStep = HomeStep.CREATOR)} type={ButtonType.PRIMARY}>Create lobby</Button>
	</Spacer>
	<Spacer y={3}>
		<Button on:click={() => (homeStep = HomeStep.LIST)} type={ButtonType.SECONDARY}>Join a lobby</Button>
	</Spacer>
</div>

{#if homeStep === HomeStep.CREATOR}
	<LobbyCreator />
{/if}

{#if homeStep === HomeStep.LIST}
	<LobbyList />
{/if}
