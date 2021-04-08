<script lang="ts">
	import {get} from 'svelte/store';
	import {Team} from '../../model/team';
	import type {TeamChange} from '../../model/teamChange';
	import {players} from '../../stores/players';
	import {socket} from '../../stores/socket';
	import Button from '../commons/Button.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import Player from './Player.svelte';
	import RemoteAudio from './RemoteAudio.svelte';

	const changeTeam = (team: Team) => {
		const localSocket = get(socket);
		if (!localSocket) {
			return;
		}
		const teamChange: TeamChange = {
			playerId: localSocket.id,
			team: team,
		};
		localSocket.emit('teamChange', teamChange);
	};
</script>

<div class="flex my-4">
	<div class="mx-3 w-40">
		{#each $players.filter((player) => player.team === Team.FIRST) as player (player.id)}
			<Spacer y={2}>
				<Player {player} />
			</Spacer>
		{/each}
	</div>
	<div class="mx-3 w-40">
		{#each $players.filter((player) => player.team === Team.OBSERVER) as player (player.id)}
			<Spacer y={2}>
				<Player {player} />
			</Spacer>
		{/each}
	</div>
	<div class="mx-3 w-40">
		{#each $players.filter((player) => player.team === Team.SECOND) as player (player.id)}
			<Spacer y={2}>
				<Player {player} />
			</Spacer>
		{/each}
	</div>
</div>

<div>
	{#each $players as player (player.id)}
		<RemoteAudio mediaStream={player.mediaStream} volume={player.volume} />
	{/each}
</div>

<Button on:click={() => changeTeam(Team.FIRST)}>Join first team</Button>
<Button on:click={() => changeTeam(Team.SECOND)}>Join second team</Button>
<Button on:click={() => changeTeam(Team.OBSERVER)}>Join observer team</Button>
