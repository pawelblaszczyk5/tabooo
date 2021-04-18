<script lang="ts">
	import {RoundType} from '../../model/roundType';
	import {roundType} from '../../stores/roundType';
	import Score from './Score.svelte';
</script>

<div>
	<Score />
	{#if $roundType === RoundType.GUESSING}
		<p>You are guessing</p>
	{:else if $roundType === RoundType.DESCRIBING}
		<p>You are describing</p>
	{:else}
		<p>You are judging</p>
	{/if}
</div>
