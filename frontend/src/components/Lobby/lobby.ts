import {io} from 'socket.io-client';
import {push} from 'svelte-spa-router';
import {get} from 'svelte/store';
import {getRtcConfig} from '../../helpers/rtcConfig';
import type {PlayerData} from '../../model/playerData';
import {Team} from '../../model/team';
import type {TeamChange} from '../../model/teamChange';
import {admin} from '../../stores/admin';
import {game, GameStatus} from '../../stores/game';
import {mediaStream} from '../../stores/mediaStream';
import {players} from '../../stores/players';
import {settings} from '../../stores/settings';
import {socket} from '../../stores/socket';
import {toastr} from '../../stores/toastr';

export const joinToLobby = (lobbyId = '', password = ''): void => {
	const rtcConfig = getRtcConfig();
	const nicknameFromStore = get(settings).nickname;
	const localSocket = io('', {
		path: '/api/ws/',
		query: {lobbyId, nickname: nicknameFromStore, password},
	});
	socket.saveSocket(localSocket);

	localSocket.on('wrongPassword', () => {
		toastr.addToastr('Wrong password');
		push('/');
	});

	localSocket.on('playerJoined', async (playerData: PlayerData) => {
		const rtcPeerConnection = new RTCPeerConnection(rtcConfig);

		rtcPeerConnection.addEventListener('track', (event) => {
			addTrackToStreamByPlayerId(event, playerData.id);
		});
		rtcPeerConnection.addEventListener('icecandidate', (event) => {
			sendIceCandidate(event, playerData.id);
		});

		addNewPlayer(playerData.id, playerData.nickname, Team.OBSERVER, rtcPeerConnection);
		addStreamToRtcPeerConnection(rtcPeerConnection);
		const rtcOffer = await rtcPeerConnection.createOffer();
		await rtcPeerConnection.setLocalDescription(rtcOffer);
		localSocket.emit('rtcOffer', {playerId: playerData.id, rtcOffer});
	});

	localSocket.on('successfullyJoinedLobby', (allPlayersData: Array<PlayerData>) => {
		allPlayersData.forEach((player) => {
			addNewPlayer(player.id, player.nickname, player.team);
		});
	});

	localSocket.on('lobbyAdmin', () => {
		admin.set(true);
	});

	localSocket.on('teamChange', (teamChange: TeamChange) => {
		players.updatePlayerTeam(teamChange);
	});

	localSocket.on('playerKick', () => {
		toastr.addToastr('You have been kicked');
		push('/');
	});

	localSocket.on('gameStart', () => {
		game.changeGameStatus(GameStatus.IN_PROGRESS);
	});

	localSocket.on('playerLeft', (playerId: string) => {
		const localPlayers = get(players);
		localPlayers.find((player) => player.id === playerId)?.rtcPeerConnection?.close();
		players.removePlayer(playerId);
	});

	localSocket.on('rtcAnswer', async ({playerId, rtcAnswer}: {playerId: string; rtcAnswer: RTCSessionDescriptionInit}) => {
		const localPlayers = get(players);
		const rtcDescription = new RTCSessionDescription(rtcAnswer);
		await localPlayers.find((player) => player.id === playerId)?.rtcPeerConnection?.setRemoteDescription(rtcDescription);
	});

	localSocket.on('rtcOffer', async ({playerId, rtcOffer}: {playerId: string; rtcOffer: RTCSessionDescriptionInit}) => {
		const rtcPeerConnection = new RTCPeerConnection(rtcConfig);

		rtcPeerConnection.addEventListener('track', (event) => {
			addTrackToStreamByPlayerId(event, playerId);
		});
		rtcPeerConnection.addEventListener('icecandidate', (event) => {
			sendIceCandidate(event, playerId);
		});

		const localPlayers = get(players);
		const player = localPlayers.find((player) => player.id === playerId);

		if (player) {
			player.rtcPeerConnection = rtcPeerConnection;
		}

		addStreamToRtcPeerConnection(rtcPeerConnection);
		const rtcDescription = new RTCSessionDescription(rtcOffer);
		rtcPeerConnection.setRemoteDescription(rtcDescription);
		const rtcAnswer = await rtcPeerConnection.createAnswer();
		await rtcPeerConnection.setLocalDescription(rtcAnswer);

		localSocket.emit('rtcAnswer', {playerId, rtcAnswer});
	});

	localSocket.on('rtcCandidate', async ({playerId, rtcIceCandidate}: {playerId: string; rtcIceCandidate: RTCIceCandidate}) => {
		const localPlayers = get(players);
		await localPlayers.find((player) => player.id === playerId)?.rtcPeerConnection?.addIceCandidate(rtcIceCandidate);
	});
};

const addStreamToRtcPeerConnection = (rtcPeerConnection: RTCPeerConnection): void => {
	const localStream = get(mediaStream);
	if (localStream) {
		localStream.getTracks().forEach((track) => rtcPeerConnection.addTrack(track, localStream));
	}
};

const addTrackToStreamByPlayerId = (event: RTCTrackEvent, playerId: string): void => {
	const localPlayers = get(players);
	localPlayers.find((player) => player.id === playerId)?.mediaStream.addTrack(event.track);
};

const sendIceCandidate = (event: RTCPeerConnectionIceEvent, playerId: string): void => {
	if (event.candidate) {
		const localSocket = get(socket);
		localSocket?.emit('rtcCandidate', {playerId, rtcIceCandidate: event.candidate});
	}
};

const addNewPlayer = (playerId: string, nickname: string, team: Team, rtcPeerConnection?: RTCPeerConnection): void => {
	players.addPlayer({
		id: playerId,
		nickname: nickname,
		rtcPeerConnection: rtcPeerConnection,
		mediaStream: new MediaStream(),
		volume: 100,
		team: team,
	});
};
