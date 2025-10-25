import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_core/services/auth.service';
import { DestroyComponent } from '../../shared/components/destroy.component';
import { takeUntil } from 'rxjs';
import { NotificationService } from '../../_core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent extends DestroyComponent {
  loginForm!: FormGroup;
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _notificationService = inject(NotificationService);

  isLoading = signal(false);

  constructor() {
    super();
    this.loginForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  /**
   * Handles the login form submission and redirects to the home page
   */
  onSubmit() {
    this.isLoading.set(true);

    if (this.loginForm.valid) {
      this._authService
        .login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this._router.navigate(['/']);
            this.isLoading.set(false);
            this._notificationService.success('Welcome back!')
          },
          error: (err) => {
            this.isLoading.set(false);
          },
        });
    } else {
      this.loginForm.markAllAsTouched()
      this.isLoading.set(false);
    }
  }

  /**
   * Redirects to the products page
   */
  onBack() {
    this._router.navigate(['/']);
  }
}
