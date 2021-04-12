import {writable} from 'svelte/store';
import type {GameSettings} from '../model/gameSettings';
import {Team} from '../model/team';

export interface Game {
	status: GameStatus;
	score: Partial<Record<Team, number>>;
	settings?: GameSettings;
}

export enum GameStatus {
	NOT_STARTED,
	IN_PROGRESS,
	ENDED,
}

const createGameStore = () => {
	const newGame: Game = {
		status: GameStatus.NOT_STARTED,
		score: {
			[Team.FIRST]: 0,
			[Team.SECOND]: 0,
		},
	};
	const {subscribe, update} = writable<Game>(newGame);

	return {
		subscribe,
		changeGameStatus: (newStatus: GameStatus) => {
			update((game) => ({...game, status: newStatus}));
		},
		setSettings: (gameSettings: GameSettings) => {
			update((game) => ({...game, settings: gameSettings}));
		},
	};
};

export const game = createGameStore();
