import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserProvider {

  public userDB: any;
  public userRef: AngularFireObject<any>;
  public uid: string;
  private authState: any = null;

  constructor(private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth
    , private afStorage: AngularFireStorage) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }
  //se inicializa la referencia a la base de datos
  public setReference(uid) {
    this.userRef = this.afDatabase.object('users/' + uid);
  }


  public getUid() {
    return this.uid;
  }

  public storeImage(file) {
    const filePath = 'user-photos/' + this.uid;
    this.afStorage.upload(filePath, file).then(() => {
      this.setImageUrl();
    });
  }

  public setImageUrl() {
    this.afStorage.ref('user-photos/' + this.uid).getDownloadURL().subscribe((response) => {
      this.userRef.update({ "photoUrl": response });
    });
  }

  public getUser(): Observable<any> {
    return this.userDB = this.userRef.valueChanges();
  }

  public setUserAchievement(key: string, value: any, index: number) {
    let reference = this.afDatabase.object('/users/' + this.uid + '/achievements/' + index);
    reference.update({ [key]: value });
  }

  public authenticated(): boolean {
    return this.authState != null;
  }

  public login(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then((auth) => {
      this.uid = this.authState.uid;
      this.setReference(this.uid);
    }, (reason) => {
      console.log(reason);
    });
  }

  public logout() {
    this.afAuth.auth.signOut();
  }

  public register(user) {
    let _self = this;
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
      function success(userData) {
        _self.userRef = _self.afDatabase.object('users/' + userData.uid);
        _self.userRef.set({
          username: user.username,
          photoUrl: "",
          achievements: [
            { title: "fumar", started: false, days: 0 },
            { title: "cubiertos", started: false, days: 0 },
            { title: "bolsa", started: false, days: 0 },
            { title: "bus", started: false, days: 0 },
            { title: "termo", started: false, days: 0 },
            { title: "fotocopias", started: false, days: 0 },
            { title: "carro", started: false, days: 0 },
            { title: "pitillo", started: false, days: 0 },
            { title: "bicicleta", started: false, days: 0 },
            { title: "escaleras", started: false, days: 0 },
            { title: "residuos", started: false, days: 0 },
            { title: "desechables", started: false, days: 0 },
            { title: "papel", started: false, days: 0 },
            { title: "ducha", started: false, days: 0 }
          ]
        });
      }
    );

  }

}
