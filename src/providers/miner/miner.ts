import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Miner} from "../../Types/Miner";


/*
  Generated class for the MinerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MinerProvider {

  public miners: Miner[] = [];

  constructor() {

  }

  setMiners(data: any[]): Promise<any> {
    console.log("miners accepted ", data);
    this.miners = [];
    return new Promise((resolve => {
      if (data.length > 0)
        data.forEach((miner) => {
          this.miners.push(
            new Miner(
              miner.minerId,
              miner.minerName,
              miner.gpus,
              miner.uptime,
              miner.pool,
              miner.ethInvalid,
              miner.dcrInvalid,
              miner.ethSwitches,
              miner.dcrSwitches,
              miner.version,
              miner.status,
              miner.comments,
              miner.ethSpeed,
              miner.dcrSpeed,
              miner.ethSharesAccepted,
              miner.ethSharesRejected,
              miner.dcrSharesAccepted,
              miner.dcrSharesRejected,
              miner.settings
            ));
        });
      resolve();
    }))
  }


}
