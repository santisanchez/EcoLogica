import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Achievement } from '../../modules/achievement';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-achievement-detail',
  templateUrl: 'achievement-detail.html',
})
export class AchievementDetailPage {

  progressBar: any;

  achievement: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private userProvider: UserProvider) {
    this.achievement.progress = {};
  }

  ionViewDidLoad() {
    this.progressBar = document.getElementsByClassName('progress-bar')[0];
    this.achievement = StorageProvider.data;
    this.progressBar.style.width = this.percentProgress() + "%";
  }

  percentProgress() {
    return (this.achievement.progress.days * 21) / 100;
  }

  public startAchievement() {
    this.userProvider.setUserAchievement("started", true, this.achievement.index);
  }

}
