import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ChartsModule } from 'ng2-charts';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { CardService } from '../providers/card-service';

@NgModule({
	declarations: [
		MyApp,
		HomePage
	],
	imports: [
		BrowserModule,
		ChartsModule,
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage
	],
	providers: [
		CardService,
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
