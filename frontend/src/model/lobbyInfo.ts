import type {GameStatus} from '../stores/game';

export interface LobbyInfo {
	isExisting: boolean;
	name?: string;
	secured?: boolean;
	status?: GameStatus;
}
