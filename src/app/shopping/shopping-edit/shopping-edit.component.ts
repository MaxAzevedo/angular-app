import { Component, OnInit, OnDestroy} from '@angular/core';
import { Ingredient } from 'src/app/model/ingredient.model';
import { ShoppingListService } from 'src/app/service/shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription : Subscription
  formGroup : FormGroup;
  editMode : boolean = false;
  editedItemIndex: number;
  ingredient : Ingredient;

  constructor(private shoppingListServive : ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListServive.startedEditing
      .subscribe(
        (index : number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.ingredient = this.shoppingListServive.getIngredient(index);
          this.formGroup.setValue({
            'name' : this.ingredient.name,
            'amount' : this.ingredient.amount
          });
      });
    this.formGroup = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, Validators.required),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem() {
    const name = this.formGroup.get('name').value;
    const amount = this.formGroup.get('amount').value;
    const igredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.shoppingListServive.updateIngredient(this.editedItemIndex, this.ingredient);
    } else {
      this.shoppingListServive.onAddIngredient(igredient);

    }
    this.formGroup.reset();
  }

  clear() {
    this.formGroup.reset();
    this.editMode = false;
    this.editedItemIndex = null;
  }

  delete(index : number) {

  }
}
