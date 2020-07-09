import { RecipesComponent } from './recipes.component';
import { AuthGuardService } from '../service/auth.guard.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const recipesRoutes : Routes = [
  { path : 'recipes', component : RecipesComponent, canActivate : [AuthGuardService],
    children: [
      { path : '', component : RecipeStartComponent},
      { path : 'new', component : RecipeEditComponent},
      { path : ':id', component : RecipesDetailComponent},
      { path : ':id/edit', component : RecipeEditComponent}
    ]
  }
];

@NgModule({
  imports : [RouterModule.forChild(recipesRoutes)],
  exports : [RouterModule]
})
export class RecipesRoutingModule {

}
