<script lang="ts">
	import {RoundType} from '../../model/roundType';
	import Score from './Score.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import {round} from '../../stores/round';
	import {RoundState} from '../../model/roundState';
	import Button, {ButtonType} from '../commons/Button.svelte';
	import {getCard} from '../../helpers/card';
	import {game} from '../../stores/game';
	import {Language} from '../../model/language';
	import Card from './Card.svelte';
	import Countdown from './Countdown.svelte';
	import {socket} from '../../stores/socket';
	import {onMount} from 'svelte';

	const signalizeRoundStarting = () => {
		$socket?.emit('roundStart');
	};

	const signalizeGuessing = () => {
		$socket?.emit('roundGuessed');
	};

	const signalizeSkipping = () => {
		$socket?.emit('roundSkipped');
	};

	const signalizeFailing = () => {
		$socket?.emit('roundFailed');
	};

	onMount(() => {
		$socket?.on('roundNewCardId', (cardId: number) => {
			round.setCardId(cardId);
			console.log(cardId);
		});

		$socket?.on('roundRemainingSkips', (remainingSkips: number) => {
			round.setSkipsAvailable(remainingSkips);
		});

		$socket?.on('roundEndTime', (timestamp: number) => {
			round.setState(RoundState.IN_PROGRESS);
			round.setTimeToRoundEnd(timestamp);
		});

		$socket?.on('roundEnded', () => {
			round.setState(RoundState.END);
		});
	});
</script>

<div class="flex flex-col items-center w-full">
	<Spacer y={2}>
		<Score />
	</Spacer>
	{#if typeof $round.timeToRoundEnd === 'number'}
		<Spacer y={2}>
			<Countdown time={$round.timeToRoundEnd} />
		</Spacer>
	{/if}
	{#if $round.type === RoundType.DESCRIBING}
		{#if $round.state === RoundState.READY}
			<p class="my-2">You will be describing, start the round whenever you are ready</p>
			<Button on:click={signalizeRoundStarting}>Start round</Button>
		{:else if $round.state === RoundState.IN_PROGRESS}
			{#if $round.cardId}
				<Spacer y={4}>
					<Card card={getCard($round.cardId, $game.language || Language.ENGLISH)} />
				</Spacer>
				<div class="my-4 flex w-full justify-between max-w-sm">
					<Button on:click={signalizeGuessing}>Guess</Button>
					<Button on:click={signalizeSkipping} type={ButtonType.SECONDARY}>Skip</Button>
					<Button on:click={signalizeFailing}>Fail</Button>
				</div>
			{/if}
		{:else if $round.state === RoundState.END}
			<p>Round ended</p>
		{/if}
	{:else if $round.type === RoundType.GUESSING}
		{#if $round.state === RoundState.READY}
			<p>You will be guessing this round, wait for your teammate to start the round</p>
		{:else if $round.state === RoundState.IN_PROGRESS}
			<p>Guess</p>
		{:else if $round.state === RoundState.END}
			<p>Round ended</p>
		{/if}
	{:else if $round.type === RoundType.JUDGING}
		{#if $round.state === RoundState.READY}
			<p>Wait for opponent to start the round, you will be judging</p>
		{:else if $round.state === RoundState.IN_PROGRESS}
			{#if $round.cardId}
				<Spacer y={4}>
					<Card card={getCard($round.cardId, $game.language || Language.ENGLISH)} />
				</Spacer>				
				<Button on:click={signalizeFailing}>Fail</Button>
			{/if}
		{:else if $round.state === RoundState.END}
			<p>Round ended</p>
		{/if}
	{/if}
</div>
