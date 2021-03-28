<script context="module" lang="ts">
	export enum ButtonType {
		PRIMARY,
		SECONDARY,
	}
</script>

<script lang="ts">
	import {ripple} from '../../actions/ripple';

	export let type: ButtonType = ButtonType.PRIMARY;
</script>

<div class="shadow-2xl">
	<div class="overflow-hidden relative rounded">
		<button
			use:ripple
			class="px-5 py-2 select-none rounded text-xl focus:outline-none transition-colors duration-300
				{type === ButtonType.PRIMARY
				? 'bg-primaryAccent hover:bg-primaryAccentHover focus:bg-primaryAccentFocus text-primaryFontColor'
				: 'bg-secondaryAccent hover:bg-secondaryAccentHover focus:bg-secondaryAccentFocus text-secondaryFontColor'}"
			on:click>
			<slot>Click me</slot>
		</button>
	</div>
</div>
