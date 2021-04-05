<script lang="ts">
	import type {LobbyInfo} from '../../model/lobbyInfo';

	import {onDestroy} from 'svelte';
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
	import {toastr} from '../../stores/toastr';
	import {admin} from '../../stores/admin';
	import Button from '../commons/Button.svelte';
	import RangeInput from '../commons/RangeInput.svelte';

	export let params: {lobbyId?: string};

	let showMissingNicknameModal = false;
	let showAskForPasswordModal = false;
	let muted = false;

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
				redirectToHome('Access to microphone is required');
			});
	};

	const redirectToHome = (error: string) => {
		toastr.addToastr(error);
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

	const initLobby = (key?: string) => {
		admin.set(false);
		get(socket)?.disconnect();
		players.resetStore();
		if (get(settings).nickname.trim() === '') {
			showMissingNicknameModal = true;
		} else {
			checkLobby();
		}
	};

	const changeMuteStatus = () => {
		muted = !muted;
		const localMediaStream = get(mediaStream);
		localMediaStream?.getTracks().forEach((track) => {
			track.enabled = !muted;
		});
	};

	onDestroy(() => {
		get(socket)?.disconnect();
	});

	$: initLobby(params.lobbyId);
</script>

<TransitionedRoute>
	<p>Lobby works!</p>
	{#if $admin}
		<p>You are an admin of this lobby</p>
	{/if}
	{#each $players as player (player.id)}
		<p>Player: {player.nickname}</p>
		<RangeInput bind:value={player.volume} />
		<RemoteAudio mediaStream={player.mediaStream} volume={player.volume} />
	{/each}

	{#if showMissingNicknameModal}
		<NicknameModal on:nicknameSet={nicknameSet} />
	{/if}

	{#if showAskForPasswordModal}
		<AskForPasswordModal on:password={tryToJoinPasswordProtectedLobby} />
	{/if}

	<Button on:click={changeMuteStatus}>{muted ? 'Unmute' : 'Mute'} yourself</Button>
</TransitionedRoute>
