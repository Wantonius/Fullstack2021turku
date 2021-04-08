import {Component,OnInit} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';
import {ShoppingService} from '../services/shoppingservice.service';
import {LoginService} from '../services/loginservice.service';
import {Router} from '@angular/router';

@Component({
	selector:"shoppingform",
	templateUrl:"./shoppingform.component.html"
})
export class ShoppingForm implements OnInit {
	shoppingitem:ShoppingItem = new ShoppingItem("",0,0,0);
	
	constructor(private _shoppingService:ShoppingService, private _login:LoginService,private _router:Router) {}
	
	ngOnInit() {
		if(!this._login.isUserLogged()) {
			this._router.navigate(["/"]);
		}
	}
		
	addToList() {
		this._shoppingService.addToList(this.shoppingitem).subscribe(
			data => console.log(data),
			error => console.log(error),
			() => {
				this.shoppingitem = new ShoppingItem("",0,0,0);
			}
		)
	}
}