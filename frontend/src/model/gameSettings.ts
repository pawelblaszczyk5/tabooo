export interface GameSettings {
	roundTime: 30 | 60 | 90 | 120;
	pointsToWin: 10 | 20 | 30 | 40;
	skipsAvailable: 0 | 1 | 2 | 3 | 4;
}

export const defaultGameSettings: GameSettings = {
	roundTime: 60,
	pointsToWin: 20,
	skipsAvailable: 2,
};
