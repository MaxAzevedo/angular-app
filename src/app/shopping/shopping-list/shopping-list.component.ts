import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/model/ingredient.model';
import { ShoppingListService } from 'src/app/service/shopping-list.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients : Ingredient[];
  private idChanged : Subscription;

  constructor(private router : Router, private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.idChanged = this.shoppingListService.ingredientAddedEvent.subscribe(
      (ingredients : Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  onDestry(): void {
    this.idChanged.unsubscribe();
  }

  onAddIngredient(ingredient: Ingredient) {
    this.shoppingListService.onAddIngredient(ingredient);
  }

  onEditItem(index : number) {
    this.shoppingListService.startedEditing.next(index);
  }

}
