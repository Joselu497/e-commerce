import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart';
import { Product } from '../../_core/interfaces/product';

export const loadCart = createAction('[Cart] Load Cart');
export const addToCart = createAction('[Cart] Add To Cart', props<{ item: Product }>());
export const removeFromCart = createAction('[Cart] Remove From Cart', props<{ item: Product }>());
export const clearCart = createAction('[Cart] Clear Cart');