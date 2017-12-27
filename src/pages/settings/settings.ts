import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {SettingsProvider} from "../../providers/settings/settings";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public settingsProvider:SettingsProvider,
              public toastController:ToastController) {

  }

  saveSettings()
  {
    this.settingsProvider.saveSetting().then(()=>{
      this.toastController.create({message:"Settings Saved",duration:2500}).present();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
