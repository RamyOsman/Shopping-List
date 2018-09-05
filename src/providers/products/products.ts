import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'



@Injectable()
export class ProductsProvider {

	private url: string

	constructor(public http: Http) {
		this.url = 'https://www.bringmeister.de/api/products?limit=60&offset=0&q=Milka'
	}


	getProductsDetails() {
		return this.http.get(this.url).map(res => res.json())
	}



}