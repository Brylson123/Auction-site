import * as express from 'express';
import * as methodOverride from 'method-override';
import {static as eStatic, urlencoded} from 'express';
import {userProfileRouter} from './routers/user';
import {homeRouter} from './routers/home';
import {offerRouter} from "./routers/add-offer";
import {engine} from "express-handlebars";
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
app.use('/user', userProfileRouter);
app.use('/offer', offerRouter);



app.listen(3000, 'localhost', () => console.log('listening on http://localhost:3000'));
