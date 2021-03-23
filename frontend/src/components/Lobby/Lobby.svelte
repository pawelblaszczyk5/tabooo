<script lang="ts">
	import type {Socket} from 'socket.io-client';
	import type {Player} from '../../utils/player';
	import {io} from 'socket.io-client';
	import {onMount, tick} from 'svelte';
	import {push} from 'svelte-spa-router';
	import {getRtcConfig} from '../../utils/rtcConfig';

	export let params: {lobbyId?: string};

	const socket: Socket = io('', {path: '/api/ws/', query: {lobbyId: params.lobbyId ?? ''}, autoConnect: false});
	const rtcConfig = getRtcConfig();

	let localStream: MediaStream;
	let players: Array<Player> = [];

	const joinToLobby = () => {
		socket.connect();

		socket.on('playerJoined', async (playerId: string) => {
			const rtcPeerConnection = new RTCPeerConnection(rtcConfig);
			addNewPlayer(playerId, playerId, rtcPeerConnection);
			tick().then(() => {
				addSrcToAudioTagByPlayerId(playerId);
			});
			addStreamToRtcPeerConnection(rtcPeerConnection);
			const rtcOffer = await rtcPeerConnection.createOffer();
			await rtcPeerConnection.setLocalDescription(rtcOffer);

			rtcPeerConnection.addEventListener('track', (event) => {
				addTrackToStreamByPlayerId(event, playerId);
			});
			rtcPeerConnection.addEventListener('icecandidate', (event) => {
				sendIceCandidate(event, playerId);
			});

			socket.emit('rtcOffer', {playerId, rtcOffer});
		});

		socket.on('successfullyJoinedLobby', (allPlayerIds: Array<string>) => {
			allPlayerIds.forEach((playerId) => {
				addNewPlayer(playerId, playerId);
			});

			tick().then(() => {
				players.forEach((player) => {
					addSrcToAudioTagByPlayerId(player.id);
				});
			});
		});

		socket.on('playerLeft', (playerId: string) => {
			players.find((player) => player.id === playerId)?.rtcPeerConnection?.close();
			players.filter((player) => player.id !== playerId);
		});

		socket.on('rtcAnswer', async ({playerId, rtcAnswer}: {playerId: string; rtcAnswer: RTCSessionDescriptionInit}) => {
			const rtcDescription = new RTCSessionDescription(rtcAnswer);
			await players.find((player) => player.id === playerId)?.rtcPeerConnection?.setRemoteDescription(rtcDescription);
		});

		socket.on('rtcOffer', async ({playerId, rtcOffer}: {playerId: string; rtcOffer: RTCSessionDescriptionInit}) => {
			const rtcPeerConnection = new RTCPeerConnection(rtcConfig);
			addStreamToRtcPeerConnection(rtcPeerConnection);
			const rtcDescription = new RTCSessionDescription(rtcOffer);
			rtcPeerConnection.setRemoteDescription(rtcDescription);
			const rtcAnswer = await rtcPeerConnection.createAnswer();
			await rtcPeerConnection.setLocalDescription(rtcAnswer);

			const player = players.find((player) => player.id === playerId);
			if (player) {
				player.rtcPeerConnection = rtcPeerConnection;
			}
			rtcPeerConnection.addEventListener('track', (event) => {
				addTrackToStreamByPlayerId(event, playerId);
			});
			rtcPeerConnection.addEventListener('icecandidate', (event) => {
				sendIceCandidate(event, playerId);
			});

			socket.emit('rtcAnswer', {playerId, rtcAnswer});
		});

		socket.on('rtcCandidate', async ({playerId, rtcIceCandidate}: {playerId: string; rtcIceCandidate: RTCIceCandidate}) => {
			await players.find((player) => player.id === playerId)?.rtcPeerConnection?.addIceCandidate(rtcIceCandidate);
		});
	};

	const addStreamToRtcPeerConnection = (rtcPeerConnection: RTCPeerConnection): void => {
		localStream.getTracks().forEach((track) => rtcPeerConnection.addTrack(track, localStream));
	};

	const addSrcToAudioTagByPlayerId = (playerId: string): void => {
		const audioElement = players.find((player) => player.id === playerId)?.audioElement;
		if (audioElement) {
			audioElement.srcObject = players.find((player) => player.id === playerId)?.mediaStream ?? null;
		}
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
		});
		players = players;
	};

	onMount(() => {
		navigator.mediaDevices
			.getUserMedia({audio: true})
			.then((stream) => {
				localStream = stream;
				joinToLobby();
			})
			.catch(() => {
				window.alert('You need to enable microphone access to play this game');
				push('/');
			});
	});
</script>

<p>Lobby works!</p>

{#each players as player (player.id)}
	<p>Player: {player.nickname}</p>
	<audio bind:this={player.audioElement} autoplay />
{/each}
