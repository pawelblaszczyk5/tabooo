<script lang="ts">
	import type {Socket} from 'socket.io-client';
	import type {Player} from '../../utils/player';
	import {io} from 'socket.io-client';
	import {onMount, tick} from 'svelte';
	import {push} from 'svelte-spa-router';
	import {getRtcConfig} from '../../utils/rtcConfig';

	export let params: {lobbyId?: string} = {};

	const players: Record<string, Player> = {};
	const audioElements: Record<string, HTMLMediaElement> = {};
	const socket: Socket = io('', {path: '/api/ws/', query: {lobbyId: params.lobbyId ?? ''}, autoConnect: false});
	const rtcConfig = getRtcConfig();

	let localStream: MediaStream;
	const initializeSockets = () => {
		socket.connect();

		socket.on('playerJoined', async (playerId: string) => {
			const rtcPeerConnection = new RTCPeerConnection(rtcConfig);
			players[playerId] = {
				nickname: playerId,
				rtcPeerConnection: rtcPeerConnection,
				mediaStream: new MediaStream(),
			};
			tick().then(() => {
				addRemoteStreamAsSrcForAudio(playerId);
			});
			addLocalStream(rtcPeerConnection);
			rtcPeerConnection.addEventListener('track', (event) => {
				players[playerId].mediaStream.addTrack(event.track);
			});
			rtcPeerConnection.addEventListener('icecandidate', (event) => {
				if (event.candidate) {
					socket.emit('rtcCandidate', {playerId, rtcIceCandidate: event.candidate});
				}
			});
			const rtcOffer = await rtcPeerConnection.createOffer();
			await rtcPeerConnection.setLocalDescription(rtcOffer);
			socket.emit('rtcOffer', {playerId, rtcOffer});
		});

		socket.on('successfullyJoinedLobby', (allPlayerIds: Array<string>) => {
			allPlayerIds
				.filter((playerId) => playerId !== socket.id)
				.forEach((playerId) => {
					players[playerId] = {
						nickname: playerId,
						mediaStream: new MediaStream(),
					};
				});
			tick().then(() => {
				Object.keys(players).forEach((playerId) => {
					addRemoteStreamAsSrcForAudio(playerId);
				});
			});
		});

		socket.on('playerLeft', (playerId: string) => {
			const rtcPeerConnection = players[playerId].rtcPeerConnection;
			rtcPeerConnection?.close();
			delete players[playerId];
		});

		socket.on('rtcAnswer', async ({playerId, rtcAnswer}: {playerId: string; rtcAnswer: RTCSessionDescriptionInit}) => {
			const rtcPeerConnection = players[playerId].rtcPeerConnection;
			const rtcDescription = new RTCSessionDescription(rtcAnswer);
			await rtcPeerConnection?.setRemoteDescription(rtcDescription);
		});

		socket.on('rtcOffer', async ({playerId, rtcOffer}: {playerId: string; rtcOffer: RTCSessionDescriptionInit}) => {
			const rtcPeerConnection = new RTCPeerConnection(rtcConfig);
			addLocalStream(rtcPeerConnection);
			rtcPeerConnection.addEventListener('track', (event) => {
				players[playerId].mediaStream.addTrack(event.track);
			});
			rtcPeerConnection.addEventListener('icecandidate', (event) => {
				if (event.candidate) {
					socket.emit('rtcCandidate', {playerId, rtcIceCandidate: event.candidate});
				}
			});
			players[playerId].rtcPeerConnection = rtcPeerConnection;
			const rtcDescription = new RTCSessionDescription(rtcOffer);
			rtcPeerConnection.setRemoteDescription(rtcDescription);
			const rtcAnswer = await rtcPeerConnection.createAnswer();
			await rtcPeerConnection.setLocalDescription(rtcAnswer);
			socket.emit('rtcAnswer', {playerId, rtcAnswer});
		});

		socket.on('rtcCandidate', async ({playerId, rtcIceCandidate}: {playerId: string; rtcIceCandidate: RTCIceCandidate}) => {
			const rtcPeerConnection = players[playerId].rtcPeerConnection;
			await rtcPeerConnection?.addIceCandidate(rtcIceCandidate);
		});
	};

	const addLocalStream = (pc: RTCPeerConnection) => {
		localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
	};

	const addRemoteStreamAsSrcForAudio = (playerId: string) => {
		audioElements[playerId].srcObject = players[playerId].mediaStream;
	};

	onMount(() => {
		navigator.mediaDevices
			.getUserMedia({audio: true})
			.then((stream) => {
				localStream = stream;
				initializeSockets();
			})
			.catch(() => {
				window.alert('You need to enable microphone access to play this game');
				push('/');
			});
	});
</script>

<p>Lobby works!</p>
{#each Object.values(players) as player}
	<p>Player: {player.nickname}</p>
	<audio bind:this={audioElements[player.nickname]} autoplay />
{/each}
