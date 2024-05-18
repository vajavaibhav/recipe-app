import { createAction, props } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const addIngredient = createAction(
  '[ShoppingList] addIngredient',
  props<{ ingredient: Ingredient }>()
);

export const addIngredients = createAction(
  '[ShoppingList] addIngredients',
  props<{ ingredients: Ingredient[] }>()
);

export const updatedIngredient = createAction(
  '[ShoppingList] updateIngredient',
  props<{ ingredient: Ingredient }>()
);

export const deleteIngredient = createAction('[ShoppingList] deleteIngredient');

export const startEdit = createAction(
  '[ShoppingList] startEdit',
  props<{ index: number }>()
);

export const stopEdit = createAction('[ShoppingList] stopEdit');
