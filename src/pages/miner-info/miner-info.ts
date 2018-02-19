import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Miner} from "../../Types/Miner";
import {MinerProvider} from "../../providers/miner/miner";
import {MatExpansionModule} from '@angular/material/expansion';
import {take} from "rxjs/operator/take";
import {MinerSettingsPage} from "../miner-settings/miner-settings";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations/src/module';
/**
 * Generated class for the MinerInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-miner-info',
  templateUrl: 'miner-info.html',
})
export class MinerInfoPage {
  miner: Miner;

  constructor(public navCtrl: NavController, public navParams: NavParams, public minerProvider: MinerProvider) {
    let minerAlertId = this.navParams.get("minerAlertId");
    if(minerAlertId>0)
    {
      for(let i=0;i<this.minerProvider.miners.length;i++)
      {
        if(this.minerProvider.miners[i].minerId==minerAlertId)
        {
          this.miner = this.minerProvider.miners[i];
          break;
        }
      }
    }
    else
    this.miner = this.minerProvider.miners[(this.navParams.get("miner"))];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinerInfoPage');
  }

  minerNotifications() {
    this.navCtrl.push(MinerSettingsPage, {miner: this.miner});
  }

}
