import type {Socket} from 'socket.io-client';
import {writable} from 'svelte/store';

const createSocketStore = () => {
	const {subscribe, set} = writable<Socket | null>(null);

	return {
		subscribe,
		saveSocket: (socket: Socket) => {
			set(socket);
		},
		removeSocket: () => {
			set(null);
		},
	};
};

export const socket = createSocketStore();
