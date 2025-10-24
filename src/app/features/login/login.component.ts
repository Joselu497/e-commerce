import { CommonModule } from '@angular/common';
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
          },
          error: (err) => {
            this.isLoading.set(false);
          },
        });
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.isLoading.set(false);
    }
  }

  /**
   * Redirects to the products page
   */
  onBack() {
    this._router.navigate(['products']);
  }
}
