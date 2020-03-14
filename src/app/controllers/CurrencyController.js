import Currency from '../models/Currency'

class CurrencyController {
  async exchange(req, res) {
      try{

        let result ={};
        const amount = parseInt(req.query.amount);
        const money_from_converter = req.query.from;
        const money_to_converter = req.query.to;

        if(!amount)
            return res.status(400).json("Field amount is required.");
        if(!money_from_converter)
            return res.status(400).json("Field from is required.");
        if(!money_to_converter)
            return res.status(400).json("Field from is required.");
        const money_from = await Currency.findOne({
          where: { name: money_from_converter },
          attributes: ['name', 'rates'],
        });
        const money_to = await Currency.findOne({
            where: { name: money_to_converter },
            attributes: ['name', 'rates'],
        });
        const name_from = money_from.name;
        const rate_to= money_to.rates[name_from].rate;
        const exchange_value = rate_to*amount;
        result[money_to_converter]=exchange_value;
        return res.json(result);
      }catch(err){
        console.log(err);

        //TODO correct handle errors
        return res.status(400).json(exchange_value);
      }

  }
  async index(req, res){
    try {
        const currencies = await Currency.findAll({
            attributes: ['id','name']
          });
        return res.json(currencies);
    } catch (err) {
        console.log(err)
        return res.status(400).json({error:"occour an error"});
    }
  }

}

export default new CurrencyController();
