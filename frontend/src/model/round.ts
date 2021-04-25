import type {RoundState} from './roundState';
import type {RoundType} from './roundType';

export interface Round {
	cardId?: number;
	pointsAcquired: number;
	state: RoundState;
	skipsAvailable?: number;
	type?: RoundType;
	timeToRoundEnd?: number;
}
