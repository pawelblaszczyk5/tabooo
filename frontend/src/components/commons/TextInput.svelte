<script lang="ts">
	export let value: string;
	export let placeholder = '';
</script>

<label class="w-56 block">
	<p><slot /></p>
	<input
		{placeholder}
		class="px-2 py-1 bg-transparent border-b-2 border-primaryAccent text-primaryFontColor font-semibold outline-none placeholder-opacity-0 placeholder-primaryFontColor w-full 
    focus:border-primaryAccentFocus"
		bind:value
		type="text" />
</label>
