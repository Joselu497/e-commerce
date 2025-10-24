import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selector';
import { CartItem } from '../../store/cart/cart';
import { Product } from '../../_core/interfaces/product';
import { CartService } from '../../_core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private _store = inject(Store);
  private _cartService = inject(CartService);

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
    this._cartService.clearCart();
  }
}
