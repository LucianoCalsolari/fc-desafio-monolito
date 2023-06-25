import Order from "../domain/domain/order.entity";

export default interface CheckoutGateway{
    addOrder(order: Order): Promise<void>;
    findOrder(id: string): Promise<Order | null>;
}