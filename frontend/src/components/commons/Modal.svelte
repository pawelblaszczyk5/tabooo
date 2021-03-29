<script lang="ts">
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
	import {createEventDispatcher} from 'svelte';
	import {fly} from 'svelte/transition';
	import Portal from 'svelte-portal/src/Portal.svelte';

	export let preventExit = false;

	const dispatch = createEventDispatcher();

	const closeModal = () => {
		dispatch('closeModal');
	};
</script>

<Portal target={document.body}>
	<div class="absolute w-screen h-screen z-10 top-0 left-0 right-0 bottom-0" on:click={closeModal} />
	<div
		transition:fly={{duration: 500, y: -200}}
		class="z-20 glass-sm transition-colors duration-300 border border-gray-200 border-opacity-40 absolute top-48 left-1/2 transform -translate-x-1/2 p-5 sm:p-10 bg-primary rounded-2xl">
		{#if !preventExit}
			<div on:click={closeModal} class="absolute top-3 right-3 w-6 h-6 cursor-pointer"><FaTimes /></div>
		{/if}
		<slot />
	</div>
</Portal>
