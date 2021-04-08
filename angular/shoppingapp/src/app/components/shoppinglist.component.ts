import {Component,OnInit} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';
import {ShoppingService} from '../services/shoppingservice.service';

@Component({
	selector:"shoppinglist",
	templateUrl:"./shoppinglist.component.html"
})
export class ShoppingList implements OnInit {

	
	shoppinglist:ShoppingItem[] = [];
	
	constructor(private _shoppingService:ShoppingService) {}

	ngOnInit() {
		this.getList();
	}
	
	getList() {
		this.shoppinglist = this._shoppingService.getList();
	}

	
	removeFromList(id:number) {
		this._shoppingService.removeFromList(id);
		this.getList();
	}
}	