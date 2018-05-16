import { UserProvider } from './../../providers/user/user';
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
  public user: any;

  achievement = {} as Achievement;
  achievements: Achievement[] = [];
  userAchievements: any = {};

  achievementDetail: any = AchievementDetailPage;
  login: any = LoginPage;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private store: StorageProvider, private userProvider: UserProvider) {
    this.achievements = AchievementsData;
    if (this.userProvider.authenticated()) {
      this.userProvider.getUser().subscribe((response) => {
        this.user = response;
      }, (error) => {
        console.error("Failed to get user" + error);
      });
    } else {
      this.navCtrl.push(this.login);
    }
  }

  ionViewDidLoad() {

  }

  public showAchievementDetail(achievement, index) {
    achievement.progress = this.user.achievements[index];
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