import {shuffle} from './helpers/shuffleArray';
import {lobbies, setCards, setPlayersOrder} from './lobby';
import {Player} from './model/player';
import {Team} from './model/team';

const MAX_CARD_ID = 40;

export const startNewRound = (): void => {};

export const initializeGame = (lobbyId: string): void => {
	const cardsArray = Array(MAX_CARD_ID)
		.fill(null)
		.map((_, i) => i + 1);

	setCards(lobbyId, cardsArray);

	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}

	const playerOrder: Partial<Record<Team, Array<Player>>> = {
		[Team.FIRST]: shuffle(lobby.players.filter((player) => player.team === Team.FIRST)),
		[Team.FIRST]: shuffle(lobby.players.filter((player) => player.team === Team.SECOND)),
	};

	setPlayersOrder(lobbyId, playerOrder);
};
