import {socketServer} from './app';
import {shuffle} from './helpers/shuffleArray';
import {lobbies, setCards, setPlayersOrder} from './lobby';
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
