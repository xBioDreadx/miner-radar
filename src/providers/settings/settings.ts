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
              public nativeStorage: NativeStorage,) {
    console.log('Hello SettingsProvider Provider');
    this.account = new Account(null, null);
  }

  init(): Promise<boolean> {
    return new Promise((resolve => {
      this.nativeStorage.keys().then(keys => {
        if (keys.indexOf("account") > -1) {
          if (keys.indexOf("settings") > -1) {
            this.nativeStorage.getItem("settings").then(settings => {
              this.settings = settings;
              console.log("settings readed: ", this.settings);
            }).catch(err => {
              console.log("error in get settings ", err);
            });
            this.nativeStorage.getItem("account").then(account => {
              console.log("account readed: ", account);
              this.account = account;
              resolve(true);
            }).catch(err => {
              console.log("error in get account ", err);
            })
          }
        }
        else {
          this.settings = new Settings();
          resolve(false);
        }
      }).catch(err => {
        console.log("error in get keys at natvie storage ", err);
        resolve(false);
      })

    }));
  }

  saveSetting() {
    return new Promise((resolve => {
      this.nativeStorage.setItem("settings", this.settings).then(() => {
        console.log("settings writed: ", this.settings);
        resolve()
      });
    } ));
  }

  saveAccount(): Promise<any> {
    return new Promise((resolve => {
      this.nativeStorage.setItem("account", this.account).then(() => {console.log("account saved");resolve()});
    } ));
  }

}
