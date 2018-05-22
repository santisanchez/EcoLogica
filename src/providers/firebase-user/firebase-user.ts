import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { User } from '../../modules/user';

@Injectable()
export class FirebaseUserProvider {

  public static _userDB: User;

  private static userDatabaseReference: AngularFireObject<any>;
  private static uid: string;
  private static userStorageReference: AngularFireStorageReference;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase
    , private afStorage: AngularFireStorage) {

  }

  //#region AuthMethods
  public login(email, password, callback?) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((resolve) => {
      FirebaseUserProvider.uid = resolve.user.uid;
      FirebaseUserProvider.userDatabaseReference = this.afDatabase.object('users/' + resolve.user.uid);
      FirebaseUserProvider.userStorageReference = this.afStorage.ref('user-photos/' + resolve.user.uid);
      FirebaseUserProvider.userDatabaseReference.valueChanges().subscribe((response) => {
        FirebaseUserProvider._userDB = response;
        callback(true);
      }, (error) => {
        console.log("error", error);
      });
    }, (reject) => {
      console.dir("reject", reject);
      callback(false, reject);
    });
  }
  public logout(){
      return this.afAuth.auth.signOut();
  }
  public register(email, password, username) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((resolve) => {
      this.registerIntoDB(resolve.user.uid, username);
    }, (reject) => {
      console.dir(reject);
    });
  }

  //#endregion

  //#region DB Methods
  public setUserAchievement(achievement: any, index: number) {
    let reference = this.afDatabase.object('/users/' + FirebaseUserProvider.uid + '/achievements/' + index);
    reference.update(achievement);
  }

  public setUserData(key: string, value: any) {
    FirebaseUserProvider.userDatabaseReference.update({ [key]: value })
  }

  private registerIntoDB(uid, username) {
    FirebaseUserProvider.userDatabaseReference = this.afDatabase.object('users/' + uid);
    FirebaseUserProvider.userDatabaseReference.set({
      username: username,
      profilePhoto: "",
      achievements: [
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" },
        { started: false, days: 0, startDate: "" }
      ]
    })
  }
  //#endregion

  //#region Storage Methods
  public storeImage(file) {

    FirebaseUserProvider.userStorageReference.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then(url => {
        this.setUserData("profilePhoto", url);
        FirebaseUserProvider._userDB.profilePhoto = url;
      }, err => {
        console.log(err);
      })

    }, (err) => {
      console.log(err);
    });

  }
  //#endregion
} 
