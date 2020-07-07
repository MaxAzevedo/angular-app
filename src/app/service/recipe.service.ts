import { Recipe } from '../model/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes : Recipe[] = [];
  recipeSelectEvent = new Subject<Recipe>();

  constructor(private shoppingListService : ShoppingListService){}

  setRecipes(recipes : Recipe[]) {
    this.recipes = recipes;
    this.recipesNext();
  }

  getRecepes() {
    return this.recipes.slice();
  }

  onSubmitToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.onAddIngredients(ingredients);
  }

  getRecipe(id : string) {
    return this.recipes.find(recipe => recipe.id == id);
  }

  addRecipe(recipe : Recipe) {
    recipe.id = String(this.recipes.length + 1);
    this.recipes.push(recipe);
    this.recipesNext();
  }

  updateRecipe(id : string, recipe : Recipe) {
    const recipeFound =  this.recipes.find(r => r.id == id);
    let index = this.recipes.indexOf(recipeFound);
    this.recipes[index] = recipe;
    this.recipesNext();
  }

  deleteRecipe(id : string) {
    const recipeFound =  this.recipes.find(r => r.id == id);
    let index = this.recipes.indexOf(recipeFound);
    this.recipes.splice(index, 1);
    this.recipesNext();
  }

  deleteIngredient(recipeId : number, ingredientIndex : number) {
    const recipe = this.getRecipe(String(recipeId));
    recipe.ingredients.splice(ingredientIndex, 1);
    this.recipesNext();
  }

  private recipesNext() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
