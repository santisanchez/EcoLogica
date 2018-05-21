import { User } from './../../modules/user';
import { FirebaseUserProvider } from './../../providers/firebase-user/firebase-user';
import { AchievementDetailPage } from './../achievement-detail/achievement-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { Achievement } from '../../modules/achievement';
import { AchievementsData } from '../../modules/achievements'
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-achievements',
  templateUrl: 'achievements.html',
})
export class AchievementsPage {

  public progress: number;
  public user: User;

  achievement = {} as Achievement;
  achievements: Achievement[] = [];

  achievementDetail: any = AchievementDetailPage;
  login: any = LoginPage;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private store: StorageProvider, private firebaseUser: FirebaseUserProvider) {
    this.achievements = AchievementsData;


  }

  ionViewDidLoad() {

  }

  public showAchievementDetail(achievement, index) {
    achievement = this.achievements[index];
    achievement.index = index;
    this.store.setData(achievement);
    this.navCtrl.push(this.achievementDetail);
  }

  public isRed(i) {
    if (i % 2 == 0) {
      return true;
    } else {
      return false;
    }
  }

}