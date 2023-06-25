import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import AddressClientDto from "../domain/value-object/AddressClientDto";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "./client-adm.facade";

describe("ClientAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const facade =  ClientAdmFacadeFactory.create();

    const input = {
      id: new Id('1'),
      name: "Client 1",
      document: 'doc',
      email: "x@x.com",
      address: new AddressClientDto('street', '1', 'city', 'zipcode', 'state', 'complement')
    };

    await facade.add(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client).toBeDefined();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });

  it("should find a client", async () => {
    // const repository = new ClientRepository();
    // const findUsecase = new FindClientUseCase(repository);
    // const addUsecase = new AddClientUseCase(repository);
    // const facade = new ClientAdmFacade({
    //   addUsecase: addUsecase,
    //   findUsecase: findUsecase,
    // });

    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: new Id('1'),
      name: "Client 1",
      document: 'doc',
      email: "x@x.com",
      address: new AddressClientDto('street', '1', 'city', 'zipcode', 'state', 'complement')
    };

    await facade.add(input);

    const client = await facade.find({ id: "1" });

    expect(client).toBeDefined();
    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });
});
