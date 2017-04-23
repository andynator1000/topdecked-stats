import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeckStatsCMCPage } from './deck-stats-cmc';
import { ChartsModule } from 'ng2-charts';

@NgModule({
	declarations: [
		DeckStatsCMCPage,
	],
	imports: [
		ChartsModule,
		IonicPageModule.forChild(DeckStatsCMCPage),
	],
	exports: [
		DeckStatsCMCPage
	]
})
export class DeckStatsCMCModule { }
