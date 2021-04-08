import type {Team} from './team';

export interface Player {
	id: string;
	nickname: string;
	mediaStream: MediaStream;
	rtcPeerConnection?: RTCPeerConnection;
	audioElement?: HTMLMediaElement;
	volume: number;
	team: Team;
}
