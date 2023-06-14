import * as express from 'express';
import * as methodOverride from 'method-override';
import 'express-async-errors';
import {static as eStatic, urlencoded} from 'express';
import {homeRouter} from './routers/home';
import {offerRouter} from "./routers/add-offer";
import {registerRouter} from "./routers/register";
import {loginRouter} from "./routers/login";
import {engine} from "express-handlebars";
import {handleError} from "./utils/error";
import './utils/db';

const app = express();

app.use(methodOverride('_method'));
app.use(urlencoded({
    extended: true,
}));
app.use(eStatic('public'))
app.engine('.hbs', engine({
    extname:'.hbs',
}));

app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter)
app.use('/offer', offerRouter);

app.use(handleError);

app.listen(3000, 'localhost', () => console.log('listening on http://localhost:3000'));
