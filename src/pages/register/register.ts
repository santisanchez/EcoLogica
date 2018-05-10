import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterForm_1Page } from '../register-form-1/register-form-1';
import { User } from '../../modules/user';

import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  public registerForm1: any = RegisterForm_1Page;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  register(user: User) {
    try {
      const result = this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      this.navCtrl.push(this.registerForm1);
    } catch (e) {
      console.error(e);

    }

  }

  ionViewDidLoad() {

  }



}
