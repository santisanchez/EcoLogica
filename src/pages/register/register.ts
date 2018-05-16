import { UserProvider } from './../../providers/user/user';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterForm_1Page } from '../register-form-1/register-form-1';
import { User } from '../../modules/user';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  public registerForm1: any = RegisterForm_1Page;

  public home: any = HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userProvider: UserProvider) {
  }

  register(user: User) {
    try {
      this.userProvider.register(user);
      this.navCtrl.push(this.home);
    } catch (e) {
      console.error(e);

    }
  }


  ionViewDidLoad() {

  }



}
