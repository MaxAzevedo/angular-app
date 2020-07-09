import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthGuardService } from '../service/auth.guard.service';
import { NgModule } from '@angular/core';

const shoppingRoutes : Routes = [
  { path : 'shopping-list', component : ShoppingListComponent, canActivate : [AuthGuardService] }
];

@NgModule({
  imports : [RouterModule.forChild(shoppingRoutes)],
  exports : [RouterModule]
})
export class ShoppingRoutingModule {

}
