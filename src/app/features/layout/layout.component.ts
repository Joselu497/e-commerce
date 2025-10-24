import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { OffcanvasComponent } from './offcanvas/offcanvas.component';
import { LayoutService } from '../../_core/services/layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, OffcanvasComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  private _layoutService: LayoutService = inject(LayoutService);
  isOffcanvasOpen = this._layoutService.isOffcanvasOpen;
}