<script lang="ts">
	import {RoundType} from '../../model/roundType';
	import {round} from '../../stores/round';
</script>

<p>The round has ended, new round setup is in progress.</p>
<p>
	{$round.type === RoundType.JUDGING ? 'Enemy' : 'Your'} team acquired {$round.pointsAcquired} points in this round
</p>
