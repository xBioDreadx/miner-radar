import {Injectable, NgZone} from '@angular/core';
import 'rxjs/add/operator/map';
import {Miner} from "../../Types/Miner";
import {SettingsProvider} from "../settings/settings";
import {LocalNotifications} from '@ionic-native/local-notifications';
import {Platform} from "ionic-angular";
import {Vibration} from "@ionic-native/vibration";
import {MinerSetting} from "../../Types/MinerSetting";

/*
  Generated class for the MinerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MinerProvider {

  public miners: Miner[] = [];

  constructor(public zone: NgZone,
              public settingsProvider: SettingsProvider) {

  }

  setMiners(data: any[]): Promise<any> {
    console.log("miners accepted ", data);
    this.miners = [];
    return new Promise((resolve => {
      this.zone.run(() => {
        if (data.length > 0)
          data.forEach((miner) => {

            this.miners.push(
              new Miner(
                miner.miner.minerId,
                miner.miner.minerName,
                miner.message.gpus,
                miner.message.uptime,
                miner.message.pool,
                miner.message.invalidEth,
                miner.message.invalidDcr,
                miner.message.switchesEth,
                miner.message.switchesDcr,
                miner.message.version,
                miner.message.status,
                miner.message.comments,
                miner.message.speedEth,
                miner.message.acceptedSharesEth,
                miner.message.rejectedSharesEth,
                miner.message.detaliedEth,
                miner.message.speedDcr,
                miner.message.acceptedSharesDcr,
                miner.message.rejectedSharesDcr,
                miner.message.detaliedDcr,
                miner.settings));
          });
        console.log("new miners accepted ",this.miners);
        resolve();
      })
    }))
  }


}
