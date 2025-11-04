import { Product } from "../../interfaces/product";

export interface CartItem {
  Product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}