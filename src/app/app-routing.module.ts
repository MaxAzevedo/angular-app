import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './service/auth.guard.service';

const appRoutes : Routes = [
  { path : '', redirectTo : '/recipes', pathMatch : 'full' },
  { path : 'recipes', component : RecipesComponent, canActivate : [AuthGuardService],
    children: [
      { path : '', component : RecipeStartComponent},
      { path : 'new', component : RecipeEditComponent},
      { path : ':id', component : RecipesDetailComponent},
      { path : ':id/edit', component : RecipeEditComponent}
    ]
  },
  { path : 'shopping-list', component : ShoppingListComponent, canActivate : [AuthGuardService] },
  { path : 'login', component : AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
