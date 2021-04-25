import {writable} from 'svelte/store';
import type {Round} from '../model/round';
import {RoundState} from '../model/roundState';
import type {RoundType} from '../model/roundType';

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
			update((round) => ({...round, state: state}));
		},
		setPointsAcquired: (points: number) => {
			update((round) => ({...round, pointsAcquired: points}));
		},
		setSkipsAvailable: (skips: number) => {
			update((round) => ({...round, skipsAvailable: skips}));
		},
		setType: (type: RoundType) => {
			update((round) => ({...round, type: type}));
		},
		setTimeToRoundEnd: (endTimestamp: number) => {
			update((round) => ({...round, timeToRoundEnd: endTimestamp}));
		},
		resetRound: () => {
			set({...initialRoundState});
		},
	};
};

export const round = createRoundStore();
