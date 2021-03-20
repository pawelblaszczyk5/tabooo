<script lang="ts">
	import type {Socket} from 'socket.io-client';
	import {io} from 'socket.io-client';
	import {onMount} from 'svelte';
	import {push} from 'svelte-spa-router';

	let socket: Socket;

	const initializeSockets = () => {
		socket = io('', {path: '/api/ws/'});

		socket.on('connect', () => {
			console.log(socket.id);
		});
	};

	const handleError = () => {
		window.alert('You need to enable microphone access to play this game');
		push('/');
	};

	onMount(() => {
		navigator.getUserMedia({audio: true}, initializeSockets, handleError);
	});
</script>

<p>Lobby works!</p>

<style>
</style>
