import {writable} from 'svelte/store';

const createMediaStreamStore = () => {
	const {subscribe, update} = writable<MediaStream | null>(null);

	return {
		subscribe,
		saveStream: (stream: MediaStream) => {
			update(() => stream);
		},
		removeStream: () => {
			update(() => null);
		},
	};
};

export const mediaStream = createMediaStreamStore();
