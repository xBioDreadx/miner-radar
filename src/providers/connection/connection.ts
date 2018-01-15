import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http';
import {Network} from '@ionic-native/network';
import 'rxjs/add/operator/map';
import {Platform, ToastController} from "ionic-angular";
import {SettingsProvider} from "../settings/settings";
import {MinerProvider} from "../miner/miner";
import {LoadingController} from 'ionic-angular';
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {HomePage} from "../../pages/home/home";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Vibration} from "@ionic-native/vibration";
import {MinerSettings} from "../../Types/MinerSettings";

declare const Connection;

/*
  Generated class for the ConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectionProvider {

  public loader: any;

  private connectionString = "http://smdom.ua.local:8080/";

  constructor(public http: HTTP,
              public network: Network,
              public settingsProvider: SettingsProvider,
              public minerProvider: MinerProvider,
              public loadingCtrl: LoadingController,
              public toastController: ToastController,
              public platform: Platform,
              public push: Push,
              public localNotifications: LocalNotifications,
              public vibration: Vibration) {
    /*let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      let alert = alertController.create({
        message: "You lost Internet connection!",
        title: "Warning!"
      });
      alert.present();
    });*/

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type !== Connection.NONE) {
          //TODO заглушка для виндовса
          // this.initPushNotification();
        }
      }, 3000);
    });
  }

  isOnline() {
    console.log('Network.type', this.network.type);
    return this.network.type !== Connection.NONE;
  }

  checkConnection(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isOnline()) {
        resolve()
      }
      else {
        this.toastController.create({
          message: "Your device is offline!Check internet connection",
          duration: 2500
        }).present();
        reject();
      }
    });
  }

  login(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.presentLoading();
      this.http.get(this.connectionString + "/minerLogin", this.settingsProvider.account, {}).then(result => {
        console.log(" before parse ", result.data);
        let answer = JSON.parse(result.data);
        console.log("answer is ", answer);
        if (answer.error == null) {
          this.settingsProvider.saveAccount();
          this.minerProvider.setMiners(answer.miners).then(() => {
            this.cancelLoading();
            resolve();
          }).catch(err => {
            console.log("error in setting miners ", err);
            this.cancelLoading();
            reject(err);
          })
        }
        else {
          this.cancelLoading();
          reject(answer.error);
        }

      }).catch(err => {
        this.cancelLoading();
        reject(err);
        console.log("err in retrieve ", err);
        console.log(err.status);
        console.log(err.error); // error message as string
        console.log(err.headers);
      })
    })
  }

  getStoredMiners(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.presentLoading();
      this.http.get(this.connectionString + "/getMiners", this.settingsProvider.account, {}).then(result => {
        let answer = JSON.parse(result.data);
        if (answer.error == null) {
          console.log("result.data. is ", answer);
          this.minerProvider.setMiners(answer.miners).then(() => {
            this.cancelLoading();
            resolve();
          }).catch(err => {
            console.log("error in setting miners ", err);
            this.cancelLoading();
            reject(err);
          })
        }
        else {
          this.cancelLoading();
          reject(answer.error);
        }

      }).catch(err => {
        this.cancelLoading();
        reject(err);
        console.log("err in retrieve ", err);
        console.log(err.status);
        console.log(err.error); // error message as string
        console.log(err.headers);
      })
    })
  }

  /*not using*/
  updateSingleMiner(minerId): Promise<any> {
    return new Promise(resolve => {
      this.presentLoading();
      this.http.get(this.connectionString, {
        account: this.settingsProvider.account,
        minerId: minerId
      }, {}).then(result => {
        resolve(JSON.parse(result.data));
      }).catch(err => {
        this.cancelLoading();
        resolve();
        console.log(err.status);
        console.log(err.error); // error message as string
        console.log(err.headers);
      })
    })
  }

  /**
   * ывфывфывфыыв
   * @param {String} deviceID ывывфыввфы
   * @returns {Promise<any>} мааафф
   */
  sendDeviceId(deviceID: String): Promise<any> {
    return new Promise(resolve => {
      if (this.isOnline()) {
        this.http.get(this.connectionString + "/setDeviceId", {
          deviceID: deviceID
        }, {}).then(result => {
          resolve(JSON.parse(result.data));
        }).catch(err => {
          resolve();
          console.log(err);
          console.log(err.status);
          console.log(err.error); // error message as string
          console.log(err.headers);
        })
      }
    })
  }

  postMinersSettings(miner): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isOnline()) {
        let settings = new MinerSettings(miner.enableAlert,
          miner.enableTemperatureAlert,
          miner.overheatTemperature,
          miner.enableSpeedEthAlert,
          miner.minimumEthSpeed,
          miner.enableSpeedDcrAlert,
          miner.minimumDcrSpeed,
          miner.enableFanSpeedAlert,
          miner.minimumFanSpeedAlert,
          miner.maximumFanSpeedAlert,
        );
        this.presentLoading();
        this.http.post(this.connectionString + "/updateMinerSettings",
          {
            username: this.settingsProvider.account.username,
            password: this.settingsProvider.account.password,
            minerId: miner.minerId,
            settings: settings
          }, {}).then(answer => {
          this.cancelLoading();
          if (answer.error == null && answer.data.error == null)
            resolve(true);
          else {
            this.cancelLoading();
            reject(answer.data.message != null ? answer.data.message : answer.error);
          }
        }).catch(err => {
          this.cancelLoading();
          reject(err);
          console.log("err in retrieve ", err);
          console.log(err.status);
          console.log(err.error); // error message as string
          console.log(err.headers);
        })
      }
      else
        reject("device is offline");
    });
  }


  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Retrieving data...",
    });
    this.loader.present();
  }

  cancelLoading() {
    this.loader.dismiss();
  }


  initPushNotification() {

    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
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
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      this.sendDeviceId(data.registrationId);
      //TODO - send device token to server
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data);
      //if user using app and push notification comes
      if (this.settingsProvider.settings.vibration == true) {
        if (this.platform.is('android'))
          this.vibration.vibrate([600, 200, 300, 200, 300, 200, 600]); //SOS on morze
        else
          this.vibration.vibrate([1500])
      }
      if (this.settingsProvider.settings.notification == true) {
        this.localNotifications.schedule({
          id: Math.floor(Math.random() * (1000000000 - 1) + 1),
          title: data.title,
          text: data.message,
          sound: this.settingsProvider.settings.sound == true && this.platform.is('android') ? 'res://platform_default' : null,//(this.platform.is('android') && this.settingsProvider.settings.sound == true) ? 'file://assets/sounds/android.mp3' : 'file://beep.caf',//TODO need ti choose sound for other device
          badge: 1,
          icon: 'file://assets/icon/favicon.ico',
          smallIcon: 'file://assets/icon/favicon.ico'
        });
      }

      if (data.additionalData.foreground) {
        // if application open, show popup
        //TODO: Your logic here
        //data.message
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        ///  this.nav.setRoot(HomePage);
        console.log('Push notification clicked');
      }
    });
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }

}
