import {Router} from 'express';
import * as bcrypt from 'bcrypt';
import {UserRecord} from "../records/user.record";
import {ValidationError} from "../utils/error";

export const loginRouter = Router();

loginRouter

    .get('/signin', async (req, res) => {
        res.render('user/login')
    })

    .post('/', async (req, res) => {
        const {email, password} = req.body;

        const user = await UserRecord.login(email)

        if (user) {
          const isPasswordMatching = await bcrypt.compare(password, user.password)
            if(isPasswordMatching){
                user.password = undefined;
                res.render('user/lognin', {
                    name: user.name,
                })
            }
        } else {
            throw new ValidationError('Złe hasło albo email')
        }
    })