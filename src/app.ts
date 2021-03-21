import express from 'express';
import path from 'path';
import compression from 'compression';
import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app);
const socketServer = new Server(server, {
	path: '/api/ws',
});

app.enable('trust proxy');
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../frontend', 'public')));

app.use((req, res, next) => {
	if (!req.secure && process.env.ENVIRONMENT === 'PROD') {
		return res.redirect('https://' + req.headers.host + req.url);
	}
	next();
});

app.get('/api/test', (req, res) => {
	res.json({test: 'test2'});
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend', 'public', 'index.html'));
});

server.listen(port, () => {
	return console.log(`server is listening on ${port}`);
});

socketServer.on('connection', (socket: Socket) => {
	console.log('connected');
});
