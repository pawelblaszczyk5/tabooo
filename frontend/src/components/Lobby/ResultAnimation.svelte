<script lang="ts">
	import {onMount} from 'svelte';
	export let result: 'WIN' | 'LOSE';

	const characters = result === 'WIN' ? ['🥳', '🎉', '✨'] : ['😥', '👎', '💀'];
	let emojis = new Array(50)
		.fill('')
		.map((_, i) => {
			return {
				character: characters[i % characters.length],
				x: Math.random() * 100,
				y: -5 - Math.random() * 100,
				r: 0.3 + Math.random(),
			};
		})
		.sort((a, b) => a.r - b.r);

	onMount(() => {
		let frame: number;
		const loop = () => {
			frame = requestAnimationFrame(loop);
			emojis = emojis
				.map((emoji) => {
					emoji.y += emoji.r;
					return emoji;
				})
				.filter((emoji) => emoji.y < 105);
		};

		loop();

		return () => cancelAnimationFrame(frame);
	});
</script>

{#if emojis.length}
	<div class="absolute w-screen h-screen top-0 left-0 overflow-hidden">
		{#each emojis as emoji (emoji)}
			<span class="absolute" style="left: {emoji.x}%; top: {emoji.y}%; transform: scale({emoji.r}); font-size: 3vw;"
				>{emoji.character}</span>
		{/each}
	</div>
{/if}
