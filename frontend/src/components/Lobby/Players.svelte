<script lang="ts">
	import type {TeamChange} from '../../model/teamChange';
	import {get} from 'svelte/store';
	import {send, receive} from './crossfade';
	import {Team} from '../../model/team';
	import {players} from '../../stores/players';
	import {socket} from '../../stores/socket';
	import Button from '../commons/Button.svelte';
	import Spacer from '../commons/Spacer.svelte';
	import Player from './Player.svelte';
	import RemoteAudio from './RemoteAudio.svelte';
	import {teamsNames} from '../../helpers/teamNames';

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

	const teamsOrder = [Team.FIRST, Team.OBSERVER, Team.SECOND];
</script>

<div class="flex my-4 w-full max-w-5xl justify-between">
	{#each teamsOrder as team}
		<div class="w-3/12">
			{#each $players.filter((player) => player.team === team) as player (player.id)}
				<div in:receive={{key: player.id}} out:send={{key: player.id}}>
					<Spacer y={2}>
						<Player {player} />
					</Spacer>
				</div>
			{/each}
		</div>
	{/each}
</div>

<div>
	{#each $players as player (player.id)}
		<RemoteAudio mediaStream={player.mediaStream} volume={player.volume} />
	{/each}
</div>

{#each teamsOrder as team}
	<Spacer y={2}>
		<Button on:click={() => changeTeam(team)}>Join {teamsNames[team]} team</Button>
	</Spacer>
{/each}
