import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Deck } from '../../models'
import { DECKS } from '../../data';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	decks = DECKS;

	constructor(public navCtrl: NavController) {

	}

	goTo(deck: Deck, page: string) {
		this.navCtrl.push(page, { deck: deck, deckId: deck.id });
	}
}
