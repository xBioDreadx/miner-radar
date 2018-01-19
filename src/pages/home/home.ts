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
   * @param i
   */
  updateMiner(i)
  {
    this.connectionProvider.checkConnection().then(()=>{
      this.connectionProvider.updateSingleMiner(this.minerProvider.miners[i].minerId).then(result=>{
        this.zone.run(()=>{
          this.minerProvider.miners[i] = result;
        })
      })
    })
  }

  /**
   * не используется
   */
  updateInformation()
  {
    console.log("click");
    this.connectionProvider.checkConnection().then(()=>{
      this.connectionProvider.getStoredMiners().catch(err=>{
        console.log("err on getting miners");
        this.alertController.create({message: err, title: "Error while getting miners info"}).present();
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

}
