import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../../_core/interfaces/product';
import { ProductService } from '../../../_core/services/product.service';
import { switchMap, takeUntil } from 'rxjs';
import { DestroyComponent } from '../../../shared/components/destroy.component';
import { NotificationService } from '../../../_core/services/notification.service';
import { AuthService } from '../../../_core/services/auth.service';
import { CartService } from '../../../_core/services/cart.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './details.component.html',
})
export class DetailsComponent extends DestroyComponent implements OnInit {
  private _productService = inject(ProductService);
  private _notificationService = inject(NotificationService);
  private _authService = inject(AuthService);
  private _cartService = inject(CartService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  isAuthenticated = this._authService.isAuthenticated;
  productId!: number;
  product!: Product;
  relatedProducts: Product[] = [];
  isLoading = signal(true);
  isLoadingRelated = signal(true);

  ngOnInit() {
    // Gets the product details and the products in the same category
    this._route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          this.isLoading.set(true);
          this.isLoadingRelated.set(true);
          
          this.productId = params['id'];
          return this._productService.get(this.productId);
        }),
        switchMap((product) => {
          this.isLoading.set(false);
          this.product = product;
          return this._productService.getAllByCategory(product.category);
        })
      )
      .subscribe({
        next: (relatedProducts) => {
          this.relatedProducts = relatedProducts.filter(
            (product: Product) => product.id !== +this.productId
          );
          this.isLoadingRelated.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.isLoadingRelated.set(false);
          this._notificationService.error('Error loading product details');
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

  /**
   * Redirects to the products page
   */
  onBack() {
    this._router.navigate(['products']);
  }
}
