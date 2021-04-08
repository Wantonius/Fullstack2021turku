import {Component} from '@angular/core';
import {LoginService} from '../services/loginservice.service';
import {Router} from '@angular/router';

@Component({
	selector:"navbar",
	templateUrl:"./navbar.component.html"
})
export class Navbar {

	constructor(private _login:LoginService,private _router:Router) {}

	isUserLogged() {
		return this._login.isUserLogged();
	}
	
	logout() {
		this._login.logout().subscribe(
			data => console.log(data.message),
			error => {
				console.log(error);
				this._login.setLoginState(false,"");
				this._router.navigate(["/"]);
			},
			() => {
				this._login.setLoginState(false,"");
				this._router.navigate(["/"]);
			}
		)
	}
}