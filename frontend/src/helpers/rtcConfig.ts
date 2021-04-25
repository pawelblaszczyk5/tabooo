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
	{
		iceServers: [
			{urls: ['stun:eu-turn6.xirsys.com']},
			{
				username: '-dOE9gEngb-WmHAzovDrV5KqpGd87Ncyq2O39US072xGC_FheON0dTOOVKHXCtUyAAAAAGCFnGtwcmluY2Vzc1Jvc2U=',
				credential: '7f91f418-a5e5-11eb-83b6-0242ac140004',
				urls: [
					'turn:eu-turn6.xirsys.com:80?transport=udp',
					'turn:eu-turn6.xirsys.com:3478?transport=udp',
					'turn:eu-turn6.xirsys.com:80?transport=tcp',
					'turn:eu-turn6.xirsys.com:3478?transport=tcp',
					'turns:eu-turn6.xirsys.com:443?transport=tcp',
					'turns:eu-turn6.xirsys.com:5349?transport=tcp',
				],
			},
		],
	},
	{
		iceServers: [
			{urls: ['stun:eu-turn4.xirsys.com']},
			{
				username: '20yrzx-esqcGHmanmHytdzUjrQ_Xn0ZN5-N5klBgPPPYBRMdEBBVYYpKHBEIIM9pAAAAAGCFnWlhcnN5bTEzMzc=',
				credential: '16ed0fe6-a5e6-11eb-b8fd-0242ac140004',
				urls: [
					'turn:eu-turn4.xirsys.com:80?transport=udp',
					'turn:eu-turn4.xirsys.com:3478?transport=udp',
					'turn:eu-turn4.xirsys.com:80?transport=tcp',
					'turn:eu-turn4.xirsys.com:3478?transport=tcp',
					'turns:eu-turn4.xirsys.com:443?transport=tcp',
					'turns:eu-turn4.xirsys.com:5349?transport=tcp',
				],
			},
		],
	},
	{
		iceServers: [
			{urls: ['stun:eu-turn8.xirsys.com']},
			{
				username: '6PVLpB4EFQGRSme5bDT4VaKayHSYwzVRcDeO6U0sO66huopfPGEnoTOXMjudc3Z_AAAAAGCFnidtYXJnb25lbWlhcno=',
				credential: '889b9af4-a5e6-11eb-a558-0242ac140004',
				urls: [
					'turn:eu-turn8.xirsys.com:80?transport=udp',
					'turn:eu-turn8.xirsys.com:3478?transport=udp',
					'turn:eu-turn8.xirsys.com:80?transport=tcp',
					'turn:eu-turn8.xirsys.com:3478?transport=tcp',
					'turns:eu-turn8.xirsys.com:443?transport=tcp',
					'turns:eu-turn8.xirsys.com:5349?transport=tcp',
				],
			},
		],
	},
];

export const getRtcConfig = (): RTCConfiguration => rtcConfigs[Math.floor(Math.random() * rtcConfigs.length)];
