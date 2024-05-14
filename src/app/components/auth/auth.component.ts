import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService, authResponse } from './auth.service';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AlertComponent } from '../shared/alter/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLogin = false;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private compSub: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        this.router.navigate(['/recipes']);
      },
      error: (errMessage) => {
        console.log(errMessage);
        this.error = errMessage;
        this.showErrorAlert(errMessage);
        this.isLoading = false;
      },
    });

    authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertCompFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const compRef =
      hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);

    compRef.instance.message = message;
    this.compSub = compRef.instance.close.subscribe(() => {
      this.compSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.compSub) {
      this.compSub.unsubscribe();
    }
  }
}
