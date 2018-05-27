import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyFormPage } from './daily-form';
import { NavController } from 'ionic-angular';

@NgModule({
  declarations: [
    DailyFormPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyFormPage),
  ],
})
export class DailyFormPageModule {}
