import {writable} from 'svelte/store';
import type {Player} from '../model/player';
import type {TeamChange} from '../model/teamChange';

const createPlayersStore = () => {
	const {subscribe, update, set} = writable<Array<Player>>([]);

	return {
		subscribe,
		set,
		addPlayer: (newPlayer: Player) => {
			update((players) => {
				return [...players, newPlayer];
			});
		},
		resetStore: () => {
			set([]);
		},
		removePlayer: (playerIdToRemove: string) => {
			update((players) => {
				return players.filter((player) => player.id !== playerIdToRemove);
			});
		},
		updatePlayerTeam: (teamChange: TeamChange) => {
			update((players) => {
				const playerToUpdate = players.find((player) => player.id === teamChange.playerId);
				if (playerToUpdate) {
					playerToUpdate.team = teamChange.team;
				}
				return players;
			});
		},
	};
};

export const players = createPlayersStore();
