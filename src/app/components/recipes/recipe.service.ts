import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping/shopping-list.service';

@Injectable({ providedIn : 'root'})
export class RecipeService {

  newRecipes = new Subject<Recipe[]>();


  private recipes: Recipe[] = [
    new Recipe(
      'Pesto Pasta',
      'Tasty Italian pasta with pesto sauce',
      'https://www.nourishandtempt.com/wp-content/uploads/2022/04/357B765F-F3DC-47E7-AEA2-58A1398F1419-scaled.jpg',
      [
        new Ingredient('Pasta', 3),
        new Ingredient('Pesto sauce', 2),
        new Ingredient('Basil', 5),
        new Ingredient('Cashew', 7),
      ]
    ),
    new Recipe(
      'Red Pasta',
      'Tasty Italian pasta with Red sauce',
      'https://www.theburntbuttertable.com/wp-content/uploads/2022/03/roast-tomato-pasta-sauce-2.jpg',
      [
        new Ingredient('Pasta', 3),
        new Ingredient('Red sauce', 2),
        new Ingredient('Basil', 4),
        new Ingredient('Red chillies', 7),
      ]
    ),
    new Recipe(
      'Pink Pasta',
      'Tasty Italian pasta with pink sauce',
      'https://beatthebudget.com/wp-content/uploads/2022/06/Pink-Sauce-Pasta-Tiktok-Pasta-featured-image-1200-x-1500px.jpg',
      [
        new Ingredient('Pasta', 3),
        new Ingredient('Red sauce', 1),
        new Ingredient('White sauce', 1),
        new Ingredient('Basil', 4),
        new Ingredient('Cream', 2),
      ]
    ),
  ];

  constructor(private shoppingService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
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
