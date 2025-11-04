import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../_core/interfaces/product';
import { CartService } from '../../_core/services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { LayoutService } from '../../_core/services/layout.service';
import { CartItem } from '../../_core/store/cart/cart';
import {
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
} from '../../_core/store/cart/cart.selector';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private _store = inject(Store);
  private _cartService = inject(CartService);
  private _router = inject(Router);
  private _layoutService = inject(LayoutService);

  items$: Observable<CartItem[]> = this._store.select(selectCartItems);
  total$: Observable<number> = this._store.select(selectCartTotal);
  itemCount$: Observable<number> = this._store.select(selectCartItemCount);
  cartItems$: Observable<CartItem[]> = this._store.select(selectCartItems);

  /**
   * Increments the quantity if the product is already in the cart
   * @param item - Product to add to the cart
   */
  addToCart(item: Product): void {
    this._cartService.addToCart(item);
  }

  /**
   * Decrements the quantity if the product is in the cart and removes it if the quantity is 0
   * @param item - Product to remove from the cart
   */
  removeFromCart(item: Product): void {
    this._cartService.removeFromCart(item);
  }

  /**
   * Clears the cart and resets the total
   */
  clearCart(): void {
    this._layoutService.closeOffcanvas();
    this._cartService.clearCart();
  }

  /**
   * Navigates to the payment page to process to payment
   */
  onProcess() {
    this._layoutService.closeOffcanvas();
    this._router.navigate(['payment']);
  }
}
