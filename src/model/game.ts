import {GameSettings} from './gameSettings';
import {GameStatus} from './gameStatus';
import {Player} from './player';
import {Team} from './team';

export interface Game {
	status: GameStatus;
	score: Partial<Record<Team, number>>;
	settings: GameSettings;
	cards: Array<number>;
	playerOrder: Partial<Record<Team, Array<Player>>>;
	describingPlayerId?: string;
	guessingTeam?: Team;
	remainingSkipsInRound: number;
	currentCardId?: number;
}
