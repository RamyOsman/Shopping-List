import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';




@Injectable()
export class ShoppingListProvider {

  constructor(public storage: Storage) {

  }






  shoppingLists() {
  	//this.storage.clear()
  	return this.storage.get('Lists').then(items => {
  		if (items == null) {
  			items = new Array<any>()
  		}
  		return items
  	})
  }


  inShoppingList(list){
  	return this.shoppingLists().then(items => {
  		for (let i = 0; i < items.length; i++) {
  			if (items[i].Name == list.Name) {
  				return true
  			}
  		}
  		return false
  	})
  }


  itemInShoppingList(product, listName){
  	return this.shoppingLists().then(items => {
  		var ii = items.findIndex(elm => elm.Name == listName)
  		var res = items[ii].Products

  		for (let i = 0; i < res.length; i++) {
  			if (res[i].id == product.id) {
  				return true
  			}
  		}
  		return false
  	})
  }


  addList(list, date) {
  	this.shoppingLists().then(items => {
  		items.push(list)
  		var i = items.findIndex(elm => elm.Name == list.Name)
      items[i].Products = []
  		items[i].Date = date
  		this.save(items)
  	})
  }

  save(items) {
  	this.storage.set('Lists', items)
  }




  addProduct(product, listName, itemNumber) {
  	this.shoppingLists().then(items => {
  		var i = items.findIndex(elm => elm.Name == listName)

  		var res = items[i].Products

  		var ii = res.findIndex(elm => elm.id == product.id)

  		if (ii == -1) {
  			res.push(product)
  			var iii = res.findIndex(elm => elm.id == product.id)
  			res[iii].Number = itemNumber
  		} else {
  			res[ii].Number = itemNumber
  		}

  		this.save(items)
  	})
  }




  removeProduct(product, listName) {
  	this.shoppingLists().then(items => {
  		var i = items.findIndex(elm => elm.Name == listName)
  		var res = items[i].Products

  		res.splice(res.findIndex(elm => elm.id == product.id), 1)

  		this.save(items)
  	})
  }


  update(product, listName, number) {
  	this.shoppingLists().then(items => {
  		var i = items.findIndex(elm => elm.Name == listName)
  		var res = items[i].Products


  		var ii = res.findIndex(elm => elm.id == product.id)
  		res[ii].Number = number
  		this.save(items)
  	})
  }




  removeShoppingList(listName) {
    this.shoppingLists().then(items => {
      items.splice(items.findIndex(elm => elm.Name == listName), 1)
      this.save(items)
    })
  }





  renameShoppingList(listName, newName) {
    this.shoppingLists().then(items => {
      var i = items.findIndex(elm => elm.Name == listName)
      items[i].Name = newName
      this.save(items)
    })
  }






}