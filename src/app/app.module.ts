import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { DropdownDirectives } from './directive/dropdown.directive';
import { ShoppingListService } from './service/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './service/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AuthInterceptiorService } from './service/auth.interceptor.service';
import { RecipeModules } from './recipes/recipes.module';
import { ShoppingModules } from './shopping/shopping.modules';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirectives,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipeModules,
    ShoppingModules
  ],
  providers: [ShoppingListService, RecipeService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptiorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
