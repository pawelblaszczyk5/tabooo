import {Socket} from 'socket.io';

const lobbies: Record<string, Array<Socket>> = {};

export const handleSocket = (socket: Socket): void => {
	const lobbyId: string = socket.handshake.query.lobbyId as string;

	addSocketToProperLobby(socket, lobbyId);

	socket.on('disconnect', () => {
		removeSocketFromProperLobby(socket, lobbyId);
	});
};

const addSocketToProperLobby = (socket: Socket, lobbyId: string): void => {
	if (!lobbies[lobbyId]) {
		lobbies[lobbyId] = [];
	}
	lobbies[lobbyId].push(socket);
};

const removeSocketFromProperLobby = (socket: Socket, lobbyId: string): void => {
	lobbies[lobbyId] = lobbies[lobbyId].filter((socketInLobby) => socketInLobby.id !== socket.id);
};
