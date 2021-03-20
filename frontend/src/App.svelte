<script lang="ts">
	import Router from 'svelte-spa-router';
	import Modal from './components/commons/Modal.svelte';
	import Settings from './components/App/Settings.svelte';
	import Theme from './components/App/Theme.svelte';
	import {routes} from './routes';
	import FaCog from 'svelte-icons/fa/FaCog.svelte';

	let showSettingsModal = false;

	const toggleModalState = (state: boolean) => {
		showSettingsModal = state;
	};
</script>

<main class="flex p-6 flex-col w-full items-center bg-primary transition-colors duration-300">
	<Router {routes} />
	<Theme />
	<div class="absolute top-4 right-4">
		<div
			on:click={() => toggleModalState(!showSettingsModal)}
			class="w-8 h-8 cursor-pointer transform hover:rotate-90 transition-transform duration-500">
			<FaCog />
		</div>
	</div>
	{#if showSettingsModal}
		<Modal on:closeModal={() => toggleModalState(false)}><Settings /></Modal>
	{/if}
</main>
