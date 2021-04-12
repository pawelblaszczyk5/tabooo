import {GameSettings} from './gameSettings';
import {GameStatus} from './gameStatus';

export interface LobbyInfo {
	isExisting: boolean;
	name?: string;
	secured?: boolean;
	status?: GameStatus;
	settings?: GameSettings;
}
