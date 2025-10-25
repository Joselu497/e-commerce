import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { LayoutComponent } from './features/layout/layout.component';
import { LoginComponent } from './features/login/login.component';
import { PaymentComponent } from './features/payment/payment.component';
import { authGuard } from './_core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'payment',
        canActivate: [authGuard],
        component: PaymentComponent
      }
    ],
  }
];
