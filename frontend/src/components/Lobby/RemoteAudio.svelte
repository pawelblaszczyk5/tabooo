<script lang="ts">
	export let mediaStream: MediaStream;
	export let volume: number;

	let audioElement: HTMLMediaElement;

	$: localVolume = volume / 100;
	$: {
		if (audioElement) {
			audioElement.srcObject = mediaStream;
		}
	}
</script>

<audio bind:this={audioElement} autoplay bind:volume={localVolume} />
