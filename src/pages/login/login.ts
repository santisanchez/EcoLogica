import { FirebaseUserProvider } from './../../providers/firebase-user/firebase-user';
import { MainPage } from './../main/main';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {



  main: any = MainPage;

  public email: string;
  public password: string;

  formGroup: FormGroup;

  public validationMessages: any;

  constructor(private firebaseUser: FirebaseUserProvider, private formBuilder: FormBuilder,
    public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.validationMessages = {};
    this.setValidations();
  }

  login(email, password) {
    if (this.formGroup.valid) {
      this.firebaseUser.login(email, password, this.onLoginSuccess.bind(this));
    }
  }

  onLoginSuccess(isSuccess, rejection?): any {
    if (isSuccess) {
      this.navCtrl.push(this.main);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Vuelve a intentarlo',
        subTitle: 'Correo electronico o Contraseña Incorrecta',
        buttons: ['Ok'],
        cssClass: 'custom-alert',
      });
      alert.present();
    }

  }


  setValidations() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(5), Validators.required])]
    }, { updateOn: 'submit' });

    this.validationMessages = {
      email: [
        { type: 'required', message: 'El correo es requerido.' },
        { type: 'pattern', message: 'Debes ingresar un correo valido.' },
      ],
      password: [
        { type: 'required', message: 'La contraseña es requerida.' },
        { type: 'minlength', message: 'La contraseña debe tener almenos 5 caracteres.' },
        { type: 'invalid', message: 'La contraseña es incorrecta.' }
      ]
    }
  }
}
