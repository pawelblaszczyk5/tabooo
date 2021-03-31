<script lang="ts">
	import type {LobbyInfo} from '../../model/lobbyInfo';

	import {onMount} from 'svelte';
	import {push} from 'svelte-spa-router';
	import RemoteAudio from './RemoteAudio.svelte';
	import axios from 'axios';
	import {settings} from '../../stores/settings';
	import NicknameModal from '../commons/NicknameModal.svelte';
	import AskForPasswordModal from './AskForPasswordModal.svelte';
	import {password} from '../../stores/password';
	import TransitionedRoute from '../commons/TransitionedRoute.svelte';
	import {mediaStream} from '../../stores/mediaStream';
	import {get} from 'svelte/store';
	import {joinToLobby} from './lobby';
	import {players} from '../../stores/players';
	import {socket} from '../../stores/socket';

	export let params: {lobbyId?: string};

	let showMissingNicknameModal = false;
	let showAskForPasswordModal = false;

	const getPermissions = (): void => {
		navigator.mediaDevices
			.getUserMedia({audio: true})
			.then((stream) => {
				mediaStream.saveStream(stream);
				const localPassword = get(password);
				password.clearPassword();
				joinToLobby(params.lobbyId, localPassword);
			})
			.catch(() => {
				redirectToHome('No permissions');
			});
	};

	const redirectToHome = (error: string) => {
		window.alert(error);
		push('/');
	};

	const nicknameSet = (event: CustomEvent<string>) => {
		settings.setNickname(event.detail);
		showMissingNicknameModal = false;
		checkLobby();
	};

	const tryToJoinPasswordProtectedLobby = (event: CustomEvent<string>) => {
		showAskForPasswordModal = false;
		password.setPassword(event.detail);
		getPermissions();
	};

	const checkLobby = () => {
		if (params.lobbyId) {
			axios
				.get<LobbyInfo>(`/api/isLobby?lobbyId=${params.lobbyId}`)
				.then(({data}) => {
					const passwordFromStore = get(password);
					if (data.isExisting && (!data.secured || passwordFromStore)) {
						getPermissions();
					} else if (data.isExisting && data.secured) {
						showAskForPasswordModal = true;
					} else {
						redirectToHome('Lobby does not exist');
					}
				})
				.catch((err) => console.log(err));
		}
	};

	onMount(() => {
		if (get(settings).nickname.trim() === '') {
			showMissingNicknameModal = true;
		} else {
			checkLobby();
		}
		return () => {
			get(socket)?.disconnect();
		};
	});
</script>

<TransitionedRoute>
	<p>Lobby works!</p>

	{#each $players as player (player.id)}
		<p>Player: {player.nickname}</p>
		<input type="range" bind:value={player.volume} min="0" max="100" step="1" />
		<RemoteAudio mediaStream={player.mediaStream} volume={player.volume} />
	{/each}

	{#if showMissingNicknameModal}
		<NicknameModal on:nicknameSet={nicknameSet} />
	{/if}

	{#if showAskForPasswordModal}
		<AskForPasswordModal on:password={tryToJoinPasswordProtectedLobby} />
	{/if}
</TransitionedRoute>
