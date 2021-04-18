import {writable} from 'svelte/store';

export enum RoundState {
	READY,
	IN_PROGRESS,
	END,
}

interface Round {
	cardId?: number;
	pointsAcquired: number;
	state: RoundState;
	skipsAvailable?: number;
}

const createRoundStore = () => {
	const initialRoundState: Round = {
		pointsAcquired: 0,
		state: RoundState.READY,
	};
	const {subscribe, update, set} = writable<Round>({...initialRoundState});

	return {
		subscribe,
		setCardId: (id: number) => {
			update((round) => ({...round, cardId: id}));
		},
		setState: (state: RoundState) => {
			update((round) => ({...round, roundState: state}));
		},
		setPointsAcquired: (points: number) => {
			update((round) => ({...round, pointsAcquired: points}));
		},
		setSkipsAvailable: (skips: number) => {
			update((round) => ({...round, skipsAvailable: skips}));
		},
		resetRound: () => {
			set({...initialRoundState});
		},
	};
};

export const round = createRoundStore();
