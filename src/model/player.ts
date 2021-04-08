import {Team} from './team';

export interface Player {
	id: string;
	nickname: string;
	admin: boolean;
	team: Team;
}
