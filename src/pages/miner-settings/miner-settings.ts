import {Component, NgZone} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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
  public miner: Miner;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public minerProvider: MinerProvider,
              public connectionProvider: ConnectionProvider,
              public toastController: ToastController,
              public actionSheetCtrl: ActionSheetController,
              public zone: NgZone) {
    this.miner = this.navParams.get("miner");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinerSettingsPage');
  }

  cancel() {
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    this.connectionProvider.postMinersSettings(this.miner).then(() => {
      this.toastController.create({
        message: "Successful updated settings",
        duration: 2500
      }).present();
    }).catch(err => {
      console.warn("error on posting settings. miner : ", this.miner, " error: ", err);
      this.toastController.create({
        message: "Error in saving settings on server",
        duration: 2500
      }).present();
    })
  }





  addSettings() {
    let disabledSettings = [];
    this.miner.minerSettings.forEach((setting, iter) => {
      if (!setting.enabled)
        disabledSettings.push({
          text: setting.name,
          handler: () => {
            this.addNewSetting(iter);
          },
          cssClass: "setting_add_popup"
        });
    });
    disabledSettings.push({
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
      }
    });
    if (disabledSettings.length > 1)
      this.actionSheetCtrl.create({
        title: 'Choose new notification',
        buttons: disabledSettings,
        enableBackdropDismiss: true,
        cssClass: "setting_add_popup"
      }).present();
  }


  addNewSetting(iter) {
    this.zone.run(() => {
      this.miner.minerSettings[iter].enabled = true;
    });
  }

  switchMute(iter) {
    this.zone.run(() => {
      this.miner.minerSettings[iter].mute = !this.miner.minerSettings[iter].mute
    });
  }
}
