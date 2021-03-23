const rtcConfigs: Array<RTCConfiguration> = [
	{
		iceServers: [
			{urls: ['stun:eu-turn3.xirsys.com']},
			{
				username: 'zEGCKtXaeO6spb_6Pm4WyDViny8CXxvMvdOlOWKBsg4wDxkh2hEqqWwIikgC58j5AAAAAGBXZ2NldXBocmFub3I=',
				credential: 'd897c926-8a5a-11eb-b854-0242ac140004',
				urls: [
					'turn:eu-turn3.xirsys.com:80?transport=udp',
					'turn:eu-turn3.xirsys.com:3478?transport=udp',
					'turn:eu-turn3.xirsys.com:80?transport=tcp',
					'turn:eu-turn3.xirsys.com:3478?transport=tcp',
					'turns:eu-turn3.xirsys.com:443?transport=tcp',
					'turns:eu-turn3.xirsys.com:5349?transport=tcp',
				],
			},
		],
	},
	{
		iceServers: [
			{urls: ['stun:eu-turn3.xirsys.com']},
			{
				username: 'SPP6Wr8PtuOC1MLeVWTeOjyL60gBH801hScBVOd8IbChtqy-0QTalnRoeywu6vXKAAAAAGBaLmJhbW5hYWs=',
				credential: 'a28788ea-8c02-11eb-b561-0242ac140004',
				urls: [
					'turn:eu-turn3.xirsys.com:80?transport=udp',
					'turn:eu-turn3.xirsys.com:3478?transport=udp',
					'turn:eu-turn3.xirsys.com:80?transport=tcp',
					'turn:eu-turn3.xirsys.com:3478?transport=tcp',
					'turns:eu-turn3.xirsys.com:443?transport=tcp',
					'turns:eu-turn3.xirsys.com:5349?transport=tcp',
				],
			},
		],
	},
];

export const getRtcConfig = (): RTCConfiguration => rtcConfigs[Math.floor(Math.random() * rtcConfigs.length)];
