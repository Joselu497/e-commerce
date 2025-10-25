import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl + '/products'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _http: HttpClient = inject(HttpClient);

  /**
   * Get all products from the API
   * @returns - Observable that contains a list of products
   */
  getAll(): Observable<any> {
    return this._http.get(API_URL);
  }

  /**
   * Get the data of a specific product
   * @param id - The id of the product to get
   * @returns - Observable that contains the product data
   */
  get(id: number): Observable<any> {
    return this._http.get(API_URL + '/' + id);
  }

  /**
   * Get the data of all products in a specific category
   * @param category - The category of the products to get
   * @returns - Observable that contains the products data
   */
  getAllByCategory(category: string): Observable<any> {
    return this._http.get(API_URL + '/category/' + category);
  }
}