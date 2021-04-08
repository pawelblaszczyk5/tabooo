import {Lobby} from './model/lobby';
import {Player} from './model/player';
import {Language} from './model/language';
import crypto from 'crypto';
import {hashPassword} from './helpers/password';
import {LobbyInfo} from './model/lobbyInfo';
import {TeamChange} from './model/teamChange';

export const lobbies: Map<string, Lobby> = new Map();

export const createLobby = (language: Language, name: string, password?: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const id = crypto.randomBytes(20).toString('hex');
		const newLobby: Lobby = {
			players: [],
			id,
			name,
			language,
			secured: password ? true : false,
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

export const removePlayerFromLobby = (lobbyId: string, playerId: string): void => {
	const lobby = lobbies.get(lobbyId);
	if (lobby) {
		lobby.players = lobby.players.filter((player) => player.id !== playerId);
		if (!lobby.players.length) {
			lobbies.delete(lobbyId);
		}
	}
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
	const playerToUpdate = lobby.players.find((player) => (player.id = teamChange.playerId));
	if (!playerToUpdate) {
		return;
	}
	playerToUpdate.team = teamChange.team;
};
