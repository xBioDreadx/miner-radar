import {Component} from '@angular/core';
import {AlertController, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ConnectionProvider} from "../../providers/connection/connection";
import {SettingsProvider} from "../../providers/settings/settings";
import {Account} from "../../Types/Account";
import {HomePage} from "../home/home";
import {MinerProvider} from "../../providers/miner/miner";

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

  public username: String = "";
  public password: String = "";

  constructor(public navCtrl: NavController,
              public connectionProvider: ConnectionProvider,
              public settingsProvider: SettingsProvider,
              public minerProvider: MinerProvider,
              public alertController: AlertController,
              public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.connectionProvider.checkConnection().then(() => {
      this.settingsProvider.account = new Account(this.username, this.password);
      console.log("created new account ", this.settingsProvider.account);
      this.connectionProvider.login(this.settingsProvider.account).then(() => {
        this.connectionProvider.getStoredMiners().then(miners => {
          this.minerProvider.setMiners(miners).then(() => {
            //сохраняем акк после удачной авторизации
            this.settingsProvider.saveAccount();
            this.events.publish("initPush");
            this.navCtrl.setRoot(HomePage)
          }).catch(err => {
            console.log("error in setting miners ", err);
            this.alertController.create({
              message: err,
              title: "Error while decoding miners info",
              buttons: [{text: "ok"}]
            }).present();
          })
          //ошибка парсинга майнеров, но авторизация успешна
        }).catch(err => {
          console.log("error in setting miners ", err);
          this.alertController.create({
            message: err,
            title: "Error while retrieving miners info",
            buttons: [{text: "ok"}]
          }).present();
          this.settingsProvider.saveAccount();
          this.navCtrl.setRoot(HomePage);
        })
      }).catch(err => {
        console.log("err on login");
       //алерт был выведен функцией логина
      })

    });
  }
}
