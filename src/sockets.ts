import {Socket} from 'socket.io';

const lobbies: Record<string, Array<string>> = {};

export const handleSocket = (socket: Socket): void => {
	const lobbyId: string = socket.handshake.query.lobbyId as string;
	socket.join(lobbyId);
	addSocketToProperLobby(socket, lobbyId);

	socket.on('disconnect', () => {
		socket.to(lobbyId).emit('playerLeft', socket.id);
		removeSocketFromProperLobby(socket.id, lobbyId);
	});

	socket.to(lobbyId).emit('playerJoined', socket.id);

	socket.emit('successfullyJoinedLobby', lobbies[lobbyId]);
};

const addSocketToProperLobby = (socket: Socket, lobbyId: string): void => {
	if (!lobbies[lobbyId]) {
		lobbies[lobbyId] = [];
	}
	lobbies[lobbyId].push(socket.id);
};

const removeSocketFromProperLobby = (socketId: string, lobbyId: string): void => {
	lobbies[lobbyId] = lobbies[lobbyId].filter((socketInLobbyId) => socketInLobbyId !== socketId);
};
