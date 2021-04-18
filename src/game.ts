import {shuffle} from './helpers/shuffleArray';
import {setCards} from './lobby';

const MAX_CARD_ID = 40;

export const startNewRound = (): void => {};

export const initializeGame = (lobbyId: string): void => {
	const cardsArray = Array(MAX_CARD_ID)
		.fill(null)
		.map((_, i) => i + 1);

	setCards(lobbyId, shuffle(cardsArray));
};
