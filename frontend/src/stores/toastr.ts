import {writable} from 'svelte/store';

export interface Toastr {
	id: number;
	message: string;
}

const createToastrStore = () => {
	const {update, subscribe} = writable<Array<Toastr>>([]);

	return {
		subscribe,
		addToastr: (toastrMessage: string) => {
			update((toastrArray) => {
				const id = (toastrArray[toastrArray.length]?.id ?? 0) + 1;
				const newToastr: Toastr = {
					id,
					message: toastrMessage,
				};
				setTimeout(() => {
					update((toastrArray) => {
						return toastrArray.filter((toastr) => toastr.id !== id);
					});
				}, 2500);
				return [...toastrArray, newToastr];
			});
		},
	};
};

export const toastr = createToastrStore();
