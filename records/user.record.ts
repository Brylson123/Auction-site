import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {ValidationError} from "../utils/error";
import {emailRegex} from "../utils/emailRegex";

type UserRecordResults = [UserRecord[], FieldPacket[]]

export class UserRecord {
    public id?: string;
    public name: string;
    public email: string;
    public password: string;

    constructor(obj: Omit<UserRecord, 'insert' | 'update' | 'add'>) {
        const {id, name, email, password} = obj;

        if (password.length < 5 || password.length > 60) {
            throw new ValidationError(`Hasło musi posiadać od 5 do 50 znaków. Aktualnie jest to ${password.length}.`)
        }
        if (email.length < 5 || email.length > 50) {
            throw new ValidationError(`Email musi posiadać od 5 do 50 znaków. Aktualnie jest to ${email.length}.`)
        }
        if (!email.match(emailRegex)) {
            throw new ValidationError('Zły format email');
        }

        this.id = id ?? uuid();
        this.name = name;
        this.email = email;
        this.password = password;

    };

    async add(): Promise<string> {
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

    static async login(email: string): Promise<UserRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `email` = :email", {
            email,
        }) as UserRecordResults;

        return results.length === 0 ? null : results[0];
    }

    static async checkEmail(email: string): Promise<boolean> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `email` = :email", {
            email,
        }) as UserRecordResults;

        return results.length > 0;
    }
}
