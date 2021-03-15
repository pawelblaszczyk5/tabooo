import {writable} from 'svelte/store';

export enum Theme {
	DEFAULT = 'default',
	CANDY = 'candy',
	DARK = 'dark',
	ELEGANT = 'elegant',
	TONED = 'toned',
}

export interface Settings {
	theme: Theme;
}

const createSettingsStore = () => {
	const {subscribe, update} = writable<Settings>({theme: Theme.DEFAULT});

	return {
		subscribe,
		setTheme: (newTheme: Theme) => update((currentSettings) => ({...currentSettings, theme: newTheme})),
	};
};

export const settingsStore = createSettingsStore();
