export  class  MinerSetting{
 /* public enableAlert:boolean = true;
  public enableTemperatureAlert:boolean = true;
  public overheatTemperature:number = 100;
  public enableSpeedEthAlert:boolean = true;
  public minimumEthSpeed:number = 1;
  public enableSpeedDcrAlert:boolean = true;
  public minimumDcrSpeed:number = 1;
  public enableFanSpeedAlert:boolean= true;
  public minimumFanSpeedAlert:number= 0;
  public maximumFanSpeedAlert:number = 100;
  */

 //включён ли параметр
  public enabled:boolean = false;
  //нижний порог срабатывания параметра, при -1 не срабатывает
  public low_value:number =-1;
  //верхний порог срабатывания параметра, при -1 не срабатывает
  public high_value: number = -1;
  //отключение нотификации
  public mute:boolean = false;
  //имя параметра, нельзя изменить
  private _name:string;
  //тип измерения параметра, нельзя изменить
  private _type:string;



  constructor(name:string,type:string,enabled: boolean,low_value:number,high_value:number) {
    this._name=name;
    this._type= type;
    this.enabled = enabled;
    this.low_value = low_value;
    this.high_value = high_value;
  }

  get name():String
  {
    return this._name
  }

  get type():String
  {
    return this._type
  }
}
