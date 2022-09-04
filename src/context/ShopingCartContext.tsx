import { createContext, useContext, useEffect, useState } from "react";
import {
    CartItemProps,
    ShoppingCartContextProps,
    ShoppingCartProviderProps,
} from "../types/types";

const contextDefaultValues: ShoppingCartContextProps = {
    quantity: 0,
    isOpen: false,
    openCart: () => {},
    closeCart: () => {},
    getItemQuantity: () => 0,
    incrementCartQuantity: () => {},
    decrementCartQuantity: () => {},
    removeFromCart: () => {},
    CartItems: [],
};

const ShoppingCartContext =
    createContext<ShoppingCartContextProps>(contextDefaultValues);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [CartItems, setCartItems] = useState<CartItemProps[]>([]);
    const [quantity, setQuantity] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setQuantity(CartItems.length);
    }, [CartItems]);

    const getItemQuantity = (id: number) => {
        return CartItems.find((item) => item.id === id)?.quantity || 0;
    };

    const incrementCartQuantity = (id: number) => {
        setCartItems((prev) => {
            if (prev.find((item) => item.id === id) == null) {
                return [...prev, { id, quantity: 1 }];
            } else {
                return prev.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
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

    const openCart = () => {
        setIsOpen(true);
    };

    const closeCart = () => {
        setIsOpen(false);
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                isOpen,
                quantity,
                openCart,
                closeCart,
                getItemQuantity,
                decrementCartQuantity,
                incrementCartQuantity,
                removeFromCart,
                CartItems,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}
