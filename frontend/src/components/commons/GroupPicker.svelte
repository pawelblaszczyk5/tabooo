<script lang="ts">
	export let values: Array<string | number>;
	export let group: string | number;
</script>

<div class="flex w-full rounded-md overflow-hidden">
	{#each values as value, index (value)}
		<label
			class:bg-primaryAccentFocus={value === group}
			class:border-r={index !== values.length - 1}
			class="w-full bg-primaryAccent h-8 flex items-center justify-center transition-colors duration-500 cursor-pointer border-gray-200 border-opacity-20">
			<input class="hidden" type="radio" {value} bind:group />
			<p class="font-semibold">{value}</p>
		</label>
	{/each}
</div>
