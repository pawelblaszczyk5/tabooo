<script lang="ts">
	import {fly} from 'svelte/transition';

	let transitionInProgress = true;

	const changeTransitionState = () => {
		transitionInProgress = !transitionInProgress;
	};
</script>

<div
	in:fly={{duration: 1000, x: -500}}
	out:fly={{duration: 1000, x: 500}}
	on:introend={changeTransitionState}
	on:outrostart={changeTransitionState}
	class="w-full left-0 top-0 p-6 mt-8 sm:mt-2"
	style="position: {transitionInProgress ? 'absolute' : 'static'}">
	<slot />
</div>
