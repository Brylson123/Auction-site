import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {ValidationError} from "../utils/error";


type OfferRecordResults = [OfferRecord[], FieldPacket[]]

export class OfferRecord {
    public id?: string;
    public readonly nameOfProduct: string;
    public readonly price: number;
    public readonly amount: number;

    constructor(obj: Omit<OfferRecord, 'insert' | 'update'>) {
        const {id, nameOfProduct, price, amount} = obj;

        if (amount < 1 && amount > 999) {
            throw new ValidationError(`Ilość przedmiotów powinna być od 1 do 999. Aktualnie jest to ${amount}.`)
        }

        if (nameOfProduct.length < 3 && nameOfProduct.length > 50) {
            throw new ValidationError(`Imię musi posiadać od 3 do 36 znaków. Aktualnie jest to ${nameOfProduct.length}.`)
        }

        if (price < 0.99 && price > 99999999.99) {
            throw new ValidationError(`Cena powinna wynosić między 0.99 a 99999999.99. Teraz wynosi ${price}`)
        }

        this.id = id ?? uuid();
        this.nameOfProduct = nameOfProduct;
        this.price = price;
        this.amount = amount;

    };

    async insert(): Promise<string> {
        await pool.execute("INSERT INTO `offer`(`id`, `nameOfProduct`, `price`, `amount`) VALUES (:id, :nameOfProduct, :price, :amount)", {
            id: this.id,
            nameOfProduct: this.nameOfProduct,
            price: this.price,
            amount: this.amount,
        });
        return this.id;
    };

    async update(): Promise<void> {
        await pool.execute("UPDATE `offer` SET `nameOfProduct` = :nameOfProduct, `price` = :price, `amount` = :amount WHERE `id` = :id", {
            id: this.id,
            nameOfProduct: this.nameOfProduct,
            price: this.price,
            amount: this.amount,
        });
    };

    static async getOne(id: string): Promise<OfferRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `offer` WHERE `id` = :id", {
            id,
        }) as OfferRecordResults;

        return results.length === 0 ? null : new OfferRecord(results[0]);
    };

    static async listAll(): Promise<OfferRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors`") as OfferRecordResults;

        return results.map(obj => new OfferRecord(obj))
    };
}