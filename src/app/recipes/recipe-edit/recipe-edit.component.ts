import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from 'src/app/service/recipe.service';
import { Recipe } from 'src/app/model/recipe.model';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  formGroup : FormGroup;

  constructor(private activaedRoute : ActivatedRoute, private recipeService : RecipeService) { }

  ngOnInit(): void {
    this.activaedRoute.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id']);
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log(this.formGroup);
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe : Recipe = this.recipeService.getRecipe(String(this.id));
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name),
              'amount' : new FormControl(ingredient.amount)
            })
          );
        }
      }
    }

    this.formGroup = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imageUrl' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  private populateRecipe(recipeName : string,
    recipeImagePath : string,
    recipeDescription : string,
    recipeIngredients: FormArray){
      const recipe : Recipe = this.recipeService.getRecipe(String(this.id));
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        this.populateIngredients(recipeIngredients, recipe);
      }
  }

  private populateIngredients(recipeIngredients: FormArray, recipe : Recipe) {
    for (let ingredient of recipe.ingredients) {
      recipeIngredients.push(
        new FormGroup({
          'name' : new FormControl(ingredient.name),
          'amount' : new FormControl(ingredient.amount)
        })
      );
    }
  }
}
