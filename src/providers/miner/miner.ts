import {Injectable, NgZone} from '@angular/core';
import 'rxjs/add/operator/map';
import {Miner} from "../../Types/Miner";

/*
  Generated class for the MinerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MinerProvider {

  public miners:Miner[];
  constructor(public zone:NgZone) {
    console.log('Hello MinerProvider Provider');
  }

  setMiners(data:any[]):Promise<any>
  {
    console.log("miners accepted ",data);
    this.miners = [];
    return new Promise((resolve => {
      this.zone.run(()=>{
        data.forEach((miner)=> {
          this.miners.push(
            new Miner(
              miner.minerId,
              miner.minerName,
              miner.temp,
              miner.uptime,
              miner.ethereum,
              miner.decret, miner.pool, miner.failover, miner.version, miner.comments));
        });
        resolve();
      })
    }))
  }
}
