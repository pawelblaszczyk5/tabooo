import {Socket} from 'socket.io';
import {addPlayerToLobby, getPlayersInLobby, removePlayerFromLobby} from './lobby';
import {Player} from './model/player';

export const handleSocket = (socket: Socket): void => {
	const lobbyId: string = socket.handshake.query.lobbyId as string;
	const nickname: string = socket.handshake.query.nickname as string;

	const player: Player = {
		nickname,
		id: socket.id,
		admin: false,
	};
	socket.join(lobbyId);
	addPlayerToLobby(lobbyId, player);

	socket.on('disconnect', () => {
		socket.to(lobbyId).emit('playerLeft', socket.id);
		removePlayerFromLobby(lobbyId, socket.id);
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

	socket.to(lobbyId).emit('playerJoined', player);

	socket.emit(
		'successfullyJoinedLobby',
		getPlayersInLobby(lobbyId).filter((player) => player.id !== socket.id),
	);
};
