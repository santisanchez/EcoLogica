import { MainPage } from './../pages/main/main';
import { TestPage } from './../pages/test/test';
import { AchievementDetailPage } from './../pages/achievement-detail/achievement-detail';
import { AchievementsPage } from './../pages/achievements/achievements';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { RegisterForm_1Page } from '../pages/register-form-1/register-form-1';
import { StorageProvider } from '../providers/storage/storage';
import { UserProvider } from '../providers/user/user';

import { FaIconComponent } from '../components/fa-icon/fa-icon.component';
import { TipsPage } from '../pages/tips/tips';
import { FirebaseUserProvider } from '../providers/firebase-user/firebase-user';
import { FormBuilder } from '@angular/forms';

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDvqyt20CB3JByCzF2DioRO9m7my0RaL2U",
  authDomain: "ecologica-10a81.firebaseapp.com",
  databaseURL: "https://ecologica-10a81.firebaseio.com",
  projectId: "ecologica-10a81",
  storageBucket: "ecologica-10a81.appspot.com",
  messagingSenderId: "977426524541"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    RegisterForm_1Page,
    LoginPage,
    AchievementsPage,
    AchievementDetailPage,
    MainPage,
    TestPage,
    TipsPage,
    FaIconComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG, 'EcoLogica'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    RegisterForm_1Page,
    LoginPage,
    AchievementsPage,
    AchievementDetailPage,
    MainPage,
    TestPage,
    TipsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StorageProvider,
    UserProvider,
    FirebaseUserProvider,
    FormBuilder
  ],
  exports: [FaIconComponent]
})
export class AppModule { }
