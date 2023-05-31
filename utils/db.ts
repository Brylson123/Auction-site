import {createPool} from "mysql2";


export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'auction',
    namedPlaceholders: true,
    decimalNumbers: true,
})