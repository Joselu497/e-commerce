import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../_core/interfaces/product';
import { ProductService } from '../../_core/services/product';
import { ShortDescriptionPipe } from '../../shared/pipes/short-description.pipe';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';
import { selectCartState } from '../../store/cart/cart.selector';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ShortDescriptionPipe],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private _productService = inject(ProductService);
  private _store = inject(Store);

  products: Product[] = [];
  isLoading = signal(true)

  ngOnInit() {
    this.isLoading.set(true);

    this._productService.getAll().subscribe((res) => {
      this.products = res;
      this.isLoading.set(false)
    });
  }

  onAddToCart(product: Product) {
    this._store.dispatch(addToCart({ item: product }));

    this._store.select(selectCartState).subscribe((res) => {
      console.log(res);
    });
  }
}
