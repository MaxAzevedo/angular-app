import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RouterModule } from '@angular/router';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule } from './shopping.routing.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    RouterModule.forChild([]),
    CommonModule,
    ReactiveFormsModule,
    ShoppingRoutingModule
  ],
  exports : [
    ShoppingListComponent,
    ShoppingEditComponent
  ]
})
export class ShoppingModules{

}
