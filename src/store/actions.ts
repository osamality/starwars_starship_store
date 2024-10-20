import { Starship } from '../types/starshipTypes';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';

export interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: Starship;
}

export interface RemoveFromCartAction {
    type: typeof REMOVE_FROM_CART;
    payload: Starship;
}

export interface EmptyCartAction {
    type: typeof EMPTY_CART;
}

export interface SetPaymentMethodAction {
    type: typeof SET_PAYMENT_METHOD;
    payload: string;
}

export type CartActionTypes = AddToCartAction | RemoveFromCartAction | EmptyCartAction | SetPaymentMethodAction;

export const addToCart = (starship: Starship): AddToCartAction => ({
    type: ADD_TO_CART,
    payload: starship,
});

export const removeFromCart = (starship: Starship): RemoveFromCartAction => ({
    type: REMOVE_FROM_CART,
    payload: starship,
});

export const emptyCart = (): EmptyCartAction => ({
    type: EMPTY_CART,
});

export const setPaymentMethod = (method: string): SetPaymentMethodAction => ({
    type: SET_PAYMENT_METHOD,
    payload: method,
});
