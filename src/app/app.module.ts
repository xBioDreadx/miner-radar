import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsProvider } from '../providers/settings/settings';
import { ConnectionProvider } from '../providers/connection/connection';
import { MinerProvider } from '../providers/miner/miner';
import {HTTP} from "@ionic-native/http";
import {Network} from "@ionic-native/network";
import {NativeStorage} from "@ionic-native/native-storage";
import {LoginPage} from "../pages/login/login";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    Network,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsProvider,
    ConnectionProvider,
    MinerProvider
  ]
})
export class AppModule {}
