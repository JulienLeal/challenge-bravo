import dotenv from 'dotenv';
const operation = dotenv.config({ path: `env/${process.env.NODE_ENV}.env` });

if (operation.error) {
    throw new Error(`Verify that .env file exists in the env folder and if the file format is equal to env/.env.example`);
}
const PORT = process.env.PORT ? process.env.PORT : 3333;
const start = async () => {
    try {
        import app from './app';
        await app.connections();
        app.server.listen(PORT, () => {
            console.log(`Listening on ${PORT} with configuration ${process.env.NODE_ENV}`);
         });
    } catch (err) {
        console.log("caiu aqui")
        console.log(err);
    }
}


start();