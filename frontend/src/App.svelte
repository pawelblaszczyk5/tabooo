<script lang="ts">
	import Router, {push} from 'svelte-spa-router';
	import FaArrowLeft from 'svelte-icons/fa/FaArrowLeft.svelte';
	import type {RouteLoadedEvent} from 'svelte-spa-router';
	import Modal from './components/commons/Modal.svelte';
	import Settings from './components/App/Settings.svelte';
	import Theme from './components/App/Theme.svelte';
	import {routes} from './routes';
	import FaCog from 'svelte-icons/fa/FaCog.svelte';
	import {mediaStream} from './stores/mediaStream';
	import {get} from 'svelte/store';

	const homeRoutes = ['*', '/'];

	let showSettingsModal = false;
	let showBackHome = false;

	const toggleModalState = (state: boolean) => {
		showSettingsModal = state;
	};

	const routeLoaded = (event: RouteLoadedEvent) => {
		showBackHome = !homeRoutes.includes(event.detail.route + '');
		const mediaStreamFromStore = get(mediaStream);
		if (mediaStreamFromStore) {
			mediaStreamFromStore?.getTracks().forEach((track) => track.stop());
			mediaStream.removeStream();
		}
	};
</script>

<main class="flex flex-col items-center p-6 min-h-screen w-screen bg-primary transition-colors duration-300 overflow-hidden">
	<Router on:routeLoaded={routeLoaded} {routes} />
	<div
		on:click={() => toggleModalState(!showSettingsModal)}
		class="absolute top-4 right-4 w-8 h-8 cursor-pointer transform hover:rotate-90 transition-transform duration-500">
		<FaCog />
	</div>
	{#if showBackHome}
		<div
			on:click={() => push('/')}
			class="absolute top-4 left-4 w-8 h-8 cursor-pointer transform hover:scale-125 transition-transform duration-500">
			<FaArrowLeft />
		</div>
	{/if}
	{#if showSettingsModal}
		<Modal on:closeModal={() => toggleModalState(false)}><Settings /></Modal>
	{/if}
	<Theme />
</main>
