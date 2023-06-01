import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {ValidationError} from "../utils/error";

type UserRecordResults = [UserRecord[], FieldPacket[]]

export class UserRecord {
    public id?: string;
    public readonly name: string;
    public readonly email: string;
    public readonly password: string;

    constructor(obj: Omit<UserRecord, 'insert' | 'update'>) {
        const {id, name, email, password} = obj;

        if (name.length < 3 || name.length > 50) {
            throw new ValidationError(`Imię musi posiadać od 3 do 50 znaków. Aktualnie jest to ${name.length}.`)
        }

        if (password.length < 5 || password.length > 50) {
            throw new ValidationError(`Hasło musi posiadać od 5 do 50 znaków. Aktualnie jest to ${password.length}.`)
        }

        this.id = id ?? uuid();
        this.name = name;
        this.email = email;
        this.password = password;

    };

    async insert(): Promise<string> {
        await pool.execute("INSERT INTO `users`(`id`, `name`, `email`, `password`) VALUES (:id, :name, :email, :password)", {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
        });
        return this.id;
    };

    async update(): Promise<void> {
        await pool.execute("UPDATE `users` SET `name` = :name, `email` = :email, `password` = :password WHERE `id` = :id", {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
        });
    };

    static async getOne(id: string): Promise<UserRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `id` = :id", {
            id,
        }) as UserRecordResults;

        return results.length === 0 ? null : new UserRecord(results[0]);
    };
}