<script lang="ts">
	import {Language} from '../../model/language';
	import type {LobbyData} from '../../model/lobbyData';
	import axios from 'axios';
	import {push} from 'svelte-spa-router';
	import TextInput from '../commons/TextInput.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import Button from '../commons/Button.svelte';
	import {password} from '../../stores/password';
	import TransitionedRoute from '../commons/TransitionedRoute.svelte';
	import {settings} from '../../stores/settings';
	import NicknameModal from '../commons/NicknameModal.svelte';

	let newPassword: string;
	let newLobbyName: string;
	let showMissingNicknameModal = false;

	if ($settings.nickname.trim() === '') {
		showMissingNicknameModal = true;
	} else {
		newLobbyName = $settings.nickname + "'s lobby";
	}

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

	const nicknameSet = (event: CustomEvent<string>) => {
		settings.setNickname(event.detail);
		showMissingNicknameModal = false;
		newLobbyName = $settings.nickname + "'s lobby";
	};
</script>

<TransitionedRoute>
	<div class="flex flex-col items-center relative">
		<form class="flex flex-col items-center" on:submit|preventDefault={createLobby}>
			<Spacer y={5}>
				<TextInput bind:value={newLobbyName} placeholder="Enter name">Lobby name</TextInput>
			</Spacer>
			<Spacer y={5}>
				<TextInput bind:value={newPassword} placeholder="Leave empty if no password">Lobby password</TextInput>
			</Spacer>
			<Button>Create</Button>
		</form>
		{#if showMissingNicknameModal}
			<NicknameModal on:nicknameSet={nicknameSet} />
		{/if}
	</div>
</TransitionedRoute>
