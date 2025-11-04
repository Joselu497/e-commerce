import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Store } from '@ngrx/store';
import {
  addToCart,
  clearCart,
  removeFromCart,
} from '../store/cart/cart.actions';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _store = inject(Store);

  /**
   * Add a product to the cart and update the total
   * If the product already exists, increment the quantity
   * @param item - Product to add to the cart
   */
  addToCart(item: Product): void {
    this._store.dispatch(addToCart({ item }));
  }

  /**
   * Remove a product from the cart and update the total
   * If the product is in the cart, decrement the quantity
   * If the product quantity is 1, remove the product from the cart
   * @param item - Product to remove from the cart
   */
  removeFromCart(item: Product): void {
    this._store.dispatch(removeFromCart({ item }));
  }

  /**
   * Clear the cart and reset the total
   */
  clearCart(): void {
    this._store.dispatch(clearCart());
  }
}
