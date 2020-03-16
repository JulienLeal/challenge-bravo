import redis from 'redis';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis);

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

class Cache {
    constructor() {
    }
    async connect() {
        this.client = redis.createClient(REDIS_PORT, REDIS_HOST);
        this.client.auth(REDIS_PASSWORD);
        const client = this.client;
        return new Promise((resolve, reject) => {
            client.on('error', (err) => {
                reject(err);
            });
            client.on("connect", function () {
                resolve();
            });
        })

    }

}

export default new Cache();
