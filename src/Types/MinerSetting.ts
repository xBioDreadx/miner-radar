export  class  MinerSetting{

  private _minerId:number=0;
 //включён ли параметр
  public enabled:boolean = false;
  //нижний порог срабатывания параметра, при -1 не срабатывает
  public lowerLimit:number =-1;
  //верхний порог срабатывания параметра, при -1 не срабатывает
  public upperLimit: number = -1;
  //отключение нотификации
  public muted:boolean = false;

  //имя параметра, нельзя изменить
  private _name:string;
  //тип измерения параметра, нельзя изменить
  private _type:string;



  constructor(name:string,type:string,enabled: boolean,lowerLimit:number,upperLimit:number,minerId?:number) {
    this._name= name
    this._type= type;
    this.enabled = enabled;
    this.lowerLimit = lowerLimit;
    this.upperLimit = upperLimit;
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
  set name(name:String)
  {
   this._name = name.replace("_","").toLowerCase();
  }
}
