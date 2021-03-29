<script lang="ts">
	import type {Socket} from 'socket.io-client';
	import type {Player} from '../../model/player';
	import type {PlayerData} from '../../model/playerData';
	import type {LobbyInfo} from '../../model/lobbyInfo';

	import {io} from 'socket.io-client';
	import {onMount} from 'svelte';
	import {push} from 'svelte-spa-router';
	import RemoteAudio from './RemoteAudio.svelte';
	import axios from 'axios';
	import {getRtcConfig} from '../../helpers/rtcConfig';
	import {settings} from '../../stores/settings';
	import NicknameModal from '../commons/NicknameModal.svelte';
	import AskForPasswordModal from './AskForPasswordModal.svelte';
	import {password} from '../../stores/password';
	import TransitionedRoute from '../commons/TransitionedRoute.svelte';

	export let params: {lobbyId?: string};

	let socket: Socket;
	const rtcConfig = getRtcConfig();

	let localStream: MediaStream;
	let players: Array<Player> = [];
	let showMissingNicknameModal = false;
	let showAskForPasswordModal = false;

	const joinToLobby = (password?: string) => {
		socket = io('', {
			path: '/api/ws/',
			query: {lobbyId: params.lobbyId ?? '', nickname: $settings.nickname, password: password ?? ''},
		});

		socket.on('wrongPassword', () => {
			redirectToHome('Wrong password');
		});

		socket.on('playerJoined', async (playerData: PlayerData) => {
			const rtcPeerConnection = new RTCPeerConnection(rtcConfig);

			rtcPeerConnection.addEventListener('track', (event) => {
				addTrackToStreamByPlayerId(event, playerData.id);
			});
			rtcPeerConnection.addEventListener('icecandidate', (event) => {
				sendIceCandidate(event, playerData.id);
			});

			addNewPlayer(playerData.id, playerData.nickname, rtcPeerConnection);
			addStreamToRtcPeerConnection(rtcPeerConnection);
			const rtcOffer = await rtcPeerConnection.createOffer();
			await rtcPeerConnection.setLocalDescription(rtcOffer);
			socket.emit('rtcOffer', {playerId: playerData.id, rtcOffer});
		});

		socket.on('successfullyJoinedLobby', (allPlayersData: Array<PlayerData>) => {
			allPlayersData.forEach((player) => {
				addNewPlayer(player.id, player.nickname);
			});
		});

		socket.on('playerLeft', (playerId: string) => {
			players.find((player) => player.id === playerId)?.rtcPeerConnection?.close();
			players = players.filter((player) => player.id !== playerId);
		});

		socket.on('rtcAnswer', async ({playerId, rtcAnswer}: {playerId: string; rtcAnswer: RTCSessionDescriptionInit}) => {
			const rtcDescription = new RTCSessionDescription(rtcAnswer);
			await players.find((player) => player.id === playerId)?.rtcPeerConnection?.setRemoteDescription(rtcDescription);
		});

		socket.on('rtcOffer', async ({playerId, rtcOffer}: {playerId: string; rtcOffer: RTCSessionDescriptionInit}) => {
			const rtcPeerConnection = new RTCPeerConnection(rtcConfig);

			rtcPeerConnection.addEventListener('track', (event) => {
				addTrackToStreamByPlayerId(event, playerId);
			});
			rtcPeerConnection.addEventListener('icecandidate', (event) => {
				sendIceCandidate(event, playerId);
			});

			const player = players.find((player) => player.id === playerId);
			if (player) {
				player.rtcPeerConnection = rtcPeerConnection;
			}

			addStreamToRtcPeerConnection(rtcPeerConnection);
			const rtcDescription = new RTCSessionDescription(rtcOffer);
			rtcPeerConnection.setRemoteDescription(rtcDescription);
			const rtcAnswer = await rtcPeerConnection.createAnswer();
			await rtcPeerConnection.setLocalDescription(rtcAnswer);

			socket.emit('rtcAnswer', {playerId, rtcAnswer});
		});

		socket.on('rtcCandidate', async ({playerId, rtcIceCandidate}: {playerId: string; rtcIceCandidate: RTCIceCandidate}) => {
			await players.find((player) => player.id === playerId)?.rtcPeerConnection?.addIceCandidate(rtcIceCandidate);
		});
	};

	const addStreamToRtcPeerConnection = (rtcPeerConnection: RTCPeerConnection): void => {
		localStream.getTracks().forEach((track) => rtcPeerConnection.addTrack(track, localStream));
	};

	const addTrackToStreamByPlayerId = (event: RTCTrackEvent, playerId: string): void => {
		players.find((player) => player.id === playerId)?.mediaStream.addTrack(event.track);
	};

	const sendIceCandidate = (event: RTCPeerConnectionIceEvent, playerId: string): void => {
		if (event.candidate) {
			socket.emit('rtcCandidate', {playerId, rtcIceCandidate: event.candidate});
		}
	};

	const addNewPlayer = (playerId: string, nickname: string, rtcPeerConnection?: RTCPeerConnection): void => {
		players.push({
			id: playerId,
			nickname: nickname,
			rtcPeerConnection: rtcPeerConnection,
			mediaStream: new MediaStream(),
			volume: 100,
		});
		players = players;
	};

	const getPermissions = (password?: string): void => {
		navigator.mediaDevices
			.getUserMedia({audio: true})
			.then((stream) => {
				localStream = stream;
				joinToLobby(password);
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
		getPermissions(event.detail);
	};

	const checkLobby = () => {
		if (params.lobbyId) {
			axios
				.get<LobbyInfo>(`/api/isLobby?lobbyId=${params.lobbyId}`)
				.then(({data}) => {
					if (data.isExisting && (!data.secured || $password)) {
						getPermissions($password);
						password.clearPassword();
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
		if ($settings.nickname.trim() === '') {
			showMissingNicknameModal = true;
		} else {
			checkLobby();
		}
	});
</script>

<TransitionedRoute>
	<p>Lobby works!</p>

	{#each players as player (player.id)}
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
