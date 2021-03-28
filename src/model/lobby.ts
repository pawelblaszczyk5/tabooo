import {Language} from './language';
import {Player} from './player';

export interface Lobby {
	players: Array<Player>;
	id: string;
	language: Language;
	secured: boolean;
	password?: string;
}
