<script lang="ts">
	import TailwindCss from './TailwindCss.svelte';

	export let name: string;
</script>

<main class="flex w-screen h-screen p-10 items-center flex-col">
	<h1 class="text-3xl color text-green-700">{name}!</h1>
	<p>Cybernetically improved taboo game</p>
</main>

<TailwindCss />
