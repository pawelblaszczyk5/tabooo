<script lang="ts">
	import type {Player} from '../../model/player';
	import RangeInput from '../commons/RangeInput.svelte';

	export let player: Player;
</script>

<div>
	<p>Player: {player.nickname}</p>
	<p>Team: {player.team}</p>
	<RangeInput bind:value={player.volume} />
</div>
