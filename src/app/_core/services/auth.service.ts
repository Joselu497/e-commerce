import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);

  /**
   * Requests a new auth token from the API
   * @param body - The username and password for the user to login
   * @returns - Observable that contains the auth token
   */
  login(body: { username: string, password: string }): Observable<any> {
    return this._http.post(API_URL + '/auth/login', body);
  }
}