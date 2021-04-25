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
	import {flip} from 'svelte/animate';
	import {game, GameStatus} from '../../stores/game';
	import Board from './Board.svelte';

	const teamsOrder = [Team.FIRST, Team.OBSERVER, Team.SECOND];

	const changeTeam = (team: Team) => {
		const localSocket = get(socket);
		if (!localSocket) {
			return;
		}
		const teamChange: TeamChange = {
			playerId: localSocket.id,
			team: team,
		};
		players.updatePlayerTeam(teamChange);
		localSocket.emit('teamChange', teamChange);
	};
</script>

<div class="flex my-4 w-full max-w-7xl justify-center md:justify-between">
	{#each teamsOrder as team}
		{#if $game.status !== GameStatus.IN_PROGRESS || team !== Team.OBSERVER}
			<div
				class="w-9/12 md:static md:w-3/12 max-w-sm flex flex-col items-center 
				{team !== Team.OBSERVER &&
					'transform transition-transform duration-500 p-4 z-10 border border-gray-200 border-opacity-40 ' +
						'md:border-0 glass-primary md:non-glass hover:translate-x-0 absolute md:rounded-none md:translate-x-0 top-16 max-h-screen-margin md:max-h-unset'} 
				{team ===
					Team.FIRST && 'left-0 border-l-0 -translate-x-full rounded-r-md'}
				{team === Team.SECOND &&
					'right-0 border-r-0 translate-x-full rounded-l-md order-2'}">
				<div class="{team !== Team.OBSERVER && 'overflow-x-hidden overflow-y-auto md:overflow-visible'} w-full">
					{#each $players.filter((player) => player.team === team) as player (player.id)}
						<div class="w-full" in:receive={{key: player.id}} out:send={{key: player.id}} animate:flip={{duration: 200}}>
							<Spacer y={2}>
								<Player {player} />
							</Spacer>
						</div>
					{:else}
						<p class="text-sm text-center">No players in {teamsNames[team]} team</p>
					{/each}
				</div>
				{#if $game.status === GameStatus.NOT_STARTED}
					<Spacer y={2}>
						<Button on:click={() => changeTeam(team)}>Join {teamsNames[team]} team</Button>
					</Spacer>
				{/if}
				{#if team !== Team.OBSERVER}
					<div
						class="w-5 h-12 absolute top-2 md:hidden 
				{team === Team.FIRST && '-right-5 bg-primaryFirstTeam rounded-r-md'} 
				{team ===
							Team.SECOND && '-left-5 bg-primarySecondTeam rounded-l-md'}" />
				{/if}
			</div>
		{/if}
	{/each}
	{#if $game.status === GameStatus.IN_PROGRESS}
		<Board />
	{/if}
</div>
<div>
	{#each $players as player (player.id)}
		<RemoteAudio mediaStream={player.mediaStream} volume={player.volume} />
	{/each}
</div>
