import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationSettingsPage } from './application-settings';

@NgModule({
  declarations: [
    ApplicationSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicationSettingsPage),
  ],
})
export class ApplicationSettingsPageModule {}
