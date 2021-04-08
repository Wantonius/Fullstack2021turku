import {Injectable} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';
import {LoginService} from './loginservice.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {BackendMessage} from '../models/backendmessage.model';

@Injectable()
export class ShoppingService {

	private shoppinglist:ShoppingItem[] = [];
	
	constructor(private _http:HttpClient,private _login:LoginService) {}
	
	getList() {
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-type":"application/json",
				"token":this._login.getToken()
			})
		}
		return this._http.get<ShoppingItem[]>("/api/shopping",httpOptions);
	}
	
	addToList(shoppingitem:ShoppingItem) {
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-type":"application/json",
				"token":this._login.getToken()
			})
		}
		return this._http.post<BackendMessage>("/api/shopping",shoppingitem,httpOptions);
	}
	
	removeFromList(id:number) {
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-type":"application/json",
				"token":this._login.getToken()
			})
		}
		return this._http.delete<BackendMessage>("/api/shopping/"+id,httpOptions);
	}

}