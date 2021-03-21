<script lang="ts">
	import type {Socket} from 'socket.io-client';
	import {io} from 'socket.io-client';
	import {onMount} from 'svelte';
	import {push} from 'svelte-spa-router';

	export let params: {lobbyId?: string} = {};

	let socket: Socket;

	const initializeSockets = () => {
		socket = io('', {path: '/api/ws/', query: {lobbyId: params.lobbyId ?? ''}});

		socket.on('connect', () => {
			console.log('connected');
		});
	};

	onMount(() => {
		navigator.mediaDevices
			.getUserMedia({audio: true})
			.then((stream) => {
				console.log('We got that');
				initializeSockets();
			})
			.catch(() => {
				window.alert('You need to enable microphone access to play this game');
				push('/');
			});
	});
</script>

<p>Lobby works!</p>

<style>
</style>
