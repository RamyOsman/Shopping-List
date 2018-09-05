import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';


import { ProductsProvider } from '../../providers/products/products';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';

declare var window: any;


@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {


	shoppingListName
  looding = true
	products = []
  product_arr = []



  constructor(public navCtrl: NavController, private platform: Platform, public navParams: NavParams, public alertCtrl: AlertController, public productsProvider: ProductsProvider, public shoppingListProvider: ShoppingListProvider) {
  	this.shoppingListName = this.navParams.get('shoppingListName')


  }


  showToast(message){
    this.platform.ready().then(() => {
      window.plugins.toast.show(message, "short", 'bottom');
    })
  }






  ngOnInit() {
      this.productsProvider.getProductsDetails().subscribe(
        data => {
          var products = data.products
          this.looding = false
          this.products = products  
        },
        error => {
          this.showToast('Connect your Wifi')
        }
      )      
  
  }











  addItem(product) {
    this.shoppingListProvider.itemInShoppingList(product, this.shoppingListName).then(isInShoppingList => {
      if (isInShoppingList) {
        this.showToast('This item already in your shopping list')
      } else {
        this.shoppingListProvider.addProduct(product, this.shoppingListName, 1)
        this.showToast('Item has been added to the shopping list ')      
      }
    })
  }




}