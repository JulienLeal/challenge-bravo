import { Router } from 'express';
const routes = new Router();

routes.get('/health',(req,res)=>{
    return res.status(200).send("working")
});

export default routes;
