<script context="module" lang="ts">
	export enum ButtonType {
		PRIMARY,
		SECONDARY,
	}
</script>

<script lang="ts">
	import {ripple} from '../../actions/ripple';

	export let classes = '';
	export let type: ButtonType = ButtonType.PRIMARY;
</script>

<div class="relative overflow-hidden rounded {classes}">
	<button
		type="button"
		use:ripple={5000}
		class="px-5 py-2 select-none rounded text-xl shadow-2xl focus:outline-none
	{type === ButtonType.PRIMARY
			? 'bg-primaryAccent hover:bg-primaryAccentHover focus:bg-primaryAccentFocus text-primaryFontColor'
			: 'bg-secondaryAccent hover:bg-secondaryAccentHover focus:bg-secondaryAccentFocus text-secondaryFontColor'}"
		on:click>
		<slot />
	</button>
</div>
