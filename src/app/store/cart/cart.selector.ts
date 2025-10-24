import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { CartState } from "./cart";

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(selectCartState, (state: CartState) => state.items);

export const selectCartTotal = createSelector(selectCartState, (state: CartState) => state.total);

export const selectCartItemCount = createSelector(selectCartState, (state: CartState) => state.itemCount);