import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { OffcanvasComponent } from './offcanvas/offcanvas.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, OffcanvasComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
}
