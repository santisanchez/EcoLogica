import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { FirebaseApp } from 'angularfire2'
import { UserProvider } from '../../providers/user/user';
import { User } from '../../modules/user';

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  tasksRef: any;
  // user: Observable<any>;
  user = {} as User;
  public preview;
  uid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afDatabase: AngularFireDatabase, private afStorage: AngularFireStorage,
    private userProvider: UserProvider) {
    this.uid = "BxsPHqBMExZBZ7cUa6DZWd2PmjR2";
    // this.tasksRef = this.afDatabase.object('users/' + this.uid);
    // this.user = this.tasksRef.valueChanges();
  }

  
  ionViewDidLoad() {
    // this.user.subscribe((response) => {
    //   console.log(response.achievements[0]);
    // });
  }
}
