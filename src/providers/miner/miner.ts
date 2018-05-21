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
    //this.miners = [];
    return new Promise((resolve => {
      if (data.length > 0)
        data.forEach((miner) => {
        let f =true;
        for(let i=0;i<this.miners.length;i++)
        {
          if(this.miners[i].minerId==miner.minerId){
            this.updateMiner(i,miner);
            f=false;
            break;
          }
        }
        if(f)
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
  updateMiner(iter,newMiner)
  {
      this.miners[iter].minerName = newMiner.minerName;
      this.miners[iter].gpus = newMiner.gpus;
      this.miners[iter].uptime = newMiner.uptime;
      this.miners[iter].pool = newMiner.pool;
      this.miners[iter].ethInvalid = newMiner.ethInvalid;
      this.miners[iter].dcrInvalid = newMiner.dcrInvalid;
      this.miners[iter].ethSwitches = newMiner.ethSwitches;
      this.miners[iter].dcrSwitches = newMiner.dcrSwitches;
      this.miners[iter].version = newMiner.version;
      this.miners[iter].status = newMiner.status;
      this.miners[iter].comments = newMiner.comments;
      this.miners[iter].ethSpeed = newMiner.ethSpeed;
      this.miners[iter].dcrSpeed = newMiner.dcrSpeed;
      this.miners[iter].ethSharesAccepted = newMiner.ethSharesAccepted;
      this.miners[iter].ethSharesRejected = newMiner.ethSharesRejected;
      this.miners[iter].dcrSharesAccepted = newMiner.dcrSharesAccepted;
      this.miners[iter].dcrSharesRejected = newMiner.dcrSharesRejected;
      this.miners[iter].minerSettings = newMiner.settings
  }

}
