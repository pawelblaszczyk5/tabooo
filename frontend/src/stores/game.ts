import {writable} from 'svelte/store';
import type {Language} from '../model/language';
import {Team} from '../model/team';

export interface Game {
	status: GameStatus;
	score: Partial<Record<Team, number>>;
	time?: number;
	language?: Language;
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
		setTime: (roundTime: number) => {
			update((game) => ({...game, time: roundTime}));
		},
		setLanguage: (language: Language) => {
			update((game) => ({...game, language: language}));
		},
	};
};

export const game = createGameStore();
