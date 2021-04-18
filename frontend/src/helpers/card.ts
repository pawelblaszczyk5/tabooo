import {Language} from '../model/language';

const Cards: Record<Language, Map<number, Card>> = {
	[Language.POLISH]: new Map([
		[
			1,
			{
				word: 'Kokpit',
				forbidden: ['Pilot', 'Samolot', 'Menedżerski', 'Kabina', 'Przyciski'],
			},
		],
		[
			2,
			{
				word: 'Kwintesencja',
				forbidden: ['Sprawa', 'Sedno', 'Istota', 'Meritum', 'Dokładny'],
			},
		],
		[
			3,
			{
				word: 'Kasacja',
				forbidden: ['Szkoda całkowita', 'Złomowiec', 'Kolizja', 'Pojazd', 'Likwidacja'],
			},
		],
		[
			4,
			{
				word: 'Spadek',
				forbidden: ['Rodzina', 'Pisać', 'Śmierć', 'Testament', 'Otrzymać'],
			},
		],
		[
			5,
			{
				word: 'Implantacja',
				forbidden: ['Zahaczanie', 'Nidacja', 'Wczepianie', 'Zagnieżdżanie', 'Zarodek'],
			},
		],
		[
			6,
			{
				word: 'Gulnąć',
				forbidden: ['Wypić', 'Płyn', 'Wódka', 'Przechylić', 'Gardło'],
			},
		],
		[
			7,
			{
				word: 'Zmarszczki',
				forbidden: ['Mimiczne', 'Babcia', 'Twarz', 'Starość', 'Botoks'],
			},
		],
		[
			8,
			{
				word: 'Słonina',
				forbidden: ['Skwarki', 'Tłuszcz', 'Smalec', 'Świunia', 'Zasmażka'],
			},
		],
		[
			9,
			{
				word: 'Turlać',
				forbidden: ['Kula', 'Toczyć', 'Przesuwać', 'Podłoga', 'Pchać'],
			},
		],
		[
			10,
			{
				word: 'Stanowisko',
				forbidden: ['Punkt widzenia', 'Postawić', 'Ranga', 'Awans', 'Szczebel'],
			},
		],
		[
			11,
			{
				word: 'Schizofrenia',
				forbidden: ['Urojenia', 'Rozdwojenie jaźni', 'Choroba psychizna', 'Psychoza', 'Wariat'],
			},
		],
		[
			12,
			{
				word: 'Wakat',
				forbidden: ['Etat', 'Firma', 'Wolny', 'Stanowisko', 'Praca'],
			},
		],
		[
			13,
			{
				word: 'Kraksa',
				forbidden: ['Jechać', 'Samochód', 'Karambol', 'Wypadek', 'Stłuczka'],
			},
		],
		[
			14,
			{
				word: 'Defetyzm',
				forbidden: ['Siejesz', 'Niewiara', 'Porażka', 'Pesymizm', 'Zwycięstwo'],
			},
		],
		[
			15,
			{
				word: 'Sterydy',
				forbidden: ['Mieśnie', 'Środki', 'Zastrzyk', 'Sportowcy', 'Siłownia'],
			},
		],
		[
			16,
			{
				word: 'Latarka',
				forbidden: ['Baterie', 'Światło', 'Pod namiotem', 'Lampa', 'Żarówka'],
			},
		],
		[
			17,
			{
				word: 'Remiza',
				forbidden: ['Wesele', 'Wieś', 'Budynek', 'Strażak', 'Stypa'],
			},
		],
		[
			18,
			{
				word: 'ONZ',
				forbidden: ['Świat', 'Wojna', 'Pokój', 'Skrót', 'Nowy Jork'],
			},
		],
		[
			19,
			{
				word: 'Waga',
				forbidden: ['Szalka', 'Ciężar', 'Ilość', 'Gram', 'Kilogram'],
			},
		],
		[
			20,
			{
				word: 'Malibu',
				forbidden: ['Kokos', 'Drink', 'Alkohol', 'Rum', 'Pić'],
			},
		],
		[
			21,
			{
				word: 'Konstytucja',
				forbidden: ['3 maja', 'Sejm 4 letni', 'Obywatel', 'Demokracja', 'Państwo'],
			},
		],
		[
			22,
			{
				word: 'Fajerwerki',
				forbidden: ['Niebo', 'Wybuch', 'Sylwester', 'Kolorowe', 'Rakiety'],
			},
		],
		[
			23,
			{
				word: 'Czas',
				forbidden: ['Odmierzać', 'Kalendarz', 'Zegar', 'Minuta', 'Klepsydra'],
			},
		],
		[
			24,
			{
				word: 'Integracja',
				forbidden: ['Nowi ludzie', 'Zabawa', 'Poznać się', 'Impreza', 'Wyjazd'],
			},
		],
		[
			25,
			{
				word: 'Żarcie',
				forbidden: ['Wielkie', 'Pasibrzuch', 'Głód', 'Pokarm', 'Jedzenie'],
			},
		],
		[
			26,
			{
				word: 'Gorąca czekolada',
				forbidden: ['Słodki', 'Mleczna', 'Kakao', 'Rozgrzewający', 'Napój'],
			},
		],
		[
			27,
			{
				word: 'Kantor',
				forbidden: ['Euro', 'Pieniądze', 'Kurs', 'Waluta', 'Dolar'],
			},
		],
		[
			28,
			{
				word: 'Wenecja',
				forbidden: ['Miasto', 'Włochhy', 'Łódź', 'Kanał', 'Rzym'],
			},
		],
		[
			29,
			{
				word: 'Strajk',
				forbidden: ['Przerwa', 'Związki zawodowe', 'Praca', 'Stocznia', 'Szpital'],
			},
		],
		[
			30,
			{
				word: 'Rekrutacja',
				forbidden: ['Uczelnia', 'Pobór', 'Szukanie', 'Praca', 'Rozmowa'],
			},
		],
		[
			31,
			{
				word: 'Ropucha',
				forbidden: ['Brzydki', 'Żaba', 'Całus', 'Książę', 'Płaz'],
			},
		],
		[
			32,
			{
				word: 'Poczta głosowa',
				forbidden: ['Wiadomośc', 'Sekretarka', 'Telefon', 'Sygnał', 'Nagranie'],
			},
		],
		[
			33,
			{
				word: 'Wytrych',
				forbidden: ['Otwierać', 'Dzrwi', 'Pasować', 'Włamać', 'Klucz'],
			},
		],
		[
			34,
			{
				word: 'Taczka',
				forbidden: ['Przewozić', 'Koło', 'Jeden', 'Budowa', 'Ogród'],
			},
		],
		[
			35,
			{
				word: 'Świerzb',
				forbidden: ['Drapanie', 'Choroba', 'Wysypka', 'Pasożyt', 'Skóra'],
			},
		],
		[
			36,
			{
				word: 'Bąk',
				forbidden: ['Smród', 'Puszczać', 'Owad', 'Osa', 'Pszczoła'],
			},
		],
		[
			37,
			{
				word: 'Tradycja',
				forbidden: ['Obrzędy', 'Obyczaj', 'Historia', 'Zwyczaj', 'Kultura'],
			},
		],
		[
			38,
			{
				word: 'Naturysta',
				forbidden: ['Nagi człowiek', 'Ubrania', 'Plaża', 'Nudysta', 'Golas'],
			},
		],
		[
			39,
			{
				word: 'Antresola',
				forbidden: ['Półpiętro', 'Góra', 'Mieszkanie', 'Schody', 'Kondygnacja'],
			},
		],
		[
			40,
			{
				word: 'Moskitiera',
				forbidden: ['Zasłona', 'Komar', 'Okno', 'Siatka', 'Firanka'],
			},
		],
	]),
	[Language.ENGLISH]: new Map([
		[
			1,
			{
				word: 'Highway',
				forbidden: ['Road', 'Street', 'Freeway', 'Life', 'Drive'],
			},
		],
		[
			2,
			{
				word: 'Clown',
				forbidden: ['Nose', 'Funny', 'Big', 'Circus', 'Makeup'],
			},
		],
		[
			3,
			{
				word: 'Mickey Mouse',
				forbidden: ['Orlando', 'Donald Duck', 'Disney', 'Character', 'Magic'],
			},
		],
		[
			4,
			{
				word: 'Penny',
				forbidden: ['Lucky', 'Coin', 'Change', 'Nickel', 'Dime'],
			},
		],
		[
			5,
			{
				word: 'Logistics',
				forbidden: ['Details', 'Schedule', 'Time', 'Figure', 'Decide'],
			},
		],
		[
			6,
			{
				word: 'Customers',
				forbidden: ['Claimant', 'Caller', 'Insured', 'Policyholder', 'Service'],
			},
		],
		[
			7,
			{
				word: 'Rabbit',
				forbidden: ['Long ears', 'Hop', 'Bunny', 'Animal', 'Bugs Bunny'],
			},
		],
		[
			8,
			{
				word: 'Vote',
				forbidden: ['Politics', 'Election', 'President', 'Mayor', 'Nominate'],
			},
		],
		[
			9,
			{
				word: 'Oreo',
				forbidden: ['Nabisco', 'Milk', 'Cookie', 'Sandwich', 'Cream'],
			},
		],
		[
			10,
			{
				word: 'Engine',
				forbidden: ['Start', 'Car', 'Power', 'Horse', 'Fuel'],
			},
		],
		[
			11,
			{
				word: 'Algebra',
				forbidden: ['Number', 'Math', 'Variable', 'X', 'Geometry'],
			},
		],
		[
			12,
			{
				word: 'Trumpet',
				forbidden: ['Music', 'Brass', 'Bugle', 'Instrument', 'Play'],
			},
		],
		[
			13,
			{
				word: 'Taco',
				forbidden: ['Cheese', 'Mexican', 'Shell', 'Food', 'Lettuce'],
			},
		],
		[
			14,
			{
				word: 'Jail',
				forbidden: ['Law', 'Penalty', 'Police', 'Illegal', 'Bars'],
			},
		],
		[
			15,
			{
				word: 'Discover',
				forbidden: ['Look', 'See', 'Find', 'Columbus', 'Explorer'],
			},
		],
		[
			16,
			{
				word: 'Saddle',
				forbidden: ['Whip', 'Horse', 'Jockey', 'Reins', 'Sit'],
			},
		],
		[
			17,
			{
				word: 'Caddy',
				forbidden: ['Assistant', 'Golf', 'Shack', 'Clubs', 'Course'],
			},
		],
		[
			18,
			{
				word: 'Vacuum',
				forbidden: ['Clean', 'Suck', 'Dust', 'Carpet', 'Chore'],
			},
		],
		[
			19,
			{
				word: 'Suffice',
				forbidden: ['Enough', 'Amount', 'Complete', 'Should', 'Time'],
			},
		],
		[
			20,
			{
				word: 'Median',
				forbidden: ['Mode', 'Middle', 'Order', 'Data', 'Range'],
			},
		],
		[
			21,
			{
				word: 'Clutch',
				forbidden: ['Kick', 'Gear', 'Grab', 'Shift', 'Tight'],
			},
		],
		[
			22,
			{
				word: 'Terantula',
				forbidden: ['Spider', 'Hairy', 'Webs', 'Dangerous', 'Arachnid'],
			},
		],
		[
			23,
			{
				word: 'Real world',
				forbidden: ['MTV', 'Show', 'Reality', 'Job', 'College'],
			},
		],
		[
			24,
			{
				word: 'Twice',
				forbidden: ['Three', 'Two', 'Times', 'Happen', 'Occur'],
			},
		],
		[
			25,
			{
				word: 'Greece',
				forbidden: ['Athens', 'Europe', 'Parthenon', 'Souvlaki', 'Country'],
			},
		],
		[
			26,
			{
				word: 'Gap',
				forbidden: ['Store', 'Generation', 'Fall', 'Jeans', 'Gulch'],
			},
		],
		[
			27,
			{
				word: 'Pitbull',
				forbidden: ['Tail', 'Dog', 'Breed', 'Bite', 'Fight'],
			},
		],
		[
			28,
			{
				word: 'Swordfish',
				forbidden: ['Eat', 'Blade', 'Ocean', 'Sea', 'Nose'],
			},
		],
		[
			29,
			{
				word: 'Coast',
				forbidden: ['Water', 'East', 'Sea', 'West', 'Beach'],
			},
		],
		[
			30,
			{
				word: 'Extinct',
				forbidden: ['Dead', 'Animal', 'Dinosaur', 'Exist', 'Endangered'],
			},
		],
		[
			31,
			{
				word: 'Caviar',
				forbidden: ['Balls', "Fish's eggs", 'Black', 'Luxury', 'Expensive'],
			},
		],
		[
			32,
			{
				word: 'Indiana',
				forbidden: ['State', 'Jones', 'Hoosier', 'Bobby', 'Midwest'],
			},
		],
		[
			33,
			{
				word: 'Rover',
				forbidden: ['Space', 'Red', 'Land', 'Range', 'Pirate'],
			},
		],
		[
			34,
			{
				word: 'Joseph Stalin',
				forbidden: ['Lenin', 'Communist', 'Five year plan', 'Leader', 'Russia'],
			},
		],
		[
			35,
			{
				word: 'Fingernail',
				forbidden: ['Cut', 'Hand', 'Polish', 'Fake', 'Manicure'],
			},
		],
		[
			36,
			{
				word: 'Nip',
				forbidden: ['Cold', 'Bite', 'Puppy', 'Pinch', 'Tucl'],
			},
		],
		[
			37,
			{
				word: 'Stick',
				forbidden: ['Straight', 'Wand', 'Line', 'Wood', 'USB'],
			},
		],
		[
			38,
			{
				word: 'Cookie',
				forbidden: ['Milk', 'Santa Claus', 'Chocolate chip', 'Oatmeal Raisin', 'Eat'],
			},
		],
		[
			39,
			{
				word: 'Broccoli',
				forbidden: ['Cauliflower', 'Green', 'Tree', 'Vegetable', 'Head'],
			},
		],
		[
			40,
			{
				word: 'Anchors',
				forbidden: ['Vessel', 'Ship', 'Lock', 'Boat', 'Hoist'],
			},
		],
	]),
};

export const getCard = (id: number, language: Language): Card => {
	return Cards[language].get(id) ?? badIdCard;
};

const badIdCard: Card = {
	word: 'error',
	forbidden: [],
};

export interface Card {
	word: string;
	forbidden: Array<string>;
}
