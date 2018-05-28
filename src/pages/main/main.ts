import { User } from './../../modules/user';
import { AchievementsPage } from './../achievements/achievements';
import { HomePage } from './../home/home';
import { DailyFormPage } from './../daily-form/daily-form';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireObject } from 'angularfire2/database';
import { FirebaseUserProvider } from '../../providers/firebase-user/firebase-user';
import { ProgressPage } from '../progress/progress';
import { TipsPage } from '../tips/tips';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  home: any = HomePage;
  achievements: any = AchievementsPage;
  progress: any = ProgressPage;
  daily:any = DailyFormPage;
  tips:any = TipsPage;

  uid: any = "";
  public user: User;
  public userRef: AngularFireObject<any>;
  public fileInput: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private firebaseUser: FirebaseUserProvider) {
    if (FirebaseUserProvider._userDB == null) {
      this.user = { username: "", profilePhoto: "", achievements: [] };
    }
    this.verifyAuthentication();
  }

  ionViewDidEnter() {
    this.fileInput = document.getElementById('file-input');
  }

  verifyAuthentication() {
    this.user = FirebaseUserProvider._userDB;
  }

  changeListener(event): void {
    const file = event.target.files[0];
    this.firebaseUser.storeImage(file);
  }

  searchImage() {
    this.fileInput.click();
  }

  logout(){
      this.firebaseUser.logout().then(()=>{
        this.navCtrl.push(this.home);
      });
  }

}
