import * as express from "express";
import * as methodOverride from "method-override";
import {urlencoded} from "express";


const app = express();

app.use(methodOverride("_method"))
app.use(urlencoded({
    extended: true,
}))