import {writable} from 'svelte/store';
import type {Player} from '../model/player';

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
	};
};

export const players = createPlayersStore();
