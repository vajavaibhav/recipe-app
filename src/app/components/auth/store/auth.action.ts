import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] login user',
  props<{
    email: string;
    id: string;
    token: string;
    expirationDate: Date;
  }>()
);

export const loginStart = createAction(
  '[Auth] login start',
  props<{ email: string; password: string }>()
);

export const loginFail = createAction(
  '[Auth] login fail',
  props<{ authError: string }>()
);

export const logout = createAction('[Auth] logout user');
