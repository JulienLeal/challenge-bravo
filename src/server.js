import dotenv from 'dotenv';
const operation = dotenv.config({ path: `env/${process.env.NODE_ENV}.env` });

if (operation.error) {
    throw new Error(`Verify that .env file exists in the env folder and if the file format is equal to env/.env.example`);
}

import app from './app';

app.listen(3333);
