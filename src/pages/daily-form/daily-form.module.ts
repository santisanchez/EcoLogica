import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyFormPage } from './daily-form';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'daily-form',
  templateUrl: 'daily-form.html'
})
@NgModule({
  declarations: [
    DailyFormPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyFormPage),
  ],
})
export class DailyFormPageModule {}
