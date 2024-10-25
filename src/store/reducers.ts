import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    SET_PAYMENT_METHOD,
    CartActionTypes,
    ADD_STARSHIPS_TO_CART,
} from './actions';
import { Starship } from '../types/starshipTypes';

interface State {
    cart: { item: Starship; quantity: number }[]; // Type updated for cart items to include quantities
    paymentMethod: string;
}

const initialState: State = {
    cart: [],
    paymentMethod: 'Credit Card',
};

const rootReducer = (state = initialState, action: CartActionTypes): State => {
    switch (action.type) {
        case ADD_STARSHIPS_TO_CART: {
            const existingCartItemIndex = state.cart.findIndex(
                (cartItem) => cartItem.item.name === action.payload.item.name
            );

            if (existingCartItemIndex !== -1) {
                // If item already exists in the cart, update the quantity
                const updatedCart = [...state.cart];
                updatedCart[existingCartItemIndex] = {
                    ...updatedCart[existingCartItemIndex],
                    quantity: updatedCart[existingCartItemIndex].quantity + action.payload.quantity,
                };
                return {
                    ...state,
                    cart: updatedCart,
                };
            } else {
                // If item does not exist in the cart, add it with the provided quantity
                return {
                    ...state,
                    cart: [...state.cart, { item: action.payload.item, quantity: action.payload.quantity }],
                };
            }
        }
        case ADD_TO_CART: {
            const existingCartItemIndex = state.cart.findIndex(
                (cartItem) => cartItem.item.name === action.payload.item.name
            );

            if (existingCartItemIndex !== -1) {
                // If item already exists in the cart, increase the quantity
                const updatedCart = [...state.cart];
                updatedCart[existingCartItemIndex] = {
                    ...updatedCart[existingCartItemIndex],
                    quantity: updatedCart[existingCartItemIndex].quantity + action.payload.quantity,
                };
                return {
                    ...state,
                    cart: updatedCart,
                };
            } else {
                // If item does not exist in the cart, add it with the provided quantity
                return {
                    ...state,
                    cart: [...state.cart, { item: action.payload.item, quantity: action.payload.quantity }],
                };
            }
        }

        case REMOVE_FROM_CART: {
            const updatedCart = state.cart
                .map((cartItem) => {
                    if (cartItem.item.name === action.payload.name) {
                        // Reduce the quantity by 1 if greater than 1
                        if (cartItem.quantity > 1) {
                            return {
                                ...cartItem,
                                quantity: cartItem.quantity - 1,
                            };
                        } else {
                            // Remove the item by returning null
                            return null;
                        }
                    }
                    return cartItem;
                })
                .filter((cartItem) => cartItem !== null) as { item: Starship; quantity: number }[]; // Filter out null values

            return {
                ...state,
                cart: updatedCart,
            };
        }

        case EMPTY_CART:
            return {
                ...state,
                cart: [],
            };

        case SET_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };

        default:
            return state;
    }
};

export default rootReducer;
