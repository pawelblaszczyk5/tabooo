<script lang="ts">
	export let value: number;
	export let step = 1;
	export let min = 0;
	export let max = 100;
</script>

<div class="w-full relative max-w-xs">
	<input class="opacity-0 w-full h-full z-10 absolute" type="range" bind:value {step} {min} {max} />
	<div class="w-full h-2 rounded-md bg-primaryAccent" />
	<div
		class="w-5 h-5 bg-secondaryAccent rounded-full transform -translate-x-1/2 absolute top-1/2 -translate-y-1/2"
		style="left: {(value / max) * 100}%" />
</div>
