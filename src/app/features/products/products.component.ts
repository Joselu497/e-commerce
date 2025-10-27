import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../_core/interfaces/product';
import { ProductService } from '../../_core/services/product.service';
import { ShortDescriptionPipe } from '../../shared/pipes/short-description.pipe';
import { takeUntil } from 'rxjs';
import { DestroyComponent } from '../../shared/components/destroy.component';
import { NotificationService } from '../../_core/services/notification.service';
import { AuthService } from '../../_core/services/auth.service';
import { CartService } from '../../_core/services/cart.service';
import { RouterModule } from '@angular/router';
import { patchState, signalState } from '@ngrx/signals';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

interface ProductsState {
  products: Product[];
  filters: {
    search: string;
    minPrice: number | null;
    maxPrice: number | null;
  };
}

const initialState: ProductsState = {
  products: [],
  filters: {
    search: '',
    minPrice: null,
    maxPrice: null,
  },
};

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ShortDescriptionPipe, RouterModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent extends DestroyComponent implements OnInit {
  filtersForm!: FormGroup;
  private _productService = inject(ProductService);
  private _notificationService = inject(NotificationService);
  private _authService = inject(AuthService);
  private _cartService = inject(CartService);
  private _fb = inject(FormBuilder);

  isAuthenticated = this._authService.isAuthenticated;
  isLoading = signal(true);

  state = signalState(initialState);

  // Returns the filtered products based on the filters
  filteredProducts = computed(() => {
    const { products, filters } = this.state();
    const { search, minPrice, maxPrice } = filters;

    return products.filter((product) => {
      if (
        search &&
        !product.title.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (minPrice && product.price < minPrice) {
        return false;
      }
      if (maxPrice && product.price > maxPrice) {
        return false;
      }
      return true;
    });
  });

  constructor() {
    super();
    this.filtersForm = this._fb.group({
      search: [''],
      minPrice: [null, [Validators.min(0)]],
      maxPrice: [null, [Validators.min(0)]]
    }, { validators: this.priceRangeValidator });
  }

  ngOnInit() {
    this.isLoading.set(true);

    // If the filters change, update the state and set the new filters
    this.filtersForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((filters) => {
        if (this.filtersForm.valid) {
          const processedFilters = {
            ...filters,
            maxPrice: filters.maxPrice === '' ? null : filters.maxPrice,
            minRating: filters.minRating === '' ? null : filters.minRating,
          };
          patchState(this.state, { filters: processedFilters });
        }
      });

    this._productService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          patchState(this.state, {
            products: res,
          });
          this.isLoading.set(false);
        },
        error: (err) => {
          this._notificationService.error('Error loading products');
          this.isLoading.set(false);
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
   * Reset the filters form
   */
  cleanFilters() {
    this.filtersForm.reset();
  }

  /**
   * Validates the price range if the min and max prices are provided
   * @param control 
   * @returns - Returns a validators map wiht the key priceRange if the min price is greater than the max price
   */
  priceRangeValidator(control: AbstractControl): ValidationErrors | null {
    const minPrice = control.get('minPrice')?.value;
    const maxPrice = control.get('maxPrice')?.value;

    if (
      minPrice !== null &&
      minPrice !== '' &&
      maxPrice !== null &&
      maxPrice !== ''
    ) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);

      if (min > max) {
        return { priceRange: true };
      }
    }

    return null;
  }
}
