import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import OrderModel from "../../modules/checkout/repository/order.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { checkoutRoute } from "./routes/checkout.route";
import { clientRoute } from "./routes/clients.route";
import { invoiceRoute } from "./routes/invoice.route";
import { productRoute } from "./routes/products.route";

export const app: Express = express();
app.use(express.json());
app.use("/clients", clientRoute);
app.use('/products', productRoute);
app.use('/checkout', checkoutRoute)
app.use('/invoice', invoiceRoute)

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ClientModel,ProductModel,OrderModel]);
  await sequelize.sync();
}
setupDb();
