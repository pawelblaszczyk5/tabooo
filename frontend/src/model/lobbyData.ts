import type {GameSettings} from './gameSettings';
import type {Language} from './language';

export interface LobbyData {
	language: Language;
	name: string;
	password?: string;
	secured?: boolean;
	id?: string;
	gameSettings?: GameSettings;
}
