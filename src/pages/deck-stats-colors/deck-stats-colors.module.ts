import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeckStatsColorsPage } from './deck-stats-colors';
import { ChartsModule } from 'ng2-charts';

@NgModule({
	declarations: [
		DeckStatsColorsPage,
	],
	imports: [
		ChartsModule,
		IonicPageModule.forChild(DeckStatsColorsPage),
	],
	exports: [
		DeckStatsColorsPage
	]
})
export class DeckStatsColorsModule { }
