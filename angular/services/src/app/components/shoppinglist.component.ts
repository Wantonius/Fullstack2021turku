import {Component,OnInit} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';
import {ShoppingService} from '../services/shoppingservice.service';

@Component({
	selector:"shoppinglist",
	templateUrl:"./shoppinglist.component.html"
})
export class ShoppingList implements OnInit {

	shoppingitem:ShoppingItem = new ShoppingItem("",0,0,0);
	shoppinglist:ShoppingItem[] = [];
	
	constructor(private _shoppingService:ShoppingService) {}

	ngOnInit() {
		this.getList();
	}
	
	getList() {
		this.shoppinglist = this._shoppingService.getList();
	}
	
	addToList() {
		this._shoppingService.addToList(this.shoppingitem);
		this.shoppingitem = new ShoppingItem("",0,0,0);
		this.getList();
	}
	
	removeFromList(id:number) {
		this._shoppingService.removeFromList(id);
		this.getList();
	}
}	