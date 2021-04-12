import {GameSettings} from './gameSettings';
import {Language} from './language';

export interface LobbyData {
	language: Language;
	name: string;
	password?: string;
	gameSettings: GameSettings;
}
