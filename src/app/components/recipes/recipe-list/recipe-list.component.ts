import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit{

  recipes : Recipe[];

  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService){}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes()
  }

  OnRecipeSelected(event : Recipe) {
      this.selectedRecipe.emit(event);
  }

}
