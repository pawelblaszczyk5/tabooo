import type {ResultType} from './resultType';
import type {Team} from './team';

export interface Result {
	winner: Team | 'TIE';
	type: ResultType;
}
