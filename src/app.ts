import express from 'express';
import path from 'path';
import compression from 'compression';
import {createServer} from 'http';
import {Server} from 'socket.io';
import * as dotenv from 'dotenv';
import {handleSocket} from './sockets';
import {createLobby, getLobbyInfo, lobbies, removeLobbyIfNoPlayers} from './lobby';
import {LobbyData} from './model/lobbyData';
import {LobbyInfo} from './model/lobbyInfo';
import {GameStatus} from './model/gameStatus';

const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app);
const socketServer = new Server(server, {
	path: '/api/ws',
});

dotenv.config();
app.enable('trust proxy');
app.use(function (req, res, next) {
	if (!req.secure && process.env.ENVIRONMENT === 'PROD') {
		return res.redirect('https://' + req.headers.host + req.url);
	}
	next();
});

app.use(compression());
app.use(express.static(path.resolve(__dirname, '../frontend', 'public')));
app.use(express.json());

app.post('/api/lobby', (req, res) => {
	const lobbyData: LobbyData = req.body;
	createLobby(lobbyData.language, lobbyData.name, lobbyData.gameSettings, lobbyData.password)
		.then((id) => {
			setTimeout(() => removeLobbyIfNoPlayers(id), 60000);
			res.send(id);
		})
		.catch((err) => res.send(err));
});

app.get('/api/lobby', (req, res) => {
	res.send(
		Array.from(lobbies.values())
			.filter((lobby) => lobby.game.status === GameStatus.NOT_STARTED)
			.map((lobby) => ({
				id: lobby.id,
				secured: lobby.secured,
				name: lobby.name,
				language: lobby.language,
			})),
	);
});

app.get('/api/isLobby', (req, res) => {
	if (typeof req.query.lobbyId === 'string') {
		res.send(getLobbyInfo(req.query.lobbyId));
	} else {
		const nonExistingLobbyInfo: LobbyInfo = {
			isExisting: false,
		};
		res.send(nonExistingLobbyInfo);
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend', 'public', 'index.html'));
});

server.listen(port, () => {
	return console.log(`server is listening on ${port}`);
});

socketServer.on('connection', handleSocket);
