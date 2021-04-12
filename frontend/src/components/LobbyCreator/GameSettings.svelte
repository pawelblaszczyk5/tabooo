<script lang="ts">
	import type {GameSettings} from '../../model/gameSettings';
	import {pointsToWinAvailable, roundTimesAvailable, skipsAvailable} from '../../model/gameSettings';
	import GroupPicker from '../commons/GroupPicker.svelte';
	import Spacer from '../commons/Spacer.svelte';

	export let settings: GameSettings;
</script>

<Spacer y={3}>
	<p>Round duration</p>
	<GroupPicker values={roundTimesAvailable} bind:group={settings.roundTime} />
</Spacer>
<Spacer y={3}>
	<p>Points to win</p>
	<GroupPicker values={pointsToWinAvailable} bind:group={settings.pointsToWin} />
</Spacer>
<Spacer y={3}>
	<p>Skips available</p>
	<GroupPicker values={skipsAvailable} bind:group={settings.skipsAvailable} />
</Spacer>
