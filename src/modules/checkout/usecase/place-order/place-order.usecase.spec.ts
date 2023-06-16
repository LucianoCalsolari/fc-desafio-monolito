import { PlaceOrderInputDto } from "./place-order.dto";
import { PlaceOrderUseCase } from "./place-order.usecase";

describe("PlaceOrderUseCase unit test", () => {
    describe("execute method",() => {
        it("should throw an error when client not found", async () =>{
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null),
            };
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;
            
            const input: PlaceOrderInputDto = {
                clientId: "0", products: []
            };
            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("Client not found")
            )  
        }); 
        it("should throw an error when products are not valid", async () =>{
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true),
            };
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            
            const mockValidadeProducts = jest
            //@ts-expect-error -  spy on private method
            .spyOn(placeOrderUseCase, "validateProducts")
            //@ts-expect-error -  not return never
            .mockRejectedValue(new Error("No products selected"));
        
            //@ts-expect-error -  force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;
              
            const input: PlaceOrderInputDto = {
                clientId: "1", products: []
            };
            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("No products selected")
            );
            expect(mockValidadeProducts).toHaveBeenCalledTimes(1);
        });
    });
});