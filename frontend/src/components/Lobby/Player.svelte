<script lang="ts">
	import type {Player} from '../../model/player';
	import RangeInput from '../commons/RangeInput.svelte';

	export let player: Player;
</script>

<div>
	<p>Player: {player.nickname}</p>
	<RangeInput bind:value={player.volume} />
</div>
