<script lang="ts">
	import {players} from '../../stores/players';
	import Player from './Player.svelte';
	import RemoteAudio from './RemoteAudio.svelte';
</script>

<div>
	{#each $players as player (player.id)}
		<Player {player} />
	{/each}
</div>

<div>
	{#each $players as player (player.id)}
		<RemoteAudio mediaStream={player.mediaStream} volume={player.volume} />
	{/each}
</div>
