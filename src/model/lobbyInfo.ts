import {GameStatus} from './gameStatus';
import {Language} from './language';

export interface LobbyInfo {
	isExisting: boolean;
	name?: string;
	secured?: boolean;
	status?: GameStatus;
	language?: Language;
}
