import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface signupResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signupUser(email: string, password: string) {
    return this.http.post<signupResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC30pAIbIuWc8-5KfuV_eYoiaxN8cr-hQE',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
