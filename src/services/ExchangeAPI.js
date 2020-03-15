
import axios from 'axios';
import config from 'config';
class ExchangeAPI {

    constructor() {
        console.log(config);
        this.url = process.env.CURRENCY_CONVERTER_API_URL;
        this.apiKey = process.env.CURRENCY_CONVERTER_API_KEY;
    }
    async getCurrencyFrom(to,from) {
        let query = `${to}_${from}`;
        const url_request = `${this.url}?q=${query}&compact=y&apiKey=${this.apiKey}`;
        let result = await axios.get(url_request)
        if(!result.data)
            throw new Error({"message":"without data"});

        if(!result.status>=400)
            throw new Error({"message":result.data,"status":result.status});

        return result.data;

    }
}

export default new ExchangeAPI();
