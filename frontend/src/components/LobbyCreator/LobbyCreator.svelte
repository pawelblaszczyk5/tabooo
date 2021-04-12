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
	import {get} from 'svelte/store';
	import RadioInput from '../commons/RadioInput.svelte';
	import {defaultGameSettings} from '../../model/gameSettings';
	import GameSettings from './GameSettings.svelte';

	let newPassword = '';
	let newLobbyName = '';
	let newLobbyLanguage: Language = Language.ENGLISH;
	let showMissingNicknameModal = false;
	let gameSettings = {...defaultGameSettings};

	const nickname = get(settings).nickname;
	if (nickname.trim() === '') {
		showMissingNicknameModal = true;
	} else {
		newLobbyName = nickname + "'s lobby";
	}

	const createLobby = () => {
		password.setPassword(newPassword);
		const lobbyData: LobbyData = {
			language: newLobbyLanguage,
			name: newLobbyName,
			password: newPassword,
			gameSettings: gameSettings,
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
		newLobbyName = get(settings).nickname + "'s lobby";
	};
</script>

<TransitionedRoute>
	<div class="flex flex-col items-center relative">
		<form class="flex flex-col items-center" on:submit|preventDefault={createLobby}>
			<Spacer y={3}>
				<TextInput bind:value={newLobbyName} placeholder="Enter name">Lobby name</TextInput>
			</Spacer>
			<Spacer y={3}>
				<TextInput bind:value={newPassword} placeholder="Leave empty if no password">Lobby password</TextInput>
			</Spacer>
			<Spacer y={3}>
				<p>Choose language</p>
				<RadioInput bind:group={newLobbyLanguage} value={Language.ENGLISH}>English</RadioInput>
				<RadioInput bind:group={newLobbyLanguage} value={Language.POLISH}>Polish</RadioInput>
			</Spacer>
			<div class="w-80 max-w-full">
				<GameSettings bind:settings={gameSettings} />
			</div>
			<Spacer y={3}>
				<Button>Create</Button>
			</Spacer>
		</form>
		{#if showMissingNicknameModal}
			<NicknameModal on:nicknameSet={nicknameSet} />
		{/if}
	</div>
</TransitionedRoute>
