import { Component, inject } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AuthService } from '../../../_core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent { 
  private _authService: AuthService = inject(AuthService)

  isAuthenticated = this._authService.isAuthenticated;

  /**
   * Logout the current user
   */
  logout() {
    this._authService.logout();
  }
}
