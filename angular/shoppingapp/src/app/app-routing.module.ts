import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShoppingList} from './components/shoppinglist.component';
import {ShoppingForm} from './components/shoppingform.component';
import {LoginForm} from './components/loginform.component';

const routes: Routes = [
	{path:"",component:LoginForm},
	{path:"list",component:ShoppingList},
	{path:"form",component:ShoppingForm}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
