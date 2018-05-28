import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchievementDetailPage } from './achievement-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AchievementDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AchievementDetailPage),
    ComponentsModule
  ],
})
export class AchievementDetailPageModule {}
