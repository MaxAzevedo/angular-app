import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  public ingredients : Ingredient[] = []

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient (ingredient : Ingredient) {
    this.ingredients.push(ingredient);
  }

}
