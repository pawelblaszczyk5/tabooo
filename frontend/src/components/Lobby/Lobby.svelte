<script lang="ts">
	import type {LobbyInfo} from '../../model/lobbyInfo';

	import {onDestroy} from 'svelte';
	import {push} from 'svelte-spa-router';
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
	import MuteButton from './MuteButton.svelte';
	import Game from './Game.svelte';
	import Button from '../commons/Button.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import {Team} from '../../model/team';
	import {game, GameStatus} from '../../stores/game';

	export let params: {lobbyId?: string};

	let showMissingNicknameModal = false;
	let showAskForPasswordModal = false;
	let muted = false;
	let lobbyName = '';

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
					if (!data.isExisting) {
						redirectToHome('Lobby does not exist');
						return;
					}
					if (!data.language || !data.name) {
						redirectToHome('Unexpected error occurred, try again later');
						return;
					}

					lobbyName = data.name;
					game.setLanguage(data.language);

					if (data.status === GameStatus.IN_PROGRESS) {
						redirectToHome('Game already started');
					} else if (!data.secured || passwordFromStore) {
						getPermissions();
					} else {
						showAskForPasswordModal = true;
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

	const startGame = () => {
		const localPlayers = get(players);
		if (localPlayers.filter((player) => player.team === Team.OBSERVER).length) {
			toastr.addToastr('Every player need to join a team');
			return;
		}
		if (
			localPlayers.filter((player) => player.team === Team.FIRST).length < 2 ||
			localPlayers.filter((player) => player.team === Team.SECOND).length < 2
		) {
			toastr.addToastr('Every team need to have at least two players');
			return;
		}
		const localSocket = get(socket);
		localSocket?.emit('gameStart');
		if ($game.result) {
			game.reset();
		}
		game.changeGameStatus(GameStatus.IN_PROGRESS);
	};

	onDestroy(() => {
		get(socket)?.disconnect();
		get(mediaStream)
			?.getTracks()
			.forEach((track) => track.stop());
		mediaStream.removeStream();
	});

	$: initLobby(params.lobbyId);
</script>

<TransitionedRoute>
	<div class="w-full flex flex-col items-center">
		<h1 class="font-semibold text-2xl">{lobbyName}</h1>
		{#if $admin && $game.status !== GameStatus.IN_PROGRESS}
			<Spacer y={2}>
				<Button on:click={startGame}>Start the game</Button>
			</Spacer>
		{/if}
		<Game />
		{#if showMissingNicknameModal}
			<NicknameModal on:nicknameSet={nicknameSet} />
		{/if}
		{#if showAskForPasswordModal}
			<AskForPasswordModal on:password={tryToJoinPasswordProtectedLobby} />
		{/if}
	</div>
</TransitionedRoute>
<MuteButton {muted} on:click={changeMuteStatus} />
