<script lang="ts">
	import Router, {push} from 'svelte-spa-router';
	import FaArrowLeft from 'svelte-icons/fa/FaArrowLeft.svelte';
	import FaInfoCircle from 'svelte-icons/fa/FaInfoCircle.svelte';
	import type {RouteLoadedEvent} from 'svelte-spa-router';
	import Modal from './components/commons/Modal.svelte';
	import Settings from './components/App/Settings.svelte';
	import Theme from './components/App/Theme.svelte';
	import {routes} from './routes';
	import FaCog from 'svelte-icons/fa/FaCog.svelte';
	import {mediaStream} from './stores/mediaStream';
	import {get} from 'svelte/store';
	import ToastrContainer from './components/App/ToastrContainer.svelte';
	import Info from './components/App/Info.svelte';

	const homeRoutes = ['*', '/'];

	let showSettingsModal = false;
	let showInfoModal = false;
	let showBackHome = false;

	const toggleSettingsModalState = (state: boolean) => {
		showSettingsModal = state;
	};

	const toogleInfoModalState = (state: boolean) => {
		showInfoModal = state;
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

<main class="flex flex-col items-center min-h-screen w-screen bg-primary transition-colors duration-300">
	<Router on:routeLoaded={routeLoaded} {routes} />
	<div
		on:click={() => toggleSettingsModalState(!showSettingsModal)}
		class="fixed top-4 right-4 w-6 h-6 md:w-8 md:h-8 cursor-pointer transform hover:rotate-90 transition-transform duration-500">
		<FaCog />
	</div>
	{#if showBackHome}
		<div
			on:click={() => push('/')}
			class="fixed top-4 left-4 w-6 h-6 md:w-8 md:h-8 cursor-pointer transform hover:scale-125 transition-transform duration-500">
			<FaArrowLeft />
		</div>
	{/if}
	{#if showSettingsModal}
		<Modal on:closeModal={() => toggleSettingsModalState(false)}><Settings /></Modal>
	{/if}
	<div
		on:click={() => toogleInfoModalState(!showInfoModal)}
		class="fixed top-4 right-14 w-6 h-6 md:w-8 md:h-8 cursor-pointer transform hover:scale-125 transition-transform duration-500">
		<FaInfoCircle />
	</div>
	{#if showInfoModal}
		<Modal on:closeModal={() => toogleInfoModalState(false)}>
			<Info />
		</Modal>
	{/if}
	<Theme />
	<ToastrContainer />
</main>
