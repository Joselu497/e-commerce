import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CartComponent } from '../../cart/cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent { }
