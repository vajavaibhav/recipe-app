import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';

@Injectable({ providedIn : 'root'})
export class RecipeService {

  newRecipes = new Subject<Recipe[]>();


  private recipes: Recipe[] = []

  constructor() {}

  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.newRecipes.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id): Recipe {
    return this.recipes[id];
  }

  addRecipe(newRecipe : Recipe){
    this.recipes.push(newRecipe)
    this.newRecipes.next(this.recipes.slice())
  }

  updateRecipe(index: number , newRecipe : Recipe){
    this.recipes[index] = newRecipe;
    this.newRecipes.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index , 1);
    this.newRecipes.next(this.recipes.slice());
  }
}
