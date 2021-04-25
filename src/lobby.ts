import {Lobby} from './model/lobby';
import {Player} from './model/player';
import {Language} from './model/language';
import crypto from 'crypto';
import {hashPassword} from './helpers/password';
import {LobbyInfo} from './model/lobbyInfo';
import {TeamChange} from './model/teamChange';
import {Game} from './model/game';
import {GameStatus} from './model/gameStatus';
import {Team} from './model/team';
import {GameSettings} from './model/gameSettings';
import {initializeGame, resolveGameByPlayerKicked, resolveGameByPlayerLeft} from './game';

export const lobbies: Map<string, Lobby> = new Map();

export const createLobby = (language: Language, name: string, gameSettings: GameSettings, password?: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const id = crypto.randomBytes(20).toString('hex');
		const newGame: Game = {
			status: GameStatus.NOT_STARTED,
			score: {
				[Team.FIRST]: 0,
				[Team.SECOND]: 0,
			},
			settings: gameSettings,
			cards: [],
			playerOrder: {},
			remainingSkipsInRound: gameSettings.skipsAvailable,
			pointsAcquiredInRound: 0,
		};
		const newLobby: Lobby = {
			players: [],
			id,
			name,
			language,
			secured: password ? true : false,
			game: newGame,
		};
		lobbies.set(id, newLobby);
		if (password) {
			hashPassword(password)
				.then((hash) => {
					newLobby.password = hash;
					resolve(id);
				})
				.catch(() => {
					reject('Hash error');
				});
		} else {
			resolve(id);
		}
	});
};

export const addPlayerToLobby = (lobbyId: string, player: Player): void => {
	lobbies.get(lobbyId)?.players.push(player);
};

export const removePlayerFromLobby = (lobbyId: string, playerId: string, wasKicked = false): void => {
	const lobby = lobbies.get(lobbyId);

	if (!lobby) {
		return;
	}

	const playerTeam = lobby.players.find((player) => player.id === playerId)?.team;

	lobby.players = lobby.players.filter((player) => player.id !== playerId);

	if (!lobby.players.length) {
		lobbies.delete(lobbyId);
		return;
	}

	if (lobby.game.status !== GameStatus.IN_PROGRESS) {
		return;
	}

	const shouldConcludeGame = checkWhetherShouldConcludeGame(lobby);
	if (!shouldConcludeGame || typeof playerTeam !== 'number') {
		return;
	}

	wasKicked ? resolveGameByPlayerKicked(lobbyId) : resolveGameByPlayerLeft(lobbyId, playerTeam);
};

export const getPlayersInLobby = (lobbyId: string): Array<Player> => {
	return lobbies.get(lobbyId)?.players ?? [];
};

export const getLobbyInfo = (lobbyId: string): LobbyInfo => {
	const lobby = lobbies.get(lobbyId);
	return {
		isExisting: lobby ? true : false,
		name: lobby?.name,
		secured: lobby?.secured ?? false,
		status: lobby?.game.status ?? GameStatus.NOT_STARTED,
		language: lobby?.language,
	};
};

export const isLobbySecured = (lobbyId: string): boolean => {
	return lobbies.get(lobbyId)?.secured ?? false;
};

export const getLobbyHash = (lobbyId: string): string => {
	return lobbies.get(lobbyId)?.password ?? '';
};

export const isLobbyFirstPlayer = (lobbyId: string): boolean => {
	return lobbies.get(lobbyId)?.players.length === 0;
};

export const shouldPickNewAdmin = (lobbyId: string, playerId: string): boolean => {
	const lobby = lobbies.get(lobbyId);
	if (!lobby) {
		return false;
	}
	return (lobby.players.find((player) => player.id === playerId)?.admin && lobby.players.length !== 0) || false;
};

export const pickNewAdmin = (lobbyId: string): string => {
	const lobby = lobbies.get(lobbyId);
	if (!lobby) {
		return '';
	}
	const newAdmin = lobby.players[Math.floor(Math.random() * lobby.players.length)];
	newAdmin.admin = true;
	return newAdmin.id;
};

export const updatePlayerTeam = (lobbyId: string, teamChange: TeamChange): void => {
	const lobby = lobbies.get(lobbyId);
	if (!lobby) {
		return;
	}
	const playerToUpdate = lobby.players.find((player) => player.id === teamChange.playerId);
	if (!playerToUpdate) {
		return;
	}
	playerToUpdate.team = teamChange.team;
};

export const removeLobbyIfNoPlayers = (lobbyId: string): void => {
	const lobby = lobbies.get(lobbyId);
	if (lobby && !lobby.players.length) {
		lobbies.delete(lobbyId);
	}
};

export const startGame = (lobbyId: string): void => {
	const lobby = lobbies.get(lobbyId);
	if (lobby) {
		resetGame(lobbyId);
		lobby.game.status = GameStatus.IN_PROGRESS;
	}

	initializeGame(lobbyId);
};

export const setCards = (lobbyId: string, cards: Array<number>): void => {
	const lobby = lobbies.get(lobbyId);
	if (lobby) {
		lobby.game.cards = cards;
	}
};

export const setPlayersOrder = (lobbyId: string, playerOrder: Partial<Record<Team, Array<Player>>>): void => {
	const lobby = lobbies.get(lobbyId);
	if (lobby) {
		lobby.game.playerOrder = playerOrder;
	}
};

export const setDescribingPlayer = (lobbyId: string, playerId: string): void => {
	const lobby = lobbies.get(lobbyId);
	if (lobby) {
		lobby.game.describingPlayerId = playerId;
	}
};

export const setGuessingTeam = (lobbyId: string, team: Team.FIRST | Team.SECOND): void => {
	const lobby = lobbies.get(lobbyId);
	if (lobby) {
		lobby.game.guessingTeam = team;
	}
};

export const setRemainingSkipsForRound = (lobbyId: string, remainingSkips: number): void => {
	const lobby = lobbies.get(lobbyId);
	if (lobby) {
		lobby.game.remainingSkipsInRound = remainingSkips;
	}
};

export const resetGame = (lobbyId: string): void => {
	const lobby = lobbies.get(lobbyId);
	if (!lobby) {
		return;
	}

	lobby.game.score = {
		[Team.FIRST]: 0,
		[Team.SECOND]: 0,
	};
	lobby.game.remainingSkipsInRound = lobby.game.settings.skipsAvailable;
	lobby.game.pointsAcquiredInRound = 0;
};

const checkWhetherShouldConcludeGame = (lobby: Lobby): boolean => {
	return !(
		lobby.players.filter((player) => player.team === Team.FIRST).length >= 2 &&
		lobby.players.filter((player) => player.team === Team.SECOND).length >= 2
	);
};
