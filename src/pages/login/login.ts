import { MainPage } from './../main/main';
import { User } from './../../modules/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any;
  main: any = MainPage;

  constructor(private userProvider: UserProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    this.user = {};
  }

  public login(user) {
    this.userProvider.login(user).then(
      () => {
        this.navCtrl.push(this.main)
      }, (reason) => {
        console.log("the reason of rejection was: " + reason);
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
