<script lang="ts">
	import type {Player} from '../../model/player';
	import {teamsNames} from '../../helpers/teamNames';
	import RangeInput from '../commons/RangeInput.svelte';

	export let player: Player;
</script>

<div>
	<p>Player: {player.nickname}</p>
	<p>Team: {teamsNames[player.team]}</p>
	<RangeInput bind:value={player.volume} />
</div>
