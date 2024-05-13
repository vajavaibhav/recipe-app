import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLogin = false;

  onSwitchToView() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(authForm : NgForm) {
    console.log(authForm.value)
  }
}
