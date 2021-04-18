<script lang="ts">
	import type {Card} from '../../helpers/card';
	import {fly} from 'svelte/transition';

	export let card: Card;
</script>

<div
	in:fly={{y: -200, duration: 500}}
	out:fly={{y: 200, duration: 500}}
	class="glass-primary p-4 rounded-lg border border-gray-200 border-opacity-40 w-48">
	<p class="font-semibold text-xl pb-2 mb-2 border-b-2 border-gray-200 border-opacity-20 text-center">{card.word}</p>
	{#each card.forbidden as forbiddenWord}
		<p class="text-center">{forbiddenWord}</p>
	{/each}
</div>
