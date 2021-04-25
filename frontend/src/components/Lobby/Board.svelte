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
</script>

<div class="flex flex-col items-center">
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
			{#if $round.cardId}
				<Card card={getCard($round.cardId, $game.language || Language.ENGLISH)} />
				<Button>Guessed</Button>
				<Button type={ButtonType.SECONDARY}>Skip</Button>
				<Button>Skip</Button>
			{:else}
				<p class="my-2">You will be describing, start the round whenever you are ready</p>
				<Button>Start round</Button>
			{/if}
		{/if}
	{:else if $round.type === RoundType.GUESSING}
		<p>You will be guessing whenever your teammate will start the round</p>
	{:else if $round.type === RoundType.JUDGING}
		{#if $round.cardId}
			<Card card={getCard($round.cardId, $game.language || Language.ENGLISH)} />
			<Button>Wrong</Button>
		{:else}
			<p>Wait for opponent to start the round, you will be judging</p>
		{/if}
	{/if}
</div>
