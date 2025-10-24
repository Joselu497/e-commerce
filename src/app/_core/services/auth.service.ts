import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);
  private _router = inject(Router);
  private _token = signal(this.getToken);

  isAuthenticated = computed(() => !!this._token());

  get getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Requests a new auth token from the API and updates the token in local storage
   * @param body - The username and password for the user to login
   * @returns - Observable that contains the auth token
   */
  login(body: { username: string; password: string }): Observable<any> {
    return this._http.post(API_URL + '/auth/login', body).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this._token.set(res.token);
          this._router.navigate(['/']);
        }
      })
    );
  }

  /**
   * Logs out the current user and clears the token from local storage
   */
  logout() {
    localStorage.removeItem('token');
    this._token.set(null);
  }
}
