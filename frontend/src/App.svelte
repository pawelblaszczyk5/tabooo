<script lang="ts">
	import Router from 'svelte-spa-router';
	import Modal from './components/commons/Modal.svelte';
	import Settings from './components/Settings.svelte';
	import Theme from './components/Theme.svelte';
	import {routes} from './routes';
	import FaCog from 'svelte-icons/fa/FaCog.svelte';
	import {settingsStore} from './stores/settings';

	let showSettingsModal = false;

	const toggleModalState = () => {
		showSettingsModal = !showSettingsModal;
	};

	$: document.body.dataset.tabooTheme = $settingsStore.theme;
</script>

<main class="flex p-6 flex-col w-screen h-screen items-center bg-primary transition-colors ease-linear duration-300">
	<Router {routes} />
	<Theme />
	<div class="absolute top-4 right-4">
		<div on:click={toggleModalState} class="w-8 h-8 cursor-pointer transform hover:rotate-90 transition-transform duration-500">
			<FaCog />
		</div>
	</div>
	{#if showSettingsModal}
		<Modal on:closeModal={toggleModalState}><Settings /></Modal>
	{/if}
</main>
