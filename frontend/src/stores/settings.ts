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
	const settings: Settings = {
		theme: (localStorage.getItem('tabooSettingsTheme') as Theme) ?? Theme.DEFAULT,
	};
	const {subscribe, update} = writable<Settings>(settings);

	return {
		subscribe,
		setTheme: (newTheme: Theme) =>
			update((currentSettings) => {
				localStorage.setItem('tabooSettingsTheme', newTheme);
				return {...currentSettings, theme: newTheme};
			}),
	};
};

export const settingsStore = createSettingsStore();
