import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, NavController} from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsProvider } from '../providers/settings/settings';
import { ConnectionProvider } from '../providers/connection/connection';
import { MinerProvider } from '../providers/miner/miner';
import {HTTP} from "@ionic-native/http";
import {Network} from "@ionic-native/network";
import {NativeStorage} from "@ionic-native/native-storage";
import {LoginPage} from "../pages/login/login";
import {SettingsPage} from "../pages/settings/settings";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Vibration} from "@ionic-native/vibration";
import {Push} from "@ionic-native/push";
import {MinerSettingsPage} from "../pages/miner-settings/miner-settings";
import {MinerInfoPage} from "../pages/miner-info/miner-info";
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SettingsPage,
    MinerSettingsPage,
    MinerInfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MatExpansionModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SettingsPage,
    MinerSettingsPage,
    MinerInfoPage
  ],
  providers: [
    SplashScreen,
    HTTP,
    Network,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsProvider,
    ConnectionProvider,
    MinerProvider,
    LocalNotifications,
    Vibration,
    Push
  ]
})
export class AppModule {}
