import {Language} from '../model/language';

const cardsPolish: Map<number, Card> = new Map([
	[
		1,
		{
			word: 'kościół',
			forbidden: ['test', 'test', 'test', 'test', 'test'],
		},
	],
]);

const cardsEnglish: Map<number, Card> = new Map([
	[
		1,
		{
			word: 'church',
			forbidden: ['test', 'test', 'test', 'test', 'test'],
		},
	],
]);

const getCard = (id: number, language: Language): Card => {
	const card = language === Language.ENGLISH ? cardsEnglish.get(id) : cardsPolish.get(id);
	return card ?? badIdCard;
};

const badIdCard: Card = {
	word: 'error',
	forbidden: [],
};

export interface Card {
	word: string;
	forbidden: Array<string>;
}
