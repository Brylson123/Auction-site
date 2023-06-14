import {Router} from 'express';
import {OfferRecord} from "../records/offer.record";


export const offerRouter = Router();

offerRouter
    .get('/add-form', (req, res) => {
        res.render('offer/add-form')
    })

    .post('/', async (req, res) => {
        const {nameOfProduct, price, amount, condition, description} = req.body;

        const offer = new OfferRecord({
            ...req.body,
            nameOfProduct: String(nameOfProduct),
            price: Number(price),
            amount: Number(amount),
            condition: String(condition),
            description: String(description),
        });

        const id = await offer.insert();

        res.render('offer/offer-added', {
            id,
            name: offer.nameOfProduct,
        })
    })
