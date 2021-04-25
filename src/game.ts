import {socketServer} from './app';
import {shuffle} from './helpers/shuffleArray';
import {lobbies, setCards, setDescribingPlayer, setGuessingTeam, setPlayersOrder, setRemainingSkipsForRound} from './lobby';
import {Player} from './model/player';
import {ResultChangeType} from './model/resultChangeType';
import {RoundType} from './model/roundType';
import {Team} from './model/team';

const MAX_CARD_ID = 40;

const setupNewRound = (lobbyId: string, team: Team.FIRST | Team.SECOND): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}

	const describingPlayer = lobby.game.playerOrder[team]?.[0];

	if (!describingPlayer) {
		return;
	}

	setDescribingPlayer(lobbyId, describingPlayer.id);
	setGuessingTeam(lobbyId, team);

	lobby.game.playerOrder[team]?.shift();
	lobby.game.playerOrder[team]?.push(describingPlayer);
	lobby.game.pointsAcquiredInRound = 0;

	socketServer.to(describingPlayer.id).emit('roundType', RoundType.DESCRIBING);
	lobby.players
		.filter((player) => player.team === team && player.id !== describingPlayer.id)
		.forEach((player) => {
			socketServer.to(player.id).emit('roundType', RoundType.GUESSING);
		});

	lobby.players
		.filter((player) => player.team !== team)
		.forEach((player) => {
			socketServer.to(player.id).emit('roundType', RoundType.JUDGING);
		});
};

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
		[Team.SECOND]: shuffle(lobby.players.filter((player) => player.team === Team.SECOND)),
	};

	setPlayersOrder(lobbyId, playerOrder);
	setupNewRound(lobbyId, Team.FIRST);
};

export const startRound = (lobbyId: string): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}

	const roundFinishTime = Date.now() + lobby.game.settings.roundTime * 1000;

	if (lobby.game.describingPlayerId) {
		socketServer.to(lobby.game.describingPlayerId).emit('roundRemainingSkips', lobby.game.remainingSkipsInRound);
	}
	socketServer.to(lobbyId).emit('roundEndTime', roundFinishTime);

	setTimeout(() => {
		socketServer.to(lobbyId).emit('roundEnded', roundFinishTime);

		setTimeout(() => {
			setupNewRound(lobbyId, lobby.game.guessingTeam === Team.FIRST ? Team.SECOND : Team.FIRST);
		}, 5000);
	}, lobby.game.settings.roundTime * 1000);

	drawCard(lobbyId);
};

export const drawCard = (lobbyId: string): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}

	//TODO what if no more cards
	const drawnCard = lobby.game.cards[Math.floor(Math.random() * lobby.game.cards.length)];
	lobby.game.cards = lobby.game.cards.filter((cardId) => cardId !== drawnCard);
	lobby.game.currentCardId = drawnCard;

	if (lobby.game.describingPlayerId) {
		socketServer.to(lobby.game.describingPlayerId).emit('roundNewCardId', drawnCard);
	}

	if (typeof lobby.game.guessingTeam === 'number') {
		lobby.players
			.filter((player) => player.team !== lobby.game.guessingTeam)
			.forEach((player) => {
				socketServer.to(player.id).emit('roundNewCardId', drawnCard);
			});
	}
};

export const sendNewResult = (lobbyId: string): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}
};

export const tryFailingRound = (lobbyId: string, cardId: number): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}
	if (cardId !== lobby.game.currentCardId) {
		return;
	}
	if (typeof lobby.game.guessingTeam !== 'number') {
		return;
	}

	updateScore(lobbyId, lobby.game.guessingTeam, ResultChangeType.SUBTRACTION);
	drawCard(lobbyId);
};

export const trySkippingRound = (lobbyId: string, cardId: number): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}
	if (cardId !== lobby.game.currentCardId) {
		return;
	}
	if (lobby.game.remainingSkipsInRound <= 0) {
		return;
	}
	if (!lobby.game.describingPlayerId) {
		return;
	}
	setRemainingSkipsForRound(lobbyId, lobby.game.remainingSkipsInRound - 1);
	socketServer.to(lobby.game.describingPlayerId).emit('roundRemainingSkips', lobby.game.remainingSkipsInRound);
	drawCard(lobbyId);
};

export const tryGuessingRound = (lobbyId: string, cardId: number): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}
	if (cardId !== lobby.game.currentCardId) {
		return;
	}
	if (typeof lobby.game.guessingTeam !== 'number') {
		return;
	}

	updateScore(lobbyId, lobby.game.guessingTeam, ResultChangeType.ADDITION);
	drawCard(lobbyId);
};

const updateScore = (lobbyId: string, team: Team.FIRST | Team.SECOND, resultChangeType: ResultChangeType): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}

	const resultChange = resultChangeType === ResultChangeType.ADDITION ? 1 : -1;

	lobby.game.score[team] += resultChange;
	lobby.game.pointsAcquiredInRound += resultChange;

	socketServer.to(lobbyId).emit('roundPointsAcquired', lobby.game.pointsAcquiredInRound);
	socketServer.to(lobbyId).emit('scoreUpdate', lobby.game.score);
};
