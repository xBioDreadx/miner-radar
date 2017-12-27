import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Miner} from "../../Types/Miner";
import {MinerProvider} from "../../providers/miner/miner";
import {ConnectionProvider} from "../../providers/connection/connection";

/**
 * Generated class for the MinerSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-miner-settings',
  templateUrl: 'miner-settings.html',
})
export class MinerSettingsPage {
  public miner:Miner;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public minerProvider:MinerProvider,
              public connectionProvider:ConnectionProvider,
              public toastController:ToastController) {
    this.miner = minerProvider.miners[this.navParams.get("miner")];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinerSettingsPage');
  }

  cancel()
  {
    this.navCtrl.pop();
  }

  saveSettings()
  {
    this.connectionProvider.postMinersSettings(this.miner).then(()=>{
      this.toastController.create({
        message: "Succesfull updated settings",
        duration: 2500
      }).present();
    }).catch(err=>{
      console.warn("error on posting settings. miner : ",this.miner," error: ",err);
      this.toastController.create({
        message: "Error in updating settings",
        duration: 2500
      }).present();
    })
  }

}
