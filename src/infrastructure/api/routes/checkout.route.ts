import express, { Request, Response } from "express";
import Id from "../../../modules/@shared/domain/value-object/id.value-object";
import AddressClientDto from "../../../modules/client-adm/domain/value-object/address-client.dto";
import ClientRepository from "../../../modules/client-adm/repository/client.repository";
import AddClientUseCase from "../../../modules/client-adm/usecase/add-client/add-client.usecase";
import FindClientUseCase from "../../../modules/client-adm/usecase/find-client/find-client.usecase";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new AddClientUseCase(new ClientRepository());
  try {
    const usecase = .create();
    const checkoutDto = {clientId: req.body.clientId, products: req.body.products
      .map((p: { productId: any; }) => { return {productId: p.productId}})};

    const output = await usecase.execute(checkoutDto);

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

checkoutRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new FindClientUseCase(new ClientRepository());
  const output = await usecase.execute({id: req.params.id});

  res.format({
    json: async () => res.send(output),
  });
});
