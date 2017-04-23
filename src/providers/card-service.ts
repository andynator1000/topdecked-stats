import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Card, Type } from '../models';

@Injectable()
export class CardService {

	serviceAddress: string;

	/* Return the complete card name. This properly creates names for fuse cards like "Wear // Tear" */
	getCompleteCardName(card: Card) {
		if (card === null || card === undefined) return "";
		let result: string = card.name;
		if (card.layout === "split") {
			result = card.names.join(' // ');
		}
		return result;
	}

	cardIsTypes(card: Card, types: Type[]): boolean {
		var result = false;
		if (!result) {
			for (let type of types) {
				if (Arrays.arrayContainsAny(type.includes, card.types) && !Arrays.arrayContainsAny(type.excludes, card.types)) {
					result = true;
					break;
				}
			}
		}
		return result;
	}

	isUnlimitedQuantity(card: Card) {
		if (card.multiverseid != undefined &&
			(card.multiverseid === 73573 // Relentless Rats
				|| card.multiverseid === 135236 // Relentless Rats
				|| card.multiverseid === 191336 // Relentless Rats
				|| card.multiverseid === 205082 // Relentless Rats
				|| card.multiverseid === 370746) // Shadowborn Apostle)
		) {
			return true;
		}
		if (card.supertypes != undefined && Arrays.arrayContainsAny(card.supertypes, ["Basic"])) {
			return true;
		}
		return false;
	}

	cleanCardData(cards: Card[]) {
		cards.forEach((card) => {
			delete card.artist;
			delete card.flavor;
			delete card.foreignNames;
			delete card.imageName;
			delete card.legalities;
			delete card.mciNumber;
			delete card.number;
			delete card.originalText;
			delete card.originalType;
			delete card.printings;
			delete card.rarity;
			delete card.rulings;
			delete card.set;
			delete card.text;
			delete card.variations;
			delete card.watermark;
		});
	}

	sortCards(cards: Card[]): Card[] {
		cards.sort((n1, n2) => {
			var cmc1 = n1.cmc === undefined ? 0 : n1.cmc;
			var cmc2 = n2.cmc === undefined ? 0 : n2.cmc;

			var result = 0;
			if (cmc1 > cmc2) {
				result = 1;
			}
			else if (cmc1 < cmc2) {
				result = -1;
			}
			else {
				var name1 = n1.name.toLowerCase();
				var name2 = n2.name.toLowerCase();

				if (name1 > name2) {
					result = 1;
				}
				else if (name1 < name2) {
					result = -1;
				}
			}

			return result;
		});
		return cards;
	}

	sortCardsAlphabetical(cards: Card[]): Card[] {
		cards.sort((n1, n2) => {
			var name1 = n1.name.toLowerCase();
			var name2 = n2.name.toLowerCase();

			var result = 0;
			if (name1 > name2) {
				result = 1;
			}
			else if (name1 < name2) {
				result = -1;
			}

			return result;
		});
		return cards;
	}

}

export class Arrays {
	static arrayContainsAny(haystack: any[], needles: any[]): boolean {
		for (var needle of needles) {
			if (haystack.indexOf(needle) > -1) {
				return true;
			}
		}
		return false;
	}
}
