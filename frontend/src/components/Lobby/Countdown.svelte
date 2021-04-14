<script lang="ts">
	import {onMount} from 'svelte';

	export let time: number;

	const formatter = new Intl.DateTimeFormat('en', {
		hour12: false,
		minute: '2-digit',
		second: '2-digit',
	});

	let formattedTime = formatter.format(time - Date.now());
	let interval: number;

	onMount(() => {
		interval = setInterval(() => {
			const remainingTime = time - Date.now();
			formattedTime = remainingTime > 0 ? formatter.format(remainingTime) : formatter.format(0);
			if (remainingTime <= 0) {
				clearInterval(interval);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<p class="text-5xl font-semibold">
	{formattedTime}
</p>
