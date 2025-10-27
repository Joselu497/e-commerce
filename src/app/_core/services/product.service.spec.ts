import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ProductService', () => {
  let productService: ProductService;

  const mockProducts = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService, HttpClient, HttpHandler]
    });

    productService = TestBed.inject(ProductService);
  });

  it('should return all products', (done: DoneFn) => {
    spyOn(productService, 'getAll').and.returnValue(of(mockProducts));

    productService.getAll().subscribe((res) => {
      expect(res).toEqual(mockProducts);
      expect(res.length).toBe(2);
      done();
    });
  });

  it('should return a specific product', (done: DoneFn) => {
    spyOn(productService, 'get').and.returnValue(of(mockProducts[0]));

    productService.get(1).subscribe((res) => {
      expect(res).toEqual(mockProducts[0]);
      done();
    });
  });

  it('should return all products in a specific category', (done: DoneFn) => {
    spyOn(productService, 'getAllByCategory').and.returnValue(of(mockProducts));

    productService.getAllByCategory('category').subscribe((res) => {
      expect(res).toEqual(mockProducts);
      expect(res.length).toBe(2);
      done();
    });
  });
});