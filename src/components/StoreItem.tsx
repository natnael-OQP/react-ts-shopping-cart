import { Button, Card } from "react-bootstrap";
import { StoreItemProps } from "../types/types";

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const quantity = 0;

    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200px"
                style={{ objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">price</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => {}}>
                            + Add To Cart
                        </Button>
                    ) : (
                        <div
                            className="d-flex align-items-center flex-column"
                            style={{ gap: ".5rem" }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ gap: ".5rem" }}
                            >
                                <Button onClick={() => {}}>-</Button>
                                <div>
                                    <span className="fs-3">{quantity}</span> in
                                    cart
                                </div>
                                <Button onClick={() => {}}>+</Button>
                            </div>
                            <Button
                                onClick={() => {}}
                                variant="danger"
                                size="sm"
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}