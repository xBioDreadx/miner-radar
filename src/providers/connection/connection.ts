import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http';
import {Network} from '@ionic-native/network';
import 'rxjs/add/operator/map';
import {AlertController, ToastController} from "ionic-angular";
import {SettingsProvider} from "../settings/settings";
import {MinerProvider} from "../miner/miner";
import { LoadingController } from 'ionic-angular';
declare const Connection;

/*
  Generated class for the ConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectionProvider {

  public loader:any;

  private connectionString = "http://smdom.ua.local/site";
  constructor(public http: HTTP,
              public network: Network,
              public alertController: AlertController,
              public settingsProvider:SettingsProvider,
              public minerProvider:MinerProvider,
              public loadingCtrl: LoadingController,
              public toastController:ToastController) {
    /*let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      let alert = alertController.create({
        message: "You lost Internet connection!",
        title: "Warning!"
      });
      alert.present();
    });*/
/*
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type !== Connection.NONE) {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });*/
  }

  isOnline() {
    console.log('Network.type', this.network.type);
    return this.network.type !== Connection.NONE;
  }

  checkConnection():Promise<any>
  {
    return new Promise((resolve,reject)=>{
      if(this.isOnline()){
        resolve()
      }
      else
      {
        this.toastController.create({message:"Your device is offline!Check internet connection",duration:2500}).present();
        reject();
      }
    });
  }

  getStoredMiners():Promise<any>
  {
    return new Promise(resolve => {
      this.presentLoading();
      this.http.get(this.connectionString,this.settingsProvider.account,{}).then(result=>{
        let ans = result.data.trim();
        this.minerProvider.setMiners(JSON.parse(ans)).then(()=>{
          this.cancelLoading();
          resolve();
        }).catch(err=>{
          console.log("error in setting miners ",err);
          this.cancelLoading()})
      }).catch(err=>{
        this.cancelLoading();
        resolve();
        console.log("err ine retrieve ",err);
        console.log(err.status);
        console.log(err.error); // error message as string
        console.log(err.headers);
      })
    })
  }

  updateMiner(minerId):Promise<any>
  {
    return new Promise(resolve => {
      this.presentLoading();
      this.http.get(this.connectionString,{account:this.settingsProvider.account,minerId:minerId},{}).then(result=>{
        resolve(JSON.parse(result.data));
      }).catch(err=>{
        this.cancelLoading();
        resolve();
        console.log(err.status);
        console.log(err.error); // error message as string
        console.log(err.headers);
      })
    })
  }


  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Retrieving data...",
    });
    this.loader.present();
  }

  cancelLoading()
  {
    this.loader.dismiss();
  }

}
