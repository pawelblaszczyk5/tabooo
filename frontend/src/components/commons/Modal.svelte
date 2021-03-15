<script lang="ts">
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
	import {createEventDispatcher} from 'svelte';
	import {fly} from 'svelte/transition';

	const dispatch = createEventDispatcher();

	const closeModal = () => {
		dispatch('closeModal');
	};
</script>

<div class="absolute w-screen h-screen z-10 top-0 left-0 right-0 bottom-0" on:click={closeModal} />
<div
	transition:fly={{duration: 500, y: -200}}
	class="z-20 glass-sm transition-colors ease-linear duration-300 border border-gray-200 border-opacity-20 absolute top-48 left-1/2 transform -translate-x-1/2 p-10 bg-primary rounded-2xl">
	<div on:click={closeModal} class="absolute top-2 right-2 w-5 h-5 cursor-pointer"><FaTimes /></div>
	<slot />
</div>
