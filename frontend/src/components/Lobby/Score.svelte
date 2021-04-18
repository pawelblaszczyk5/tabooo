<script lang="ts">
	import {Team} from '../../model/team';
	import {game} from '../../stores/game';
</script>

<div class="flex items-center">
	<div class="w-8 h-8 bg-primaryFirstTeam" />
	<p class="text-7xl font-semibold mx-1">
		{$game.score[Team.FIRST]}:{$game.score[Team.SECOND]}
	</p>
	<div class="w-8 h-8 bg-primarySecondTeam" />
</div>
