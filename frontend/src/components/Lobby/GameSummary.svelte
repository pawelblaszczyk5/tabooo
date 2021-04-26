<script lang="ts">
	import Score from './Score.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import {game} from '../../stores/game';
	import {ResultType} from '../../model/resultType';
	import {get} from 'svelte/store';
	import {players} from '../../stores/players';
	import {socket} from '../../stores/socket';
	import ResultAnimation from './ResultAnimation.svelte';

	const checkWhetherPlayerHaveWon = (): boolean => {
		const localPlayers = get(players);
		const localSocket = get(socket);
		const localGameResult = get(game).result;

		if (!localPlayers.length || !localSocket || !localGameResult) {
			return false;
		}
		return localPlayers.find((player) => player.id === localSocket.id)?.team === localGameResult.winner;
	};

	const didPlayerWon = checkWhetherPlayerHaveWon();
</script>

<div class="flex flex-col items-center w-full">
	<Spacer y={2}>
		<Score />
	</Spacer>
	<ResultAnimation result={$game.result.winner === 'TIE' || didPlayerWon ? 'WIN' : 'LOSE'} />
	{#if $game.result.type === ResultType.SCORE && $game.result.winner !== 'TIE'}
		<p>{didPlayerWon ? 'Your team has won, congratulations!' : 'Opponent was better, better luck next time!'}</p>
	{/if}
	{#if $game.result.type === ResultType.OUT_OF_CARDS}
		<p>Unfortunately you have got out of cards :(</p>
		<p>
			{#if $game.result.winner === 'TIE'}
				There was a tie!
			{:else}
				<p>{didPlayerWon ? 'Your team has won, congratulations!' : 'Opponent was better, better luck next time!'}</p>
			{/if}
		</p>
	{/if}
	{#if $game.result.type === ResultType.LEAVE || $game.result.type === ResultType.KICKED}
		<p>Unfortunately too many players left or were kicked :(</p>
		<p>
			{#if $game.result.winner === 'TIE'}
				There was a tie!
			{:else}
				<p>{didPlayerWon ? 'Your team has won, congratulations!' : 'Opponent was better, better luck next time!'}</p>
			{/if}
		</p>
	{/if}
</div>
