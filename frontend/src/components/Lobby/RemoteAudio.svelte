<script lang="ts">
	export let mediaStream: MediaStream;
	export let volume: number;

	let audioElement: HTMLMediaElement;

	$: {
		if (audioElement) {
			audioElement.srcObject = mediaStream;
			audioElement.volume = volume;
		}
	}
</script>

<audio bind:this={audioElement} autoplay />
