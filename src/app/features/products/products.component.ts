import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../_core/interfaces/product';
import { ProductService } from '../../_core/services/product.service';
import { ShortDescriptionPipe } from '../../shared/pipes/short-description.pipe';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';
import { selectCartState } from '../../store/cart/cart.selector';
import { takeUntil } from 'rxjs';
import { DestroyComponent } from '../../shared/components/destroy.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ShortDescriptionPipe],
  templateUrl: './products.component.html',
})
export class ProductsComponent extends DestroyComponent implements OnInit {
  private _productService = inject(ProductService);
  private _store = inject(Store);

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
        },
      });
  }

  /**
   * Adds a product to the cart in the store
   * @param product - The product to add to the cart
   */
  onAddToCart(product: Product) {
    this._store.dispatch(addToCart({ item: product }));
  }
}
