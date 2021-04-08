import {Socket} from 'socket.io';
import {verifyPassword} from './helpers/password';
import {
	addPlayerToLobby,
	getLobbyHash,
	getPlayersInLobby,
	isLobbyFirstPlayer,
	isLobbySecured,
	pickNewAdmin,
	removePlayerFromLobby,
	shouldPickNewAdmin,
	updatePlayerTeam,
} from './lobby';
import {Player} from './model/player';
import {Team} from './model/team';
import {TeamChange} from './model/teamChange';

export const handleSocket = (socket: Socket): void => {
	const lobbyId: string = socket.handshake.query.lobbyId as string;
	const nickname: string = socket.handshake.query.nickname as string;
	const password: string = socket.handshake.query.password as string;

	if (isLobbySecured(lobbyId)) {
		verifyPassword(password, getLobbyHash(lobbyId))
			.then((isMatch) => {
				isMatch ? joinLobby(socket, lobbyId, nickname) : socket.emit('wrongPassword');
			})
			.catch(() => {
				socket.emit('wrongPassword');
			});
	} else {
		joinLobby(socket, lobbyId, nickname);
	}

	socket.on('disconnect', () => {
		const wasAdmin = shouldPickNewAdmin(lobbyId, socket.id);
		socket.to(lobbyId).emit('playerLeft', socket.id);
		removePlayerFromLobby(lobbyId, socket.id);

		if (wasAdmin) {
			socket.to(pickNewAdmin(lobbyId)).emit('lobbyAdmin');
		}
	});

	socket.on('rtcOffer', ({playerId, rtcOffer}) => {
		socket.to(playerId).emit('rtcOffer', {playerId: socket.id, rtcOffer});
	});

	socket.on('rtcAnswer', ({playerId, rtcAnswer}) => {
		socket.to(playerId).emit('rtcAnswer', {playerId: socket.id, rtcAnswer});
	});

	socket.on('rtcCandidate', ({playerId, rtcIceCandidate}) => {
		socket.to(playerId).emit('rtcCandidate', {playerId: socket.id, rtcIceCandidate});
	});

	socket.on('teamChange', (teamChange: TeamChange) => {
		updatePlayerTeam(lobbyId, teamChange);
		socket.to(lobbyId).emit('teamChange', teamChange);
	});
};

const joinLobby = (socket: Socket, lobbyId: string, nickname: string) => {
	const player: Player = {
		nickname,
		id: socket.id,
		admin: isLobbyFirstPlayer(lobbyId),
		team: Team.OBSERVER,
	};

	socket.join(lobbyId);
	addPlayerToLobby(lobbyId, player);

	socket.to(lobbyId).emit('playerJoined', player);

	socket.emit(
		'successfullyJoinedLobby',
		getPlayersInLobby(lobbyId).filter((player) => player.id !== socket.id),
	);

	if (player.admin) {
		socket.emit('lobbyAdmin');
	}
};
