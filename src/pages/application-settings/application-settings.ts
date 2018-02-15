import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {SettingsProvider} from "../../providers/settings/settings";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ApplicationSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-application-settings',
  templateUrl: 'application-settings.html',
})
export class ApplicationSettingsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public settingsProvider:SettingsProvider,
              public toastController: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicationSettingsPage');
  }

  ionViewWillLeave()
  {
    this.settingsProvider.saveSetting().then(()=>{
      this.toastController.create({
        message: "Settings saved",
        duration: 1500
      }).present();
    }).catch(err=>{
      this.toastController.create({
        message: "Error while saveing settings",
        duration: 1500
      }).present();
    })
  }

  logout()
  {
    this.settingsProvider.logout().then(()=>{
      this.navCtrl.setRoot(LoginPage);
    })
  }

}
