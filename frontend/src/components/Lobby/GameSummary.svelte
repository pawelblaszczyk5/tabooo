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
	{#if $game.result.type === ResultType.SCORE || $game.result.type === ResultType.OUT_OF_CARDS}
		{#if $game.result.type === ResultType.OUT_OF_CARDS}
			<p>Unfortunately you have got out of cards :(</p>
		{/if}
		{#if $game.result.winner === 'TIE'}
			<p>There was a tie!</p>
		{:else if didPlayerWon}
			<p>Your team has won, congratulations!</p>
		{:else}
			<p>Opponent was better, better luck next time</p>
		{/if}
	{:else if $game.result.type === ResultType.KICKED}
		<p>Too many players were kicked and game was concluded as a tie</p>
	{:else if $game.result.type === ResultType.LEAVE}
		{#if didPlayerWon}
			<p>Too many opposing players left so you won, congratulations!</p>
		{:else}
			<p>Too many of your teammates left so you lost :(</p>
		{/if}
	{/if}
</div>
