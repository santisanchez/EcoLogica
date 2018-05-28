import { Component } from '@angular/core';
import { FirebaseUserProvider } from './../../providers/firebase-user/firebase-user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  
  formGroup: FormGroup; 

  public validationMessages: any;    

  public transport: string;

  public noEatMeat: boolean;
  public showerTime: string;
  public separeWaste: boolean;
  public noPitillo: boolean;
  public noMixer: boolean;
  public noSmoke: boolean;
  public clothBag: boolean;

  public bringLunch: boolean;
  public bringPartner: boolean;
  public bringFlask: boolean;
  public greenPoint: boolean;
  public bringCutlery: boolean;
  public recycledPaper:boolean;

  public timeShower=[
    {value:1,text: "1 minuto"},
    {value:2,text: "2 minutos"},
    {value:3,text: "3 minutos"},
    {value:4,text: "4 minutos"},
    {value:5,text: "5 minutos"},
    {value:6,text: "6 minutos"},
    {value:7,text: "7 minutos"},
    {value:8,text: "8 minutos"},
    {value:9,text: "9 minutos"},
    {value:10,text: "10 minutos"},
    {value:11,text: "11 minutos"},
    {value:12,text: "12 minutos"},
    {value:13,text: "13 minutos"},
    {value:14,text: "14 minutos"},
    {value:15,text: "15 minutos"},
    {value:16,text: "16 minutos"},
    {value:17,text: "17 minutos"},
    {value:18,text: "18 minutos"},
    {value:19,text: "19 minutos"},
    {value:20,text: "20 minutos"},
    {value:21,text: "21 minutos"},
    {value:22,text: "22 minutos"},
    {value:23,text: "23 minutos"},
    {value:24,text: "24 minutos"},
    {value:25,text: "25 minutos"},
    {value:26,text: "26 minutos"},
    {value:27,text: "27 minutos"},
    {value:28,text: "28 minutos"},
    {value:29,text: "29 minutos"},
    {value:30,text: "30 minutos"},
    {value:100,text: "+ de 30 minutos"},
  ];

	//achievement = {} as Achievement;
  //achievements: Achievement[] = AchievementsData;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private firebaseUser:FirebaseUserProvider) {
    this.validationMessages = {};
    this.setValidations();  
    this.noEatMeat=false;
    this.separeWaste=false;
    this.noPitillo=false;
    this.noMixer=false;
    this.noSmoke=false;
    this.clothBag=false;
    this.bringCutlery=false;
    this.bringFlask=false;
    this.bringLunch=false;
    this.bringPartner=false;
    this.greenPoint=false;
    this.recycledPaper=false;
	//	this.achievement = StorageProvider.data      
  }

  saveData(){
    let index: number=0;
    while(index<3)
    {
      let achievement:any=FirebaseUserProvider._userDB.achievements[index];
      let newAchievement:any;
      let currentDate= new Date().toJSON();      
      if(achievement.started){
        let currentDays: number= Number(achievement.days);
        let calculatedDay: number= this.calculateDays(currentDate,achievement);
        console.log(calculatedDay);
        currentDays+=1;
        if(currentDays==calculatedDay || (currentDays-1)==calculatedDay){
          switch(index){
            case 0:
            if(this.formGroup.value.noSmoke==true)
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
            case 1:
            if(this.formGroup.value.bringCutlery==true)
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
            case 2:
            if(this.formGroup.value.clothBag==true)
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
            case 3:
            if(this.formGroup.value.transport=="onBus" || this.formGroup.value.transport=="onMetro")
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
            case 4:
            if(this.formGroup.value.bringFlask==true)
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
            case 5:
            if(this.formGroup.value.recycledPaper==true)
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
            case 6:
            if(this.formGroup.value.bringPartner==true)
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
            case 7:
            if(this.formGroup.value.noPitillo==true)
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
            case 8:
            if(this.formGroup.value.trasnport=="onFoot")
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
            case 9:/*
            if(this.formGroup.value.noSmoke==true)
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }*/
            break;
            case 10:
            if(this.formGroup.value.separeWaste==true)
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
            case 11:
            if(this.formGroup.value.noMixer==true)
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
            case 12:
            if(this.formGroup.value.recycledPaper==true)
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
            case 13:
            if(this.formGroup.value.showerTime<=5)
            {
              newAchievement={ days: calculatedDay, startDate: achievement.startDate, started: true };
            }
            else{
              newAchievement={ days: 0, startDate: currentDate, started: true };                
            }
            break;
          }
        }
        else{
          newAchievement={ days: 0, startDate: currentDate, started: true };
        }
      }
      else{
        switch(index){
          case 0:
            if(this.formGroup.value.noSmoke)
            {
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
          case 1:
            if(this.formGroup.value.bringCutlery==true)
            {             
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
          case 2:
            if(this.formGroup.value.clothBag==true)
            {
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
          case 3:
            if(this.formGroup.value.transport=="onBus" || this.formGroup.value.transport=="onMetro")
            {
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
          case 4:
            if(this.formGroup.value.bringFlask==true)
            {
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
          case 5:
            (this.formGroup.value.recycledPaper==true)
            {
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
          case 6:
            if(this.formGroup.value.bringPartner==true)
            {
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
          case 7:
            if(this.formGroup.value.noPitillo==true)
            {              
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
          case 8:
            if(this.formGroup.value.trasnport=="onFoot")
            {
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
          case 9:/*
            if(this.formGroup.value.noSmoke==true)
            {
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }*/
          break;
          case 10:
            if(this.formGroup.value.separeWaste==true)
            { 
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
          case 11:
            if(this.formGroup.value.noMixer==true)
            {
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
          case 12:
            if(this.formGroup.value.recycledPaper==true)
            {
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
          case 13:
            if(this.formGroup.value.showerTime<=5)
            {               
              newAchievement={ days: 1, startDate: currentDate, started: true };
            }
          break;
        }
      }
      this.firebaseUser.setUserAchievement(newAchievement,index);
      index++;      
    }
    console.log(FirebaseUserProvider._userDB.achievements);    
  }

  calculateDays(date,achievement){
    let numberDays: number=0;
    let splitDate1:any=date.split("-");
    let splitDate2:any=achievement.startDate.split("-");
    let days: number=0;
    splitDate1=splitDate1[2].split("T")[0];
    splitDate2=splitDate2[2].split("T")[0];
    if(date.split("-")[1]>achievement.startDate.split("-")[1]){
      numberDays++;
    }
    if(Number(splitDate1-splitDate2)>0)
    {
      splitDate1=splitDate1+splitDate2;
      days=Number(splitDate1-splitDate2);
    }
    else{

    }
    numberDays=numberDays+days;
    return numberDays;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyFormPage');
    
  }

  setValidations() {
    this.formGroup = this.formBuilder.group({
     transport: ['',Validators.required],
     noEatMeat: ['',Validators.required],
     separeWaste: ['',Validators.required],
     showerTime: ['',Validators.required],
     noPitillo: ['',Validators.required],
     noMixer: ['',Validators.required],
     noSmoke: ['',Validators.required],
     clothBag: ['',Validators.required],
     bringLunch: ['',Validators.required],
     bringPartner: ['',Validators.required],
     bringFlask: ['',Validators.required],
     greenPoint: ['',Validators.required],
     bringCutlery: ['',Validators.required],
     recycledPaper: ['',Validators.required]
    }, { updateOn: 'submit' });

    this.validationMessages = {
      transport: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      noEatMeat: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      separeWaste: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      showerTime: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      noPitillo: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      noMixer: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      noSmoke: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      clothBag: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      bringLunch: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      bringPartner: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      bringFlask: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      greenPoint: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      bringCutlery: [
        { type: 'required', message: 'El check es requerido.' }
      ],
      recycledPaper: [
        { type: 'required', message: 'El check es requerido.' }
      ]
    }
  }
}
