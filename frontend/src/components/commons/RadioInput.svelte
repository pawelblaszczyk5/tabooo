<script lang="ts">
	import {scale} from 'svelte/transition';

	export let value: string | number;
	export let group: string | number;
</script>

<label class="w-56 flex relative items-center">
	<input class="hidden w-4 h-4" bind:group {value} type="radio" />
	<span class="w-4 h-4 rounded-full bg-primaryAccent inline-block mr-2" />
	{#if group === value}
		<span
			transition:scale={{duration: 300}}
			class="w-2 h-2 rounded-full bg-secondaryAccent inline-block absolute left-2 top-1/2 transform -translate-y-1/2 -translate-x-1/2" />
	{/if}
	<p><slot /></p>
</label>
