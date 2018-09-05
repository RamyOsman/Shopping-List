import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';



import { AddItemPage } from '../add-item/add-item';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';


declare var window: any;



@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {


  shoppingListName

  products = []

  itemPrice
  TotalPrice


  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, public shoppingListProvider: ShoppingListProvider) {
    this.shoppingListName = this.navParams.get('shoppingListName')
  }

  showToast(message){
    this.platform.ready().then(() => {
      window.plugins.toast.show(message, "short", 'bottom');
    })
  }





   public ionViewWillEnter() {
    this.shoppingListProvider.shoppingLists().then(items => {
      var i = items.findIndex(elm => elm.Name == this.shoppingListName)
      var res = items[i].Products
          res.sort((a, b) => {
            if (a.name < b.name) return -1;
            else if (a.name > b.name) return 1;
            else return 0;
          })

      let sum
      let array = []
      for (var ii in res) {
        res[ii].totalPrice = res[ii].Number * res[ii].prices.price
        array.push(res[ii].totalPrice)
        sum = array.reduce((a, b) => a + b, 0)

          this.products = res

      }
      this.TotalPrice = sum

    })
  }





  addItem() {
  	this.navCtrl.push(AddItemPage, {
      shoppingListName: this.shoppingListName
    })
  }







  decreament(item) {
    var res = item.Number
      
    if (item.Number == 1) {
      // Remove From Shopping List
      this.shoppingListProvider.removeProduct(item, this.shoppingListName)
      this.products.splice(this.products.indexOf(item), 1)
        let sum
        let array = []
        for (var i in this.products) {
          this.products[i].totalPrice = this.products[i].Number * this.products[i].prices.price
          array.push(this.products[i].totalPrice)
          sum = array.reduce((a, b) => a + b, 0)
          this.products = this.products
      }
      this.TotalPrice = sum

      this.showToast('Item has been removed from the shopping list ')
    } else {
      // Decrease Item Number
      res = res - 1
      item.Number = res
      this.shoppingListProvider.update(item, this.shoppingListName, item.Number)
        let sum
        let array = []
        for (var ii in this.products) {
          this.products[ii].totalPrice = this.products[ii].Number * this.products[ii].prices.price
          array.push(this.products[ii].totalPrice)
          sum = array.reduce((a, b) => a + b, 0)
          this.products = this.products
      }
      this.TotalPrice = sum      
    }
  }



  increament(item) {
    // Increase Item Number
    var res = item.Number
    res = res + 1
    item.Number = res
    this.shoppingListProvider.update(item, this.shoppingListName, item.Number)
        let sum
        let array = []
        for (var i in this.products) {
          this.products[i].totalPrice = this.products[i].Number * this.products[i].prices.price
          array.push(this.products[i].totalPrice)
          sum = array.reduce((a, b) => a + b, 0)
          this.products = this.products
      }
      this.TotalPrice = sum    
  }



  deleteProduct(item) {
    this.shoppingListProvider.removeProduct(item, this.shoppingListName)

    this.products.splice(this.products.indexOf(item), 1)
      let sum
      let array = []
      for (var i in this.products) {
        this.products[i].totalPrice = this.products[i].Number * this.products[i].prices.price
        array.push(this.products[i].totalPrice)
        sum = array.reduce((a, b) => a + b, 0)
        this.products = this.products
    }
    this.TotalPrice = sum

    this.showToast('Item has been removed from the shopping list ')
  }









}