import AddressClientDto from "../../domain/value-object/address-client.dto";

export interface AddClientInputDto {
  id?: string;
  name: string;
  email: string;
  document: string,
  address: AddressClientDto;
}

export interface AddClientOutputDto {
  id: string;
  name: string;
  email: string;
  document: string,
  address: AddressClientDto;
  createdAt: Date;
  updatedAt: Date;
}
