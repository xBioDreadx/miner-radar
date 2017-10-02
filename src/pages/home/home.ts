import {Component, NgZone} from '@angular/core';
import { NavController } from 'ionic-angular';
import {SettingsProvider} from "../../providers/settings/settings";
import {ConnectionProvider} from "../../providers/connection/connection";
import {MinerProvider} from "../../providers/miner/miner";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public settingsProvider:SettingsProvider,
              public connectionProvider:ConnectionProvider,
              public minerProvider:MinerProvider,
              public zone:NgZone) {

    if(this.settingsProvider.account.username!=null)
    {
      this.connectionProvider.checkConnection().then(()=>{
        this.connectionProvider.getStoredMiners()
      })
    }
  }

  updateMiner(i)
  {
    this.connectionProvider.checkConnection().then(()=>{
      this.connectionProvider.updateMiner(this.minerProvider.miners[i].minerId).then(result=>{
        this.zone.run(()=>{
          this.minerProvider.miners[i] = result;
        })
      })
    })
  }

}
