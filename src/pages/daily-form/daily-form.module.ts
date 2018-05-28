import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyFormPage } from './daily-form';

@NgModule({
  declarations: [
    DailyFormPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyFormPage),
  ],
})
export class DailyFormPageModule {}
