<script lang="ts">
	import {fly} from 'svelte/transition';

	let transitionInProgress = true;
</script>

<div
	in:fly={{duration: 1000, x: -500}}
	out:fly={{duration: 1000, x: 500}}
	on:introend={() => (transitionInProgress = false)}
	on:outrostart={() => (transitionInProgress = true)}
	class="w-full"
	class:px-6={transitionInProgress}
	style="position: {transitionInProgress ? 'absolute' : 'static'}">
	<slot />
</div>
