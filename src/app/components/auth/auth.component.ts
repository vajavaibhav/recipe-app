import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, authResponse } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  constructor(private authService: AuthService , private router : Router) {}

  isLogin = false;
  isLoading = false;
  error: string = null;

  onSwitchToView() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObs: Observable<authResponse>;

    this.isLoading = true;
    if (this.isLogin) {
      authObs = this.authService.loginUser(email, password);
    } else {
      authObs = this.authService.signupUser(email, password);
    }

    authObs.subscribe({
      next: (response) => {
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes'])
      },
      error: (errMessage) => {
        console.log(errMessage);
        this.error = errMessage;
        this.isLoading = false;
      },
    });

    authForm.reset();
  }
}
