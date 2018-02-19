import {Component, ViewChild} from '@angular/core';
import {AlertController, Events, Nav, Platform, ToastController} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {SettingsProvider} from "../providers/settings/settings";
import {LoginPage} from "../pages/login/login";
import {SettingsPage} from "../pages/settings/settings";
import {ConnectionProvider} from "../providers/connection/connection";
import {Push, PushOptions} from "@ionic-native/push";
import {MinerProvider} from "../providers/miner/miner";
import {MinerInfoPage} from "../pages/miner-info/miner-info";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              // public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public settingsProvider: SettingsProvider,
              public connectionProvider: ConnectionProvider,
              public minerProvider: MinerProvider,
              public alertController: AlertController,
              public push: Push,
              public toastController:ToastController,
              public  events:Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'Settings', component: SettingsPage}
    ];

    this.events.subscribe("initPush",()=>{
      this.initPushNotification();
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      //make settings initialisation and decide how page will be root
      this.settingsProvider.init().then(result => {
        this.splashScreen.hide();
        if (!result) {
          this.nav.setRoot(LoginPage)
        }
        else {
          this.connectionProvider.checkConnection().then(() => {
            if (this.connectionProvider.token != null) {
              this.nav.setRoot(HomePage);
              this.connectionProvider.getStoredMiners().then((miners) => {
                this.minerProvider.setMiners(miners).then(() => {
                  this.initPushNotification().then(()=>{

                  })
                }).catch(err => {
                  console.log("error in setting miners ", err);
                  this.alertController.create({
                    message: err,
                    title: "Error while getting miners info",
                    buttons: [{text: "ok"}]
                  }).present();
                })
              }).catch(() => {

              })
            }
            else {
              this.connectionProvider.login(this.settingsProvider.account).then(() => {
                this.connectionProvider.getStoredMiners().then(miners => {
                  this.minerProvider.setMiners(miners).then(() => {
                    this.initPushNotification().then(()=>{
                    })
                  }).catch(err => {
                    console.log("error in setting miners ", err);
                    this.alertController.create({
                      message: err,
                      title: "Error while getting miners info",
                      buttons: [{text: "ok"}]
                    }).present();
                  })
                }).catch(err => {
                  console.log("error in setting miners ", err);
                  this.alertController.create({
                    message: err,
                    title: "Error while getting miners info",
                    buttons: [{text: "ok"}]
                  }).present();
                });
                this.settingsProvider.saveAccount();

                this.nav.setRoot(HomePage)
              }).catch(() => {
                this.nav.setRoot(LoginPage)
              })
            }
          })
        }
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }



  initPushNotification(): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: PushOptions = {
        android: {
          senderID: "1034639132392"
        },
        ios: {
          alert: 'true',
          badge: false,
          sound: 'true'
        }
      };

      if (!this.platform.is('cordova')) {
        console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
        resolve(false);
      }
      else {
        //TODO добавить проверку на существование, чтоб не слать каждый раз
        this.push.hasPermission().then((res: any) => {
          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
            const pushObject = this.push.init(options);
            pushObject.on('registration').subscribe((data: any) => {
              console.log('device token -> ' + data.registrationId);
              this.connectionProvider.sendDeviceId(this.settingsProvider.account, data.registrationId).then(() => {

              }).catch(err => {

              })
              //TODO - send device token to server
            });


            pushObject.on('notification').subscribe((data: any) => {
              console.log('message -> ', data);

              if (data.additionalData.foreground) {
                // if application open, show popup
                //TODO: Your logic here
                //data.message
                console.log("on foreground");
                // this.getStoredMiners().then()
                this.toastController.create({
                  message: data.message,
                  duration: 2500
                }).present();

              } else {
                this.platform.ready().then(() => {
                  console.log('Push notification clicked');
                  console.log("on background ", data.additionalData.minerId);
                  this.nav.push(MinerInfoPage,{minerAlertId:data.additionalData.minerId});
                })
              }
            });
            pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
            resolve();
          } else {
            console.log('We do not have permission to send push notifications');
            reject({err: "permission denied"})
          }
        }).catch(err => {
          console.log("err in push init ", err);
          reject({err: err})
        });
      }

    });
  }




}
