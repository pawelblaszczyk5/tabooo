<script lang="ts">
	import type {LobbyData} from '../../model/lobbyData';
	import {Language} from '../../model/language';
	import Button, {ButtonType} from '../commons/Button.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import Intro from './Intro.svelte';
	import axios from 'axios';
	import {push} from 'svelte-spa-router';

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

<Intro />
<Spacer y={3}>
	<Button on:click={createLobby} type={ButtonType.PRIMARY} />
</Spacer>
<Spacer y={3}>
	<Button type={ButtonType.SECONDARY} />
</Spacer>
