import {Sequelize,Model} from 'sequelize';

class Currency extends Model{
  static init(sequelize){
    super.init({
      name:Sequelize.STRING,
      rates:Sequelize.JSON
    },{
      sequelize
    })
    return this;
  }
}

export default Currency;
