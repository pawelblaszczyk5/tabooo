import {writable} from 'svelte/store';
import type {Language} from '../model/language';
import type {Result} from '../model/result';
import {Team} from '../model/team';

export interface Game {
	status: GameStatus;
	score: Record<Team.FIRST | Team.SECOND, number>;
	language?: Language;
	result?: Result;
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
		setLanguage: (language: Language) => {
			update((game) => ({...game, language: language}));
		},
		setScore: (newScore: Record<Team.FIRST | Team.SECOND, number>) => {
			update((game) => ({...game, score: newScore}));
		},
		setResult: (result: Result) => {
			update((game) => ({...game, result: result}));
		},
	};
};

export const game = createGameStore();
