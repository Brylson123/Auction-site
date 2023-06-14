import {Router} from 'express';
import {UserRecord} from "../records/user.record";
import * as bcrypt from 'bcrypt';
import {emailRegex} from "../utils/emailRegex";
import {ValidationError} from "../utils/error";

export const registerRouter = Router();

registerRouter

    .get('/newUser', async (req, res) => {
        res.render('user/register')
    })

    .post('/', async (req, res) => {
        const {name, email, password} = req.body;

        if (await UserRecord.checkEmail(email)) {
            throw new ValidationError('Taki email już jest zarejestrowany')
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new UserRecord({
            ...req.body,
            name: String(name),
            email: String(email),
            password: String(hashedPassword),
        });
        const id = await user.add();

        res.render('user/user-added', {
            id,
            name: user.name,
        })
    })