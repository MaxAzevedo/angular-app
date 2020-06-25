import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeService } from 'src/app/service/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe : Recipe;

  constructor(private recipeService : RecipeService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params : Params) => {
        this.recipe = this.recipeService.getRecipe(String(params['id']));
      }
    );
  }

  onSubmitToShoppingList() {
    this.recipeService.onSubmitToShoppingList(this.recipe.ingredients);
  }
}
