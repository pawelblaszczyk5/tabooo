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
	nickname: string;
}

const createSettingsStore = () => {
	const settings: Settings = {
		theme: (localStorage.getItem('tabooSettingsTheme') as Theme) || Theme.DEFAULT,
		nickname: (localStorage.getItem('tabooNickname') as string) || '',
	};
	const {subscribe, update} = writable<Settings>(settings);

	return {
		subscribe,
		setTheme: (newTheme: Theme) =>
			update((currentSettings) => {
				localStorage.setItem('tabooSettingsTheme', newTheme);
				return {...currentSettings, theme: newTheme};
			}),
		setNickname: (newNickname: string) => {
			update((currentSettings) => {
				localStorage.setItem('tabooNickname', newNickname);
				return {...currentSettings, nickname: newNickname};
			});
		},
	};
};

export const settings = createSettingsStore();
