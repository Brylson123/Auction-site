import {Router} from 'express';
import {OfferRecord} from "../records/offer.record";

export const homeRouter = Router();

homeRouter
    .get('/', async (req, res) => {
        const offers = await OfferRecord.listAll();

        res.render('home/home', {
            offers
        });
    })