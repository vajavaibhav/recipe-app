import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  newIngredients = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Raw Pasta', 3),
    new Ingredient('Tomato', 6),
    new Ingredient('Cheese', 1),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newIngredients.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.newIngredients.next(this.ingredients.slice());
  }
}
