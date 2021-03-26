<script lang="ts">
	import {onMount} from 'svelte';

	export let mediaStream: MediaStream;
	export let volume: number;

	let audioElement: HTMLMediaElement;

	onMount(() => {
		audioElement.srcObject = mediaStream;
	});

	$: {
		if (audioElement) {
			audioElement.volume = volume / 100;
		}
	}
</script>

<audio bind:this={audioElement} autoplay />
