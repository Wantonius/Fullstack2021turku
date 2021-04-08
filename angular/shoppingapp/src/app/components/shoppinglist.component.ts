import {Component,OnInit} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';
import {ShoppingService} from '../services/shoppingservice.service';
import {LoginService} from '../services/loginservice.service';
import {Router} from '@angular/router';

@Component({
	selector:"shoppinglist",
	templateUrl:"./shoppinglist.component.html"
})
export class ShoppingList implements OnInit {

	
	shoppinglist:ShoppingItem[] = [];
	
	constructor(private _shoppingService:ShoppingService, private _login:LoginService, private _router:Router) {}

	ngOnInit() {
		if(!this._login.isUserLogged()) {
			this._router.navigate(['/']);
		} else {
			this.getList();
		}
	}
	
	getList() {
		this._shoppingService.getList().subscribe(
			data => this.shoppinglist = data,
			error => console.log(error),
			() => console.log("Get list done")
		)
	}

	
	removeFromList(id:number) {
		this._shoppingService.removeFromList(id).subscribe(
			data => this.getList(),
			error => console.log(error),
			() => console.log("Remove from list done")
		);

	}
}	