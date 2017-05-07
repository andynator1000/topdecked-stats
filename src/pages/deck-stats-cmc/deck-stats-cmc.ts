import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { Card, Deck, Type } from '../../models'
import { DECKS } from '../../data';

import { CardService } from '../../providers/card-service';

@IonicPage({
	segment: "deck-stats-cmc/:deckId"
})
@Component({
	selector: 'page-deck-stats-cmc',
	templateUrl: 'deck-stats-cmc.html',
})
export class DeckStatsCMCPage {
	public deck: Deck;

	creature: Type = { title: "Creatures", includes: ["Creature"], excludes: ["Land"] };
	planeswalker: Type = { title: "Planeswalkers", includes: ["Planeswalker"], excludes: ["Creature"] };
	spell: Type = { title: "Spells", includes: ["Instant", "Sorcery"], excludes: ["Creature"] };
	artifact: Type = { title: "Artifacts", includes: ["Artifact"], excludes: ["Creature", "Land"] };
	enchantment: Type = { title: "Enchantments", includes: ["Enchantment"], excludes: ["Creature"] };
	land: Type = { title: "Lands", includes: ["Land"], excludes: [] };

	public cmcChartLabels: string[] = ['CMC 0', 'CMC 1', 'CMC 2', 'CMC 3', "CMC 4", "CMC 5", "CMC 6+"];
	public cmcChartData: number[] = [0, 0, 0, 0, 0, 0, 0];
	public cmcChartType: string = 'bar';
	public cmcHover: number = null;

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
				if (card.cmc === 0) {
					this.cmcChartData[0]++;
				} else if (card.cmc === 1) {
					this.cmcChartData[1]++;
				} else if (card.cmc === 2) {
					this.cmcChartData[2]++;
				} else if (card.cmc === 3) {
					this.cmcChartData[3]++;
				} else if (card.cmc === 4) {
					this.cmcChartData[4]++;
				} else if (card.cmc === 5) {
					this.cmcChartData[5]++;
				} else if (card.cmc > 5) {
					this.cmcChartData[6]++;
				}
			}
		}
	}

	public cardActive(card: Card) {
		return card.cmc === this.cmcHover;
	}

	// events
	public chartClicked(e: any): void {
		if (e && e.active && e.active[0])
			this.cmcHover = e.active[0]._index;
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

}
