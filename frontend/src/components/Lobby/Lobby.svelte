<script lang="ts">
	import type {Socket} from 'socket.io-client';
	import {io} from 'socket.io-client';
	import {onMount} from 'svelte';
	import {push} from 'svelte-spa-router';

	export let params: {lobbyId?: string} = {};

	const playerIds: Array<string> = [];
	const socket: Socket = io('', {path: '/api/ws/', query: {lobbyId: params.lobbyId ?? ''}, autoConnect: false});
	const rtcConfig = {
		iceServers: [
			{urls: ['stun:eu-turn3.xirsys.com']},
			{
				username: 'zEGCKtXaeO6spb_6Pm4WyDViny8CXxvMvdOlOWKBsg4wDxkh2hEqqWwIikgC58j5AAAAAGBXZ2NldXBocmFub3I=',
				credential: 'd897c926-8a5a-11eb-b854-0242ac140004',
				urls: [
					'turn:eu-turn3.xirsys.com:80?transport=udp',
					'turn:eu-turn3.xirsys.com:3478?transport=udp',
					'turn:eu-turn3.xirsys.com:80?transport=tcp',
					'turn:eu-turn3.xirsys.com:3478?transport=tcp',
					'turns:eu-turn3.xirsys.com:443?transport=tcp',
					'turns:eu-turn3.xirsys.com:5349?transport=tcp',
				],
			},
		],
	};
	const peers: Record<string, RTCPeerConnection> = {};
	const remoteStream: MediaStream = new MediaStream();

	let localStream: MediaStream;
	let audioElement: HTMLMediaElement;

	const initializeSockets = () => {
		socket.connect();
		audioElement.srcObject = remoteStream;

		socket.on('playerJoined', async (joinedPlayerId: string) => {
			const peerConnection = new RTCPeerConnection(rtcConfig);
			playerIds.push(joinedPlayerId);
			addLocalStream(peerConnection);
			peerConnection.addEventListener('track', (event) => {
				remoteStream.addTrack(event.track);
			});
			peerConnection.addEventListener('icecandidate', (event) => {
				if (event.candidate) {
					socket.emit('rtcCandidate', {id: joinedPlayerId, candidate: event.candidate});
				}
			});
			peers[joinedPlayerId] = peerConnection;
			const offer = await peerConnection.createOffer();
			await peerConnection.setLocalDescription(offer);
			socket.emit('rtcOffer', {id: joinedPlayerId, offer});
		});

		socket.on('successfullyJoinedLobby', (allPlayerIds: Array<string>) => {
			playerIds.push(...allPlayerIds.filter((id) => id != socket.id));
		});

		socket.on('playerLeft', (leftPlayerId: string) => {
			playerIds.splice(playerIds.indexOf(leftPlayerId), 1);
			const peerConnection = peers[leftPlayerId];
			peerConnection.close();
			delete peers[leftPlayerId];
		});

		socket.on('rtcAnswer', async ({id, answer}: {id: string; answer: any}) => {
			const peerConnection = peers[id];
			const desc = new RTCSessionDescription(answer);
			await peerConnection.setRemoteDescription(desc);
		});

		socket.on('rtcOffer', async ({id, offer}: {id: string; offer: any}) => {
			const peerConnection = new RTCPeerConnection(rtcConfig);
			addLocalStream(peerConnection);
			peerConnection.addEventListener('track', (event) => {
				remoteStream.addTrack(event.track);
			});
			peerConnection.addEventListener('icecandidate', (event) => {
				if (event.candidate) {
					socket.emit('rtcCandidate', {id, candidate: event.candidate});
				}
			});
			peers[id] = peerConnection;
			const desc = new RTCSessionDescription(offer);
			peerConnection.setRemoteDescription(desc);
			const answer = await peerConnection.createAnswer();
			await peerConnection.setLocalDescription(answer);
			socket.emit('rtcAnswer', {id, answer});
		});

		socket.on('rtcCandidate', async ({id, candidate}: {id: string; candidate: any}) => {
			const peerConnection = peers[id];
			await peerConnection.addIceCandidate(candidate);
		});
	};

	const addLocalStream = (pc: RTCPeerConnection) => {
		localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
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
<audio bind:this={audioElement} autoplay />

<style>
</style>
