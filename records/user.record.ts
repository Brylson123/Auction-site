import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";

export class UserRecord{
    public id?: string;
    public readonly name: string;
    public readonly email: string;
    public password: string;

    constructor(obj: UserRecord) {
        const {id, name, email, password} = obj;

        this.id = id ?? uuid();
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async insert(): Promise<string>{
        await pool.execute("INSERT INTO `users`(id, name, email, password) VALUES (:id, :name, :email, :password)", {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
        })
    }


}