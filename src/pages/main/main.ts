import { AchievementsPage } from './../achievements/achievements';
import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireObject } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  home: any = HomePage;
  achievements: any = AchievementsPage;

  uid: any = "";
  public user: any;
  public userRef: AngularFireObject<any>;
  public fileInput: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userProvider: UserProvider) {
    this.verifyAuthentication();
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.fileInput = document.getElementById('file-input');
  }

  verifyAuthentication() {
    if (this.userProvider.authenticated()) {
      this.userProvider.getUser().subscribe((response) => {
        this.user = response;
        this.uid = this.userProvider.getUid();
      }, (error) => {
        console.error("Failed to get user" + error);
      });
    } else {
      this.navCtrl.push(this.home);
    }
  }

  changeListener(event): void {
    const file = event.target.files[0];
    this.userProvider.storeImage(file);
  }

  searchImage() {
    this.fileInput.click();
  }

}
