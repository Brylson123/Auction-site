import {Router} from "express";

export const homeRouter = Router();

homeRouter
    .get("/", async (req, res) => {
        res.send("Welcome to main site");
    })