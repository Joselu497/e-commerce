import { Routes } from "@angular/router";
import { ProductsComponent } from "./products.component";
import { DetailsComponent } from "./details/details.component";

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
];
