import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes : Recipe[] = [];

  constructor(private recipeService : RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.recipesChanged.subscribe(
      (recipes : Recipe []) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecepes();

  }

  onSelect(recipe : Recipe) {
    this.recipeService.recipeSelectEvent.next(recipe);
  }
}
