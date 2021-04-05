<script lang="ts">
	import Button, {ButtonType} from '../commons/Button.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import Intro from './Intro.svelte';
	import {push} from 'svelte-spa-router';
	import TransitionedRoute from '../commons/TransitionedRoute.svelte';
	import FaInfoCircle from 'svelte-icons/fa/FaInfoCircle.svelte';
	import Modal from '../commons/Modal.svelte';
	import Info from './Info.svelte';

	let showInfoModal = false;

	const toggleModalState = (state: boolean) => {
		showInfoModal = state;
	};
</script>

<TransitionedRoute>
	<div class="flex flex-col items-center">
		<Intro />
		<Spacer y={3}>
			<Button on:click={() => push('/lobbyCreator')} type={ButtonType.PRIMARY}>Create lobby</Button>
		</Spacer>
		<Spacer y={3}>
			<Button on:click={() => push('/lobbyList')} type={ButtonType.SECONDARY}>Join a lobby</Button>
		</Spacer>
	</div>
</TransitionedRoute>
<div
	on:click={() => toggleModalState(!showInfoModal)}
	class="fixed top-4 right-14 w-6 h-6 md:w-8 md:h-8 cursor-pointer transform hover:scale-125 transition-transform duration-500">
	<FaInfoCircle />
</div>
{#if showInfoModal}
	<Modal on:closeModal={() => toggleModalState(false)}>
		<Info />
	</Modal>
{/if}
