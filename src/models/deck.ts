
export interface Deck {
	id?: string;
	name?: string;
	checksum?: string; // md5(JSON.stringify(main) + JSON.stringify(sb) + JSON.stringify(format))
	description?: string;
	featuredCard?: Card;
	format?: string;
	main: Card[];
	sb: Card[];
	violations: DeckViolation[];

	// For syncing with server
	created?: string;
	updated?: string;
}

export interface DeckViolation {
	zone?: string;
	card?: string;
	message: string;
}

/*
 * Card interface representing the MTG JSON format:
 * https://mtgjson.com/documentation.html
 */
export interface Card {
	// required
	multiverseid: number;

	// optional
	quantity?: number;
	id?: string;
	layout?: string;
	name?: string;
	names?: string[];
	manaCost?: string;
	cmc?: number;
	colors?: string[];
	colorIdentity?: string[];
	type?: string;
	supertypes?: string[];
	types?: string[];
	subtypes?: string[];
	rarity?: string[];
	text?: string[];
	flavor?: string[];
	artist?: string[];
	number?: string;
	power?: string;
	toughness?: string;
	loyalty?: number;
	variations?: number[];
	imageName?: string;
	watermark?: string;
	border?: string;
	timeshifted?: boolean;
	hand?: number;
	life?: number;
	reserved?: boolean;
	releaseDate?: string;
	set?: string;
	starter?: boolean;
	mciNumber?: number;
	rulings?: Object[];
	foreignNames?: Object[];
	printings?: string[];
	originalText?: string;
	originalType?: string;
	legalities?: Object[];
	source?: string;
}

export interface Type {
	title: string,
	includes: string[],
	excludes: string[]
}
