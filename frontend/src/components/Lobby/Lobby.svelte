<script lang="ts">
	import type {Socket} from 'socket.io-client';
	import {io} from 'socket.io-client';
	import {onMount} from 'svelte';

	let socket: Socket;

	onMount(() => {
		socket = io('', {path: '/api/ws/'});

		socket.on('connect', () => {
			console.log(socket.id);
		});
	});
</script>

<p>Lobby works!</p>

<style>
</style>
