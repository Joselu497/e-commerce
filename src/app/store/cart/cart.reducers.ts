import { createReducer, on } from '@ngrx/store';
import { CartState } from './cart';
import * as CartActions from './cart.actions';

export const initialCartState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

export const cartReducer = createReducer(
  initialCartState,

  /**
   * Add a product to the cart and update the total
   * If the product already exists, increment the quantity
   */
  on(CartActions.addToCart, (state, { item }) => {
    const existingItem = state.items.find((i) => i.Product.id === item.id);

    if (existingItem) {
      return {
        ...state,
        items: state.items.map((i) => {
          if (i.Product.id === item.id) {
            return { ...i, quantity: i.quantity + 1 };
          }

          return i;
        }),
        total: state.total + item.price,
        itemCount: state.itemCount + 1,
      };
    } else {
      return {
        ...state,
        items: [...state.items, { Product: item, quantity: 1 }],
        total: state.total + item.price,
        itemCount: state.itemCount + 1,
      };
    }
  }),

  /**
   * Remove a product from the cart and update the total
   * If the product is in the cart, decrement the quantity
   * If the product quantity is 1, remove the product from the cart
   */
  on(CartActions.removeFromCart, (state, { item }) => {
    const existingItem = state.items.find((i) => i.Product.id === item.id);

    if (!existingItem) {
      return state;
    }

    if (existingItem.quantity > 1) {
      const updatedItems = state.items.map((cartItem) => {
        if (cartItem.Product.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      });

      return {
        ...state,
        items: updatedItems,
        total: state.total - existingItem.Product.price,
        itemCount: state.itemCount - 1,
      };
    } else {
      const updatedItems = state.items.filter(
        (cartItem) => cartItem.Product.id !== item.id
      );

      return {
        ...state,
        items: updatedItems,
        total: state.total - existingItem.Product.price,
        itemCount: state.itemCount - 1,
      };
    }
  }),

  /**
   * Clear the cart and reset the total
   */
  on(CartActions.clearCart, (state) => {
    return {
      ...state,
      items: [],
      total: 0,
      itemCount: 0,
    };
  })
);
