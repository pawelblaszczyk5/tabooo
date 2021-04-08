import type {Team} from './team';

export interface PlayerData {
	id: string;
	nickname: string;
	admin: boolean;
	team: Team;
}
