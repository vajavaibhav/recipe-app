import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import { environment } from '../../../environments/environment';
import { AppState } from '../../store/app.reducer';
import { login, logout } from './store/auth.action';

export interface authResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  loadedUser: User;
  private expirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}

  signupUser(email: string, password: string) {
    return this.http
      .post<authResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.FIREBASE_API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleUser(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<authResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.FIREBASE_API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleUser(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    this.loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (!this.loadedUser.token) {
      return;
    }
    this.store.dispatch(
      login({
        email: this.loadedUser.email,
        id: this.loadedUser.id,
        token: this.loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate),
      })
    );
    const durationLeft: number =
      new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(durationLeft);
  }

  logoutUser() {
    this.store.dispatch(logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.expirationTimer = setTimeout(() => {
      this.logoutUser();
    }, expirationDuration);
  }

  private handleUser(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) {
    const expiresInDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expiresInDate);

    this.store.dispatch(
      login({
        email: email,
        id: localId,
        token: idToken,
        expirationDate: expiresInDate,
      })
    );
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errMessage = 'An Unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => {
        return new Error(errMessage);
      });
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
    return throwError(() => {
      return new Error(errMessage);
    });
  }
}
