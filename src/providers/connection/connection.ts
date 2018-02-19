import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network';
import 'rxjs/add/operator/map';
import {AlertController, Events, Platform, ToastController} from "ionic-angular";
import {LoadingController} from 'ionic-angular';
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Vibration} from "@ionic-native/vibration";
import {HttpClient, HttpErrorResponse, HttpRequest, HttpEventType} from "@angular/common/http";
import 'rxjs/add/operator/retry';
import {ResponseInterface} from "../../Types/ResponseInterface";
import {Account} from "../../Types/Account";
import {Settings} from "../../Types/Settings";
import {Miner} from "../../Types/Miner";
import {NativeStorage} from "@ionic-native/native-storage";

declare const Connection;

/*
  Generated class for the ConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectionProvider {

  public loader: any;

  public token: String;
  private connectionString = "http://smdom.ua.local:8080/";
  pushObject: any = null;

  constructor(public network: Network,
              public loadingCtrl: LoadingController,
              public toastController: ToastController,
              public platform: Platform,
              public push: Push,
              public vibration: Vibration,
              public httpClient: HttpClient,
              public alertController: AlertController,
              public events: Events) {


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
        resolve(true)
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


  login(account: Account): Promise<any> {
    return new Promise((resolve, reject) => {
      this.presentLoading("Login in...");
      this.post(this.connectionString + "/loginMobile", {
        username: account.username,
        password: account.password
      }).then(answer => {
        this.token = answer;
        this.cancelLoading();
        resolve(answer);
      }).catch(err => {
        this.cancelLoading();
        this.alertController.create({message: err, title: "Error while login", buttons: [{text: "ok"}]}).present();
        reject(err);
        console.log("err in retrieve ", err);
      })
    })
  }

  getStoredMiners(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.presentLoading("Getting miners data...");
      this.post(this.connectionString + "/getMinersMobile", {token: this.token}).then(answer => {
        console.log("result.data. is ", answer);
        this.cancelLoading();
        resolve(answer);

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


  /**
   *
   * @param {Account} account
   * @param {String} deviceID
   * @returns {Promise<any>}
   */
  sendDeviceId(account: Account, deviceID: String): Promise<any> {
    return new Promise(resolve => {
      this.post(this.connectionString + "/setDeviceId", {
        username: account.username,
        password: account.password,
        deviceID: deviceID
      }).then(result => {
        resolve(result);
      }).catch(err => {
        resolve(false);
        console.log(err);
      })
    })
  }

  postMinersSettings(account: Account, miner): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isOnline()) {
        //this.presentLoading();
        this.post(this.connectionString + "/updateMinerSettings",
          {
            username: account.username,
            password: account.password,
            minerId: miner.minerId,
            settings: miner.minerSettings
          }).then(answer => {
          // this.cancelLoading();
          resolve(true);
        }).catch(err => {
          //  this.cancelLoading();
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


  presentLoading(message = "Retrieving data...") {
    this.loader = this.loadingCtrl.create({
      content: message,
    });
    this.loader.present();
  }

  cancelLoading() {
    this.loader.dismiss();
  }

  post(link: string, data?: Object): Promise<any> {
    console.log("data to retrieve ", data);
    return new Promise((resolve, reject) => {
      this.httpClient.post<ResponseInterface>(link, data).retry(2).subscribe((result) => {
          console.log("result of post to " + link + " is: ", result);
          if (result.status)
            resolve(result.data);
          else
            reject(result.error);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
            reject(err.error.message)
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            reject(err.error)
          }
        });
    })
  }

  get(link, data?) {
    return new Promise((resolve, reject) => {
      console.log("data to retrieve ", data);
      this.httpClient.get<ResponseInterface>(link, data).retry(2).subscribe(<ResponseInterface>(result) => {
          console.log("result of GET to " + link + " is: ", result);
          if (result.status)
            resolve(result.data);
          else
            reject(result.error);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
            reject(err.error.message)
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            reject(err.error)
          }
        });
    })
  }





}
