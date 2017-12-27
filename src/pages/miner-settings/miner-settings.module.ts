import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinerSettingsPage } from './miner-settings';

@NgModule({
  declarations: [
    MinerSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(MinerSettingsPage),
  ],
})
export class MinerSettingsPageModule {}
