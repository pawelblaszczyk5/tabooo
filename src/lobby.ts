import {Lobby} from './model/lobby';
import {Player} from './model/player';
import {Language} from './model/language';
import crypto from 'crypto';
import {hashPassword} from './helpers/hashPassword';

export const lobbies: Map<string, Lobby> = new Map();

export const createLobby = (language: Language, password?: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const id = crypto.randomBytes(20).toString('hex');
		const newLobby: Lobby = {
			players: [],
			id,
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

export const isLobby = (lobbyId: string): boolean => {
	return lobbies.get(lobbyId) ? true : false;
};