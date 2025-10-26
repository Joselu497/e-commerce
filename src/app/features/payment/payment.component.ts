import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DestroyComponent } from '../../shared/components/destroy.component';
import { NotificationService } from '../../_core/services/notification.service';
import { CartService } from '../../_core/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
})
export class PaymentComponent extends DestroyComponent {
  paymentForm!: FormGroup;
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _notificationService = inject(NotificationService);
  private _cartService = inject(CartService);

  isLoading = signal(false);

  constructor() {
    super();
    this.paymentForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      cardNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      cardExpiry: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/),
        ],
      ],
      cardCvv: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      paymentMethod: [null, [Validators.required]],
    });
  }

  /**
   * Handles the payment form submission and redirects to the home page
   */
  onSubmit() {
    this.isLoading.set(true);

    if (this.paymentForm.valid) {
      // Simulate an api call to process the payment
      setTimeout(() => {
        this.isLoading.set(false);

        this._cartService.clearCart();
        this._notificationService.success('Payment successful!');
        this.onBack();
      }, 2000);
    } else {
      this.paymentForm.markAllAsTouched();
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
