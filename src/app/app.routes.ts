import { Routes } from '@angular/router';
import { LayoutComponent } from './features/layout/layout.component';
import { LoginComponent } from './features/login/login.component';
import { PaymentComponent } from './features/payment/payment.component';
import { authGuard } from './_core/guards/auth.guard';
import { productsRoutes } from './features/products/products.routes';

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
        children: productsRoutes,
      },
      {
        path: 'payment',
        canActivate: [authGuard],
        component: PaymentComponent
      }
    ],
  }
];
