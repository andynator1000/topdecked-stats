import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeckStatsTypesPage } from './deck-stats-types';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DeckStatsTypesPage,
  ],
  imports: [
  	ChartsModule,
    IonicPageModule.forChild(DeckStatsTypesPage),
  ],
  exports: [
    DeckStatsTypesPage
  ]
})
export class DeckStatsTypesModule {}
