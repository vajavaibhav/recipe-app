import { createReducer, on } from '@ngrx/store';

import { User } from '../user.model';
import { login, loginFail, loginStart, logout } from './auth.action';

export interface AuthState {
  user: User;
  authError: string;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, action) => {
    const user = new User(
      action.email,
      action.id,
      action.token,
      action.expirationDate
    );
    return {
      ...state,
      user: user,
      authError: null,
      isLoading: false,
    };
  }),

  on(loginStart, (state, action) => {
    return {
      ...state,
      isLoading: true,
      authError: null,
    };
  }),

  on(loginFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      authError: action.authError,
    };
  }),

  on(logout, (state, action) => {
    return {
      ...state,
      user: null,
    };
  })
);
