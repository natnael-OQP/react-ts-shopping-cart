import { ReactNode } from "react";

export type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
};

export type ShoppingCartProviderProps={
    children:ReactNode;
}

export type ShoppingCartContextProps={
    getItemQuantity:(id:number) => number;
    incrementCartQuantity:(id:number)=>void;
    decrementCartQuantity:(id:number)=>void;
    removeFromCart:(id:number)=>void;
}

export type CartItemProps={
    id:number;
    quantity:number;
}