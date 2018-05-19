import { FirebaseUserProvider } from './../../providers/firebase-user/firebase-user';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterForm_1Page } from '../register-form-1/register-form-1';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { matchOtherValidator } from '../../modules/matchOther.validator';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public registerForm1: any = RegisterForm_1Page;
  public home: any = HomePage;//Temporal

  formGroup: FormGroup;
  passwords: FormGroup;

  public validationMessages: any;

  public email: string;
  public username: string;
  public password: string;
  public passwordConfirm: string;



  constructor(public navCtrl: NavController, public navParams: NavParams
    , private formBuilder: FormBuilder, private firebaseUser: FirebaseUserProvider) {
    this.validationMessages = {};
    this.setValidations();
  }

  register(email, username, password, confirm) {
    if (this.formGroup.valid) {
      this.firebaseUser.register(email, password, username);
      this.navCtrl.push(this.home);
    }
  }

  setValidations() {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])],
      password: ['', Validators.compose([Validators.minLength(5), Validators.required])],
      passwordConfirm: ['', Validators.compose([Validators.minLength(5), Validators.required, matchOtherValidator('password')])]
    }, { updateOn: 'submit' });

    this.validationMessages = {
      email: [
        { type: 'required', message: 'El correo es requerido.' },
        { type: 'pattern', message: 'Debes ingresar un correo valido.' },
      ],
      username: [
        { type: 'required', message: 'El usuario es requerido.' },
        { type: 'minlength', message: 'El usuario debe tener minimo 5 caracteres.' },
        { type: 'maxlength', message: 'El usuario debe tener maximo 25 caracteres.' },
      ],
      password: [
        { type: 'required', message: 'La contraseña es requerida.' },
        { type: 'minlength', message: 'La contraseña debe tener almenos 5 caracteres.' },
      ],
      passwordConfirm: [
        { type: 'required', message: 'Confirmar la contraseña es requerido.' },
        { type: 'minlength', message: 'Confirmar la contraseña debe tener almenos 5 caracteres.' },
        { type: 'matchOther', message: 'Las contraseñas deben coincidir.' }
      ]
    }
  }
}
