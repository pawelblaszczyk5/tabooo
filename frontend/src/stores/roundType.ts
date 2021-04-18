import {writable} from 'svelte/store';
import {RoundType} from '../model/roundType';

const createRoundTypeStore = () => {
	const {subscribe, set} = writable<RoundType>(RoundType.GUESSING);

	return {
		subscribe,
		set,
	};
};

export const roundType = createRoundTypeStore();
