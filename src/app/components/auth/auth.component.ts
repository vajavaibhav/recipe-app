import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  isLogin = false;
  isLoading = false;
  isCredentialsError = false;
  isOtherError = false;

  onSwitchToView() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    this.isLoading = true;
    if (this.isLogin) {
    } else {
      this.authService
        .signupUser(authForm.value.email, authForm.value.password)
        .subscribe({
          next: (responseData) => {
            console.log(responseData);
            this.isCredentialsError = false;
            this.isOtherError = false;
            this.isLoading = false;
          },
          error: (err) => {
            if (err.error.error.message === 'EMAIL_EXISTS') {
              this.isCredentialsError = true;
              this.isLoading = false;
            } else {
              this.isOtherError = true;
              this.isLoading = false;
            }
          },
        });
    }
    authForm.reset();
  }
}
