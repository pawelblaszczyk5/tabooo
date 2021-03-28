<script lang="ts">
	import {createEventDispatcher} from 'svelte';
	import {fly} from 'svelte/transition';
	import {Language} from '../../model/language';
	import type {LobbyData} from '../../model/lobbyData';
	import axios from 'axios';
	import {push} from 'svelte-spa-router';
	import TextInput from '../commons/TextInput.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import Button from '../commons/Button.svelte';
	import {password} from '../../stores/password';

	const dispatch = createEventDispatcher();
	let newPassword: string;
	let newLobbyName: string;

	const createLobby = () => {
		password.setPassword(newPassword);
		const lobbyData: LobbyData = {
			language: Language.ENGLISH,
			name: newLobbyName,
			password: newPassword,
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
	<form class="flex flex-col items-center" on:submit|preventDefault={createLobby}>
		<Spacer y={5}>
			<TextInput bind:value={newLobbyName} placeholder="Enter name">Lobby name</TextInput>
		</Spacer>
		<Spacer y={5}>
			<TextInput bind:value={newPassword} placeholder="Leave empty if no password">Lobby password</TextInput>
		</Spacer>
		<Button>Create</Button>
	</form>
</div>
