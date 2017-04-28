import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { Card, Deck, Type } from '../../models'
import { DECKS } from '../../data';

import { CardService } from '../../providers/card-service';

@IonicPage({
	segment: "deck-stats-cmc/:deckId"
})
@Component({
  selector: 'page-deck-stats-types',
  templateUrl: 'deck-stats-types.html',
})
export class DeckStatsTypesPage {
	public deck: Deck;

	instant: Type = {title: "Instant", includes: ["Instant"], excludes: []}
	sorcery: Type = {title: "Sorcery", includes: ["Sorcery"], excludes: []}
	creature: Type = { title: "Creatures", includes: ["Creature"], excludes: [] };
	land: Type = { title: "Lands", includes: ["Land"], excludes: [] };
	planeswalker: Type = { title: "Planeswalkers", includes: ["Planeswalker"], excludes: [] };
	artifact: Type = { title: "Artifacts", includes: ["Artifact"], excludes: [] };
	enchantment: Type = { title: "Enchantments", includes: ["Enchantment"], excludes: [] };
	
	
	

	public statsChartLabels: string[] = ['Instant', 'Sorcery', 'Creature', 'Land', "Planeswalker", "Artifact", "Enchantment"];
	public statsChartData: number[] = [0, 0, 0, 0, 0, 0, 0];
	public statsChartType: string = 'pie';
	public statsHover: string = "";

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
			if (cardService.cardIsTypes(card, [this.instant])) {
				this.statsChartData[0]++;
			}
			if (cardService.cardIsTypes(card, [this.sorcery])) {
				this.statsChartData[1]++;
			}
			if (cardService.cardIsTypes(card, [this.creature])) {
				this.statsChartData[2]++;
			}
			if (cardService.cardIsTypes(card, [this.land])) {
				this.statsChartData[3]++;
			}
			if (cardService.cardIsTypes(card, [this.planeswalker])) {
				this.statsChartData[4]++;
			}
			if (cardService.cardIsTypes(card, [this.artifact])) {
				this.statsChartData[5]++;
			}
			if (cardService.cardIsTypes(card, [this.enchantment])) {
				this.statsChartData[6]++;
			}
			
		}

	}

	public cardActive(card: Card) {
		
	}

	// events
	public chartClicked(e: any): void {
	
	}

	public chartHovered(e: any): void {
		console.log(e);
	}



}
