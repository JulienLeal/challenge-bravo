import { Router } from 'express';
const routes = new Router();
import CurrencyController from './app/controllers/CurrencyController';

routes.get('/health',(req,res)=>{
    return res.status(200).send("working")
});

routes.get('/currency/exchange', CurrencyController.exchange);
routes.get('/currency', CurrencyController.index);

export default routes;
