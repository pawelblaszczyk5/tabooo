<script lang="ts">
	import {RoundType} from '../../model/roundType';
	import Score from './Score.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import {round} from '../../stores/round';
	import {RoundState} from '../../model/roundState';
</script>

<div>
	<Spacer y={2}>
		<Score />
	</Spacer>
	<div class="flex flex-col items-center">
		{#if $round.type === RoundType.GUESSING}
			<p>You are guessing</p>
			{#if $round.state === RoundState.READY}
				<p>You can start round</p>
			{/if}
		{:else if $round.type === RoundType.DESCRIBING}
			<p>You are describing</p>
		{:else}
			<p>You are judging</p>
		{/if}
	</div>
</div>
