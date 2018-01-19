import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
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

  public username:String="";
  public password:String="";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public connectionProvider:ConnectionProvider,
              public settingsProvider:SettingsProvider,
              public alertController:AlertController,
              public loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login()
  {
    this.connectionProvider.checkConnection().then(()=>{
      this.settingsProvider.account = new Account(this.username,this.password);
      console.log("created new account ",this.settingsProvider.account);
        this.connectionProvider.login().then(()=>{
          this.navCtrl.setRoot(HomePage,{firstRun:true});
        }).catch(err=>{
          console.log("err on getting miners");
          this.alertController.create({message: err, title: "Error while getting miners info"}).present();
        })
    })

   //делаем вид, что авторизуемся
   /* this.loadingController.create({
      content:'Authorization...',
      spinner:'crescent',
      dismissOnPageChange:true
    }).present();
    setTimeout(()=>{
      this.navCtrl.push(HomePage);
    },500)*/
  }


}
