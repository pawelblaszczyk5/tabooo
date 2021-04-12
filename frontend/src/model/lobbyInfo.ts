import type {GameStatus} from '../stores/game';
import type {GameSettings} from './gameSettings';

export interface LobbyInfo {
	isExisting: boolean;
	name?: string;
	secured?: boolean;
	status?: GameStatus;
	settings?: GameSettings;
}
