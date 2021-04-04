import {writable} from 'svelte/store';

const createAdminStore = () => {
	const {subscribe, set} = writable(false);

	return {
		subscribe,
		set,
	};
};

export const admin = createAdminStore();
