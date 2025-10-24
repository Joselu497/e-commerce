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
}