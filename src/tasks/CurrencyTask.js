//TODO implement task that request API and save in Database

import axios from 'axios';
import _async from 'async';
import Currency from '../app/models/Currency';
import '../database'

// let currencies = ["USD", "BRL", "EUR", "BTC", "ETH"]
let time = 6000;
const currency_calculate = _async.queue(async(task, callback) => {

    console.log(task);
    callback();
})

_async.forever((next) => {
    (async()=>{
        try {
            console.log('--------------------------Initializing----------------------------');
            let currencies = await Currency.findAll({attributes:['name'],raw: true})
                                    .map((_currency)=>_currency.name);
            let total_ticks = currencies.length;
             while (total_ticks != 0) {
                 let current = currencies.shift();
                 let currencies_for_process = [...currencies];
                 let object_for_process = { current, currencies_for_process };
                 currency_calculate.push(object_for_process);
                 currencies.push(current);
                 total_ticks--;
             }
             currency_calculate.drain(() => {
                 console.log('---------------------------finished---------------------------');
                 console.log(`Running again in ${time / 1000} seconds`);
                 setTimeout(() => {
                     next();
                 }, time)
             })
        } catch (error) {
            console.log(error);
        }

    })();
}, err => { });
