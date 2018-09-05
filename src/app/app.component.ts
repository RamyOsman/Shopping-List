import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';



import { HomePage } from '../pages/home/home';
import { FeaturesPage } from '../pages/features/features';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, private screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault()
      splashScreen.hide()
      // set to landscape
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).catch((err) => {})
      this.checkUserState()
    })
  }







  checkUserState() {
    //this.storage.clear()
    this.storage.get('UserState').then(
      data => {
        if (data == null) {
          this.rootPage = FeaturesPage
        } else {
          this.rootPage = HomePage
        }
      },
      error => {
        console.log(error)
      }
    )
  }







}