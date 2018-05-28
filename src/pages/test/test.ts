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

  changeListener(event): void {
    const file = event.target.files[0];
    const filePath = 'user-photos/' + this.uid;
    const task = this.afStorage.upload(filePath, file);
  }

  getImageUrl() {
    this.afStorage.ref('user-photos/' + this.uid).getDownloadURL().subscribe((response) => {
     // this.user.imageUrl = response;
      console.log(response);

    });
  }

  async login(user: User) {

    this.userProvider.login(user).then(
      () => {
        console.log("Login Success");
      }, (reason) => {
        console.log("the reason of rejection was: " + reason);
      });
  }

  pushIntoDB() {
    this.tasksRef.set({
      username: "username1",
      imageUrl: "http://via.placeholder.com/350x100",
      achievements: [
        { title: "bag", days: 0 },
        { title: "smoke", days: 0 },
        { title: "bus", days: 0 }
      ]
    });
  }

  ionViewDidLoad() {
    // this.user.subscribe((response) => {
    //   console.log(response.achievements[0]);
    // });
  }
}
