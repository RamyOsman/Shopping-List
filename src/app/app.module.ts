import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage'
import { ActionSheet } from '@ionic-native/action-sheet';
import { Toast } from '@ionic-native/toast';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { AddItemPage } from '../pages/add-item/add-item';
import { FeaturesPage } from '../pages/features/features';
import { ProductsProvider } from '../providers/products/products';
import { ShoppingListProvider } from '../providers/shopping-list/shopping-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShoppingListPage,
    AddItemPage,
    FeaturesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShoppingListPage,
    AddItemPage,
    FeaturesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductsProvider,
    ShoppingListProvider,
    ActionSheet,
    Toast,
    ScreenOrientation
  ]
})
export class AppModule {}
