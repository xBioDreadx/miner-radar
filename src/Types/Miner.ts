

import {MinerSetting} from "./MinerSetting";
import {GpuInfo} from "./GpuInfo";

export class Miner {
  public minerId: String;
  public minerName: String;
  public gpus: GpuInfo[];
  public uptime: String;
  public pool: String;
  public ethInvalid: Number;
  public dcrInvalid: Number;
  public ethSwitches: Number;
  public dcrSwitches: Number;
  public version: String;
  public status: Boolean =false;
  public comments: String;
  public ethSpeed: Number;//'8.1 MH/s'
  public ethSharesAccepted: Number;
  public ethSharesRejected: Number;
  public dcrSpeed: Number;//'8.1 MH/s'
  public dcrSharesAccepted: Number;
  public dcrSharesRejected: Number;
  public minerSettings:MinerSetting[];

  /**
   *
   * @param {String} minerId - айди майнера - внутренний айди в системе, должен будет поменятся на инт
   * @param {String} minerName - любая строка
   * @param {any[]} gpus   - массив ГПУ, формат: {gpuTemperature: number(градусы ),fanSpeed:number(% оборотов)}
   * @param {String} uptime - аптайм в минутах
   * @param {String} pool - любая строка
   * @param {Number} ethInvalid - неверные Eth
   * @param {Number} dcrInvalid - неверные Dcr
   * @param {Number} ethSwitches - переключения Eth
   * @param {Number} dcrSwitches - переключения Dcr
   * @param {String} version - версия клеймора
   * @param {Boolean} status - true - онлайн
   * @param {String} comments - комментарии владельца майнера
   * @param {Number} ethSpeed - общая скорость по всем гпу Eth
   * @param {Number} ethSharesAccepted - принятые Eth
   * @param {Number} ethSharesRejected - отклонённые Eth
   * @param {Number} dcrSpeed - общая скорость по всем гпу Dcr
   * @param {Number} dcrSharesAccepted - принятые Dcr
   * @param {Number} dcrSharesRejected - отклонённые Dcr
   * @param {MinerSetting[]} minerSettings - настройки оповещения майнера
   */
  constructor(minerId: String,
              minerName: String,
              gpus: GpuInfo[],
              uptime: String,
              pool: String,
              ethInvalid: Number,
              dcrInvalid: Number,
              ethSwitches: Number,
              dcrSwitches: Number,
              version: String,
              status: Boolean,
              comments: String,
              ethSpeed: Number,
              dcrSpeed: Number,
              ethSharesAccepted: Number,
              ethSharesRejected: Number,
              dcrSharesAccepted: Number,
              dcrSharesRejected: Number,
              minerSettings:MinerSetting[]) {
    this.minerId = minerId;
    this.minerName = minerName;
    this.gpus = gpus;
    this.uptime = uptime;
    this.pool = pool;
    this.ethInvalid = ethInvalid;
    this.dcrInvalid = dcrInvalid;
    this.ethSwitches = ethSwitches;
    this.dcrSwitches = dcrSwitches;
    this.version = version;
    this.status = status;
    this.comments = comments;
    this.ethSpeed = ethSpeed;
    this.ethSharesAccepted = ethSharesAccepted;
    this.ethSharesRejected = ethSharesRejected;
    this.dcrSpeed = dcrSpeed;
    this.dcrSharesAccepted = dcrSharesAccepted;
    this.dcrSharesRejected = dcrSharesRejected;
    this.minerSettings = minerSettings;
  }
}
