import {Router} from 'express';
import {OfferRecord} from "../records/offer.record";


export const offerRouter = Router();

offerRouter
    .get('/add-offer',(req, res) => {
    res.send('site to create a offer')
})
    .post('/', async (req, res) => {
        const {nameOfProduct, price, amount, conditon, description} = req.body;

        const offer = new OfferRecord({
            ...req.body,
            nameOfProduct,
            price,
            amount,
            conditon,
            description
        });

        const id = await offer.insert();
    })
