export class Settings
{
  private _notification:Boolean;
  private _vibration:Boolean;
  private _sound:Boolean;

  constructor(notification: Boolean =true, vibration: Boolean=true, sound: Boolean=true, ) {
    this._notification = notification;
    this._vibration = vibration;
    this._sound = sound;
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





  set notification(value: Boolean) {
    this._notification = value;
  }

  set vibration(value: Boolean) {
    this._vibration = value;
  }

  set sound(value: Boolean) {
    this._sound = value;
  }

}
