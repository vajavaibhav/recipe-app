import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  newIngredients = new Subject<Ingredient[]>();
  editedItem = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Raw Pasta', 3),
    new Ingredient('Tomato', 6),
    new Ingredient('Cheese', 1),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newIngredients.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.newIngredients.next(this.ingredients.slice());
  }

  updatedIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.newIngredients.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index , 1);
    this.newIngredients.next(this.ingredients.slice());
  }
}
