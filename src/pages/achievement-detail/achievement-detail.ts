import { AchievementsData } from './../../modules/achievements';
import { FirebaseUserProvider } from './../../providers/firebase-user/firebase-user';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { Achievement } from '../../modules/achievement';
import { LoginPage } from '../login/login';
import { User } from '../../modules/user';

@IonicPage()
@Component({
    selector: 'page-achievement-detail',
    templateUrl: 'achievement-detail.html',
})
export class AchievementDetailPage {

    @ViewChild('progressBar') progressBarRef: ElementRef;
    @ViewChild('content') contentRef: ElementRef;
    login: any = LoginPage;

    public user: User;

    progressBar: any;

    achievement = {} as Achievement;
    achievements: Achievement[] = AchievementsData;

    userAchievement: any;

    previousAchievement: string;
    actualAchievement: string;
    nextAchievement: string;

    content: any;

    constructor(public navCtrl: NavController, public navParams: NavParams
        , private firebaseUser: FirebaseUserProvider) {
        this.userAchievement = { startDate: '', started: false };
        this.previousAchievement = '';
        this.nextAchievement = '';
        this.achievement = StorageProvider.data

    }

    ionViewDidLoad() {
        if (this.userAchievement.startDate != '') {
            setTimeout(() => {
                this.progressBarRef.nativeElement.style.width = this.percentProgress() + "%";
            }, 100);
        }
    }

    ionViewDidEnter() {
        this.achievement = StorageProvider.data;
        if (FirebaseUserProvider._userDB == null) {
            this.navCtrl.push(this.login);
        }
        else {
            this.user = FirebaseUserProvider._userDB;
        }
        this.userAchievement = this.user.achievements[this.achievement.index];
        this.previousAchievement = this.achievement.index == 0 ? this.achievements[13].image : this.achievements[this.achievement.index - 1].image;
        this.nextAchievement = this.achievement.index == 13 ? this.achievements[0].image : this.achievements[this.achievement.index + 1].image;
    }


    percentProgress() {
        let achievementStartDate = this.userAchievement.startDate == '' ? new Date() : new Date(this.userAchievement.startDate);
        let difference = (new Date().getTime() - achievementStartDate.getTime());
        let progress = difference / (24 * 60 * 60 * 1000);

        return (progress * 100) / 21;
    }

    public startAchievement() {
        let dateNow = new Date().toJSON();
        let achievement = { days: 0, startDate: dateNow, started: true };
        this.firebaseUser.setUserAchievement(achievement, this.achievement.index);
    }

    navigate(index, button) {       
        if (button == 'previous') {            
            this.contentRef.nativeElement.classList.add('slideInLeft');
            setTimeout(()=>{
                this.contentRef.nativeElement.classList.remove("slideInLeft");            
            },1000)
            
        } else {            
            this.contentRef.nativeElement.classList.add('slideInRight');
            setTimeout(()=>{
                this.contentRef.nativeElement.classList.remove("slideInRight");       
            },1000)            
        }
        if (this.achievement.index == 0 && index == -1) {
            index = 13
        }
        if (this.achievement.index == 13 && index == 14) {
            index = 0
        }
        this.userAchievement = this.user.achievements[index];
        this.achievement = this.achievements[index];
        if (this.userAchievement.startDate != '') {
            this.progressBarRef.nativeElement.style.width = this.percentProgress() + "%";
        }
        this.previousAchievement = this.achievement.index == 0 ? this.achievements[13].image : this.achievements[index - 1].image;
        this.nextAchievement = this.achievement.index == 13 ? this.achievements[0].image : this.achievements[index + 1].image;
    }

}
