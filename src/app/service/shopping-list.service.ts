import { Ingredient } from '../model/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

  ingredientAddedEvent = new Subject<Ingredient[]>();
  private ingredients : Ingredient[] = [];
  startedEditing = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index : number) {
    return this.ingredients[index];
  }

  deleteIngredient(index : number) {
    this.ingredients.splice(index, 1);
    this.emitIngredientChange();
  }

  onAddIngredient(ingredient : Ingredient) {
    this.ingredients.push(ingredient);
    this.emitIngredientChange();
  }

  onAddIngredients(ingredients : Ingredient []) {
    this.ingredients.push(...ingredients);
    this.emitIngredientChange();
  }

  updateIngredient(index : number, newIngredient : Ingredient) {
    this.ingredients[index] = newIngredient;
    this.emitIngredientChange();
  }

  private emitIngredientChange() {
    this.ingredientAddedEvent.next(this.ingredients.slice());
  }
}
