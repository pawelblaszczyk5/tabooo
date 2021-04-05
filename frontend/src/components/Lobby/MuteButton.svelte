<script lang="ts">
	import FaMicrophone from 'svelte-icons/fa/FaMicrophone.svelte';
	import {draw} from 'svelte/transition';

	export let muted: boolean;
</script>

<div on:click class="fixed top-4 right-24 w-6 h-6 md:w-8 md:h-8 cursor-pointer transform hover:scale-125 transition-transform duration-500">
	<svg class="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
		{#if muted}
			<path transition:draw={{duration: 500}} style="stroke: var(--primaryFontColor); stroke-width: 4rem;" d="M 64,64 L 448,448" />
		{/if}
	</svg>
	<FaMicrophone />
</div>
