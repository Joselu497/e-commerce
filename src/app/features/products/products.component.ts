import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../_core/interfaces/product';
import { ProductService } from '../../_core/services/product.service';
import { ShortDescriptionPipe } from '../../shared/pipes/short-description.pipe';
import { takeUntil } from 'rxjs';
import { DestroyComponent } from '../../shared/components/destroy.component';
import { NotificationService } from '../../_core/services/notification.service';
import { AuthService } from '../../_core/services/auth.service';
import { CartService } from '../../_core/services/cart.service';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ShortDescriptionPipe, RouterModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent extends DestroyComponent implements OnInit {
  private _productService = inject(ProductService);
  private _notificationService = inject(NotificationService);
  private _authService = inject(AuthService);
  private _cartService = inject(CartService);

  isAuthenticated = this._authService.isAuthenticated;
  products: Product[] = [];
  isLoading = signal(true);

  ngOnInit() {
    this.isLoading.set(true);

    this._productService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.products = res;
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
          this._notificationService.error('Error loading products');
        },
      });
  }

  /**
   * Adds a product to the cart in the store
   * @param product - The product to add to the cart
   */
  onAddToCart(product: Product) {
    this._notificationService.success('Product added to cart');
    this._cartService.addToCart(product);
  }
}
