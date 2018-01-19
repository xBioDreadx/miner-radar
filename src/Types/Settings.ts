export class Settings
{
  public notification:Boolean=true;
  public vibration:Boolean=true;
  public sound:Boolean=true;

  constructor(notification: Boolean =true, vibration: Boolean=true, sound: Boolean=true, ) {
    this.notification = notification;
    this.vibration = vibration;
    this.sound = sound;
  }



}
