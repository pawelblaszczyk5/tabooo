<script lang="ts">
	import Score from './Score.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import {game} from '../../stores/game';
	import {ResultType} from '../../model/resultType';
	import {teamsNames} from '../../helpers/teamNames';
</script>

<div class="flex flex-col items-center w-full">
	<Spacer y={2}>
		<Score />
	</Spacer>

	{#if $game.result?.type === ResultType.SCORE && $game.result.winner !== 'TIE'}
		{teamsNames[$game.result.winner]} team won!
	{/if}
</div>
