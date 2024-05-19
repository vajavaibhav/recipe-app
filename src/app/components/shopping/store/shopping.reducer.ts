import { createReducer, on } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  startEdit,
  stopEdit,
  updatedIngredient,
} from './shopping.action';

export interface ShoppingState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingState = {
  ingredients: [
    new Ingredient('Raw Pasta', 3),
    new Ingredient('Tomato', 6),
    new Ingredient('Cheese', 1),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.ingredient],
  })),
  on(addIngredients, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.ingredients],
  })),
  on(updatedIngredient, (state, action) => {
    const ingredient = state.ingredients[state.editedIngredientIndex];
    const updatedIngredient = {
      ...ingredient,
      ...action.ingredient,
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(deleteIngredient, (state) => {
    const updatedIngredients = state.ingredients.filter((ing, index) => {
      return index !== state.editedIngredientIndex;
    });
    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(startEdit, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients,
      editedIngredient: state.ingredients[action.index],
      editedIngredientIndex: action.index,
    };
  }),
  on(stopEdit, (state) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  })
);
