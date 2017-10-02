export class Account{
  get username(): String {
    return this._username;
  }

  get password(): String {
    return this._password;
  }

  private _username:String;
  private _password:String;

  constructor(u:String,p:String)
  {
    this._username=u;
    this._password=p;
  }

}
