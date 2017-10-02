import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ConnectionProvider} from "../../providers/connection/connection";
import {SettingsProvider} from "../../providers/settings/settings";
import {Account} from "../../Types/Account";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username:String;
  public password:String;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public connectionProvider:ConnectionProvider,
              public settingsProvider:SettingsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login()
  {

    this.connectionProvider.checkConnection().then(()=>{
      this.settingsProvider.account = new Account(this.username,this.password);
        this.connectionProvider.getStoredMiners().then(()=>{
          this.navCtrl.setRoot(HomePage);
        })
    })
  }


}
