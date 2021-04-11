import {writable} from 'svelte/store';
import {Team} from '../model/team';

export interface Game {
	status: GameStatus;
	score: Partial<Record<Team, number>>;
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
	const {subscribe, set} = writable<Game>(newGame);

	return {
		subscribe,
		set,
	};
};

export const game = createGameStore();
