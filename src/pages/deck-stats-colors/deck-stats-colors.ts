import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { Card, Deck, Type } from '../../models'
import { DECKS } from '../../data';

import { CardService } from '../../providers/card-service';

@IonicPage({
	segment: "deck-stats-colors/:deckId"
})
@Component({
	selector: 'page-deck-stats-colors',
	templateUrl: 'deck-stats-colors.html',
})
export class DeckStatsColorsPage {
	public deck: Deck;

	creature: Type = { title: "Creatures", includes: ["Creature"], excludes: ["Land"] };
	planeswalker: Type = { title: "Planeswalkers", includes: ["Planeswalker"], excludes: ["Creature"] };
	spell: Type = { title: "Spells", includes: ["Instant", "Sorcery"], excludes: ["Creature"] };
	artifact: Type = { title: "Artifacts", includes: ["Artifact"], excludes: ["Creature", "Land"] };
	enchantment: Type = { title: "Enchantments", includes: ["Enchantment"], excludes: ["Creature"] };
	land: Type = { title: "Lands", includes: ["Land"], excludes: [] };

	public colorsChartLabels: string[] = ['U', 'B', 'R', 'G', "W", "Other"];
	public colorsChartData: number[] = [0, 0, 0, 0, 0, 0];
	public colorsChartType: string = 'pie';
	public colorsHover: string = "";
	public colorsChartColors: any[] = [{
		backgroundColor: [
		/* blue*/ "#0000CC",
		/*black*/"#000000",
		/*red*/"#CC0000",
		/*green*/"#008000",
		/*white*/"#FFFACD",
		/*other*/"#D3D3D3"]
	}];

	constructor(
		public cardService: CardService,
		public navCtrl: NavController,
		public navParams: NavParams
	) {
		this.deck = navParams.get("deck");
		let deckId = navParams.get("deckId");

		/* Some code to help us work faster when Ionic reloads the page and the "deck" NavParam gets cleared */
		if (!this.deck) {
			for (let deck of DECKS) {
				if (deck.id === deckId) {
					this.deck = deck;
				}
			}
		}

		for (let card of this.deck.main) {
			if (!cardService.cardIsTypes(card, [this.land])) {
				if (card.colorIdentity) {
					if (card.colors.indexOf('Blue') > -1) {
						this.colorsChartData[0]++;
					} if (card.colors.indexOf('Black') > -1) {
						this.colorsChartData[1]++;
					} if (card.colors.indexOf('Red') > -1) {
						this.colorsChartData[2]++;
					} if (card.colors.indexOf('Green') > -1) {
						this.colorsChartData[3]++;
					} if (card.colors.indexOf('W') > -1) {
						this.colorsChartData[4]++;
					}
				} else {
					this.colorsChartData[5]++;
				}
			}
		}
	}

	public cardActive(card: Card) {
		return card.colorIdentity && card.colorIdentity.indexOf(this.colorsHover) > -1;
	}

	// events
	public chartClicked(e: any): void {
		console.log(e);
		if (e && e.active && e.active[0])
			this.colorsHover = this.colorsChartLabels[e.active[0]._index];
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

}
