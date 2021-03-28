<script lang="ts">
	import {createEventDispatcher} from 'svelte';
	import {fly} from 'svelte/transition';

	const dispatch = createEventDispatcher();
</script>

<div on:outroend={() => dispatch('outroFinished')} transition:fly={{x: -500, duration: 1000}} class="flex flex-col items-center">
	<p>LobbyList works!</p>
</div>
