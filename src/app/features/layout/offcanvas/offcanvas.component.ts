import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../../cart/cart.component';
import { LayoutService } from '../../../_core/services/layout.service';

@Component({
  selector: 'app-offcanvas',
  standalone: true,
  imports: [CommonModule, RouterModule, CartComponent],
  templateUrl: './offcanvas.component.html',
})
export class OffcanvasComponent {
  private _layoutService: LayoutService = inject(LayoutService);

  isOffcanvasOpen = this._layoutService.isOffcanvasOpen;

  /**
   * Closes the offcanvas in the layout component
   */
  closeOffcanvas() {
    this._layoutService.closeOffcanvas();
  }
}
