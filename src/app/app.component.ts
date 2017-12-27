import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import {SettingsProvider} from "../providers/settings/settings";
import {LoginPage} from "../pages/login/login";
import {SettingsPage} from "../pages/settings/settings";
import {ConnectionProvider} from "../providers/connection/connection";
import {Push} from "@ionic-native/push";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public settingsProvider:SettingsProvider,
              public connectionProvider:ConnectionProvider,
              public push:Push) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Settings', component: SettingsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.push.hasPermission().then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
          //TODO заглушка для виндовса
          //this.connectionProvider.initPushNotification();
        } else {
          console.log('We do not have permission to send push notifications');
        }

      }).catch(err=>{
        console.log("err in push init ",err);
      });
      //make settings initialisation and decide how page will be root
      this.settingsProvider.init().then(result=>{
        this.splashScreen.hide();
        if(!result){
          this.nav.setRoot(LoginPage)
        }
        else
          this.nav.setRoot(HomePage)
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}
