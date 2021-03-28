import {writable} from 'svelte/store';

const createPasswordStore = () => {
	const {subscribe, update} = writable('');

	return {
		subscribe,
		setPassword: (password: string) => {
			update(() => password);
		},
		clearPassword: () => {
			update(() => '');
		},
	};
};

export const password = createPasswordStore();
