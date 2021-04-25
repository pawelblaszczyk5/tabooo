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
		[
			41,
			{
				word: 'Płacić',
				forbidden: ['Cena', 'Gotówka', 'Pieniądze', 'Karta', 'Wydawać'],
			},
		],
		[
			42,
			{
				word: 'Piorun',
				forbidden: ['Grzmot', 'Uderzenie', 'Błyskawica', 'Błysk', 'Burza'],
			},
		],
		[
			43,
			{
				word: 'Kolonia',
				forbidden: ['Letnia', 'Siedlisko', 'Skupisko', 'Zimowa', 'Wakacje'],
			},
		],
		[
			44,
			{
				word: 'Jarosław Kaczyński',
				forbidden: ['Bliźniak', 'PiS', 'Kot', 'Polityk', 'Obrońcy krzyża'],
			},
		],
		[
			45,
			{
				word: 'Apollo',
				forbidden: ['Grecja', 'Misja', 'Kosmos', 'Księżyc', 'Muzy'],
			},
		],
		[
			46,
			{
				word: 'Puls',
				forbidden: ['Mierzyć', 'Tętno', 'Krew', 'Bicie serca', 'Częstotliwość'],
			},
		],
		[
			47,
			{
				word: 'Kolorowe kredki',
				forbidden: ['Rysowanie', 'Świecowe', 'Pudełeczko', 'Przedszkole', 'Ołówek'],
			},
		],
		[
			48,
			{
				word: 'Beniaminek',
				forbidden: ['Ulubieniec', 'Początkujący', 'Awans', 'Liga', 'Kwiat'],
			},
		],
		[
			49,
			{
				word: 'Proporzec',
				forbidden: ['Symbol', 'Sztandar', 'Kij', 'Materiał', 'Flaga'],
			},
		],
		[
			50,
			{
				word: 'Zamęt',
				forbidden: ['Wprowadzać', 'Bezład', 'Zamieszanie', 'Rozgardiasz', 'Chaos'],
			},
		],
		[
			51,
			{
				word: 'Żywiec',
				forbidden: ['Browar', 'Marka', 'Zdrój', 'Woda', 'Piwo'],
			},
		],
		[
			52,
			{
				word: 'Savoir Vivre',
				forbidden: ['Maniera', 'Zachowanie', 'Dobry', 'Zwyczaj', 'Nakrycie stołu'],
			},
		],
		[
			53,
			{
				word: 'Chwila',
				forbidden: ['Moment', 'Trwać', 'Czas', 'Sekunda', 'Krótki'],
			},
		],
		[
			54,
			{
				word: 'Festyn',
				forbidden: ['Ludowy', 'Jarmark', 'Balony', 'Odpust', 'Muzyka'],
			},
		],
		[
			55,
			{
				word: 'Pięciolinia',
				forbidden: ['Nuta', 'Klucz', 'Muzyka', 'Zapis', 'Zeszyt'],
			},
		],
		[
			56,
			{
				word: 'Hawana',
				forbidden: ['Fidel Castro', 'Cygaro', 'Rewolucja', 'Kuba', 'Dirty Dancing'],
			},
		],
		[
			57,
			{
				word: 'Sony',
				forbidden: ['Producent', 'Komórka', 'Aparat', 'Sprzęt', 'Telewizor'],
			},
		],
		[
			58,
			{
				word: 'Harcmistrz',
				forbidden: ['Harcerstwo', 'Awans', 'ZHP/ZHR', 'Stopień', 'Obóz'],
			},
		],
		[
			59,
			{
				word: 'Odpowietrzać',
				forbidden: ['Zawór', 'Spuszczać', 'Wentyl', 'Odkręcać', 'Kaloryfer'],
			},
		],
		[
			60,
			{
				word: 'Puma',
				forbidden: ['But', 'Czarny', 'Nike', 'Adidas', 'Kot'],
			},
		],
		[
			61,
			{
				word: 'Aktówka',
				forbidden: ['Mężczyzna', 'Dokument', 'Torba', 'Nesser', 'Przenosić'],
			},
		],
		[
			62,
			{
				word: 'Twierdza',
				forbidden: ['Więzienie', 'Gród', 'Fosa', 'Budowla', 'Fortyfikacja'],
			},
		],
		[
			63,
			{
				word: 'Notabene',
				forbidden: ['Łaciński', 'Margines', 'Nawiasem', 'A propos', 'Do tego'],
			},
		],
		[
			64,
			{
				word: 'Ida',
				forbidden: ['Kino', 'Agata Kulesza', 'Paweł Pawlikowski', 'Oscar', 'Film'],
			},
		],
		[
			65,
			{
				word: 'Bezsenność',
				forbidden: ['Sen', 'Tabletki nasenne', 'Zmęczenie', 'Nocny Marek', 'Łóżko'],
			},
		],
		[
			66,
			{
				word: 'Kalendarz',
				forbidden: ['Dzień', 'Rok', 'Data', 'Majów', 'Miesiąc'],
			},
		],
		[
			67,
			{
				word: 'Kara śmierci',
				forbidden: ['Wyrok', 'Szubienica', 'Zastrzyk', 'Korwin Mikke', 'Kat'],
			},
		],
		[
			68,
			{
				word: 'Biznesmen',
				forbidden: ['Pieniądze', 'Przedsiębiorca', 'Biznes', 'Garnitur', 'Interes'],
			},
		],
		[
			69,
			{
				word: 'Sufit',
				forbidden: ['Ściana', 'Podłoga', 'Strop', 'Powała', 'Dach'],
			},
		],
		[
			70,
			{
				word: 'Doniczka',
				forbidden: ['Kwiatki', 'Parapet', 'Ziemia', 'Rośliny', 'Sadzić'],
			},
		],
		[
			71,
			{
				word: 'Lunch',
				forbidden: ['Popołudnie', 'Posiłek', 'Jedzenie', 'Biuro', 'Obiad'],
			},
		],
		[
			72,
			{
				word: 'Zaskórnik',
				forbidden: ['Syf', 'Krosta', 'Pryszcz', 'Skóra', 'Twarz'],
			},
		],
		[
			73,
			{
				word: 'Wolność wyboru',
				forbidden: ['Swoboda', 'Możliwość', 'Wola', 'Decyzja', 'Niezależność'],
			},
		],
		[
			74,
			{
				word: 'Kopyto',
				forbidden: ['Podkowa', 'Stajnia', 'Noga', 'Kończyna', 'Koń'],
			},
		],
		[
			75,
			{
				word: 'Blef',
				forbidden: ['Prawda', 'Kłamstwo', 'Poker', 'Udawać', 'Błąd'],
			},
		],
		[
			76,
			{
				word: 'Paluszki',
				forbidden: ['Słone', 'Sól', 'Junior', 'Lajkonik', 'Przekąska'],
			},
		],
		[
			77,
			{
				word: 'Wirtualna Polska',
				forbidden: ['Portal', 'Internet', 'Poczta', 'Wiadomości', 'Wyszukiwarka'],
			},
		],
		[
			78,
			{
				word: 'Znaki czasu',
				forbidden: ['Pokazywać', 'Drogowe', 'Zegar', 'Wsółczesność', 'Wydarzenie'],
			},
		],
		[
			79,
			{
				word: 'Chrapać',
				forbidden: ['Nos', 'Spać', 'Przeszkadzać', 'Noc', 'Pościel'],
			},
		],
		[
			80,
			{
				word: 'Pontyfikat',
				forbidden: ['Kadencja', 'Papież', 'Watykan', 'Czas', 'Jan Paweł II'],
			},
		],
		[
			81,
			{
				word: 'Jamochłon',
				forbidden: ['Wodny', 'Meduza', 'Stworzenie', 'Gęba', 'Biologia'],
			},
		],
		[
			82,
			{
				word: 'Mop',
				forbidden: ['Vileda', 'Wyciskać', 'Podłoga', 'Wiadro', 'Myć'],
			},
		],
		[
			83,
			{
				word: 'Pontyfikat',
				forbidden: ['Kadencja', 'Papież', 'Watykan', 'Czas', 'Jan'],
			},
		],
		[
			84,
			{
				word: 'Wierzba płacząca',
				forbidden: ['Oko', 'Drzewo', 'Łzy', 'Ryk', 'Beksa'],
			},
		],
		[
			85,
			{
				word: 'Jantar',
				forbidden: ['Bursztyn', 'Żywica', 'Kurort', 'Anna', 'Morze'],
			},
		],
		[
			86,
			{
				word: 'Sushi',
				forbidden: ['Ryba', 'Ryż', 'Japonia', 'Chrzan', 'Wodorost'],
			},
		],
		[
			87,
			{
				word: 'Mielizna',
				forbidden: ['Statek', 'Płytko', 'Osiąść', 'Ocean', 'Morze'],
			},
		],
		[
			88,
			{
				word: 'Mężczyzna',
				forbidden: ['Chłopak', 'Samiec', 'Facet', 'Kobieta', 'Płeć'],
			},
		],
		[
			89,
			{
				word: 'Wiadro',
				forbidden: ['Woda', 'Kubeł', 'Podłoga', 'Walić', 'Ścierka'],
			},
		],
		[
			90,
			{
				word: 'Magik',
				forbidden: ['Paktofonika', 'Sztuczka', 'Czarodziej', 'Okno', 'Różdżka'],
			},
		],
		[
			91,
			{
				word: 'Spokój',
				forbidden: ['Uczucie', 'Stan', 'Zdenerwowany', 'Ktoś', 'Cisza'],
			},
		],
		[
			92,
			{
				word: 'Dostatek',
				forbidden: ['Zasobność', 'Wystawność', 'Bogactwo', 'Przepych', 'Nadmiar'],
			},
		],
		[
			93,
			{
				word: 'Bryła',
				forbidden: ['Architektura', 'Przestrzenna', 'Geomteria', 'Lód', 'Matematyka'],
			},
		],
		[
			94,
			{
				word: 'Prędkość',
				forbidden: ['Samochód', 'Przemieszczanie', 'Pęd', 'Ograniczenie', 'Kiloemtry'],
			},
		],
		[
			95,
			{
				word: 'Makówka',
				forbidden: ['Czerwony', 'Ciasto', 'Roślina', 'Narkoman', 'Monte Cassino'],
			},
		],
		[
			96,
			{
				word: 'Wesz',
				forbidden: ['Włosy', 'Pchła', 'Pasożyt', 'Łonowa', 'Menda'],
			},
		],
		[
			97,
			{
				word: 'Kaukaz',
				forbidden: ['Góry', 'Owczarek', 'Rasa', 'Elbrus', 'Azja'],
			},
		],
		[
			98,
			{
				word: 'Akustyka',
				forbidden: ['Fonia', 'Słuch', 'Sala koncertowa', 'Fale dźwiękowe', 'Fizyka'],
			},
		],
		[
			99,
			{
				word: 'Klapki',
				forbidden: ['Basen', 'Oczy', 'Obuwie', 'Lato', 'Japonki'],
			},
		],
		[
			100,
			{
				word: 'T-Rex',
				forbidden: ['Park Jurajski', 'Jura', 'Prehistoryczny', 'Wyginąć', 'Dinozaur'],
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
