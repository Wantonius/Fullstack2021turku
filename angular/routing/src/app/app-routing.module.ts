import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShoppingList} from './components/shoppinglist.component';
import {ShoppingForm} from './components/shoppingform.component';

const routes: Routes = [
	{path:"",component:ShoppingList},
	{path:"form",component:ShoppingForm}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
