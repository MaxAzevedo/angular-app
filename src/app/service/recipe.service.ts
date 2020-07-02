import { Recipe } from '../model/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes : Recipe[] = [
    new Recipe(
      '1',
      'Recipe 1',
      'Salgado',
      'https://cdn.pixabay.com/photo/2017/03/10/13/57/cooking-2132874_960_720.jpg',
      [
        new Ingredient('Meat','1'),
        new Ingredient('French Fries','1')
      ]),
    new Recipe(
      '2',
      'Hamburguer',
      'Godamn taste hamburguer',
      'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_960_720.jpg',
      [
        new Ingredient('Brad','1'),
        new Ingredient('Meet','1')
      ]),
    new Recipe(
      '3',
      'Pizza',
      'Fucking delicious pizza',
      'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_960_720.jpg',
      [
        new Ingredient('Cheese','200g'),
        new Ingredient('Calabresa','100g')
      ])
  ];
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
