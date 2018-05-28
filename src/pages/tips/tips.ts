import { TipsData } from './../../modules/tips';
import { Tip } from './../../modules/tip';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the TipsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html',
})
export class TipsPage {


  tip = {} as Tip;
  tips: Tip[] = [];
  @ViewChild(Slides) slides: Slides;

  nextSlide(){
    this.slides.slideNext();
  }
  prevSlide(){
    this.slides.slidePrev();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tips=TipsData;
  }

  ionViewDidLoad() {
  }

}
