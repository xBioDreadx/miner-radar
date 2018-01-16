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
    console.log('Hello MinerProvider Provider');
    this.miners.push(new Miner("fake Miner_1", "test miner 1",
      [{
        gpuTemperature: 60,
        fanSpeed:78
      },
        {
          gpuTemperature: 87,
          fanSpeed:81
        },
        {
          gpuTemperature: 145,
          fanSpeed:100
        }],
      "125",
      "ololo.com.poool:123",
      2,
      2,
      5,
      3,
      "1.10",
      true,
      "ololol comments",
      15.6,
      12,
      0,
      [4,5.6,6],
      2.7,
      22,
      3,
      [0.4,1.1,1.2],
    [ new MinerSetting("Temperature","°C",true,-1,115),
      new MinerSetting("Fan Speed","%",false,25,95),
      new MinerSetting("Eth Speed","MH/s",true,2.5,-1),
      new MinerSetting("Dcr Speed","MH/s",true,0.5,-1)
    ]
    ));

    this.miners.push(new Miner(
      "fake Miner_2",
      "test miner 2",
      [{
        gpuTemperature: 65,
        fanSpeed:85
      },
        {
          gpuTemperature: 91,
          fanSpeed:88
        },
        {
          gpuTemperature: 84,
          fanSpeed:90
        }],
      "852",
      "ololo.com.poool:123",
      1,
      3,
      8,
      0,
      "1.10",
      true,
      "ololol comments",
      14.8,
      16,
      1,
      [2.5,4.8,7.5],
      3.4,
      12,
      6,
      [1.4,0.5,1.5],
      [ new MinerSetting("Temperature","°C",true,-1,115),
        new MinerSetting("Fan Speed","%",false,25,95),
        new MinerSetting("Eth Speed","MH/s",true,2.5,-1),
        new MinerSetting("Dcr Speed","MH/s",true,0.5,-1)
      ]
    ))
    console.log("miners created",this.miners);
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
