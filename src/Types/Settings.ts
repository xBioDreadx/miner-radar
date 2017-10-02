export class Settings
{
  private _notification:Boolean;
  private _vibration:Boolean;
  private _sound:Boolean;
  private _temp:Number;
  private _checkPeriod:Number;


  constructor(notification: Boolean =true, vibration: Boolean=true, sound: Boolean=true, temp: Number=95, checkPeriod: Number=5) {
    this._notification = notification;
    this._vibration = vibration;
    this._sound = sound;
    this._temp = temp;
    this._checkPeriod = checkPeriod;
  }


  get notification(): Boolean {
    return this._notification;
  }

  get vibration(): Boolean {
    return this._vibration;
  }

  get sound(): Boolean {
    return this._sound;
  }

  get temp(): Number {
    return this._temp;
  }

  get checkPeriod(): Number {
    return this._checkPeriod;
  }



  set notification(value: Boolean) {
    this._notification = value;
  }

  set vibration(value: Boolean) {
    this._vibration = value;
  }

  set sound(value: Boolean) {
    this._sound = value;
  }

  set temp(value: Number) {
    this._temp = value;
  }

  set checkPeriod(value: Number) {
    this._checkPeriod = value;
  }
}
