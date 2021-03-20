<script lang="ts">
	import {io} from 'socket.io-client';

	const socket = io({path: '/api/ws'});

	socket.on('connect', () => {
		console.log(socket.id);
	});
</script>

<p>Lobby works!</p>

<style>
</style>
