import * as express from 'express';
import * as methodOverride from 'method-override';
import {urlencoded} from 'express';
import {UserRecord} from "./records/user.record";
import {userProfileRouter} from "./routers/userProfile";
import {homeRouter} from "./routers/home";
import './utils/db';

const app = express();

app.use(methodOverride('_method'));
app.use(urlencoded({
    extended: true,
}));

app.use('/', homeRouter);
app.use('/user', userProfileRouter);

app.listen(3000, 'localhost', () => console.log('listening on http://localhost:3000'));
