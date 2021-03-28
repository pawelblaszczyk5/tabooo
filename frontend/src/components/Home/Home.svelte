<script lang="ts">
	import Button, {ButtonType} from '../commons/Button.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import Intro from './Intro.svelte';
	import {HomeStep} from '../../model/homeStep';
	import LobbyCreator from './LobbyCreator.svelte';
	import LobbyList from './LobbyList.svelte';
	import FaArrowLeft from 'svelte-icons/fa/FaArrowLeft.svelte';

	let homeStep: HomeStep = HomeStep.INTRO;
	let transitionInProgress = false;

	const changeStep = (newStep: HomeStep) => {
		if (newStep !== HomeStep.INTRO) {
			transitionInProgress = true;
		}
		homeStep = newStep;
	};
</script>

{#if homeStep === HomeStep.INTRO && !transitionInProgress}
	<div class="flex flex-col items-center">
		<Intro />
		<Spacer y={3}>
			<Button on:click={() => changeStep(HomeStep.CREATOR)} type={ButtonType.PRIMARY}>Create lobby</Button>
		</Spacer>
		<Spacer y={3}>
			<Button on:click={() => changeStep(HomeStep.LIST)} type={ButtonType.SECONDARY}>Join a lobby</Button>
		</Spacer>
	</div>
{:else if homeStep === HomeStep.CREATOR}
	<LobbyCreator on:outroFinished={() => (transitionInProgress = false)} />
{:else if homeStep === HomeStep.LIST}
	<LobbyList on:outroFinished={() => (transitionInProgress = false)} />
{/if}

{#if homeStep !== HomeStep.INTRO}
	<div
		on:click={() => changeStep(HomeStep.INTRO)}
		class="absolute top-4 left-4 w-8 h-8 cursor-pointer transform hover:scale-125 transition-transform duration-500">
		<FaArrowLeft />
	</div>
{/if}
