import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    address: string;
};

export default class Client extends BaseEntity implements AggregateRoot{
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    private _email: string;
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    private _address: string;
    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }

    constructor(props: ClientProps){
        super(props.id);
        this._name = props.name;
        this._email = props.email;
        this._address = props.address;
    }
}