import { Component } from '@angular/core';
import { FirebaseUserProvider } from './../../providers/firebase-user/firebase-user';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DailyFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily-form',
  templateUrl: 'daily-form.html',
})
export class DailyFormPage {
  user:any=this.firebaseuser;

  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseuser:FirebaseUserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyFormPage');
  }



}
