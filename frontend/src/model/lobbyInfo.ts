import type {GameStatus} from '../stores/game';
import type {Language} from './language';

export interface LobbyInfo {
	isExisting: boolean;
	name?: string;
	secured?: boolean;
	status?: GameStatus;
	language: Language;
}
