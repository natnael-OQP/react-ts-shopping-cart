import { createContext, useContext, useState } from "react";
import {
    CartItemProps,
    ShoppingCartContextProps,
    ShoppingCartProviderProps,
} from "../types/types";

const contextDefaultValues: ShoppingCartContextProps = {
    getItemQuantity: () => 0,
    incrementCartQuantity: () => {},
    decrementCartQuantity: () => {},
    removeFromCart: () => {},
};

const ShoppingCartContext =
    createContext<ShoppingCartContextProps>(contextDefaultValues);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [CartItems, setCartItems] = useState<CartItemProps[]>([]);

    const getItemQuantity = (id: number) => {
        return CartItems.find((item) => item.id === id)?.quantity || 0;
    };
    const incrementCartQuantity = (id: number) => {
        setCartItems((prev) => {
            if (prev.find((item) => item.id === id) == null) {
                return prev.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            } else {
                return [...prev, { id, quantity: 1 }];
            }
        });
    };
    const decrementCartQuantity = (id: number) => {
        setCartItems((prev) => {
            const Item = prev.find((item) => item.id === id);

            if (Item?.quantity === 1) {
                return prev.filter((item) => item.id !== id);
            } else {
                return prev.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const removeFromCart = (id: number) => {
        return CartItems.filter((item) => item.id !== id);
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                decrementCartQuantity,
                incrementCartQuantity,
                removeFromCart,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}
