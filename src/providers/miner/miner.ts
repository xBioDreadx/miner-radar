import {Injectable, NgZone} from '@angular/core';
import 'rxjs/add/operator/map';
import {Miner} from "../../Types/Miner";
import {SettingsProvider} from "../settings/settings";
import {LocalNotifications} from '@ionic-native/local-notifications';
import {Platform} from "ionic-angular";
import {Vibration} from "@ionic-native/vibration";

/*
  Generated class for the MinerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MinerProvider {

  public miners: Miner[];

  constructor(public zone: NgZone,
              public settingsProvider: SettingsProvider) {
    console.log('Hello MinerProvider Provider');
  }

  setMiners(data: any[]): Promise<any> {
    console.log("miners accepted ", data);
    this.miners = [];
    return new Promise((resolve => {
      this.zone.run(() => {
        if(data.length>0)
        data.forEach((miner) => {
          this.miners.push(
            new Miner(
              miner.minerId ,
          miner.minerName,
          miner.gpus,
          miner.uptime ,
          miner.pool,
          miner.invalidEth ,
          miner.invalidDcr,
          miner.switchesEth,
          miner.switchesDcr,
          miner.version,
          miner.status,
          miner.comments,
          miner.speedEth ,
          miner.acceptedSharesEth,
          miner.rejectedSharesEth,
          miner.detaliedEth ,
          miner.speedDcr,
          miner.acceptedSharesDcr,
          miner.rejectedSharesDcr ,
          miner.detaliedDcr,
              miner.minerSettings));
        });
        resolve();
      })
    }))
  }


}
