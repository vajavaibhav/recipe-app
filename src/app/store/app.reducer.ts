import { ActionReducerMap } from '@ngrx/store';

import { AuthState, authReducer } from '../components/auth/store/auth.reducer';
import {
  ShoppingState,
  shoppingReducer,
} from '../components/shopping/store/shopping.reducer';

export interface AppState {
  shoppingList: ShoppingState;
  auth: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingReducer,
  auth: authReducer,
};
