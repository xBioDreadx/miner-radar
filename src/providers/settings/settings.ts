import {Injectable} from '@angular/core';
import {HTTP} from '@ionic-native/http';
import {NativeStorage} from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';
import {Account} from "../../Types/Account";
import {Settings} from "../../Types/Settings";


/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  public account: Account;
  public settings: Settings;

  constructor(public http: HTTP,
              public nativeStorage: NativeStorage,)
  {
    console.log('Hello SettingsProvider Provider');
    this.account = new Account(null,null);
  }

  init(): Promise<boolean> {
    return new Promise((resolve => {

      this.nativeStorage.keys().then(keys=>{
        if(keys.indexOf("settings")>-1)
        {
          this.nativeStorage.getItem("settings").then(settings => {
            this.settings = settings;
            this.nativeStorage.getItem("account").then(account => {
              this.account = account;
              resolve(true);
            }).catch(err=>{
              console.log("error in get account ",err);
            })
          }).catch(err=>{
            console.log("error in get settings ",err);
          })
        }
        else
        {
          this.settings = new Settings();
          resolve(false);
        }
      }).catch(err=>{
        console.log("error in get keys at natvie storage ",err);
      })

    }));
  }

  saveAccount(acc:Account):Promise<any>
  {
    return new Promise((resolve =>{
      this.account = acc;
      this.nativeStorage.setItem("account",acc).then(()=>resolve());
    } ));
  }

}
