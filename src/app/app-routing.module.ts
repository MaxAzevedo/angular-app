import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './service/auth.guard.service';

const appRoutes : Routes = [
  { path : '', redirectTo : '/recipes', pathMatch : 'full' },
  { path : 'shopping-list', component : ShoppingListComponent, canActivate : [AuthGuardService] },
  { path : 'login', component : AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
