import {socketServer} from './app';
import {shuffle} from './helpers/shuffleArray';
import {lobbies, setCards, setDescribingPlayer, setGuessingTeam, setPlayersOrder, setRemainingSkipsForRound} from './lobby';
import {GameStatus} from './model/gameStatus';
import {Lobby} from './model/lobby';
import {Player} from './model/player';
import {Result} from './model/result';
import {ResultChangeType} from './model/resultChangeType';
import {ResultType} from './model/resultType';
import {RoundType} from './model/roundType';
import {Team} from './model/team';

const MAX_CARD_ID = 100;

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
	lobby.game.remainingSkipsInRound = lobby.game.settings.skipsAvailable;

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
		socketServer.to(lobbyId).emit('roundEnded');

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

	if (!lobby.game.cards.length) {
		resolveGameByNoCardsLeft(lobbyId);
		return;
	}

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

	if (lobby.game.score[team] >= lobby.game.settings.pointsToWin) {
		resolveGameByScore(lobbyId, team);
	}
};

const resolveGameByScore = (lobbyId: string, winner: Team): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}

	const result: Result = {
		winner,
		type: ResultType.SCORE,
	};

	lobby.game.status = GameStatus.ENDED;
	socketServer.to(lobbyId).emit('gameResolved', {
		scoreUpdate: lobby.game.score,
		result,
	});
};

const resolveGameByNoCardsLeft = (lobbyId: string): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}

	const winner = concludeWinnerByPoints(lobby);

	const result: Result = {
		winner,
		type: ResultType.OUT_OF_CARDS,
	};

	socketServer.to(lobbyId).emit('gameResolved', {
		scoreUpdate: lobby.game.score,
		result,
	});
};

const concludeWinnerByPoints = (lobby: Lobby): Team | 'TIE' => {
	const score = lobby.game.score;
	if (score[Team.FIRST] === score[Team.SECOND]) {
		return 'TIE';
	} else {
		return score[Team.FIRST] > score[Team.SECOND] ? Team.FIRST : Team.SECOND;
	}
};

export const resolveGameByPlayerKicked = (lobbyId: string): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}

	const result: Result = {
		winner: 'TIE',
		type: ResultType.KICKED,
	};

	lobby.game.status = GameStatus.ENDED;
	socketServer.to(lobbyId).emit('gameResolved', {
		scoreUpdate: lobby.game.score,
		result,
	});
};

export const resolveGameByPlayerLeft = (lobbyId: string, team: Team): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}

	const result: Result = {
		winner: team === Team.FIRST ? Team.SECOND : Team.FIRST,
		type: ResultType.LEAVE,
	};

	lobby.game.status = GameStatus.ENDED;
	socketServer.to(lobbyId).emit('gameResolved', {
		scoreUpdate: lobby.game.score,
		result,
	});
};
