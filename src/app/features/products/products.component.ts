import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../_core/interfaces/product';
import { ProductService } from '../../_core/services/product';
import { ShortDescriptionPipe } from '../../shared/pipes/short-description.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ShortDescriptionPipe],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private _productService = inject(ProductService)

  products: Product[] = [];
  isLoading = signal(true)

  ngOnInit() {
    this.isLoading.set(true);

    this._productService.getAll().subscribe((res) => {
      this.products = res;
      this.isLoading.set(false)
    });
  }
}
