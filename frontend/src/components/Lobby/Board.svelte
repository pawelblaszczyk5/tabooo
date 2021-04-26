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
	import type {Team} from '../../model/team';
	import RoundSummary from './RoundSummary.svelte';

	const signalizeRoundStarting = () => {
		$socket?.emit('roundStart');
	};

	const signalizeGuessing = () => {
		$socket?.emit('roundGuessed', $round.cardId);
	};

	const signalizeSkipping = () => {
		$socket?.emit('roundSkipped', $round.cardId);
	};

	const signalizeFailing = () => {
		$socket?.emit('roundFailed', $round.cardId);
	};

	onMount(() => {
		$socket?.on('roundNewCardId', (cardId: number) => {
			round.setCardId(cardId);
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

		$socket?.on('scoreUpdate', (scoreUpdate: Record<Team.FIRST | Team.SECOND, number>) => {
			game.setScore(scoreUpdate);
		});

		$socket?.on('roundPointsAcquired', (pointsAcquiredInRound: number) => {
			round.setPointsAcquired(pointsAcquiredInRound);
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
					<div class="grid grid-cols-1 grid-rows-1">
						{#key $round.cardId}
							<div class="col-start-1 col-end-1 row-start-1 row-end-1">
								<Card card={getCard($round.cardId, $game.language ?? Language.ENGLISH)} />
							</div>
						{/key}
					</div>
				</Spacer>
				<div class="my-4 flex flex-col md:flex-row items-center justify-center w-full max-w-md">
					<Spacer y={2} x={2}>
						<Button on:click={signalizeGuessing}>Guessed</Button>
					</Spacer>
					<Spacer y={2} x={2}>
						<Button on:click={signalizeSkipping} type={ButtonType.SECONDARY}>Skip ({$round.skipsAvailable})</Button>
					</Spacer>
					<Spacer y={2} x={2}>
						<Button on:click={signalizeFailing}>Failed</Button>
					</Spacer>
				</div>
			{/if}
		{:else if $round.state === RoundState.END}
			<RoundSummary />
		{/if}
	{:else if $round.type === RoundType.GUESSING}
		{#if $round.state === RoundState.READY}
			<p>You will be guessing this round, wait for your teammate to start the round</p>
		{:else if $round.state === RoundState.IN_PROGRESS}
			<p>You are guessing, good luck!</p>
		{:else if $round.state === RoundState.END}
			<RoundSummary />
		{/if}
	{:else if $round.type === RoundType.JUDGING}
		{#if $round.state === RoundState.READY}
			<p>Wait for the opponent to start the round, you will be judging</p>
		{:else if $round.state === RoundState.IN_PROGRESS}
			{#if $round.cardId}
				<Spacer y={4}>
					<div class="grid grid-cols-1 grid-rows-1">
						{#key $round.cardId}
							<div class="col-start-1 col-end-1 row-start-1 row-end-1">
								<Card card={getCard($round.cardId, $game.language ?? Language.ENGLISH)} />
							</div>
						{/key}
					</div>
				</Spacer>
				<Button on:click={signalizeFailing}>Failed</Button>
			{/if}
		{:else if $round.state === RoundState.END}
			<RoundSummary />
		{/if}
	{/if}
</div>
