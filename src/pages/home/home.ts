import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';

import { ShoppingListPage } from '../shopping-list/shopping-list';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';


declare var window: any;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


	lists = []

  looding = true

  constructor(public navCtrl: NavController, private actionSheet: ActionSheet, private platform: Platform, public shoppingListProvider: ShoppingListProvider, public alertCtrl: AlertController) {

  }


  ionViewWillEnter() {
  	this.shoppingListProvider.shoppingLists().then(items => {
      this.looding = false
  		this.lists = items
  	})
  }


  showToast(message){
    this.platform.ready().then(() => {
      window.plugins.toast.show(message, "short", 'bottom');
    })
  }



  newShoppingList() {
    const prompt = this.alertCtrl.create({
      title: 'New shopping list',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Shopping list name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'alert-half-btn',
          handler: data => {
            this.showToast('Cancel');
          }
        },
        {
          text: 'Add list',
          cssClass: 'alert-half-btn',
          handler: data => {

          	var res = data.Name.trim()
          	if (res == '') {
          		this.showToast("Can't add un-name shopping list")
          	} else {
			  	this.shoppingListProvider.inShoppingList(data).then(isInShoppingList => {
			  		if (isInShoppingList) {
			  			this.showToast('There is a shopping list name ' + data.Name + '.')
			  		} else {
                  var date = new Date()

                  var years = date.getFullYear()
                  var months = 1 + date.getMonth()
                  var days = 1 + date.getDay()

                  var Days = ['Sat', 'Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri']
                  var Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

                  var formattedDate = years + ', ' + Months[months] + ', ' + Days[days]

			          	this.lists.push(data)
			          	this.shoppingListProvider.addList(data, formattedDate)		
                  this.showToast('Shopping list has been created')  			
			  		}
			  	})
          	}
          }
        }
      ]
    });
    prompt.present()
  }





  showConfirmation(item) {
    const options: ActionSheetOptions = {
      title: item.Name,
      subtitle: 'Select an option',
      buttonLabels: ['View list', 'Rename list', 'Delete list'],
      androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT,
      addCancelButtonWithLabel: 'Cancel'
    };

    this.actionSheet.show(options).then((buttonIndex: number) => {
      if (buttonIndex == 1) {
        this.openShoppingList(item)
      } else if (buttonIndex == 2) {
        this.renameShoppingList(item)
      } else if (buttonIndex == 3) {
        this.removeShoppingList(item)
      }
    }, error => {
      this.showToast(error)
    })
  }








  openShoppingList(item){
  	this.navCtrl.push(ShoppingListPage, {
  		shoppingListName: item.Name
  	})
  }



  renameShoppingList(item) {
    const prompt = this.alertCtrl.create({
      title: 'Rename shopping list',
      inputs: [
        {
          name: 'Name',
          placeholder: item.Name
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'alert-half-btn',
          handler: data => {
            this.showToast('Cancel')
          }
        },
        {
          text: 'Rename list',
          cssClass: 'alert-half-btn',
          handler: data => {
            var res = data.Name.trim()
            if (res == '') {
              this.showToast("Can't add un-name shopping list")
            } else {
              this.shoppingListProvider.renameShoppingList(item.Name, data.Name)
              item.Name = data.Name
              this.showToast('Shopping list has been renamed')
            }
          }
        }
      ]
    });
    prompt.present()
  }



  removeShoppingList(item) {
    this.lists.splice(this.lists.findIndex(elm => elm.Name == item.Name), 1)
    this.shoppingListProvider.removeShoppingList(item.Name)
    this.showToast('Shopping list has been removed')
  }









}