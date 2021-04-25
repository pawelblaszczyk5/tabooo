import {socketServer} from './app';
import {shuffle} from './helpers/shuffleArray';
import {lobbies, setCards, setDescribingPlayer, setGuessingTeam, setPlayersOrder} from './lobby';
import {Player} from './model/player';
import {RoundType} from './model/roundType';
import {Team} from './model/team';

const MAX_CARD_ID = 40;

const startNewRound = (lobbyId: string, team: Team): void => {
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
	startNewRound(lobbyId, Team.FIRST);
};

export const startRound = (lobbyId: string): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}

	const roundFinishTime = Date.now() + lobby.game.settings.roundTime * 1000;

	socketServer.to(lobbyId).emit('roundEndTime', roundFinishTime);

	setTimeout(() => {
		socketServer.to(lobbyId).emit('roundEnded', roundFinishTime);
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
