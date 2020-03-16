import express from 'express';
import routes from './routes';
import database from './database'
import cache from './cache'
class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

    async connections() {
        try{
            await cache.connect();
            console.log("Connected with cache");
            await database.connection.authenticate();
            console.log("Connected with database");
        }catch(err){
            throw new Error(err);
        }
    }

}
export default new App();
