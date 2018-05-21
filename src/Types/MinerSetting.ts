export  class  MinerSetting{

  private _minerId:number=0;
 //включён ли параметр
  public enabled:boolean = false;
  //нижний порог срабатывания параметра, при -1 не срабатывает
  public _lowerLimit:number =null;
  //верхний порог срабатывания параметра, при -1 не срабатывает
  public _upperLimit: number = null;
  //отключение нотификации
  public muted:boolean = false;

  //имя параметра, нельзя изменить
  private _name:string;
  //тип измерения параметра, нельзя изменить
  private _type:string;

  private _id:number;



  constructor(name:string,type:string,enabled: boolean,lowerLimit:number,upperLimit:number,id:number,minerId?:number) {
    this._name= name;
    this._type= type;
    this._id = id;
    this.enabled = enabled;
    this._lowerLimit = lowerLimit;
    this._upperLimit = upperLimit;
    if(minerId!==null)
    {
      this._minerId = minerId;
    }
  }

  get name():String
  {
    return this._name
  }

  get id():Number
  {
    return this._id
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

  get lowerLimit():number
  {
    return (this._lowerLimit>-1)?this._lowerLimit:null
  }
  set lowerLimit( lowerLimit:number)
  {
    this._lowerLimit = lowerLimit
  }


  get upperLimit():number
  {
    return (this._upperLimit>-1)?this._upperLimit:null
  }
  set upperLimit( upperLimit:number)
  {
    this._upperLimit = upperLimit
  }

}
