export interface Player {
	nickname: string;
	mediaStream: MediaStream;
	rtcPeerConnection?: RTCPeerConnection;
}
