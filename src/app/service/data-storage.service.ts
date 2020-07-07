import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../model/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { AuthService } from './auth.service';

@Injectable({providedIn : 'root'})
export class DataStorageService {

  constructor(private httpClient : HttpClient, private recipeService: RecipeService, private authService : AuthService){}
  URL : string = 'https://angular-app-9ead7.firebaseio.com/recipe.json';

  storeRecipes() {
    const recipes = this.recipeService.getRecepes();
    this.httpClient.put(this.URL, recipes)
    .subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(this.URL)
    .pipe(
      map(recipes => {
        return recipes.map( recipe => {
          return {
            ...recipe,
            ingredients : recipe.ingredients ? recipe.ingredients : []
          };
       });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
