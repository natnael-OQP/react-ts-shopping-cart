import { Offcanvas, Stack } from "react-bootstrap";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import { useShoppingCart } from "../context/ShopingCartContext";

type ShoppingCartProps = {
    isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, CartItems, quantity } = useShoppingCart();
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {CartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {CartItems.reduce((total, cartItem) => {
                            const item = storeItems.find(
                                (i) => i.id === cartItem.id
                            );
                            return total + (item?.price || 0) * quantity;
                        }, 0)}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
