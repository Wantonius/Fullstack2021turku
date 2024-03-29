import {Injectable} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';

@Injectable()
export class ShoppingService {

	private shoppinglist:ShoppingItem[] = [];
	private id:number = 100;
	
	getList() {
		return this.shoppinglist;
	}
	
	addToList(shoppingitem:ShoppingItem) {
		shoppingitem.id = this.id;
		this.id++;
		this.shoppinglist.push(shoppingitem);
	}
	
	removeFromList(id:number) {
		let templist = this.shoppinglist.filter(item => item.id !== id);
		this.shoppinglist = templist;
	}

}