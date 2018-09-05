import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Slides } from 'ionic-angular';


import { HomePage } from '../home/home';



@Component({
  selector: 'page-features',
  templateUrl: 'features.html',
})
export class FeaturesPage {

@ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public storage: Storage) {
  	
  }



  goToSlide(page) {
    this.slides.slideTo(page, 500);
  }


  getStarted() {
  	this.navCtrl.setRoot(HomePage)
  	this.storage.set('UserState', 'started')
  }




}