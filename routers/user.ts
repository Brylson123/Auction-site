import {Router} from 'express';
import {UserRecord} from "../records/user.record";

export const userProfileRouter = Router();

userProfileRouter
    .get('/add-form', async (req, res) => {
        res.render('user/add-form')
    })
    .post('/', async (req, res) => {
        const {name, email, password} = req.body;

        const user = new UserRecord({
            ...req.body,
            name: String(name),
            email: String(email),
            password: String(password),
        });

        const id = await user.insert();

        res.render('user/user-added', {
            id,
            name: user.name,
        })
    })
