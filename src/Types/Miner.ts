

import {MinerSettings} from "./MinerSettings";

export class Miner {
  public minerId: String;
  public minerName: String;
  public gpus: any[];
  public uptime: String;
  public pool: String;
  public invalidEth: Number;
  public invalidDcr: Number;
  public switchesEth: Number;
  public switchesDcr: Number;
  public version: String;
  public status: Boolean;
  public comments: String;

  public speedEth: Number;//'8.1 MH/s'
  public acceptedSharesEth: Number;
  public rejectedSharesEth: Number;
  public detaliedEth: Number[];

  public speedDcr: Number;//'8.1 MH/s'
  public acceptedSharesDcr: Number;
  public rejectedSharesDcr: Number;
  public detaliedDcr: Number[];
  public minerSettings:MinerSettings;

  /**
   *
   * @param {String} minerId - айди майнера - внутренний айди в системе, должен будет поменятся на инт
   * @param {String} minerName - любая строка
   * @param {any[]} gpus   - массив ГПУ, формат: {gpuTemperature: number(градусы ),fanSpeed:number(% оборотов)}
   * @param {String} uptime - аптайм в минутах
   * @param {String} pool - любая строка
   * @param {Number} invalidEth - неверные Eth
   * @param {Number} invalidDcr - неверные Dcr
   * @param {Number} switchesEth - переключения Eth
   * @param {Number} switchesDcr - переключения Dcr
   * @param {String} version - версия клеймора
   * @param {Boolean} status - true - онлайн
   * @param {String} comments - комментарии владельца майнера
   * @param {Number} speedEth - общая скорость по всем гпу Eth
   * @param {Number} acceptedSharesEth - принятые Eth
   * @param {Number} rejectedSharesEth - отклонённые Eth
   * @param {Number[]} detaliedEth - детальная информация о скорости Eth на каждую видеокарту
   * @param {Number} speedDcr - общая скорость по всем гпу Dcr
   * @param {Number} acceptedSharesDcr - принятые Dcr
   * @param {Number} rejectedSharesDcr - отклонённые Dcr
   * @param {Number[]} detaliedDcr - детальная информация о скорости Dcr на каждую видеокарту
   * @param {MinerSettings} minerSettings - настройки оповещения майнера
   */
  constructor(minerId: String, minerName: String, gpus: any[], uptime: String, pool: String, invalidEth: Number, invalidDcr: Number, switchesEth: Number, switchesDcr: Number, version: String, status: Boolean, comments: String, speedEth: Number, acceptedSharesEth: Number, rejectedSharesEth: Number, detaliedEth: Number[], speedDcr: Number, acceptedSharesDcr: Number, rejectedSharesDcr: Number, detaliedDcr: Number[],minerSettings:MinerSettings) {
    this.minerId = minerId;
    this.minerName = minerName;
    this.gpus = gpus;
    this.uptime = uptime;
    this.pool = pool;
    this.invalidEth = invalidEth;
    this.invalidDcr = invalidDcr;
    this.switchesEth = switchesEth;
    this.switchesDcr = switchesDcr;
    this.version = version;
    this.status = status;
    this.comments = comments;
    this.speedEth = speedEth;
    this.acceptedSharesEth = acceptedSharesEth;
    this.rejectedSharesEth = rejectedSharesEth;
    this.detaliedEth = detaliedEth;
    this.speedDcr = speedDcr;
    this.acceptedSharesDcr = acceptedSharesDcr;
    this.rejectedSharesDcr = rejectedSharesDcr;
    this.detaliedDcr = detaliedDcr;
    this.minerSettings = minerSettings;
  }
}
