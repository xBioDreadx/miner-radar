import {Component, NgZone} from '@angular/core';
import {AlertController, NavController, NavParams, Platform,Nav} from 'ionic-angular';
import {SettingsProvider} from "../../providers/settings/settings";
import {ConnectionProvider} from "../../providers/connection/connection";
import {MinerProvider} from "../../providers/miner/miner";
import {MinerInfoPage} from "../miner-info/miner-info";
import {ApplicationSettingsPage} from "../application-settings/application-settings";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public settingsProvider:SettingsProvider,
              public connectionProvider:ConnectionProvider,
              public minerProvider:MinerProvider,
              public zone:NgZone,
              public alertController:AlertController,
              public navParams:NavParams,
              public platform:Platform,
              public nav:NavController) {
this.platform.ready().then(()=>{

})

  }


  /**
   * не используется
   */
  updateInformation()
  {
    console.log("click");
    this.connectionProvider.checkConnection().then(()=>{
      this.connectionProvider.getStoredMiners().then(miners =>{
        this.minerProvider.setMiners(miners).then(() => {
        }).catch(err => {
          console.log("error in setting miners ", err);
          this.alertController.create({
            message: err,
            title: "Error while getting miners info",
            buttons: [{text: "ok"}]
          }).present();
        })
      }).catch(err=>{
        console.log("err on getting miners");
        this.alertController.create({message: err, title: "Error while getting miners info", buttons: [{text: "ok"}]}).present();
      })
    })
  }



  minerInfo(i)
    {
      this.nav.push(MinerInfoPage,{"miner":i});
    }

  applicationSettings()
  {
    this.nav.push(ApplicationSettingsPage);
  }


  swipeEvent(e) {
    console.log("SWIPED!", e);
    if (e.direction == 0) {
      this.updateInformation();
    }
  }

}
