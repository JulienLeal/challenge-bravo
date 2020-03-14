//TODO Refactor CurrencyTask
const dotenv = require("dotenv")
const operation = dotenv.config({ path: `env/${process.env.NODE_ENV}.env` });

if (operation.error) {
    throw new Error(`Verify that .env file exists in the env folder and if the file format is equal to env/.env.example`);
}

import _async from 'async';
import ExchangeAPI from '../services/ExchangeAPI';
import Currency from '../app/models/Currency';
import '../database'
const request_timeout = 1000;
let currencies_processed = {};

const currency_calculate = _async.queue((task, callback) => {
    task.currencies_for_process.forEach(currency_for_process => {
        const from = currency_for_process;
        request_api.push({ to: task.current, from });
    })
    request_api.drain(() => {
        console.log(`finish requests in currency: ${task.current}`);
        callback();
    })
}, 1)

const request_api = _async.queue((task, callback) => {
    (async () => {
        console.log(task);
        const result = await ExchangeAPI.getCurrencyFrom(task.to, task.from);
        const key = `${task.to}_${task.from}`;
        if (!currencies_processed[task.to])
            currencies_processed[task.to] = {}
        currencies_processed[task.to][task.from] = { rate: result[key].val };
        setTimeout(() => {
            callback();
        }, request_timeout)
    })();
}, 1)


let time_for_next_tick = 6000;
_async.forever((next) => {
    (async () => {
        try {
            console.log('--------------------------Initializing----------------------------');
            let currencies = await Currency.findAll({ attributes: ['name'], raw: true })
                .map((_currency) => _currency.name);
            let total_ticks = currencies.length;
            while (total_ticks != 0) {
                let current = currencies.shift();
                let currencies_for_process = [...currencies];
                let object_for_process = { current, currencies_for_process };
                currency_calculate.push(object_for_process);
                currencies.push(current);
                total_ticks--;
            }
            currency_calculate.drain(async () => {
                try {
                    let currency_for_save = [];
                    let index = 1;
                    Object.keys(currencies_processed).forEach(key => {
                        const name = key;
                        const rates = currencies_processed[key];
                        currency_for_save.push({ id:index,name, rates })
                        index++;
                    })
                    console.log(currency_for_save);
                    await Currency.bulkCreate(currency_for_save,
                        {
                            updateOnDuplicate: ["rates"]
                        })
                    console.log('---------------------------finished---------------------------');
                    console.log(`Running again in ${time_for_next_tick / 1000} seconds`);
                    setTimeout(() => {
                        next();
                    }, time_for_next_tick)
                } catch (err) {
                    console.log(err);
                    setTimeout(() => {
                        next();
                    }, time_for_next_tick)
                }

            })
        } catch (err) {
            console.log(err);
        }

    })();
}, err => { });
