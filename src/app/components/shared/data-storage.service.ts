import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeData() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-recipe-app-70ee1-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(() => {});
  }

  fetchData() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-app-70ee1-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients || [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
