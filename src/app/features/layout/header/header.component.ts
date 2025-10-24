import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../_core/services/auth.service';
import { LayoutService } from '../../../_core/services/layout.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCartItemCount } from '../../../store/cart/cart.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private _authService: AuthService = inject(AuthService);
  private _layoutService: LayoutService = inject(LayoutService);
  private _store = inject(Store);

  isAuthenticated = this._authService.isAuthenticated;

  itemCount$: Observable<number> = this._store.select(selectCartItemCount);

  /**
   * Opens the offcanvas in the layout component
   */
  onOpenCart() {
    this._layoutService.openOffcanvas();
  }

  /**
   * Logout the current user
   */
  logout() {
    this._authService.logout();
  }
}
