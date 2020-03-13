import { Router } from 'express';
const routes = new Router();
import CurrencyController from './app/controllers/CurrencyController';

routes.get('/health',(req,res)=>{
    return res.status(200).send("working")
});

routes.get('/currency', CurrencyController.exchange);

export default routes;
