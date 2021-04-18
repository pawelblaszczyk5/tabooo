import {GameSettings} from './gameSettings';
import {GameStatus} from './gameStatus';
import {Team} from './team';

export interface Game {
	status: GameStatus;
	score: Partial<Record<Team, number>>;
	settings: GameSettings;
	cards: Array<number>;
}
