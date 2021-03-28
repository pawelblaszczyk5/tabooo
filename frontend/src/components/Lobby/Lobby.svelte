<script lang="ts">
	import type {Socket} from 'socket.io-client';
	import type {Player} from '../../model/player';
	import type {PlayerData} from '../../model/playerData';

	import {io} from 'socket.io-client';
	import {onMount} from 'svelte';
	import {push} from 'svelte-spa-router';
	import RemoteAudio from './RemoteAudio.svelte';
	import axios from 'axios';
	import {getRtcConfig} from '../helpers/rtcConfig';

	export let params: {lobbyId?: string};

	const socket: Socket = io('', {path: '/api/ws/', query: {lobbyId: params.lobbyId ?? '', nickname: 'test'}, autoConnect: false});
	const rtcConfig = getRtcConfig();

	let localStream: MediaStream;
	let players: Array<Player> = [];

	const joinToLobby = () => {
		socket.connect();

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
			players.filter((player) => player.id !== playerId);
			players = players;
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

	const getPermissions = (): void => {
		navigator.mediaDevices
			.getUserMedia({audio: true})
			.then((stream) => {
				localStream = stream;
				joinToLobby();
			})
			.catch(() => {
				redirectToHome('No permissions');
			});
	};

	const redirectToHome = (error: string) => {
		window.alert(error);
		push('/');
	};

	onMount(() => {
		if (params.lobbyId) {
			axios
				.get<boolean>(`/api/isLobby?lobbyId=${params.lobbyId}`)
				.then(({data}) => {
					if (data) {
						getPermissions();
					} else {
						redirectToHome('Lobby does not exist');
					}
				})
				.catch((err) => console.log(err));
		}
	});
</script>

<p>Lobby works!</p>

{#each players as player (player.id)}
	<p>Player: {player.nickname}</p>
	<input type="range" bind:value={player.volume} min="0" max="100" step="1" />
	<RemoteAudio mediaStream={player.mediaStream} volume={player.volume} />
{/each}
