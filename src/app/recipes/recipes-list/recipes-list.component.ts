import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes : Recipe[] = [
    new Recipe('A test recipe','This is simple a test','https://cdn.pixabay.com/photo/2017/03/10/13/57/cooking-2132874_960_720.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
