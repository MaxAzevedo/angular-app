import { Ingredient } from '../model/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {

  ingredientAddedEvent = new Subject<Ingredient[]>();
  private ingredients : Ingredient[] = [];

  getIngredients() {
    return this.ingredients.slice();
  }

  onAddIngredient(ingredient : Ingredient) {
    this.ingredients.push(ingredient);
    this.emitIngredientChange();
  }

  onAddIngredients(ingredients : Ingredient []) {
    this.ingredients.push(...ingredients);
    this.emitIngredientChange();
  }

  private emitIngredientChange() {
    this.ingredientAddedEvent.next(this.ingredients.slice());
  }
}
