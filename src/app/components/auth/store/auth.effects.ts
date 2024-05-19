import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { login, loginFail, loginStart } from './auth.action';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface authResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      switchMap((authData) => {
        return this.http
          .post<authResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.FIREBASE_API_KEY,
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              const expiresInDate = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              return login({
                email: resData.email,
                id: resData.localId,
                token: resData.idToken,
                expirationDate: expiresInDate,
              });
            }),
            catchError((errorResponse) => {
              let errMessage = 'An Unknown error occurred!';
              if (!errorResponse.error || !errorResponse.error.error) {
                return of(loginFail({ authError: errMessage }));
              }
              switch (errorResponse.error.error.message) {
                case 'INVALID_LOGIN_CREDENTIALS':
                  errMessage = 'Invalid login credentials';
                  break;
                case 'EMAIL_EXISTS':
                  errMessage = 'This email already exist, try different one';
                  break;
                case 'INVALID_PASSWORD':
                  errMessage = 'Password is incorrect';
                  break;
                case 'EMAIL_NOT_FOUND':
                  errMessage = 'Email is incorrect';
                  break;
              }
              return of(loginFail({ authError: errMessage }));
            })
          );
      })
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
