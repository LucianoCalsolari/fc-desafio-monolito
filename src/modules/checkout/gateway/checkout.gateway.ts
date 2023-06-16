import { Order } from "sequelize/types/model";

export default interface CheckoutGateway{
    addOrder(order: Order): Promise<void>;
    findOrder(id: string): Promise<Order | null>;
}