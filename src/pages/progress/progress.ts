import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Achievement } from '../../modules/achievement';
import { AchievementsData } from '../../modules/achievements';
import { FirebaseUserProvider } from '../../providers/firebase-user/firebase-user';
import { LoginPage } from '../login/login';
import { User } from '../../modules/user';

@IonicPage()
@Component({
    selector: 'page-progress',
    templateUrl: 'progress.html',
})
export class ProgressPage {

    login: any = LoginPage;

    @ViewChild('image') imageRef: ElementRef;

    userAchievements: any;
    user: User;
    achievements: Achievement[] = AchievementsData;
    achievementDays: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private alertCtrl: AlertController, private firebaseUser: FirebaseUserProvider) {
        // this.userAchievement = { startDate: '', started: false };
        this.achievementDays = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.userAchievements = [
            { days: 0, startDate: '', started: false }, { days: 0, startDate: '', started: false },
            { days: 0, startDate: '', started: false }, { days: 0, startDate: '', started: false }
            , { days: 0, startDate: '', started: false }, { days: 0, startDate: '', started: false }
            , { days: 0, startDate: '', started: false }, { days: 0, startDate: '', started: false }
            , { days: 0, startDate: '', started: false }, { days: 0, startDate: '', started: false }
            , { days: 0, startDate: '', started: false }, { days: 0, startDate: '', started: false }
            , { days: 0, startDate: '', started: false }, { days: 0, startDate: '', started: false }
        ]
    }

    ionViewDidLoad() {
        if (this.userAchievements.startDate != '') {
            setTimeout(() => { this.imageRef.nativeElement.style.opacity = 1; }, 100);
        }
    }

    ionViewDidEnter() {
        if (FirebaseUserProvider._userDB == null) {
            this.navCtrl.push(this.login);
        }
        else {
            this.user = FirebaseUserProvider._userDB;
        }
        this.userAchievements = this.user.achievements;
        this.setAchievementDays();
    }

    showAchievementProgress(item, index) {
        let alert = this.alertCtrl.create({
            title: this.achievements[index].title,
            subTitle: 'llevas: ' + item.days + ' dias\nTe faltan: ' + (21 - item.days),
            buttons: ['Ok'],
            cssClass: 'custom-alert',
        });
        alert.present();
    }

    buildArr(theArr: String[]): String[][] {

        var arrOfarr = [];
        var value;
        for (var i = 0; i < theArr.length; i += 3) {
            var row = [];

            for (var x = 0; x < 3; x++) {
                value = theArr[i + x];

                if (!value) {
                    break;
                }
                value.days = this.achievementDays[i + x];
                row.push(value);
            }

            arrOfarr.push(row);
        }
        return arrOfarr;
    }

    setAchievementDays() {

        for (let index = 0; index < this.userAchievements.length; index++) {
            let achievementStartDate = this.userAchievements[index].startDate == '' ? new Date() : new Date(this.userAchievements[index].startDate);
            let difference = (new Date().getTime() - achievementStartDate.getTime());
            let progress = difference / (24 * 60 * 60 * 1000);
            let day = Math.ceil(progress);
            this.achievementDays[index] = day;

        }
    }

}
