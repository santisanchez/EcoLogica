import { LoginPage } from './../login/login';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public register: any = RegisterPage;
  public login: any = LoginPage;


  constructor(public navCtrl: NavController) {

  }

}
