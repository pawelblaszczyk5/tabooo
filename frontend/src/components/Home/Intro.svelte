<script lang="ts">
	import {fade, draw, fly} from 'svelte/transition';
</script>

<svg
	in:fade={{duration: 500}}
	style="fill: #fff;"
	class="w-52 h-52"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 512 512">
	<path
		d="M427.888,138.647C381.67,90.118,304.993,87.861,256,133.587c-48.993-45.726-125.67-43.469-171.888,5.06L6.408,220.237
			h111.151c31.278,0,45.882-5.842,62.793-12.606c17.673-7.069,37.704-15.082,75.648-15.082s57.975,8.013,75.648,15.082
			c16.912,6.764,31.516,12.606,62.793,12.606h111.151L427.888,138.647z" />
	<path
		d="M318.796,239.765c-16.914-6.764-31.518-12.606-62.796-12.606s-45.882,5.842-62.793,12.606
			c-6.023,2.409-12.32,4.927-19.506,7.2c18.542,14.009,42.354,28.648,82.301,28.648c39.947,0,63.757-14.639,82.301-28.648
			C331.116,244.691,324.817,242.174,318.796,239.765z" />
	<path
		d="M388.673,254.847v0.001c-4.21,0-12.821,6.746-21.15,13.27c-21.405,16.767-53.755,42.106-111.522,42.106
			s-90.118-25.34-111.524-42.108c-8.329-6.523-16.94-13.27-21.15-13.27H0l0.478,0.923c107.251,207.351,403.795,207.351,511.046,0
			l0.477-0.923H388.673z" />
	<path in:draw={{duration: 1000, delay: 500}} style="stroke: var(--darkAccentColor); stroke-width: 2rem;" d="M 64,64 L 448,448" />
	<path in:draw={{duration: 1000, delay: 1500}} style="stroke: var(--darkAccentColor); stroke-width: 2rem;" d="M 448,64 L 64,448" />
</svg>
<p class="font-main text-primaryFontColor text-6xl font-light">
	{#each 'TABOOO' as char, i}
		<span in:fade={{delay: 2500 + i * 150, duration: 900}}>{char}</span>
	{/each}
</p>
<p in:fly={{y: -200, delay: 3400, duration: 1200}} class="font-main font-light text-primaryFontColor text-2xl text-center">
	The game, where some words are <span class="text-primaryFirstTeam font-normal">forbidden.</span>
</p>
