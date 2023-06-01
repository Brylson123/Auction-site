import {Router} from 'express';

export const userProfileRouter = Router();

userProfileRouter
    .get('/profile/:id', async (req, res) => {
        res.send(`Welcome to user profile ${req.params.id}`);
    })