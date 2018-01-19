export  class  MinerSetting{

  private _minerId:number=0;
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



  constructor(name:string,type:string,enabled: boolean,low_value:number,high_value:number,minerId?:number) {
    this._name=name;
    this._type= type;
    this.enabled = enabled;
    this.low_value = low_value;
    this.high_value = high_value;
    if(minerId!==null)
    {
      this._minerId = minerId;
    }
  }

  get name():String
  {
    return this._name
  }

  get type():String
  {
    return this._type
  }
  get minerId():Number
  {
    return this._minerId
  }
}
